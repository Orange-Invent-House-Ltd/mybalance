import email from "../../assets/icons/email.svg";
import location from "../../assets/icons/location.svg";
import phone from "../../assets/icons/phone.svg";

const ContactSection = () => {
  return (
    <div className="min-h-[365px] flex gap-20 items-center justify-center mb-[50px] flex-wrap ">
      {data.map(({ Icon, contact, heading, subHeading }) => (
        <div className="text-center">
          <img src={Icon} alt="" className="mx-auto mb-[20px] " />
          <p className=" text-[#121212] font-bold text-xl capitalize "> {heading} </p>
          <p className="text-[#999999] mb-[20px]">
            {subHeading}
          </p>
              <p className="text-[#9A4D0C]">{ contact}</p>
        </div>
      ))}
   
    </div>
  );
};
const data = [
  {
    Icon: email,
    heading: "email",
    subHeading: " Our friendly team is here to help.",
    contact: "mybalance@oinvent.com",
  },
  {
    Icon: location,
    heading: "office",
    subHeading: " come say hello at our office.",
    contact: "27, Ladipo Kuku Street, Allen, Ikeja, Lagos.",
  },
  {
    Icon: phone,
    heading: "office",
    subHeading: "Mon-Fri from 8am to 5pm.",
    contact: "(+234) 813 2444 211",
  },
];

export default ContactSection;
