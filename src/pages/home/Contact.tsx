import React from 'react'
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { authApi } from "../../api/authApi";
import { GenericResponse } from "../../api/types";
import { Link, useNavigate  } from "react-router-dom";
import useStore from "../../store";
import Footer from "../../components/home/Footer";
import Header from "../../components/home/Header";
import HeroSection from '../../components/reuseable/HeroSection';
import ContactSection from '../../components/home/ContactSection';
import TextField from '../../components/reuseable/TextField';

const Contact = () => {
  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm()
  // <LoginInput>({
  //   resolver: zodResolver(loginSchema),
  // });

  //useForm() destructuring or methods destructuring . Here methods = useForm()
  const {
    handleSubmit,
  } = methods;

  return (
    <div>
      <Header />
      <div className='mt-[80px]'>
        <HeroSection 
          menu='Contact Us' 
          text='Our headquarters is located in Lagos, Nigeria. Feel free to reach out using the information below.'
        />
        <div className='py-20 px-[7%] mb-16'>
          <div className='text-center'>
            <span className='text-primary-normal'>Contact us</span>
            <h3 className='h3'>Get in touch</h3>
            <p className='text-[#6D6D6D] text-[23px]'>Our friendly team is always here to chat.</p>
          </div>
          <ContactSection/>
          <div className='flex'>
            <div>
              <h3 className='h3'>Do You Have a Message For Us?</h3>
              <p className='text-[#6D6D6D] mb-8'>Use the contact form to send us your complaint. We will respond as soon as we get your message.</p>
              <FormProvider {...methods}>
                <form>

                  <TextField variant='medium' label='Full name' name='name' placeholder='enter your full name'/>
                  <TextField variant='medium'  label='Email' name='email' placeholder='enter your full email'/>
                </form>
              </FormProvider>
            </div>
            <div>

            </div>
          </div>

        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Contact 