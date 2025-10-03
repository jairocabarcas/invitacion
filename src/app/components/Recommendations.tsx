import DressCode from "@/app/components/DressCode";
import Information from "@/app/components/Information";
import GiftModal from "@/app/components/Gift";

export default function Recommendations() {
    return (
        <div className="flex justify-center mt-4 gap-2">
            <DressCode/>
            <Information/>
            <GiftModal/>
        </div>
    );
}