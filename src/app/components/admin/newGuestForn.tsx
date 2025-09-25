'use client'
import {useEffect, useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {GuestRequest, GuestResponse} from "@/models/guest.model";

export default function AddGuestModal({mainGuestId, save, createdBy, event, isOpen, onChangeModalStatus}: NewGuestFormType) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [confirmed, setConfirmed] = useState(false);

    const isFormValid = firstName.trim() !== "" && phone.trim() !== "";

    useEffect(() => {
        setFirstName("");
        setLastName("");
        setPhone("");
    }, []);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (isFormValid) {
            setConfirmed(true);
            const guestRequest: GuestRequest = {
                createdBy,
                mainGuestId,
                event,
                name: firstName,
                surname: lastName,
                fullName: firstName + ' ' + lastName,
                identifier: phone
            }
            console.log("Datos del invitado:", guestRequest);
            save(guestRequest);
        }
    };

    return (
        <div className="text-center font-sans">
            <Dialog open={isOpen} onOpenChange={onChangeModalStatus}>
                <DialogTrigger asChild>
                    <Button className="bg-[#937552] text-white px-6 py-2 rounded-full hover:bg-[#937552]/50 transition">
                        Añadir Invitado
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-2xl font-bold text-gray-800">
                            Añadir Invitado
                        </DialogTitle>
                        <DialogDescription className="text-center text-lg text-gray-500">
                            Completa los campos para añadir un nuevo invitado.
                        </DialogDescription>
                    </DialogHeader>


                        <form onSubmit={handleSubmit} className="space-y-4 mt-4 font-sans">
                            <div className="space-y-2">
                                <Label htmlFor="firstName" className="text-lg font-medium text-gray-700">
                                    Nombre*
                                </Label>
                                <Input
                                    id="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="Escribe el nombre"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lastName" className="text-lg font-medium text-gray-700">
                                    Apellido
                                </Label>
                                <Input
                                    id="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Escribe el apellido"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="text-lg font-medium text-gray-700">
                                    Teléfono*
                                </Label>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    placeholder="Ej. 1234567890"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-[#937552] text-white hover:bg-[#937552]/50 transition"
                                disabled={!isFormValid}
                            >
                                Guardar
                            </Button>
                        </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}

type NewGuestFormType = {
    save:(guestRequest: GuestRequest) => Promise<void>;
    event: string;
    createdBy: string;
    mainGuestId?: string;
    isOpen: boolean;
    onChangeModalStatus: (status: boolean) => void;
}

