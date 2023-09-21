import React from "react";
import Accordion from "../reuseable/Accordion";

const FaqSection = () => {
  return (
    <div className="  mb-[50px] pt-[95px]">
      <div className="max-w-[768px] w-full px-5 md:px-0  mx-auto  ">
        <h1 className="text-[#0B0B0B] text-center   capitalize font-black text-lg md:text-4xl  ">
          Frequently Asked Questions
        </h1>
        <p className="text-[#999999] text-center capitalize mt-[20px] text-sm md:text-[23px] font-medium ">
          {" "}
          Frequently asked questions about MyBalance{" "}
        </p>
        <div className="divide-y divide-[#999999] mt-[64px] ">
          <Accordion
            content="My Balance is a digital escrow platform that gives payment security and assurance to parties involved in a transaction by giving them the power to control the transaction process in a transparent manner."
            title="What is MyBalance?"
          />
          <Accordion
            content="When two parties are transacting, a reliable third partyserves as a middle man to hold funds until both parties are satisfied with the transaction terms before money is released to the seller."
            title="How does escrow work?"
          />
          <Accordion
            content="A buyer who wants to purchase a product from a vendor and a vendor who wants to sell products to buyers via a shareable payment link."
            title="Who can use MyBalance?"
          />
          <Accordion
            content="It is possible for dispute to arise during transaction which is why when creating an escrow, users are asked to select dispute resolution options ( Users resolution or My Balance resolution). While a transaction is in dispute, the funds stay in My Balance until a resolution is reached."
            title="How are transaction disputes resolved?"
          />{" "}
          <Accordion
            content="After a buyer is satisfied with the product delivered, they go on to unlock the funds which the seller is notified of. The seller is then required to input a unique code before being able to withdraw the funds."
            title="When are funds released?"
          />
          <Accordion
            content="When creating a transaction, there is an option to select who pays for the charges. Either the buyer or seller may be selected, based on the agreement reached by both parties."
            title="Who pays for the transaction charges?"
          />
          <Accordion
            content="It is possible for disputes to arise during a transaction which is why when creating an escrow, users are asked to select dispute resolution options ( Users resolution or My Balance resolution). While a transaction is in dispute, the funds stay in My Balance until a resolution is reached."
            title="How are transaction disputes resolved?"
          />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
