import { Link } from "react-router-dom";
import bell from "../../assets/Icons/notification.svg"
import { Button } from "./Button";

type HeaderProps = {
  Heading: string;
  Text:string;
};
const Header = ({Heading, Text}:HeaderProps) => {
  return (
    <div className="flex flex-col items-center md:flex-row gap-6 justify-between mb-8">
      <div className="flex gap-4">
        <div className="w-[60px] h-[60px] bg-[#FFF2E8] border-2 border-[#FECA9F] text-2xl text-[#9A4D0C] rounded-full  flex items-center justify-center uppercase font-bold">
          TM
        </div>
        <div>
          <h6 className='h6'>{Heading}</h6>
          <p className='max-w-[478px] text-[#303030] font-normal text-sm leading-[18.9px] '>{Text}</p>
        </div>
      </div>
      <img src={bell} alt="notification bell" className="hidden md:flex ml-auto mr-4"/>
      <div className="w-[343px] md:w-[248px]"><Link to="escrow-link">
        <Button fullWidth variant="contained">Create One-time Escrow Link</Button></Link>
      </div>
    </div>
  )
}

export default Header