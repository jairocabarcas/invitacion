"use client"
import React, {useEffect, useState} from "react";
import Papa from "papaparse";
import {useSessionContext} from "@/app/security/AuthGuard";
import {EventResponse} from "@/models/event.model";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {findGuestsByEvent, saveGuest, updateStatus} from "@/app/services/guest.service";
import {GuestRequest, GuestResponse} from "@/models/guest.model";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import AddGuestModal from "@/app/components/admin/newGuestForn";
import {InvitationStatus, InvitationType} from "@/models/enums";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {
    Ban,
    CalendarCheck,
    Delete,
    EllipsisVertical,
    Loader2,
    SquareMinus,
    SquarePlus, UserPlus,
    UserRoundPen
} from "lucide-react";

type TableComponentType ={
    guests: GuestResponse[],
    onChangeStatus: (guetId: string, status: InvitationStatus, index: number, subIndex?: number) => void,
    itemLoadingIndex: number,
    subItemLoadingIndex: number,
    setOpenGuestId: (openGuestId: string) => void,
    openModal: (guestId: string) => void,
}

export default function GuestManagement(){
    const [jsonData, setJsonData] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [events, setEvents] = useState<EventResponse[]>([]);
    const [selectedMainGuest, setSelectedMainGuest] = useState<string|undefined>(undefined);
    const [ selectedEvents, setSelectedEvents] = useState<EventResponse | undefined>(undefined);
    const [guests, setGuests] = useState<GuestResponse[]>([]);
    const [itemLoadingIndex, setItemLoadingIndex] = useState(-1);
    const [itemLoadingSubIndex, setItemLoadingSubIndex] = useState(-1);
    const [open, setOpen] = useState(false);
    const [openGuestId, setOpenGuestId] = useState<string | null>(null);
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
            setOpenGuestId(null)
        }
    }

    const handleModalChange = (status: boolean) => {
        setOpen(status)
        setOpenGuestId(null)
    }

    const setGuestId = (guestId: string) => {
        setOpenGuestId(guestId);
    }
    const openModal = (guestId:string) => {
        setOpenGuestId(guestId)
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

    const handleChangeStatus = async (guestId: string, status: InvitationStatus, index: number, subIndex: number =-1) => {
        setItemLoadingIndex(index);
        setItemLoadingSubIndex(subIndex);
        const response = await updateStatus(guestId, status);
        if(response && selectedEvents){
            setGuests(await loadGuestsByEvent(selectedEvents.id));
            setItemLoadingIndex(-1);
            setItemLoadingSubIndex(-1)
        }
    }

    return (
        <div className="min-h-screen w-full p-12 bg-gray-50 font-sans">
            <div className="flex flex-col h-full w-full border-2 border-gray-200 p-5 gap-4">
                <div className="px-2">
                    <h1 className="text-3xl font-bold ">{`Hola ${user.name}`}</h1>
                </div>
                <>
                    {!selectedEvents ?
                        <div className="h-full w-full flex items-center justify-center">
                            <Loader2 className="mr-2 h-36 w-36 animate-spin text-[#8c6d57]"/>
                        </div> :
                        <>
                            <div className=" flex gap-4">
                                <div>
                                    {selectedEvents &&
                                        <div className="px-2">
                                            <Select defaultValue={selectedEvents.id}>
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
                                            <div>
                                                <span>Total Invitados: {guests.length}</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <div>
                                    {
                                        selectedEvents && !openGuestId &&
                                        <AddGuestModal
                                            save={save}
                                            event={selectedEvents?.id}
                                            createdBy={user.id}
                                            mainGuestId={selectedMainGuest}
                                            onChangeModalStatus={handleModalChange}
                                            isOpen={open}
                                            isCompanion={false}
                                            showButton={true}
                                        />
                                    }
                                </div>
                            </div>
                            <div>
                                {selectedEvents && user && <GuestPanel
                                    guests={guests}
                                    onChangeStatus={handleChangeStatus}
                                    itemLoadingIndex={itemLoadingIndex}
                                    openModal={openModal}
                                    setOpenGuestId={setOpenGuestId}
                                    subItemLoadingIndex={itemLoadingSubIndex}
                                />}
                            </div>
                            {
                                openGuestId &&
                                <AddGuestModal
                                    save={save}
                                    event={selectedEvents?.id ?? ''}
                                    createdBy={user.id}
                                    mainGuestId={openGuestId}
                                    onChangeModalStatus={handleModalChange}
                                    isOpen={true}
                                    isCompanion={true}
                                    buttonText={"Anadir acompañante"}
                                    showButton={false}
                                />
                            }
                        </>
                    }
                </>

            </div>
        </div>
    )
}

const GuestPanel = (
    {guests, onChangeStatus, itemLoadingIndex, subItemLoadingIndex, openModal, setOpenGuestId
    }: TableComponentType) => {
    const [expandedRow, setExpandedRow] = React.useState<number[]>([])
    const expandRow = (row: number) => {
        setExpandedRow(prevState => expandedRow.some(value => value === row) ?
            expandedRow.filter(value => value!== row) :
            [...prevState, row])
    }
    const getCompanion = (guestId: string) =>{
        return guests.filter(guest => guest.mainGuestId === guestId)
    }

    return (
        <div className="p-10">
            <Table>
                <TableCaption>Lista de invitados registrados.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-center ">Nombre</TableHead>
                        <TableHead className="text-center ">Telefono</TableHead>
                        <TableHead className="text-center ">Estado de la invitacion</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.isArray(guests) && guests.filter(guest => !guest.mainGuestId)
                        .map((guest, index) => (
                        <React.Fragment key={guest.id}>
                            <TableRow
                                      className={`${index % 2 === 0 ? 'bg-[#DECDB2] hover:bg-[#B69A76]' : 'hover:bg-gray-300' }`}

                            >
                                <TableCell className="text-center flex items-center"
                                           onClick={() => expandRow(index)}
                                >
                                    {getCompanion(guest.id).length>0 && <>{expandedRow.some(value => value === index) ?
                                        <SquarePlus className="pr-2"/> : <SquareMinus className="pr-2"/>}</>}
                                    <>{guest.name +' '+ guest.surname}</>
                                </TableCell>
                                <TableCell className="text-center ">{guest.identifier}</TableCell>
                                <TableCell className="text-center">
                                    {InvitationType[guest.status as keyof typeof InvitationType]}
                                </TableCell>
                                <TableCell>
                                    {itemLoadingIndex === index ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <DropdownMenu>
                                        <DropdownMenuTrigger asChild >
                                            <Button className="bg-transparent hover:bg-gray-200"
                                            >
                                                <EllipsisVertical
                                                    className="text-black"/>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={()=> {setOpenGuestId(guest.id);}}
                                                className="font-sans"
                                            >
                                                <UserPlus />Añadir acompañante
                                            </DropdownMenuItem>
                                            {guest.status !== InvitationStatus.CONFIRMED &&
                                                <DropdownMenuItem
                                                    onClick={() => onChangeStatus(guest.id, InvitationStatus.CONFIRMED, index)}
                                                    className="font-sans">
                                                    <CalendarCheck/> Confirmar
                                                </DropdownMenuItem>
                                            }
                                            {guest.status !== InvitationStatus.REJECTED &&
                                                <DropdownMenuItem
                                                    onClick={() => onChangeStatus(guest.id, InvitationStatus.REJECTED, index)}
                                                    className="font-sans">
                                                    <Ban/> Rechazar
                                                </DropdownMenuItem>
                                            }
                                            <DropdownMenuItem onClick={() => alert("Editar clickeado")}
                                                              className="font-sans">
                                                <UserRoundPen/> Editar
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => alert("Eliminar clickeado")}
                                                              className="font-sans">
                                                <Delete/> Eliminar
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>}
                                </TableCell>
                            </TableRow>
                            {
                                getCompanion(guest.id).length>0 &&
                                !expandedRow.some(value => value === index) &&
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <div className="p-4">
                                            <p className="font-semibold">Acompañantes:</p>
                                            <Table className="mt-2">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Nombre</TableHead>
                                                        <TableHead>Teléfono</TableHead>
                                                        <TableHead>Estado de la invitación</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {getCompanion(guest.id).map((companion, companionIndex) => (
                                                        <TableRow key={companion.id}
                                                                  className={`${companionIndex % 2 === 0 ? 'bg-[#DECDB2] hover:bg-[#B69A76]' : 'hover:bg-gray-300' }`}
                                                        >
                                                            <TableCell>{companion.name + " " + companion.surname}</TableCell>
                                                            <TableCell>{companion.identifier}</TableCell>
                                                            <TableCell>
                                                                {InvitationType[companion.status as keyof typeof InvitationType]}
                                                            </TableCell>
                                                            <TableCell>
                                                                {/* ::::Aqui empieza los acompañantes::::: */}
                                                                {itemLoadingIndex === index && subItemLoadingIndex === companionIndex ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <DropdownMenu>
                                                                    <DropdownMenuTrigger asChild >
                                                                        <Button className="bg-transparent hover:bg-gray-200"
                                                                        >
                                                                            <EllipsisVertical
                                                                                className="text-black"/>
                                                                        </Button>
                                                                    </DropdownMenuTrigger>
                                                                    <DropdownMenuContent>
                                                                        {companion.status !== InvitationStatus.CONFIRMED &&
                                                                            <DropdownMenuItem
                                                                                onClick={() => onChangeStatus(companion.id, InvitationStatus.CONFIRMED, index,companionIndex)}
                                                                                className="font-sans">
                                                                                <CalendarCheck/> Confirmar
                                                                            </DropdownMenuItem>
                                                                        }
                                                                        {companion.status !== InvitationStatus.REJECTED &&
                                                                            <DropdownMenuItem
                                                                                onClick={() => onChangeStatus(companion.id, InvitationStatus.REJECTED, index, companionIndex)}
                                                                                className="font-sans">
                                                                                <Ban/> Rechazar
                                                                            </DropdownMenuItem>
                                                                        }
                                                                        <DropdownMenuItem onClick={() => alert("Editar clickeado")}
                                                                                          className="font-sans">
                                                                            <UserRoundPen/> Editar
                                                                        </DropdownMenuItem>
                                                                        <DropdownMenuItem onClick={() => alert("Eliminar clickeado")}
                                                                                          className="font-sans">
                                                                            <Delete/> Eliminar
                                                                        </DropdownMenuItem>
                                                                    </DropdownMenuContent>
                                                                </DropdownMenu>}
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            }
                        </React.Fragment>
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