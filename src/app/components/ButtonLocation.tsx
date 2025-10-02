import {MapPin} from "lucide-react";

export default function ButtonLocation() {
    return (
        <div className="flex justify-center mt-6 gap-2">
            <a
                href="https://maps.app.goo.gl/f8ygfCFJ16tyC3Ku6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 justify-center md:space-x-2 bg-[#937552] text-white md:px-5 md:py-2 px-2 py-1 rounded-full shadow hover:bg-[#9c8566] transition text-sm md:text-base"
            >
                <MapPin className="h-3 w-4 md:h-auto"/>
                <span>Ceremonia</span>
            </a>
            {/*<MapPin className=" md:h-auto text-[#937552]"/>*/}
            <a
                href="https://maps.app.goo.gl/CpNNfJp1A5asJit87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 justify-center md:space-x-2 bg-[#937552] text-white md:px-5 md:py-2 px-2 py-1 rounded-full shadow hover:bg-[#9c8566] transition text-sm md:text-base"
            >
                <MapPin className="h-3 w-4 md:h-auto"/>
                <span>Recepción</span>
            </a>
        </div>
    );
}
