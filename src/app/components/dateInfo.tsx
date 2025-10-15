import {Playfair_Display} from "next/font/google";

const playFairDisplay = Playfair_Display({
    weight: ['400', '400','500', '500', '700', '700'], // 400 = normal, 700 = negrita
    style: ['normal', 'italic', 'normal', 'italic', 'normal', 'italic'], // normal e italic
    subsets: ['latin'],
    display: "swap"
})

export default function DateInfo() {
    return (
        <div className="text-center my-5">
            <div className="flex items-center justify-center w-full gap-5">
                <div className="h-full  flex items-center justify-center pt-4 md:pt-7">
                    <span className="uppercase px-2 border-y-2 border-y-[#545454] font-bold text-[15px] md:text-lg tracking-widest text-[#545454]">
                        Sábado
                    </span>
                </div>
                <div className="h-full flex items-center justify-center">
                    <span className={`${playFairDisplay.className} text-6xl md:text-8xl font-medium  text-[#000] text-center`}>
                      10
                    </span>
                </div>
                <div className="h-full flex items-center justify-center pt-4 md:pt-7">
                    <span className="uppercase px-2 border-y-2 border-y-[#545454] font-bold text-[15px] md:text-lg tracking-widest text-[#545454]">
                      Enero
                    </span>
                </div>
            </div>
            <span className="mt-2 text-[18px] md:text-xl text-[#545454]">Hora: 11:00 am</span>
        </div>
    );
}
