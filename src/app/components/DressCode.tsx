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
                    <div>
                        Aqui toda la infomacion
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}