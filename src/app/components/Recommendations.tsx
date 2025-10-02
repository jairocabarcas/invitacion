import {Gift, Icon, Info} from "lucide-react";
import { dress } from '@lucide/lab';

export default function Recommendations() {
    return (
        <div className="flex justify-center mt-4 gap-2">
            <button
                className="flex items-center gap-1
                justify-center border-2 border-[#937552]
                text-[#937552]  px-2 py-1
                rounded-full shadow hover:bg-[#937552] hover:text-white
                transition font-bold text-sm md:text-base"
            >
                {/*<MapPin className="h-3 w-4 md:h-auto"/>*/}
                <Icon className="h-4" iconNode={dress}/>
                <span>Dress code</span>
            </button>

            <button
                className="flex items-center gap-1
                justify-center border-2 border-[#937552]
                text-[#937552]  px-2 py-1
                rounded-full shadow hover:bg-[#937552] hover:text-white
                transition font-bold text-sm md:text-base"
            >
                {/*<MapPin className="h-3 w-4 md:h-auto"/>*/}
                <Info className="h-4"/>
                <span>Tips</span>
            </button>
            <button
                className="flex items-center gap-1
                justify-center border-2 border-[#937552]
                text-[#937552]  px-2 py-1
                rounded-full shadow hover:bg-[#937552] hover:text-white
                transition font-bold text-base md:text-base"
            >
                {/*<MapPin className="h-3 w-4 md:h-auto"/>*/}
                <Gift className="h-4"/>
            </button>
        </div>
    );
}