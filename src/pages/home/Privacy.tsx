import React from 'react'
import Header from '../../components/home/Header'
import HeroSection from '../../components/reuseable/HeroSection';
import Footer from '../../components/home/Footer'
import privacyImg from '../../assets/images/privacy.png'

const Privacy = () => {
  return (
    <div>
      <Header/>
      <div className='mt-[80px] mb-40'>
        <HeroSection 
          menu='Privacy Policy' 
          text='MyBalance takes privacy seriously and cares about personal information.'
        />
        <div className='px-[5%] md:flex items-center gap-x-10 mt-[100px] mb-10'>
          <img src={privacyImg} alt="terms and conditions" />
          <div className='w-[342px] md:w-[474px] mx-auto'>
            <h3 className='privacyHeading mt-6 md:mt-0'>Privacy Policy</h3>
            <p className='leading-loose'>MyBalance takes privacy seriously and cares about personal information. 'Personal information' means information or an opinion about an identified individual, or an individual who is reasonably identifiable. mybalanceapp.com’s Privacy Policy applies to personal information collected and/or held by mybalanceapp.com. This Privacy Policy also explains how we process 'personal data' about people in Nigeria as required under the law. This policy is bound to be reviewed regularly, and we may update it from time to time.</p>
          </div>
        </div>
        <div className='px-[5%]'>
          <div className='mb-8'>
            <h3 className='privacyHeading'>The Types of Personal Information We Collect and Hold</h3>
            <p className='mb-4'>We collect personal information about our users in order to provide our products, services, and customer support. Our products, services, and customer support are provided through many platforms including but not limited to: websites, phone apps, email, and telephone. The specific platform and product, service, or support you interact with may affect the personal data we collect.</p>
            <p className='mb-4'>Not all information requested, collected, and processed by us is “Personal Information” as it does not identify you as a specific natural person. This will include the majority of “User Generated Content” that you provide us with the intention of sharing with other users inside a transaction. Such “Non-Personal Information” is not covered by this privacy policy. However, as non-personal information may be used in aggregate or be linked with existing personal information; when in this form it will be treated as personal information. As such, this privacy policy will list both types of information for the sake of transparency.</p>
            <p className='mb-4'>In some situations users may provide us with personal information without us asking for it, or through means not intended for the collection of particular types of information. Whilst we may take reasonable steps to protect this data, the user will have bypassed our systems, processes, and control and thus the information provided will not be governed by this privacy policy.</p>
            <p>In some situations users may provide us personal information over platforms that are outside our control; for example through social media or forums. Whilst any information collected by us is governed by this Privacy Policy, the platform by which it was communicated will be governed by its own Privacy Policy.</p>
          </div> 
          <div className='mb-8'>
            <h3 className='privacyHeading'>How We Collect Personal Information That You Specifically Give Us</h3>
            <p className='mb-4'>While you use our products and services you may be asked to provide certain types of personal information. This might happen through our website, applications, online chat systems, telephone, paper forms, or in-person meetings. We will give you a Collection Notice at the time, to explain how we will use the personal information we are asking for. The notice may be written or verbal.</p>
            <p>We may request, collect, or process the following information:</p>
            <ul>
              <li className='list-disc ml-4 font-medium'>Account Details - password</li>
              <li className='list-disc ml-4 font-medium'>Contact Details - email address, phone number</li>
              <li className='list-disc ml-4 font-medium'>Location Details - physical address, billing address, timezone</li>
              <li className='list-disc ml-4 font-medium'>Identity Details - full name, proof of identity (e.g. drivers license, passport), proof of address (e.g. utility bill)</li>
              <li className='list-disc ml-4 font-medium'>Financial Information - credit card details, bank details, wire transfer details, payment processor details (e.g. skrill, paypal), tax numbers</li>
              <li className='list-disc ml-4 font-medium'>User Generated Content - transaction descriptions, transaction attachments</li>
            </ul>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>Information That We Collect From Others</h3>
            <p className='mb-4'>Users have the ability to start a transaction with non-users by providing contact details such as email address, physical address, and phone number. In these situations, the information will be collected and stored by us to contact the non-user and to prevent abuse of our systems. Your payment provider may transmit information about the payment that we may collect or process.</p>
            <p>In some situations, personal information of users may be collected from public sources. We may collect or process the following information:</p>
            <ul className='mb-4'>
              <li className='list-disc ml-4 font-medium'>Contact Details - email address, phone number</li>
              <li className='list-disc ml-4 font-medium'>Location Details - Physical Address, billing address, timezone</li>
              <li className='list-disc ml-4 font-medium'>Financial Information - transaction details, payment account details (e.g. paypal email address and physical address), wire transfer details</li>
              <li className='list-disc ml-4 font-medium'>User Generated Content - transaction description</li>
            </ul>
            <p>Our partners may create transactions on your behalf, in these situations the information that can be provided is the same as the information we may request, collect and process from individual users. Whilst our partners' platforms will be governed by their own privacy policy, any personal information that is transferred to our platform will be treated and protected as though it was submitted by a user.</p>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>Information We Collect as You Use Our Service</h3>
            <p className='mb-4'>We maintain records of the interactions we have with our users, including the products, services and customer support we have provided. This includes the interactions our users have with our platform such as when a user has viewed a page or clicked a button. When we are contacted we may collect personal information that is intrinsic to the communication.</p>
            <p>For example, if we are contacted via email, we will collect the email address used. We may collect or process the following (mostly non PII) information:</p>
            <ul>
              <li className='list-disc ml-4 font-medium'>Metadata - IP address, computer and connection information, referring web page, standard web log information, language settings, timezone, etc.</li>
              <li className='list-disc ml-4 font-medium'>Device Information - device identifier, device type, device plugins, hardware capabilities, etc</li>
              <li className='list-disc ml-4 font-medium'>Actions - pages viewed, buttons clicked, time spent viewing, search keywords, etc</li>
            </ul>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>Links to Other Sites</h3>
            <p>On our website, you will encounter links to third party websites. These links may be from us, or they may appear as content generated by other users. These linked sites are not under our control and thus we are not responsible for their actions. Before providing your personal information via any other website, we advise you to examine the terms and conditions of using that website and its privacy policy.</p>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>How We Use Personal Information</h3>
            <p>The information we request, collect, and process is primarily used to provide users with the product or service they have requested. More specifically, we may use your personal information for the following purposes:</p>
            <ul className='mb-4'>
              <li className='list-disc ml-4 font-medium'>To provide the service or product you have requested</li>
              <li className='list-disc ml-4 font-medium'>To facilitate the creation of mybalanceapp.com Agreements</li>
              <li className='list-disc ml-4 font-medium'>To provide technical or other support to you</li>
              <li className='list-disc ml-4 font-medium'>To answer enquiries about our services, or to respond to a complaint</li>
              <li className='list-disc ml-4 font-medium'>To promote our other programs, products or services which may be of interest to you (unless you have opted out from such communications)</li>
              <li className='list-disc ml-4 font-medium'>To allow for debugging, testing and otherwise operate our platforms</li>
              <li className='list-disc ml-4 font-medium'>To conduct data analysis, research and otherwise build and improve our platforms</li>
              <li className='list-disc ml-4 font-medium'>To comply with legal and regulatory obligations</li>
              <li className='list-disc ml-4 font-medium'>If otherwise permitted or required by law; or for other purposes with your consent, unless you withdraw your consent for these purposes.</li>
            </ul>
            <p>The 'lawful processing' grounds on which we will use personal information about our users are (but are not limited to):</p>
            <ul>
              <li className='list-disc ml-4 font-medium'>When a user has given consent</li>
              <li className='list-disc ml-4 font-medium'>When necessary for the performance of a contract to which the user is party</li>
              <li className='list-disc ml-4 font-medium'>Processing is necessary for compliance with our legal obligations</li>
              <li className='list-disc ml-4 font-medium'>Processing is necessary in order to protect the vital interests of our users or of another natural person</li>
              <li className='list-disc ml-4 font-medium'>Processing is done in pursuing our legitimate interests, where these interests do not infringe on the rights of our users</li>
            </ul>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>When We Disclose Personal Information To Other Parties In Your Transactions</h3>
            <p>We may disclose your personal information to third parties that participate in a transaction with you, including but not limited to:</p> 
            <ul>
              <li className='list-disc ml-4 font-medium'>Counterparties</li>
              <li className='list-disc ml-4 font-medium'>Brokers, and</li>
              <li className='list-disc ml-4 font-medium'>Affiliates involved in origination of the transaction</li>
            </ul> 
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>Our Third Party Service Providers</h3>
            <p className='mb-4'>The personal information of users may be held or processed on our behalf outside Nigeria, including 'in the cloud', by our third party service providers. Our third party service providers are bound by contract to only use your personal information on our behalf, under our instructions.</p> 
            <p>Our third party service providers include:</p>
            <ul>
              <li className='list-disc ml-4 font-medium'>Cloud hosting, storage, networking and related providers</li>
              <li className='list-disc ml-4 font-medium'>SMS providers</li>
              <li className='list-disc ml-4 font-medium'>Payment and Banking providers</li>
              <li className='list-disc ml-4 font-medium'>Marketing and analytics providers</li>
              <li className='list-disc ml-4 font-medium'>Security providers</li>
              <li className='list-disc ml-4 font-medium'>Chat providers</li>
              <li className='list-disc ml-4 font-medium'>Email providers</li>
            </ul> 
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>Other Disclosures and Transfers</h3>
            <p>We may also disclose your personal information to third parties for the following purposes:</p>
            <ul className='mb-4'>
              <li className='list-disc ml-4 font-medium'>If necessary to provide the service or product you have requested</li>
              <li className='list-disc ml-4 font-medium'>We receive court orders, subpoenas or other requests for information by law enforcement</li>
              <li className='list-disc ml-4 font-medium'>If otherwise permitted or required by law; or</li>
              <li className='list-disc ml-4 font-medium'>For other purposes with your consent</li>
            </ul>
            <p>As we are a global company, with offices around the world, your personal information may be processed by staff in any of our offices. Escrow currently has offices in The United States of America, Australia, The Philippines, Canada, and Argentina.</p>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>Accessing or Correcting Your Personal Information</h3>
            <p>You have the right to request access to the personal information MyBalance holds about you. Unless an exception applies, we must allow you to see the personal information we hold about you, within a reasonable time period, and without unreasonable expense for no charge. Most personal information can be accessed by logging into your account. If you wish to access information that is not accessible through the platform, or wish to download all personal information we hold on you in a portable data format, please contact our Privacy Officer. You also have the right to request the correction of the personal information we hold about you. All your personal information can be updated through the user settings pages. If you require assistance please contact our customer support.</p>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>Exercising Your Other Rights</h3>
            <p className='mb-4'> You have a number of other rights in relation to the personal data MyBalance holds about you, however, there may be restrictions on how you may exercise the rights. This is largely due to the nature of the products and services we provide. Much of the data we collect is in order to facilitate contracts between users, facilitate payments, provide protection for the legitimate users, and meet our legal obligations - these data uses are protected against the below rights.</p>
            <p>You have rights to:</p>
            <ul className='mb-4'>
              <li className='list-disc ml-4 font-medium'>Opt-out of direct marketing, and profiling for marketing</li>
              <li className='list-disc ml-4 font-medium'>Erasure</li>
              <li className='list-disc ml-4 font-medium'>Temporary restriction of processing</li>
            </ul>
            <p className='mb-4'>Direct marketing and profiling - users can unsubscribe by following the link included at the bottom of each email.</p>
            <p className='mb-4'>Erasure - Most personal information cannot be deleted as they are used to support contracts between users, document financial transactions, and are used in providing protection for users on the platform. In the case of non-personal data that can be linked with personal data, it will either be erased or otherwise anonymised from the personal data.</p>
            <p>Temporary restriction to processing - under certain circumstances you may exercise this right, in particular if you believe that the personal data we have is not accurate, or you believe that we do not have legitimate grounds for processing your information. In either case you may exercise this right by contacting our privacy officer. Unless stated above, users may exercise any of the above rights by contacting our Privacy Officer.</p>
          </div>
          <div className='mb-8'>
            <h3 className='privacyHeading'>To Contact our Privacy Officer</h3>
            <p className='mb-4'>If you have an enquiry or a complaint about the way we handle your personal information, or to seek to exercise your privacy rights in relation to the personal information we hold about you, you may contact our Privacy Officer as follows:</p>
            <p className='mb-4'><span className='font-medium'>By Email:</span><a href="mailto:privacy-officer@mybalanceapp.com" className='text-primary-normal'> privacy-officer@mybalanceapp.com</a></p>
            <p className='font-medium'>By Mail:</p> 
            <p>Attn: Privacy Officer</p>
            <p>27, Ladipo Kuku Street</p>
            <p>Off Allen Avenue,</p>
            <p>Ikeja, Lagos State</p>
            <p>Nigeria.</p>
            <p className='mt-6'>For the purposes of the GDPR, our Privacy Officer is also our Data Protection Officer (DPO). While we endeavor to resolve complaints quickly and informally, if you wish to proceed to a formal privacy complaint, we request that you make your complaint in writing to our Privacy Officer, by mail or email as above. We will acknowledge your formal complaint within 14 working days.</p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Privacy