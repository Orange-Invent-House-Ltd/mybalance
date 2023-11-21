import buyer from "../../assets/images/Buyer.png";
import seller from "../../assets/images/Seller.png";
import line from "../../assets/Icons/line.svg";

const HowToUseSection = () => {
  return (
    <div className="bg-[#EDEDED] md:bg-white mt-10 md:mt-0 px-[7%] py-[50px] md:py-[100px]">
      <h3 className="h6 sm:font-black sm:text-[36px] sm:mb-6 md:text-center">
        <span className="relative">
          How To Use
          <img src={line} alt="" className="absolute w-full -bottom-3 left-0" />
        </span>{" "}
        MyBalance
      </h3>
      <div className="md:flex justify-center items-center gap-20 mt-10 md:mt-[100px] lg:mx-auto">
        <img src={buyer} alt="Buyer - MyBalance" className="w-full max-w-[500px]"/>
        <div className="w-full">
          <h5 className="text-primary-normal font-bold text-lg sm:text-[29px] sm:leading-[39px] mt-4 mb-4 md:mt-0 md:mb-[30px] ">
            As a Buyer
          </h5>
          <ol className="flex flex-col gap-8 max-w-[450px] mx-auto md:mx-0">
            {data.map(({ list }, key) => (
              <li
                className="ml-4 font-regular sm:font-medium text-base text-[#121212] leading-[21.6px] list-decimal"
                key={key}
              >
                {list}
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="md:flex flex-row-reverse justify-center items-center gap-20 mt-[50px] md:mt-[100px] lg:mx-auto">
        <img src={seller} alt="Seller - MyBalance" className="w-full max-w-[500px]"/>
        <div>
          <h5 className="text-primary-normal font-bold text-lg sm:text-[29px] sm:leading-[39px] mt-4 mb-4 md:mt-0 md:mb-[30px]">
            As a Seller
          </h5>
          <ol className="flex flex-col gap-6 max-w-[450px] mx-auto md:mx-0">
            {secondData.map(({ list }, key) => (
              <li
                className="ml-4 font-regular sm:font-medium text-base text-[#121212] leading-[21.6px] list-decimal"
                key={key}
              >
                {list}
              </li>
            ))}
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
    list: "Deposit money into your MyBalance wallet",
  },
  {
    list: "Create a Mybalance escrow link by adding product description, seller account details, email and lock money",
  },
  {
    list: "Share link with seller for approval",
  },
  {
    list: "Unlock money after product is delivered to you",
  },
];

const secondData = [
  {
    list: "Create an account in seconds and complete KYC (know your customer",
  },
  {
    list: "Create a Mybalance escrow link by adding product description, buyer account details and email",
  },
  {
    list: "Generate escrow link and send to prospective buyer",
  },
  {
    list: "Get notified when buyer approves escrow and locks money",
  },
  {
    list: "Deliver product(s)",
  },
  {
    list: "Buyer unlocks money into your MyBalance wallet",
  },
  {
    list: "Withdraw money into your local bank account",
  },
];

export default HowToUseSection;
