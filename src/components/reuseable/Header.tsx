import bell from "../../assets/Icons/notification.svg"

type HeaderProps = {
  Heading: string;
  Text:string;
};
const Header = ({Heading, Text}:HeaderProps) => {
  return (
    <div className="md:flex justify-between mb-8">
      <div>
        <h6 className='h6'>{Heading}</h6>
        <p className='text-[#303030] font-normal text-[14px] leading-[18.9px] '>{Text}</p>
      </div>

      <img src={bell} alt="notification bell" className="hidden md:flex"/>
    </div>
  )
}

export default Header