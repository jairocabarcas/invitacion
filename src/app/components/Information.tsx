import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Dot, Info} from "lucide-react";
import {Separator} from "@/components/ui/separator";

export default function Information(){
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
                    <Info className="h-4"/>
                    <span>Tips</span>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex justify-center items-center gap-1 w-full">
                            <Info className="h-4 md:h-auto"/>
                            Tips y Recomendaciones
                        </div>
                    </DialogTitle>
                    <DialogDescription>
                        Tips y recomendaciones para la Eucaristia y el día del evento
                    </DialogDescription>
                    <Separator/>
                    <div className="flex flex-col">
                        <div>
                            <h3 className="text-xl font-bold">Eucaristia</h3>
                            <p>Gracias a la educacion que se nos ha dado aprendimos la importacia de la Eucaristia y
                                por eso queremos vivirlo de la manera más solemne.
                                Por eso queremos que tengas las siguientes indicaciones durante la celebración.</p>
                            <ul className="px-2 flex flex-col items-start">
                                <li className="flex items-center gap-1"><Dot />Primeras bancas son para padres y padrinos</li>
                                <li className="flex items-center gap-1"><Dot />Familia de la novia a la izquierda y del novio a la derecha </li>
                                <li className="flex items-center gap-1"><Dot />Familia de la novia a la izquierda y del novio a la derecha </li>
                                <li className="flex gap-1"><Dot />Pueden fotografiar y grabar, pero no se muevan de sus asientos</li>
                            </ul>
                        </div>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}