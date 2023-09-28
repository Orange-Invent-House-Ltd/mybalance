import { useState } from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../../../store";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import TextField from "../../../components/reuseable/TextField";
import logo from "../../../assets/Icons/logo.svg";
import phoneImage from "../../../assets/images/R-phone.png";
import mphone from "../../../assets/images/m-phone.png";
import { Button } from "../../../components/reuseable/Button";
import facebook from "../../../assets/Icons/Facebook.svg";
import twitter from "../../../assets/Icons/Twitter.svg";
import linkedin from "../../../assets/Icons/LinkedIn.svg";
import Instagram from "../../../assets/Icons/Instagram.svg";

//type definition with error messages for the form input
const registerSchema = object({
  businessName: string().min(1, "Business name is required"),
  businessDescription: string().min(1, "Business description is required"),
  phone: string()
    .min(1, "Phone number is required - numbers only")
    .max(11, "Phone number must not be more than 11 digits")
    .regex(/^([0-9]{11})$/, "Phone number must be 11 digits"),
  address: string()
    .min(1, "address is required")
    .min(8, "address must be more than 8 characters")
    .max(50, "address must be less than 50 characters"),
});

//type definition for form
export type SignupInput = TypeOf<typeof registerSchema>;

const Register = () => {
  // tabs
  const [openTab, setOpenTab] = useState(2);

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit } = methods;

  const registerUser = (data: SignupInput) => {
    store.setAuthUser(data);
    //navigate to next page
    navigate("/seller/register/continue");
  };

  return (
    <div className="relative">
      {/* tabs */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex text-sm mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {/* customer tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                className={
                  "text-base lg:text-lg font-medium capitalize py-3 block border-b-[2.5px] leading-normal " +
                  (openTab === 1
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  setOpenTab(1);
                }}
                data-toggle="tab"
                to="/buyer/register"
                role="tablist"
              >
                Create as a customer
              </Link>
            </li>
            {/* seller tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <Link
                to="#"
                className={
                  "text-base lg:text-lg font-medium capitalize py-3 border-b-[2.5px] block leading-normal " +
                  (openTab === 2
                    ? "text-[rgb(154,77,12)]  border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D]  pb-[13px border-[#4f4f4f66]")
                }
                onClick={(e) => {
                  // e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                role="tablist"
              >
                Create as a seller
              </Link>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px- py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* create account as seller */}
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(registerUser)}>
                      <h6 className="mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]">
                        Create your account now
                      </h6>
                      <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
                        Create your account in seconds and enjoy the full
                        features of MyBalance.
                      </p>
                      <div className="grid gap-y-3.5">
                        <TextField
                          name="businessName"
                          label="Business name"
                          placeholder="e.g “Musty Feet”"
                        />
                        <TextField
                          name="businessDescription"
                          label="Describe your service"
                          placeholder="Sales of sneakers, footwear, etc"
                        />
                        <TextField
                          name="address"
                          label="Address"
                          placeholder="Ikeja, Lagos."
                        />
                        <TextField
                          name="phone"
                          label="Phone"
                          type="phone"
                          placeholder="+234 000 0000 000"
                        />
                        <Button fullWidth>Next</Button>
                      </div>
                    </form>
                  </FormProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal mb-7 w-fit mx-auto">
          Existing user?{" "}
          <Link to="/login" className="text-[#121212] font-bold">
            Log in here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
