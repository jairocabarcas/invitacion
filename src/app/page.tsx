import Image from "next/image";
import HeaderLogo from "@/app/components/headerLogo";
import InvitationText from "@/app/components/invitationText";
import DateInfo from "@/app/components/dateInfo";
import Location from "@/app/components/locationInfo";
import ButtonLocation from "@/app/components/ButtonLocation";
import RSVPForm from "@/app/components/RSVPForm";

export default function Home() {
  return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center px-4 py-10">
        <div className="max-w-lg w-full bg-white border border-gray-200 shadow-md rounded-2xl p-6 md:p-10">
          <HeaderLogo />
          <InvitationText />
          <DateInfo />
          <Location />
          <ButtonLocation />
          <RSVPForm />
        </div>
      </div>
  )
}
