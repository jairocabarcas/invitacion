'use client'
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Ban, CalendarCheck, EllipsisVertical, Loader2, Search} from "lucide-react";
import {findGuestsByIdentifier, getConfirmAttendance, updateStatus} from "@/app/services/guest.service";
import {ConfirmAttendance, GuestResponse} from "@/models/guest.model";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {InvitationStatus, InvitationType} from "@/models/enums";
import {Separator} from "@/components/ui/separator";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";

export default function RSVPModal() {
    const [identifier, setIdentifier] = useState("");
    const [loading, setLoading] = useState(false);
    const [confirAttendance, setConfirAttendance] = useState<ConfirmAttendance | null>(null);
    const [open, setOpen] = useState(false);

    const handleSearch = async () => {
        setLoading(true);
        const guestResponse = await findGuestsByIdentifier(identifier);
        if (guestResponse) {
            const confirmAttendanceResponse = await getConfirmAttendance(guestResponse.id);
            if (confirmAttendanceResponse) {
                setConfirAttendance(confirmAttendanceResponse);

            }
        }
        setLoading(false);
    };

    const handleStatusChange = async (guestId: string, status: InvitationStatus) => {
        setLoading(true);
        const guestResponse = await updateStatus(guestId, status);
        if (guestResponse) {
            await handleSearch();
        }
        setLoading(false);
    }

    const reset = ()=>{
        setConfirAttendance(null);
        setIdentifier("")
    }

    return (
        <div className="mt-8 text-center">
            {/* Botón que abre el modal */}
            <Dialog
                open={open}
                onOpenChange={(isOpen) => {
                    setOpen(isOpen);
                    if (!isOpen) {
                        reset(); // 🔄 cuando se cierre, reinicia todo
                    }
                }}
            >
                <DialogTrigger asChild>
                    <button className="bg-[#937552] text-white px-6 py-2 rounded-full shadow hover:bg-[#9c8566] transition text-sm md:text-base">
                        Confirmar asistencia
                    </button>
                </DialogTrigger>

                <DialogContent className="rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-lg font-semibold text-gray-800">
                            Confirmar Asistencia
                        </DialogTitle>
                        <DialogDescription className="text-center text-sm text-gray-500">
                            Ayúdanos confirmando tu presencia
                        </DialogDescription>
                    </DialogHeader>
                    {loading ?
                        <div className="w-full flex justify-center items-center">
                            <Loader2 className="mr-2 h-10 w-10 animate-spin text-[#8c6d57]"/>
                        </div> :
                        <div className="w-full flex flex-col gap-4">
                            <div className="flex items-center px-2 gap-2">
                                <Input type="tel" placeholder={"Ingresa tu numero de teléfono"} value={identifier}
                                       onChange={(e) => setIdentifier(e.target.value)}
                                       className="font-serif"
                                />
                                <Button
                                    className="bg-[#937552]"
                                    onClick={handleSearch}
                                    disabled={identifier === ""}
                                >
                                    <Search/>
                                </Button>
                            </div>
                            <div>
                                {
                                    confirAttendance &&
                                    <div className="flex flex-col gap-2">
                                        <div>
                                            <h3>Tu Reserva: </h3>
                                            <div>
                                                <Table  className="text-lg">
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead className="font-bold">Nombre</TableHead>
                                                            <TableHead className="font-bold">Estado de la reserva</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        <TableRow>
                                                            <TableCell>{confirAttendance.guest.fullName}</TableCell>
                                                            <TableCell>{InvitationType[confirAttendance.guest.status as keyof typeof InvitationType]}</TableCell>
                                                            <TableCell>
                                                                <ReservationMenu
                                                                    guest={confirAttendance.guest}
                                                                    handleChangeStatus={handleStatusChange}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                        <Separator />
                                        <div>
                                            <Table  className="text-lg">
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead className="font-bold">Acompañante(s)</TableHead>
                                                        <TableHead className="font-bold">Estado de la reserva</TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {
                                                        confirAttendance.companions.map((guest) => (
                                                            <TableRow key={guest.id}>
                                                                <TableCell>{guest.fullName}</TableCell>
                                                                <TableCell>
                                                                    {InvitationType[guest.status as keyof typeof InvitationType]}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <ReservationMenu
                                                                        guest={guest}
                                                                        handleChangeStatus={handleStatusChange}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))
                                                    }
                                                </TableBody>
                                            </Table>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </DialogContent>
            </Dialog>
        </div>
    );
}
type ReservationMenuProps = {
    guest: GuestResponse
    handleChangeStatus: (guestId: string, status: InvitationStatus) => void
}

const ReservationMenu =({guest,handleChangeStatus}: ReservationMenuProps) =>{
    return(
        <DropdownMenu>
            <DropdownMenuTrigger asChild >
                <Button className="bg-transparent hover:bg-gray-200">
                    <EllipsisVertical
                        className="text-black"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                { guest.status !== InvitationStatus.CONFIRMED &&
                    <DropdownMenuItem onClick={() => handleChangeStatus(guest.id, InvitationStatus.CONFIRMED)}>
                        <CalendarCheck/>Confirmar
                    </DropdownMenuItem>
                }
                {
                    guest.status !== InvitationStatus.REJECTED &&
                    <DropdownMenuItem onClick={() => handleChangeStatus(guest.id, InvitationStatus.REJECTED)}>
                        <Ban/> Rechazar
                    </DropdownMenuItem>
                }
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
