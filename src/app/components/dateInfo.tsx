import {Playfair_Display} from "next/font/google";

const playFairDisplay = Playfair_Display({
    weight: ['400', '400', '700', '700'], // 400 = normal, 700 = negrita
    style: ['normal', 'italic', 'normal', 'italic'], // normal e italic
    subsets: ['latin'],

})

export default function DateInfo() {
    return (
        <div className="text-center my-5">
            <div className="flex items-center justify-center w-full gap-5 h-fit">
                <div className="h-full border-y-2 border-y-[#937552] flex items-end justify-center">
                    <span className="uppercase text-xs md:text-sm tracking-widest text-[#937552]">
                        Sábado
                    </span>
                </div>
                <div className="h-full flex items-center justify-center">
                    <span className={`${playFairDisplay.className} text-4xl md:text-7xl font-bold text-[#937552]`}>
                      10
                    </span>
                </div>
                <div className="h-full border-y-2 border-y-[#937552]">
                    <span className="uppercase text-xs md:text-sm tracking-widest text-[#937552]">
                      Enero
                    </span>
                </div>
            </div>
            <p className="mt-2 text-xs md:text-sm text-gray-600">Hora: 10:30 am</p>
        </div>
    );
}
