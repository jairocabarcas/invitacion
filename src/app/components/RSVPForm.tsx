'use client'
import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function RSVPModal() {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [confirmed, setConfirmed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfirmed(true);
    };

    return (
        <div className="mt-8 text-center">
            {/* Botón que abre el modal */}
            <Dialog>
                <DialogTrigger asChild>
                    <button className="bg-[#b59c78] text-white px-6 py-2 rounded-full shadow hover:bg-[#9c8566] transition text-sm md:text-base">
                        Confirmar asistencia
                    </button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-md rounded-xl">
                    <DialogHeader>
                        <DialogTitle className="text-center text-lg font-semibold text-gray-800">
                            Confirmar Asistencia
                        </DialogTitle>
                        <DialogDescription className="text-center text-sm text-gray-500">
                            Ayúdanos confirmando tu presencia
                        </DialogDescription>
                    </DialogHeader>

                    {!confirmed ? (
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Nombre completo
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-[#b59c78] focus:ring-[#b59c78]"
                                    placeholder="Escribe tu nombre"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">
                                    Número de acompañantes
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    value={guests}
                                    onChange={(e) => setGuests(Number(e.target.value))}
                                    className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-[#b59c78] focus:ring-[#b59c78]"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-[#b59c78] text-white py-2 px-4 rounded-md shadow hover:bg-[#9c8566] transition"
                            >
                                Confirmar
                            </button>
                        </form>
                    ) : (
                        <p className="text-center text-green-600 font-medium mt-6">
                            ¡Gracias {name}! Tu asistencia ha sido confirmada 🎉
                        </p>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
