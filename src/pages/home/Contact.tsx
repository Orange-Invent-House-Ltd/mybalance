import React from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { publicApi } from "../../api/axios";
import { GenericResponse } from "../../api/types";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/reuseable/Button";
import useStore from "../../store";
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import HeroSection from "../../components/reuseable/HeroSection";
import ContactSection from "../../components/home/ContactSection";
import TextField from "../../components/reuseable/TextField";
import MultilineTextField from "../../components/reuseable/MultilineTextField";
import contactImg from "../../assets/images/contact_img.png";

const Contact = () => {
  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm();
  // <LoginInput>({
  //   resolver: zodResolver(loginSchema),
  // });

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const { handleSubmit } = methods;

  return (
    <div>
      <Header />
      <div className="mt-[80px]">
        <HeroSection
          menu="Contact Us"
          text="Our headquarters is located in Lagos, Nigeria. Feel free to reach out using the information below."
        />
        <div className="pt-20 px-[5%] mb-6">
          <div className="text-center">
            <span className="text-primary-normal">Contact us</span>
            <h3 className="h3">Get in touch</h3>
            <p className="text-[#6D6D6D] text-[23px]">
              Our friendly team is always here to chat.
            </p>
          </div>
          <ContactSection />
          <div className="md:flex gap-12">
            <div>
              <h3 className="h3 text-center md:text-left">
                Do You Have a Message For Us?
              </h3>
              <p className="text-[#6D6D6D] mb-8 text-center md:text-left">
                Use the contact form to send us your complaint. We will respond
                as soon as we get your message.
              </p>
              <FormProvider {...methods}>
                <form>
                  <div className="md:flex gap-6">
                    <TextField
                      variant="medium"
                      label="Full name"
                      name="name"
                      placeholder="enter your full name"
                    />
                    <TextField
                      variant="medium"
                      label="Email"
                      name="email"
                      placeholder="enter a valid email address"
                    />
                  </div>
                  <div className="md:flex gap-6">
                    <TextField
                      variant="medium"
                      label="Phone (optional)"
                      name="phone"
                      placeholder="enter your phone number"
                    />
                    <TextField
                      variant="medium"
                      label="Subject"
                      name="subject"
                      placeholder="enter your subject"
                    />
                  </div>
                  <MultilineTextField
                    name="message"
                    label="Message"
                    placeholder="enter your message here"
                  />
                  <div className="w-[244px] mt-4 mx-auto md:mx-0">
                    <Button fullWidth>Send message</Button>
                  </div>
                </form>
              </FormProvider>
            </div>
            <div className="w-full hidden md:block">
              <img src={contactImg} alt="contact" />
            </div>
          </div>
        </div>
      </div>
      {/* mobile image */}
      <div className="md:hidden mx-auto mb-16">
        <img src={contactImg} alt="contact" />
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.3744900119063!2d3.3493049147711105!3d6.600295995226864!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9230898ac149%3A0xfa8100fcafbe31d5!2s27%20Ladipo%20Kuku%20St%2C%20Allen%20101233%2C%20Lagos!5e0!3m2!1sen!2sng!4v1684333637516!5m2!1sen!2sng"
          width="100%"
          height="450"
          style={{ border: 0 }}
          loading="lazy"
        ></iframe>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
