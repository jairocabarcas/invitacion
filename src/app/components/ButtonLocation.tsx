import {MapPin} from "lucide-react";

export default function ButtonLocation() {
    return (
        <div className="flex justify-center mt-6 gap-4">
            <a
                href="https://maps.app.goo.gl/f8ygfCFJ16tyC3Ku6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#937552] text-white px-5 py-2 rounded-full shadow hover:bg-[#9c8566] transition text-sm md:text-base"
            >
                <MapPin />
                <span>Iglesia</span>
            </a>

            <a
                href="https://maps.app.goo.gl/CpNNfJp1A5asJit87"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#937552] text-white px-5 py-2 rounded-full shadow hover:bg-[#9c8566] transition text-sm md:text-base"
            >
                <MapPin />
                <span>Recepcion</span>
            </a>
        </div>
    );
}
