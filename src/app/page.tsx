import HeaderLogo from "@/app/components/headerLogo";
import InvitationText from "@/app/components/invitationText";
import DateInfo from "@/app/components/dateInfo";
import Location from "@/app/components/locationInfo";
import ButtonLocation from "@/app/components/ButtonLocation";
import RSVPForm from "@/app/components/RSVPForm";
import Recommendations from "@/app/components/Recommendations";

export default function Home() {
  return (
      <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center md:px-4 md:py-10 p-2">
        <div className="max-w-xl w-full bg-fondo bg-repeat bg-cover shadow-2xl p-3 md:p-10">
          <div className="w-full border-5 border-[#E0D5C3] px-3 py-5 md:p-5">
              <HeaderLogo />
              <InvitationText />
              <DateInfo />
              <Location />
              <ButtonLocation />
              <RSVPForm />
              <Recommendations/>
          </div>
        </div>
      </div>
  )
}
