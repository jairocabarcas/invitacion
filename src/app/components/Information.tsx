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
    import Image from "next/image";

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
                            Tips y recomendaciones para la Eucaristia
                        </DialogDescription>
                        <Separator/>
                        <div className="flex flex-col">
                            <div>
                                <p>
                                    Gracias a la educación que hemos recibido, comprendemos la importancia de la eucaristía y
                                    deseamos vivirla de la manera más solemne y significativa.
                                    Por ello te pedimos seguir con atención las siguientes indicaciones durante la celebración.
                                </p>
                                <Separator/>
                                <div className="max-h-80 h-2/3 overflow-y-auto text-left">
                                    <ul className="list-disc px-4 list-outside">
                                        <li>Primeras bancas reservadas para padres y padrinos</li>
                                        <li>
                                            La familia del  novio se sienta al lado derecho y la familia de la novia al lado
                                            izquierdo mirando hacia el altar
                                        </li>
                                        <li>
                                            Pueden tomar fotos y grabar pero les pedimos hacerlo desde sus lugares, para conservar
                                            el orden y el respeto propio de la ceremonia.
                                        </li>
                                        <li>
                                            Durante los votos y después de ellos, no acercarse a felicitarnos, habrá un momento
                                            especial para eso al finalizar la ceremonia
                                        </li>
                                        <li>
                                            Durante el saludo de la paz, comparte la paz con las personas que tengas cerca.
                                            Nosotros viviremos ese momento en pareja.
                                        </li>
                                        <li>
                                            Después de la comunión, será un momento de oración personal con Jesús Eucaristía .
                                            Te invitamos a orar por nosotros y permitirnos también ese momento de oración.
                                        </li>
                                        <li>
                                            Después de la bendición final y durante el canto mariano, entregaremos el ramo de la
                                            novia en el sagrario, ofreciendo nuestro matrimonio a Jesús eucaristía.
                                            Les pedimos permanecer de pie en sus lugares.
                                        </li>
                                        <li>Tras finalizar la eucaristía será el momento de las felicitaciones</li>
                                        <li>
                                            A los padres les pedimos por favor mantener a los niños en sus bancas durante toda
                                            la celebración, para mantener el ambiente de respeto y oración
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        )
    }