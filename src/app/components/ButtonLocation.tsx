import {MapPin} from "lucide-react";

export default function ButtonLocation() {
    return (
        <div className="flex justify-center mt-6 gap-2">
            <a
                href="https://maps.app.goo.gl/f8ygfCFJ16tyC3Ku6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center
                gap-1 justify-center md:space-x-2
                bg-[#000] text-white
                md:px-4 md:py-2 px-2 py-1 rounded-full shadow hover:bg-[#000]/2
                hover:text-[#000]
                transition text-sm md:text-base
                w-[130px]
                "
            >
                <MapPin className="h-3 w-4 md:h-auto"/>
                <span>Ceremonia</span>
            </a>
            {/*<MapPin className=" md:h-auto text-[#937552]"/>*/}
            <a
                href="https://maps.app.goo.gl/CpNNfJp1A5asJit87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 justify-center md:space-x-2
                bg-[#000] text-white md:px-4 md:py-2 px-2 py-1
                hover:text-[#000]
                rounded-full shadow hover:bg-[#000]/2 transition text-sm md:text-base
                w-[130px]
                "
            >
                <MapPin className="h-3 w-4 md:h-auto"/>
                <span>Recepción</span>
            </a>
        </div>
    );
}
