"use client"
import React, {useEffect, useState} from "react";
import Papa from "papaparse";
import {useSessionContext} from "@/app/security/AuthGuard";
import { EventResponse} from "@/models/event.model";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {findGuestsByEvent, saveGuest} from "@/app/services/guest.service";
import {GuestRequest, GuestResponse} from "@/models/guest.model";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AddGuestModal from "@/app/components/admin/newGuestForn";
import {InvitationStatus, InvitationType} from "@/models/enums";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {EllipsisVertical} from "lucide-react";

type TableComponentType ={
    guests: GuestResponse[]
}

export default function GuestManagement(){
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState<EventResponse[]>([]);
    const [selectedMainGuest, setSelectedMainGuest] = useState<string|undefined>(undefined);
    const [ selectedEvents, setSelectedEvents] = useState<EventResponse | undefined>(undefined);
    const [guests, setGuests] = useState<GuestResponse[]>([]);
    const [open, setOpen] = useState(false);
    const {user} = useSessionContext();

    useEffect(() => {
        loadEvents(user.id)
            .then(response => {
                setEvents(response);
                if(response.length > 0){
                    console.log('steando informaciion')
                    setSelectedEvents(response[0])
                    loadGuestsByEvent(response[0].id)
                        .then(guestsResponse => setGuests(guestsResponse))
                }
            });
    }, [])

    const save = async (guestRequest: GuestRequest) => {
        const response = await saveGuest(guestRequest);
        if (response){
            setGuests(prevState => [...prevState, response]);
            setOpen(false);
        }
    }

    const handleModalChange = (status: boolean) => {
        setOpen(status)
    }
    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        Papa.parse(file, {
            header: true, // Usa la primera fila como cabecera
            skipEmptyLines: true,
            complete: (results: any) => {
                if (results.errors.length) {
                    setError("Hubo un problema procesando el CSV.");
                    console.error(results.errors);
                } else {
                    setJsonData(results.data as any[]);
                    setError(null);
                }
            },
        });
    };

    return (
        <div className="h-screen w-full p-12 bg-gray-50 font-sans">
            <div className="flex flex-col h-full w-full border-2 border-gray-200 p-5 gap-4">
                <div>
                    <h1 className="text-3xl font-bold ">{`Hola ${user.name}`}</h1>
                </div>
                <div className=" flex gap-4">
                    <div>
                        {selectedEvents &&
                            <Select defaultValue={selectedEvents?.id}>
                                <SelectTrigger className="w-auto">
                                    <SelectValue placeholder="Selecciona un evento"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {
                                        events.length > 0 && events.map((event) => (
                                            <SelectItem value={event.id} key={event.id}>{event.title}</SelectItem>
                                        ))
                                    }
                                </SelectContent>
                            </Select>
                        }
                    </div>
                    <div>
                        {
                            selectedEvents &&
                            <AddGuestModal
                                save={save}
                                event={selectedEvents?.id}
                                createdBy={user.id}
                                mainGuestId={selectedMainGuest}
                                onChangeModalStatus={handleModalChange}
                                isOpen={open}/>
                        }
                    </div>
                </div>
                <div>
                    <GuestPanel guests={guests}/>
                </div>
            </div>
        </div>
    )
}

const GuestPanel = ({guests}: TableComponentType) => {
    return (
        <div className="p-10">
            <Table>
                <TableCaption>Lista de invitados registrados.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center">Nombre</TableHead>
                        <TableHead className="text-center">Telefono</TableHead>
                        <TableHead className="text-center">Estado de la invitacion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(guests) && guests.map((guest) => (
                        <TableRow key={guest.id}>
                            <TableCell className="text-center">{guest.name +' '+ guest.surname}</TableCell>
                            <TableCell className="text-center">{guest.identifier}</TableCell>
                            <TableCell className="flex justify-center items-center gap-2">
                                <span>{InvitationType[guest.status as keyof typeof InvitationType]}</span>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button className="bg-transparent hover:bg-gray-200"><EllipsisVertical className="text-black"/></Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {guest.status !== InvitationStatus.CONFIRMED &&
                                            <DropdownMenuItem onClick={() => alert("Confirmado clickeado")} className="font-sans">
                                                Confirmar
                                            </DropdownMenuItem>
                                        }
                                        {guest.status !== InvitationStatus.REJECTED &&
                                            <DropdownMenuItem onClick={() => alert("Rechazar clickeado")} className="font-sans">
                                                Rechazar
                                            </DropdownMenuItem>
                                        }
                                        <DropdownMenuItem onClick={() => alert("Editar clickeado")} className="font-sans">
                                            Editar
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

const loadEvents = async (userId: string) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_FAMILY_SERVICE_URL}/events/by-organizer/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await res.json();
    return data as EventResponse[];
}

const loadGuestsByEvent = async (eventId: string) => {
    return await findGuestsByEvent(eventId);
}