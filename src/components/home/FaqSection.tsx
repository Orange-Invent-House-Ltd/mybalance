import React from "react";
import Accordion from "../reuseable/Accordion";

const FaqSection = () => {
  return (
    <div className="  mb-[50px] pt-[95px]">
      <div className="max-w-[768px] w-full px-5 md:px-0  mx-auto  ">
        <h1 className="text-[#0B0B0B] md:text-center   capitalize font-black text-lg md:text-4xl  ">
          Frequently Asked Questions
        </h1>
        <p className="text-[#999999] md:text-center capitalize md:mt-[20px] text-sm md:text-[23px] font-medium ">
          {" "}
          Frequently asked questions about MyBalance{" "}
        </p>
        <div className="divide-y divide-[#999999] md:mt-[64px] ">
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
            content="Both parties (Buyer and Seller) are charged a certain percentage for an escrow, depending on the amount locked. Buyer is charged by the time they are unlocking funds, seller is charged when funds are released.
            Kindly refer to your dashboard to see a breakdown of our affordable charges."
            title="Who pays for the transaction charges?"
          />
          <Accordion
            content="It is possible for disputes to arise during a transaction which is why when creating an escrow, users are asked to select dispute resolution options ( Users resolution or My Balance resolution). While a transaction is in dispute, the funds stay in My Balance until a resolution is reached."
            title="How are transaction disputes resolved?"
          />
          <Accordion
            content="If a Seller delivers an item to a Buyer and the Buyer fails to unlock the funds within 48 hours, the Seller can raise a dispute. MyBalance team will then attempt to reach the Buyer via email, SMS, and phone calls to understand the reason for the delay. If the Buyer is unreachable through these channels within 48 hours, MyBalance will proceed to unlock the funds for the Seller, regardless of fault."
            title="What happens if a Buyer fails to unlock funds after 48 hours of item delivery?"
          />
          <Accordion
            content="The excess balance will be credited back to your local account. For example, if a buyer is supposed to top up with 500 naira but instead tops up with 1000 naira, the additional 500 naira will be refunded into the Buyer's local account within minutes. If you don't receive the refund after 30 minutes, please contact your bank for assistance."
            title="What happens when a Buyer tops up above the top-up limit?"
          />
          <Accordion
            content="If a Seller fails to deliver an item within the stipulated deadline and the Buyer raises a dispute, the MyBalance team will contact the Seller via email, SMS, and phone calls to inquire about the delay. If the Seller is unreachable through these channels within 48 hours, MyBalance will proceed to unlock the funds back to the Buyer, regardless of fault."
            title="What happens if a Seller fails to deliver an item 48 hours after the stipulated deadline?"
          />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;
