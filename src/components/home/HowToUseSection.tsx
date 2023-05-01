import man from "../../assets/images/man holding phone.png";
import woman from "../../assets/images/woman holding phone.png";
import rectangle2 from "../../assets/images/Rectangle2.png";
import rectangle3 from "../../assets/images/Rectangle3.png";
import line from "../../assets/Icons/line.svg";

const HowToUseSection = () => {
  return (
    <div className="px-[7%] py-[50px] mt-[100px] bg-[#EDEDED]">
      <h3 className="h6 sm:font-black sm:text-[36px] sm:mb-6 text-center">
        <span className="relative">
          How To Use
          <img src={line} alt="" className="absolute w-full -bottom-3 left-0" />
        </span>{" "}
        MyBalance
      </h3>
      <div className=" md:flex justify-between lg:justify-around mt-[100px] lg:w-[900px] lg:mx-auto">
        <div className="relative mt-[30px] md:mt-[120px] lg:mt-[30px]">
          <img
            className=" w-[276px] left-8 bottom-[30px] sm:w-[400px] md:w-[300px] absolute md:left-14 md:bottom-[100px] lg:left-18 lg:bottom-[120px]"
            src={man}
            alt="a man with mobile phone"
          />
          <img
            className="w-[276px] sm:w-[400px] md:w-[300px]"
            src={rectangle2}
            alt="rectangle backgroup shap"
          />
        </div>
        <div>
          <h5 className="text-center md:text-left mobileh5 lg:mt-[-30px] sm:font-bold sm:text-[29px] sm:leading-[39px] sm:mb-[30px]">
            As a Buyer
          </h5>
          <ol className="mx-auto md:mx-0">
            {data.map(({ list }, key) => {
              return (
                <li
                  className="mx-auto md:mx-0 mb-[30px] font-regular sm:font-medium text-base text-[#121212] leading-[21.6px] list-decimal w-[211px] sm:w-[400px] md:w-[211px]"
                  key={key}
                >
                  {list}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="md:flex flex-row-reverse justify-around mt-[100px] lg:w-[900px] lg:mx-auto">
        <div className="relative mt-[30px] md:mt-[120px] lg:mt-[30px]">
          <img
            className="w-[276px] left-8 bottom-[30px] sm:w-[400px] md:w-[300px] absolute md:left-14 md:bottom-[100px] lg:left-18 lg:bottom-[120px]"
            src={woman}
            alt="A lady with tablet pohone"
          />
          <img
            className="w-[276px] sm:w-[400px] md:w-[300px]"
            src={rectangle3}
            alt="rectangle backgroup shap"
          />
        </div>
        <div>
          <h5 className="text-center md:text-left mobileh5 lg:mt-[-30px] sm:font-bold sm:text-[29px] sm:leading-[39px] sm:mb-[30px]">
            As a Seller
          </h5>
          <ol>
            {secondData.map(({ list }, key) => {
              return (
                <li
                  className="mx-auto md:mx-0 mb-[30px] font-regular sm:font-medium text-base text-[#121212] leading-[21.6px] list-decimal w-[211px] sm:w-[400px] md:w-[211px]"
                  key={key}
                >
                  {list}
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};
const data = [
  {
    list: "Create an account in seconds",
  },
  {
    list: "Deposit money into your wallet",
  },
  {
    list: "Input the account details of the seller",
  },
  {
    list: "Add a description and lock the specified amount",
  },
  {
    list: "Unlock money after product has been delivered",
  },
];

const secondData = [
  {
    list: "Create an account in seconds",
  },
  {
    list: "Complete your KYC (Know Your Customer)",
  },
  {
    list: "Generate a unique link and send to prospective buyers",
  },
  {
    list: "Deliver products and get notified",
  },
  {
    list: "Withdraw your money after it has been unlocked",
  },
];

export default HowToUseSection;
