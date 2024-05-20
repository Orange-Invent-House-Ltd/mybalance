import React from "react";
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import HeroSection from "../../components/reuseable/HeroSection";
import tcImg from "../../assets/images/t&C.png";

const TermsAndCondition = () => {
  return (
    <div>
      <Header />
      <div className="mt-[80px] mb-40">
        <HeroSection
          menu="Terms & Conditions"
          text="It is important You read and understand these General MyBalance Terms and Conditions (“Terms”)."
        />
        <div className="px-[5%] md:flex items-center gap-x-10 mt-[100px] mb-10">
          <img src={tcImg} alt="terms and conditions" />
          <div className="w-[342px] md:w-[474px] mx-auto">
            <h3 className="h3700 mt-6 md:mt-0">Terms & Conditions</h3>
            <p className="leading-loose">
              These Terms and Conditions are effective as of May 31, 2023
              (“Effective Date”) for all Escrow Transactions agreed to and
              entered by both Seller and Buyer, organizations and vendors on or
              after the Effective Date. For Escrow Transactions entered prior to
              the Effective Date and still open, the Terms in existence at the
              time the Escrow Transaction was entered remain in effect. The
              Terms are current as of the Effective Date, and subject to change.
              In the event of a change, we will upload a new version to the
              Site. You should check the mybalanceapp.com website for the latest
              version of this document before entering a new Escrow Transaction.
            </p>
          </div>
        </div>
        <div className="px-[5%]">
          <p>
            These Terms apply to the Seller, Buyer, and Broker (each a ”Party”
            or “Underlying Party,” and collectively ”Parties” or “Underlying
            Parties”) involved in any Escrow Transaction in connection with the
            Escrow Services. References to ”You” and ”Your” in the terms apply
            to you or the organization you represent in connection with an
            Underlying Transaction (as defined below) as the Seller, the Buyer,
            and/or the Broker as the context requires. In addition to these
            Terms, You are also subject to certain other terms, conditions, and
            agreements (collectively, the “Escrow.com Terms of Service”),
            including:
          </p>
          <ul>
            <li className="font-medium list-disc ml-4">
              Escrow.com Site Terms of Use
            </li>
            <li className="font-medium list-disc ml-4">Privacy Policy</li>
          </ul>
          <p className="mt-6 mb-4">
            The Underlying Parties engage mybalanceapp.com to act as escrow
            agent pursuant to these Terms and further agree to the entirety of
            the mybalanceapp.com Terms of Service.
          </p>
          <ol>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">
                Agreement to conduct escrow transaction by electronic means:
              </span>{" "}
              By registering for and participating in the services (as defined
              below), the underlying parties agree with mybalanceapp.com to
              conduct the escrow transaction (as defined below) by electronic
              means.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">
                Definitions and Interpretation:
              </span>{" "}
              Any capitalized term not otherwise defined elsewhere in the
              mybalanceapp.com Terms of Service shall have the definition and
              interpretation set forth below:
              <ul>
                <li className="list-disc ml-4">
                  “Account“ means an mybalanceapp.com account of a Buyer,
                  Seller, or Broker to which payments will be credited and from
                  which payments will be debited
                </li>
                <li className="list-disc ml-4">
                  “Affiliate“ means an entity that is, directly or indirectly,
                  through one or more intermediaries, controlling, controlled
                  by, or under common control with mybalanceapp.com
                </li>
                <li className="list-disc ml-4">
                  “Applicable Law“ refers to all laws, regulations, payment
                  network rules, and automated clearinghouse rules applicable to
                  the services provided under the mybalanceapp.com Terms of
                  Service, as well as all orders, judgments, or written
                  directives of any court or governmental entity with authority
                  over the Parties, services, or transactions subject to the
                  mybalanceapp.com Terms of Service
                </li>
                <li className="list-disc ml-4">
                  “Arbitration Commencement Period“ means the fourteen (14)
                  calendar day period commencing at the conclusion of the
                  Negotiation Period
                </li>
                <li className="list-disc ml-4">
                  “Broker“ means a person or entity offering to broker personal
                  property or services for sale through the site
                </li>
                <li className="list-disc ml-4">
                  “Business Day“ means Monday through Friday between the hours
                  of 8:00 a.m. and 5:00 p.m., other than legal holidays in
                  Nigeria, observed by mybalanceapp.com
                </li>
                <li className="list-disc ml-4">
                  “Buyer“ means a person or entity desiring to purchase personal
                  property or purchase other services from a Seller by use of
                  the site
                </li>
                <li className="list-disc ml-4">
                  “Buyer Inspection Period“ means the Inspection Period
                  applicable to Buyer as specified herein
                </li>
                <li className="list-disc ml-4">
                  “Close of Escrow“ means consummation of the Escrow Transaction
                </li>
                <li className="list-disc ml-4">
                  “Dispute Date“ means the date of: (A) Seller’s rejection or
                  return of the Merchandise as indicated on the Site; (B)
                  Mybalanceapp.com’s rejection of the Merchandise on behalf of
                  Seller if Seller is unable to access the Site; or (C) the
                  notification by a Party to another Party of any dispute,
                  claim, disagreement, or breach related to these Terms or an
                  mybalnceapp.com Transaction
                </li>
                <li className="list-disc ml-4">
                  “Escrow Fees“ means the fees due to mybalanceapp.com for the
                  Services
                </li>
                <li className="list-disc ml-4">
                  “Escrowed Funds“ means funds held in escrow with
                  mybalanceapp.com
                </li>
                <li className="list-disc ml-4">
                  “Escrow Instructions“ means the entire set of instructions,
                  terms, conditions, and details governing an Escrow
                  Transaction, comprised of: (i) the General Escrow
                  Instructions, applicable to all Escrow Transactions; (ii) the
                  Transaction Escrow Instructions, agreed to by the Underlying
                  Parties when arranging an Underlying Transaction; and (iii)
                  any Supplemental Escrow Instructions subsequently agreed to by
                  the Parties
                </li>
                <li className="list-disc ml-4">
                  “Escrowed Property“ means Escrowed Funds or other items held
                  in escrow by mybalanceapp.com
                </li>
                <li className="list-disc ml-4">
                  “Escrow Services“ means the transaction management and escrow
                  services provided by mybalanceapp.com including the holding of
                  Escrowed Funds or Escrowed Property
                </li>
                <li className="list-disc ml-4">
                  “Escrow Transaction“ means the portion of a transaction
                  involving Escrow Services provided by mybalanceapp.com which
                  may include the holding and release of Escrowed Funds or
                  Escrowed Property in accordance with the Escrow Instructions
                  and these Terms
                </li>
                <li className="list-disc ml-4">
                  “General Escrow Instructions“ means the instructions and terms
                  published on the Site applicable to all Escrow Transactions
                </li>
                <li className="list-disc ml-4">
                  “Inspection Period“ means the period by which Buyer or Seller
                  must inspect the subject property, as applicable
                </li>
                <li className="list-disc ml-4">
                  “Merchandise“ means any item of tangible (capable of being
                  physically touched or precisely identified) goods or property
                  transacted on mybalanceapp.com. This term also includes
                  certain intangible goods or property such as domain names,
                  IPV4 addresses, pre-written computer software, source codes,
                  intellectual property, and any other property as approved by
                  mybalanceapp.com in its sole discretion
                </li>
                <li className="list-disc ml-4">
                  “Milestone Transaction“ means the transactions relating to
                  services provided by a Seller
                </li>
                <li className="list-disc ml-4">
                  “Negotiation Period“ means fourteen (14) calendar days
                  beginning with the Dispute Date
                </li>
                <li className="list-disc ml-4">
                  “Parties“ means mybalanceapp.com and the Underlying Parties
                </li>
                <li className="list-disc ml-4">
                  “Personal Property“ means any movable thing or intangible item
                  of value that is capable of being owned by a natural
                  individual or a legal entity and not recognized as real
                  property
                </li>
                <li className="list-disc ml-4">
                  “Prohibited Transaction“ means any transaction or attempted
                  transaction described in Section 5 of these Terms below
                </li>
                <li className="list-disc ml-4">
                  “Seller“ means a person or entity offering property or
                  services for sale as permitted under the mybalanceapp.com
                  Terms of Service and desiring to use the Site to close the
                  sale
                </li>
                <li className="list-disc ml-4">
                  “Seller Inspection Period“ means the Inspection Period
                  applicable to Seller as specified herein
                </li>
                <li className="list-disc ml-4">
                  “Seller Services“ means those services offered for sale by a
                  Seller including physical labor or activity, artistic labor or
                  activity, consultation or advice services, a system for
                  providing services such as transportation, communications,
                  utilities and doing work and providing something of value
                  other than a physical tangible product
                </li>
                <li className="list-disc ml-4">
                  “Site“ means mybalanceapp.com website at mybalanceapp.com
                </li>
                <li className="list-disc ml-4">
                  “Supplemental Escrow Instructions“ or “Supplemental Escrow
                  Terms” means any instruction, condition, or term agreed to by
                  the Underlying Parties after Buyer and Seller (and Broker when
                  applicable) all complete the initial Transaction Escrow
                  Instructions to govern an Underlying Transaction. This term
                  includes new supplemental instructions or conditions,
                  modifications or amendments to the initial Transaction Escrow
                  Instructions, and changes to the Transaction Detail Screens.
                  Supplemental Escrow Instructions or Terms must be agreed to in
                  writing and signed by all parties (Buyer, Seller,
                  mybalanaceapp.com and Broker when applicable)
                </li>
                <li className="list-disc ml-4">
                  “Transaction Detail Screens“ means the screens on the Site
                  containing the details of the Underlying Transaction provided
                  by the Underlying Parties
                </li>
                <li className="list-disc ml-4">
                  “Transaction Escrow Instructions“ means the terms, conditions,
                  and other provisions relating to a specific Underlying
                  Transaction or Escrow Transaction, as agreed to by the
                  Underlying Parties on the Transaction Detail Screens
                </li>
                <li className="list-disc ml-4">
                  “Underlying Parties“ means Buyer, Seller and Broker (if
                  applicable)
                </li>
                <li className="list-disc ml-4">
                  “Underlying Transaction“ means the underlying transaction
                  between or among Buyer, Seller and Broker (if applicable) for
                  the sale of Merchandise or Seller Services, for which the
                  Underlying Parties engage mybalnceapp.com for the provision of
                  Escrow Services
                </li>
                <li className="list-disc ml-4">
                  “User“ means one of the Underlying Parties using the Site in
                  connection with an actual or proposed Underlying Transaction
                </li>
              </ul>
              <p className="font-bold mt-10">
                The following rules of interpretation apply:
              </p>
              <ul>
                <li className="list-disc ml-4">
                  References to “discretion” mean mybalanceapp.com sole and
                  absolute discretion
                </li>
                <li className="list-disc ml-4">
                  References to “consent” mean a Party’s prior written consent,
                  which in the case of mybalanceapp.com may be given or withheld
                  in its discretion
                </li>
                <li className="list-disc ml-4">
                  References to “including” mean “including but not limited to”
                </li>
                <li className="list-disc ml-4">
                  References to the singular include the plural and vice versa
                  as the context may require
                </li>
                <li className="list-disc ml-4">
                  References to the time of day means West African Time
                </li>
                <li className="list-disc ml-4">
                  References to Buyer and Seller include the Broker if a Broker
                  is expressly authorized by a Seller or Buyer to act on behalf
                  of and bind the applicable Buyer or Sellerbggb
                </li>
                <li className="list-disc ml-4">
                  References to currency is to Nigerian naira or U.S. dollars or
                  any other currency expressly accepted by all relevant Parties
                  from time to time
                </li>
                <li className="list-disc ml-4">
                  References to “days” means Business Day unless otherwise
                  indicated
                </li>
                <li className="list-disc ml-4">
                  Reference to “good faith” means honesty in fact in the conduct
                  concerned, measured subjectively
                </li>
                <li className="list-disc ml-4">
                  All communications relating to an Underlying Transaction or
                  Escrow Transaction shall be in English
                </li>
              </ul>
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">
                Description of Escrow Service:
              </span>{" "}
              The Escrow Services are Internet-based transaction management
              services performed by mybalanceapp.com as escrow agent on behalf
              of a Buyer and Seller in connection with a transaction for the
              sale of property or services. Escrow Services are intended to
              facilitate the completion of the Underlying Transaction in
              accordance with the mybalanceapp.com Terms of Service. Although
              one or more of the Underlying Parties and the Escrowed Property or
              Merchandise may be a citizen of and/or physically located in a
              location, venue or jurisdiction other than Nigeria, the Underlying
              Parties all represent and agree that the Escrow Transaction and
              Escrow Services are being coordinated and taking place in Nigeria.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Limits of Escrow services:</span>{" "}
              The Escrow Services are only available for lawful Merchandise,
              Seller Services, and Underlying Transactions. Mybalanceapp.com in
              its sole discretion, may decline or prohibit an Underlying
              Transaction. Additionally, limitations on the Escrow Services may
              apply and can be found on the Site or elsewhere in the
              mybalanceapp.com Terms of Service. Only registered Users may use
              the Escrow Services. To register, You must supply all information
              required on the Site. Applicable Laws may further limit the Escrow
              Services.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Prohibited Transactions:</span>{" "}
              Users shall not use or attempt to use the Site or the Escrow
              Services in connection with any Underlying Transaction that:
              <ul>
                <li className="list-disc ml-4">
                  Is illegal or involves any illegal items, or is for any
                  illegal purpose
                </li>
                <li className="list-disc ml-4">
                  Involves any obscene material
                </li>
                <li className="list-disc ml-4">
                  Involves any munitions or firearms
                </li>
                <li className="list-disc ml-4">
                  Involves pirated software, DVD or videos or item(s) otherwise
                  infringing copyrighted works
                </li>
                <li className="list-disc ml-4">
                  Involves illegal drugs, controlled substances, alcohol or
                  tobacco products
                </li>
                <li className="list-disc ml-4">
                  Is primarily for the purpose of exchanging currencies,
                  including digital currencies
                </li>
                <li className="list-disc ml-4">
                  Involves the sale or transfer of liquor licenses, fund or
                  joint control escrows, the refinancing of either reservation
                  deposits of any kind, or promissory notes, mortgages or deeds
                  of trust
                </li>
                <li className="list-disc ml-4">
                  Involves transactions directly or indirectly involving persons
                  (individuals or entities) with whom Nigeria or other persons
                  are prohibited from engaging pursuant to sanctions and export
                  controls administered by the Ministry of finance, Trade and
                  investment and Labour
                </li>
                <li className="list-disc ml-4">
                  Involves transactions directly or indirectly involving persons
                  (individuals or entities) with whom Nigeria or other persons
                  are prohibited from engaging pursuant to Applicable Laws.
                </li>
                <li className="list-disc ml-4">
                  In addition, Mybalanceapp.com in its sole discretion, may
                  refuse to complete any Underlying Transaction that
                  Mybalancapp.com has reason to believe may be unauthorized or
                  made by someone other than You, or may violate any Applicable
                  Law or the Mybalanceapp.com Terms of Service Each User agrees
                  to indemnify and hold harmless Mybalanceapp.com and its
                  employees, officers, directors and agents for losses,
                  including attorney fees and costs, resulting from any use or
                  attempted use of the Escrow Services in violation of the
                  Mybalanceapp.com Terms of Service, including but not limited
                  to any use or attempted use of the Escrow Services for a
                  Prohibited Transaction.
                </li>
              </ul>
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Rejection of Payment:</span> Since
              the use of a bank account, credit card or debit card account, or
              the making of an electronic funds transfer may be limited by Your
              agreement with Your financial institution and/or by applicable
              law, mybalanceapp.com is not liable to any User if
              mybalanceapp.com does not complete an Escrow Transaction or any
              act relating thereto, as a result of any such limit, or if a
              financial institution fails to honour any credit or debit to or
              from an Account. Mybalanceapp.com may post operating rules or
              terms and conditions related to payment on the Site and change
              such rules from time to time.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">General Conditions of Use:</span> If
              You arrive at the Site through entities linked and/or integrated
              with mybalanceapp.com or otherwise by or through a third party
              (e.g., an auction, exchange, or Internet-based intermediary that
              hosts electronic marketplaces and mediates transactions among
              businesses), then You authorize such third party to transfer
              relevant data to mybalanceapp.com to facilitate the Escrow
              Transaction. You represent and warrant that all information You
              provide to mybalanceapp.com or to such third party will be true,
              accurate and complete. You further understand and agree that You
              are obligated to provide timely updates to mybalanceapp.com if
              there are any material changes to such information prior to the
              completion of an Escrow Transaction. The party entering into these
              Terms on behalf of any User represents and warrants that he/she is
              authorized to do so and to bind the User and is a natural person
              of at least eighteen (18) years of age and, if the User is
              represented to be a business entity, trust or other legal entity
              or organization, the User represents and warrants that such User
              is legally existing and in good standing, and is recognized as
              such by the governing authority at the address registered by the
              User on our Site. To initiate and commence an Escrow Transaction
              or use the Escrow Services, a User must register for an Account on
              our Site. You must complete the Escrow Services application form
              and submit it by following the instructions on the Site. You can
              find out more information about Escrow Services by visiting the
              Site. Upon completion and receipt of the service application and
              related forms, including the acceptance of the mybalanceapp.com
              Terms of Service, we will accept or reject Your application at our
              discretion.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Obligations of Sellers:</span> On
              the Transaction Detail Screens, each Seller to an Underlying
              Transaction must designate an Account to which payment for the
              Transaction will be made. Each Seller authorizes mybalanceapp.com
              and its authorized representatives and service providers to
              initiate credit entries to such Seller's Account for payment of
              the purchase price, or applicable balance due, and to debit
              Seller's Account to discharge Seller's obligations. Each Seller in
              an Underlying Transaction shall deliver the items set forth in
              Transaction Detail Screens directly to the Buyer (or Buyers), at
              the address specified by such Buyer as shown on the Site and set
              forth in the Transaction Escrow Instructions and Supplemental
              Escrow Instructions. Seller shall use a delivery service that
              provides a confirmation of delivery and Seller shall provide
              mybalanceapp.com with a tracking or reference number for the
              shipment of the goods. Seller gives mybalanceapp.com permission to
              act as its agent in communicating with the shipping company
              regarding the notice of the delivery of the goods. Seller must
              provide or cause notice to be sent to mybalanceapp.com when Seller
              ships the Merchandise. In the event mybalanceapp.com does not
              receive notice of shipment from Seller within ten (10) calendar
              days after Seller is required to ship the Merchandise, Seller
              authorizes mybalanceapp.com to return the Escrowed Funds
              (excluding Escrow fees) to Buyer. In the event of a return of the
              Merchandise by Buyer, Seller shall notify mybalanceapp.com of the
              receipt of the returned items. Upon mybalanceapp.com’s receipt of
              the notice of returned Merchandise from Seller, the Seller's five
              (5) day inspection period shall commence. In the event Seller
              accepts the returned Merchandise within the inspection period or
              fails to act within the inspection period, mybalanceapp.com shall
              remit the Escrowed Funds (excluding Escrow fees) to Buyer. If
              Seller notifies mybalanceapp.com of its non-acceptance of any
              returned Merchandise within the Seller's inspection period, then
              mybalanceapp.com will retain the Escrow Funds pending resolution
              of the dispute or take other action as authorized or as required
              by Applicable Law. Notwithstanding anything to the contrary above,
              if all Underlying Parties to an Underlying Transaction agree on
              the Transaction Detail Screens that there is no shipping required,
              then no party hereto will have any obligation under these Terms
              with respect to shipping.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Obligations of Buyers:</span> On the
              Transaction Detail Screens, Buyer must designate a payment
              mechanism and an Account from which the purchase price and related
              fees (unless such fees are to be paid by Seller) will be obtained
              for the deposit into escrow. Depending on the amount of the
              Underlying Transaction and the currency selected for the
              Underlying Transaction, Buyer may remit the necessary funds via
              various methods, which may include credit card, charge card, debit
              card or purchasing card, check (cheque), cashier's check, money
              order, bank deposit, or wire transfer. In the case of wire
              transfers, Buyer will initiate the wire to an account designated
              by mybalanceapp.com on or before the date set forth in the
              Transaction Detail Screens. Regardless of the payment method,
              Buyer authorizes mybalanceapp.com and its authorized
              representatives and service providers to initiate credit or debit
              transactions, as applicable, to obtain the purchase price and fees
              due for an Underlying Transaction and to initiate any debit or
              credit entries or reversals, as the case may be, as may be
              necessary to correct any error in a payment or transfer and to
              discharge Buyer's obligations under the mybalanceapp.com Terms of
              Service. mybalanceapp.com will deposit funds received from Buyer
              into an escrow trust account maintained by mybalanceapp.com (the
              "Escrow Account"). Unless otherwise requested as specified in the
              following sentence, escrowed deposits do not earn interest for
              Buyer or Seller. If You anticipate an extended closing of the
              Underlying Transaction, then You may request and approve an
              instruction to have mybalanceapp.com place Buyer's funds into an
              interest-bearing account for the benefit of Buyer or Seller. If
              interest is to accrue to the benefit of the Seller, then both
              Buyer and Seller must request and approve the establishment of the
              interest-bearing account. If this request is made, then
              mybalanceapp.com will charge the account of the party to whom the
              interest accrues an additional nonrefundable service charge, which
              must be paid in advance. Buyer shall notify mybalanceapp.com of
              the receipt or non-receipt of the items on the date the
              merchandise is received, or the Buyer Inspection Period is
              started. Buyer shall notify mybalanceapp.com of the Buyer's
              acceptance or rejection of the items before the Buyer's Inspection
              Period expires. Upon receipt of notice from Buyer that the items
              have been received and accepted, mybalanceapp.com shall transfer
              the payment amount (less any amount payable to mybalanceapp.com
              for Escrow fees) to Seller's Account. Transfer to a Seller
              generally will be initiated within the next business day from the
              day on which notice of acceptance of the Merchandise or Seller
              Services is received from the Buyer. If Buyer has not notified
              mybalanceapp.com of the non-receipt or rejection of the items
              during the Buyer's Inspection Period, then Buyer authorizes
              mybalanceapp.com to remit the Escrowed Funds (excluding Escrow
              fees) to the Seller. Buyer shall follow the procedures set forth
              on the Site in the event the items are rejected.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Obligations of Brokers:</span> Each
              Broker must register on the Site. On the Transaction Detail
              Screens, each Broker to a Transaction must designate a payment
              mechanism and an Account to which the Broker Fee payment will be
              made. Each Broker authorizes mybalanceapp.com and its authorized
              representatives and service providers to initiate credit entries
              to such Broker's Account for payment of the Broker's commission,
              and to debit Broker's payment mechanism or account to discharge
              Broker's obligations. Each Broker in a Transaction shall provide
              Buyer email, Seller email, and Underlying Transaction details
              including purchase price, Merchandise or Seller Services
              description, inspection period and which party is responsible for
              the Broker and Escrow fees. If You are a Broker, You represent and
              warrant that you are properly authorized by all Underlying Parties
              to act as a Broker with respect to each Underlying Transaction.
              Escrow.com has the right, at its discretion, to verify that each
              Broker is properly authorized by the Underlying Parties, but is
              under no obligation to do so and You hereby agree that you may not
              rely on mybalanceapp.com to verify that a Broker is fully
              authorized.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Our Responsibilities:</span>{" "}
              mybalanceapp.com is obligated to perform only those duties
              expressly described in the mybalanceapp.com Terms of Service.
              mybalanceapp.com shall not be liable for any error in judgment,
              for any act taken or not taken, or for any mistake of fact or law,
              except for gross negligence or willful misconduct (subject to the
              limitations below). mybalanceapp.com may rely upon any notice,
              demand, request, letter, certificate, agreement, or any other
              document which purports to have been transmitted or signed by or
              on behalf of a User indicated as the sender or signatory thereof
              and shall have no duty to make any inquiry or investigation.
              mybalanceapp.com is not expected to verify or guarantee
              representations by Buyer, Seller, Broker or their respective
              affiliates or representatives and will not and does not verify
              authenticity, ownership, right of possession, title or other legal
              right to Escrowed Property or Merchandise. In the event that
              mybalanceapp.com is uncertain as to mybalanceapp.com duties or
              rights under the mybalanceapp.com Terms of Service, receives any
              instruction, demand or notice from any User or financial
              institution which, in mybalanceapp.com's opinion, is in conflict
              with any of the provisions of the mybalanceapp.com Terms of
              Service, or any dispute arises with respect to the
              mybalanceapp.com Terms of Service or the Escrowed Funds,
              mybalanceapp.com may (i) consult with counsel of our choice
              (including, but not limited to our own attorneys) and any actions
              taken or not taken based upon advice of counsel shall be deemed
              consented to by You, or (ii) refrain from taking any action other
              than to retain the funds in escrow for delivery in accordance with
              the written agreement of the Users, the final decision or award of
              an arbitrator pursuant to an arbitration commenced and conducted
              in accordance with these Terms or a final, non-appealable judgment
              of a court of competent jurisdiction, (iii) discharge our duties
              under these Terms by depositing all funds by interpleader action
              with a court of competent jurisdiction in accordance with the
              procedures outlined elsewhere in the mybalanceapp.com Terms of
              Service, or (iv) escheat the funds in accordance with Applicable
              Law or take other actions in accordance with Applicable Law.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Resignation:</span> mybalanceapp.com
              may, at any time, give notice of mybalanceapp.com's intent to
              resign as Escrow agent. If, within ten (10) days of such notice,
              mybalanceapp.com has not received notice from all Parties in an
              Underlying Transaction that they have designated a substitute
              escrow agent (which notice shall identify the substitute escrow
              agent), mybalanceapp.com may discharge mybalanceapp.com duties
              under these Terms by depositing all escrowed funds with a court of
              competent jurisdiction. If an alternate Escrow agent is so
              designated, mybalanceapp.com shall be discharged from
              mybalanceapp.com duties under the mybalanceapp.com Terms of
              Service by delivering all Escrowed Funds to such person or entity.
              Upon payment of the Escrowed Funds pursuant to these Terms,
              mybalanceapp.com shall be fully released from all liability and
              obligations with respect to the Escrow Funds and the Escrow
              Transaction.
            </li>

            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Canceling a Transaction:</span> If
              an Underlying Transaction cannot be completed for any reason,
              including cancellation by mybalanceapp.com for any reason,
              mybalanceapp.com will notify each Party in such Underlying
              Transaction by e-mail, to the e-mail address each has provided to
              mybalanceapp.com. In mybalanceapp.com's sole discretion,
              mybalanceapp.com may cancel any Underlying Transaction if each
              Party to an Underlying Transaction fails to agree on the terms as
              required in the Transaction Details Screens by clicking the
              "Agree" button as requested on the Site. You may cancel an
              Underlying Transaction as provided in the Escrow.com Terms of
              Service.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Statements, Verification:</span> You
              agree that all disclosures and communications regarding these
              Terms and the Escrow Service shall be made by e-mail or on the
              Site, unless the Parties make other arrangements as set forth
              elsewhere in the mybalanceapp.com Terms of Service. You understand
              and agree that mybalanceapp.com may request additional information
              from you at any time, for verification, authentication, or other
              business purpose.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Digital Identification:</span> You
              understand and agree that mybalanceapp.com will create, issue, and
              verify a digital identification (a "Digital ID") for each User.
              This Digital ID is attached to each accepted electronic document
              and notification e-mails. You agree that Your Digital ID is a
              valid "Electronic Signature." Please review the General Escrow
              Instructions for more information about mybalanceapp.com's use of
              the Digital ID.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Fees:</span> Unless otherwise agreed
              upon by each User in the Transaction, Buyer agrees to pay the fees
              for the Services that are disclosed on the Site at the time the
              completed Transaction Escrow Instructions are agreed to by all
              such Users, as well as any other fees, including, without
              limitation, third party service fees (e.g., shipping, appraisal,
              inspection, etc.). Once paid, mybalanceapp.com fees are
              nonrefundable. mybalanceapp.com fees may change from time to time
              in mybalanceapp.com's absolute and sole discretion.
              mybalanceapp.com is not responsible for payment of any sales, use,
              personal property or other governmental tax or levy imposed on any
              items purchased or sold through the Services or otherwise arising
              from the Transaction.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Taxes:</span> Some of our fees may
              be subject to applicable taxes, levies, duties or similar
              governmental assessments of any nature, including, for example,
              value-added, sales, use or withholding taxes, assessable by any
              jurisdiction (collectively, “taxes”) and, unless expressly noted,
              our fees are exclusive of applicable taxes. You acknowledge that
              we may make certain reports to tax authorities regarding
              transactions that we process.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Invoices:</span> mybalanceapp.com
              may issue invoices to the relevant party for its fees, however
              mybalanceapp.com has no responsibility nor is it able to provide
              any invoice for underlying personal property or Services
              transactions. Invoices for underlying transactions are to be
              obtained from the Seller.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Security:</span> mybalanceapp.com
              uses secure sockets layer ("SSL"), a security protocol that
              provides data encryption, server authentication, and message
              integrity for connections to the Internet designed to protect the
              data You provide mybalanceapp.com. mybalanceapp.com has also
              implemented a security system requiring a user ID and a password
              to access Your transactions on the Site. You agree not to give
              Your password to any other person or entity and to protect it from
              being used or discovered by anyone else.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Acknowledgement of Risk:</span> You
              expressly agree that Your use of the Services is at Your sole
              risk. The Escrow Services are provided on a strictly "as is" and
              "as available" basis.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">
                Product Quality and Inspection:
              </span>{" "}
              While we strive to provide high-quality service at
              www.mybalanceapp.com, we cannot guarantee the specific quality of
              each individual item. Therefore, we strongly advise buyers to
              thoroughly inspect the product upon delivery.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Buyer Responsibility:</span> Buyers
              are responsible for carefully examining the received product to
              ensure it meets their expectations and specifications. Any
              concerns or discrepancies should be promptly reported.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Release of Funds:</span> Buyers are
              encouraged to refrain from releasing funds until they are
              confident in the condition and quality of the received product.
              Once funds are released, it is considered an acknowledgment that
              the buyer is satisfied with the product, and any subsequent issues
              may not be eligible for resolution.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Communication:</span> Effective
              communication is key. If there are any concerns regarding the
              product's quality or condition, buyers should contact the Dispute
              Resolution team immediately for assistance.
            </li>
            <li className="list-decimal ml-4 mb-4">
              <span className="font-medium">Disclaimers:</span>
              <ul>
                <li className="list-disc ml-4">
                  mybalanceapp.com makes no warranty with regard to the
                  underlying transaction, any items obtained by you through the
                  use of the site or the services, that the services will meet
                  your requirements, or that the services or the site will be
                  uninterrupted, timely, or error free.
                </li>
                <li className="list-disc ml-4">
                  mybalanceapp.com makes no warranty that its security cannot be
                  breached.{" "}
                </li>
                <li className="list-disc ml-4">
                  mybalanceapp.com Shall not be liable or responsible for those
                  guarantees, warranties, and representations, if any, offered
                  by any seller of items. No advice or information, whether oral
                  or written, obtained by you from mybalanceapp.com or through
                  the services shall create any warranty not expressly made
                  herein.
                </li>
              </ul>

              <li className="list-decimal ml-4 mb-4 mt-5">
                <span className="font-medium"></span> If a Seller delivers an
                item to a Buyer and the Buyer fails to unlock the funds within
                48 hours, the Seller can raise a dispute. MyBalance team will
                then attempt to reach the Buyer via email, SMS, and phone calls
                to understand the reason for the delay. If the Buyer is
                unreachable through these channels within 48 hours, MyBalance
                will proceed to unlock the funds for the Seller, regardless of
                fault.
              </li>

              <li className="list-decimal ml-4 mb-4">
                <span className="font-medium"></span> If a Seller fails to
                deliver an item within the stipulated deadline and the Buyer
                raises a dispute, the MyBalance team will contact the Seller via
                email, SMS, and phone calls to inquire about the delay. If the
                Seller is unreachable through these channels within 48 hours,
                MyBalance will proceed to unlock the funds back to the Buyer,
                regardless of fault.
              </li>
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndCondition;
