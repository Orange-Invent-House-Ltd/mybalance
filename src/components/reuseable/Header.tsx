import bell from "../../assets/Icons/notification.svg"

type HeaderProps = {
  Heading: any;
  Text:string;
};
const BuyerHeader = ({Heading, Text}:HeaderProps) => {
  return (
    <div className="md:flex justify-between  mb-4 md:mb-8">
      <div>
        <h6 className='h6'>{Heading}</h6>
        <p className='max-w-[478px] w-full text-[#303030] font-normal text-sm leading-[18.9px] '>{Text}</p>
      </div>

      <img src={bell} alt="notification bell" className="hidden "/>
    </div>
  )
}

export default BuyerHeader