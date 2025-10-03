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

export default function GiftModal(){
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="flex items-center gap-1
                justify-center border-2 border-[#937552]
                text-[#937552]  px-2 py-1
                bg-transparent
                rounded-full shadow hover:bg-[#937552] hover:text-white
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
                    <div>
                        Aqui toda la infomacion
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}