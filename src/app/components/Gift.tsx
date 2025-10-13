import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Gift, Info} from "lucide-react";
import {Separator} from "@/components/ui/separator";
import Image from "next/image";

export default function GiftModal(){
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
                    <Gift className="h-4"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div className="flex justify-center items-center gap-1 w-full">
                            <Gift className="h-4 md:h-auto"/>
                            regalos
                        </div>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                    <Separator/>
                    <div className="flex flex-col gap-3 w-full">
                        <p>
                            Queremos que sepan que su presencia es el regalo más grande y valioso que podemos
                            recibir en este día tan especial. ¡Para nosotros eso es lo más importante!
                        </p>
                        <p>
                            Si, a pesar de eso, desean tener un detalle adicional con nosotros para ayudarnos
                            a construir nuestros sueños, lo pueden hacer de dos maneras:
                        </p>
                        <ol className="list-outside list-decimal pl-4">
                            <li>
                                <p><strong>Escaneando el código QR</strong> que encontrarán adjunto (es super fácil).</p>
                                <div className="flex flex-col items-center">
                                    <Image src={"/imagenes/qr.png"} alt={"QR"} width={200} height={200}/>
                                    <p className="font-sans">llave: @cabarcas761</p>
                                </div>
                            </li>
                            <li>
                                Si les queda mejor, <strong>¡pregúntenle a Melissa &#128514;!</strong>
                            </li>
                        </ol>
                        <p>
                            <strong>¡Gracias por ser parte de nuestra historia!</strong> Los esperamos con los brazos abiertos.
                        </p>
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}