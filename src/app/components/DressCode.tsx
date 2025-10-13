'use client'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Icon} from "lucide-react";
import {dress} from "@lucide/lab";
import {Separator} from "@/components/ui/separator";
import {Button} from "@/components/ui/button";
import Image from "next/image";
import { Dancing_Script } from 'next/font/google';

const dancingScript = Dancing_Script({
    // La fuente soporta pesos desde 400 hasta 700.
    // Al usar el rango completo, solo necesitas definir los extremos:
    weight: ['400', '700'],

    // Dancing Script solo tiene un estilo, que es cursivo por naturaleza.
    // Usamos 'normal' para indicar que cargamos la variante base de la fuente.
    style: ['normal'],

    subsets: ['latin'],
    display: 'swap',

    // Opcional: Recomendado para usar la fuente en componentes específicos
    // a través de CSS.
    variable: '--font-dancing-script',
});

export default function DressCode() {

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-1
                justify-center border-2 border-[#000]
                text-[#000]  px-2 py-1
                bg-transparent
                rounded-full shadow hover:bg-[#000] hover:text-white
                transition font-bold text-sm md:text-base"
                >
                    {/*<MapPin className="h-3 w-4 md:h-auto"/>*/}
                    <Icon className="h-3" iconNode={dress}/>
                    <span>Dress code</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex justify-center items-center gap-1 w-full">
                            <Icon className="h-4 md:h-auto" iconNode={dress}/>
                            Dress Code
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Código de vestimenta para el matrimonio
                    </DialogDescription>
                    <Separator/>
                    <h1 className={`text-center text-3xl font-bold ${dancingScript.className}`}>Elegante</h1>
                    <div className="p-4 flex md:hidden justify-center items-center">
                        <Image src="/imagenes/dresscode.png" alt="dress code" width={200} height={200}/>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-0">
                        <div className={`p-4 text-3xl flex flex-col gap-2`}>
                            <h3 className={`text-center ${dancingScript.className} font-bold text-[#545454]`}>Hombres</h3>
                            <ul className="list-disc pl-4 list-outside text-sm text-left">
                                <li>Guayabera manga larga Blanca</li>
                                <li>Pantalon beige</li>
                                <li>Zapatos formales (no tenis)</li>
                            </ul>
                        </div>
                        <div className="hidden p-4 md:flex justify-center items-center">
                            <Image src="/imagenes/dresscode.png" alt="dress code" width={200} height={200}/>
                        </div>
                        <div className={`p-4 text-3xl flex flex-col gap-2`}>
                            <h3 className={`text-center ${dancingScript.className} font-bold text-[#545454]`}>Mujeres</h3>
                            <ul className="list-disc pl-4 list-outside text-sm text-left">
                                <li>Vestido largo</li>
                                <li>No blanco, beige o gris</li>
                                <li>Accesorios y zapatos a su gusto</li>
                            </ul>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}