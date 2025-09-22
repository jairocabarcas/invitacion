'use client'
import { useState } from "react";

export default function RSVPForm() {
    const [name, setName] = useState("");
    const [guests, setGuests] = useState(1);
    const [confirmed, setConfirmed] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setConfirmed(true);
    };

    return (
        <div className="mt-10 px-2">
            <h3 className="text-center text-lg font-semibold text-gray-800 mb-4">
                Confirmar Asistencia
            </h3>
            {!confirmed ? (
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-50 p-4 rounded-lg shadow-md space-y-4 max-w-md mx-auto"
                >
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
                <p className="text-center text-green-600 font-medium">
                    ¡Gracias {name}! Tu asistencia ha sido confirmada 🎉
                </p>
            )}
        </div>
    );
}
