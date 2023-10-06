import { useState, useEffect } from "react";
// Zod - A typescript-first schema validation library.
import { object, string, TypeOf, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { publicApi } from "../../../api/axios";
import { GenericResponse } from "../../../api/types";
import { IUser } from "../../../api/types";
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
const registerSchema = z.object({
  kycType: z.string(),
  name: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(3, "name should be 3 character")
        .max(52, "name must not be more than 52 character"),
    ])
    .optional(),
  number: z.union([z.string().length(0), z.string()]).optional(),
  passportNumber: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(9, "passport number should be 9 alphanumeric character")
        .max(
          9,
          "passport number must not be more than 9 alphanumeric character"
        )
        .regex(
          /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z0-9]{9}$/,
          "passport number must be 9 alphanumeric characters - A01234567"
        ),
    ])
    .optional(),
  lastName: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(3, "Last name should be at least 3 character")
        .max(12, "Last name must not be more than 12 character"),
    ])
    .optional(),
  firstName: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(3, "First name should be at least 3 character")
        .max(12, "First name must not be more than 12 character"),
    ])
    .optional(),
  DOB: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(3, "First name should be at least 3 character")
        .max(12, "First name must not be more than 12 character"),
    ])
    .optional(),
  NIN: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(11, "NIN should be at least 11 digits")
        .max(11, "NIN must not be more than 11 character")
        .regex(/^([0-9]{11})$/, "NIN must be 11 digits only"),
    ])
    .optional(),
  VIN: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(19, "VIN should be at least 19 alphanumeric character")
        .max(19, "VIN must not be more than 19 alphanumeric character")
        .regex(/^([0-9]{19})$/, "VIN must be 19 alphanumeric character"),
    ])
    .optional(),
  cardNumber: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(8, "Driver Card number should be at least 8 digits")
        .max(8, "Driver Card number must not be more than 8 digits")
        .regex(/^([0-9]{8})$/, "Driver Card number must be 8-digit"),
    ])
    .optional(),
  state: z
    .union([
      z.string().length(0),
      z
        .string()
        .min(3, "state should be at least 3 character")
        .max(12, "State must not be more than 12 character"),
    ])
    .optional(),
  lga: z
    .union([
      z.string().length(0),
      z.string().min(3, "LGA should be at least 3 character"),
    ])
    .optional(),
});

//type definition for form
export type SignupInput = TypeOf<typeof registerSchema>;

const RegisterIdentity = () => {
  // tabs
  const [openTab, setOpenTab] = useState(2);
  const [selectedValue, setSelectedValue] = useState("");

  const store = useStore();
  const navigate = useNavigate();
  const methods = useForm<SignupInput>({
    resolver: zodResolver(registerSchema),
  });

  const { handleSubmit, getValues, setValue, watch } = methods;

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value);
    setValue("kycType", event.target.value);
  };

  useEffect(() => {
    selectedValue === "IP" && watch("lastName")
      ? verifyPassport()
      : selectedValue === "NIN" && watch("number")
      ? verifyNIN()
      : selectedValue === "VC" && watch("lga")
      ? verifyVC()
      : selectedValue === "DL" && watch("DOB")
      ? verifyDL()
      : "";
  }, [watch("lastName"), watch("number"), watch("lga"), watch("DOB")]);

  const verifyPassport = async () => {
    try {
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "shared/lookup/passport",
        {
          number: getValues("number"),
          lastName: getValues("lastName"),
        }
      );
      //Form submition success notifications
      const firstName = response.data?.data.firstName;
      const lastName = response.data?.data.lastName;
      const name = firstName + " " + lastName;
      setValue("name", name);
      toast.success(response.data.message as string, {
        toastId: "success1",
        position: "top-right",
      });
      store.setRequestLoading(false);
    } catch (error: any) {
      console.log(error);
      store.setRequestLoading(false);
      const resMessage = error.response.data.errors.email.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        toastId: "error1",
        position: "top-right",
      });
    }
  };

  const verifyNIN = async () => {
    try {
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "shared/lookup/nin",
        {
          number: getValues("number"),
        }
      );
      //Form submition success notifications
      const firstName = response.data.data.meta?.firstName;
      const middleName = response.data.data.meta?.middleName;
      const lastName = response.data.data.meta?.lastName;
      const name = firstName + " " + middleName + " " + lastName;
      console.log(name);
      setValue("name", name);
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      store.setRequestLoading(false);
    } catch (error: any) {
      console.log(error);
      store.setRequestLoading(false);
      const resMessage = error.response.data.errors.email.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const verifyVC = async () => {
    try {
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "shared/lookup/voter-card",
        {
          number: getValues("number"),
          firstName: getValues("firstName"),
          lastName: getValues("lastName"),
          state: getValues("state"),
          lga: getValues("lga"),
          dob: getValues("DOB"),
        }
      );
      //Form submition success notifications
      const firstName = response.data?.data.firstName;
      const lastName = response.data?.data.lastName;
      const name = firstName + " " + lastName;
      setValue("name", name);
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      store.setRequestLoading(false);
    } catch (error: any) {
      console.log(error);
      store.setRequestLoading(false);
      const resMessage = error.response.data.message.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const verifyDL = async () => {
    try {
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "shared/lookup/driver-license",
        {
          cardNumber: getValues("number"),
          dob: getValues("DOB"),
        }
      );
      //Form submition success notifications
      const firstName = response.data?.data.firstName;
      const lastName = response.data?.data.lastName;
      const name = firstName + " " + lastName;
      setValue("name", name);
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      store.setRequestLoading(false);
    } catch (error: any) {
      console.log(error);
      store.setRequestLoading(false);
      const resMessage = error.response.data.message.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  const registerUser = async (data: any) => {
    try {
      console.log(data);
      //set button loading to true
      store.setRequestLoading(true);
      //post input datas to database
      const response = await publicApi.post<GenericResponse>(
        "auth/register/seller",
        {
          ...store.authUser,
          ...data,
        }
      );
      //Form submition success notifications
      toast.success(response.data.message as string, {
        position: "top-right",
      });
      store.setRequestLoading(false);
      store.setTempId(response.data.data?.tempId);
      localStorage.setItem('tempId', response.data.data?.tempId);
      //navigate to verification page after submition
      navigate("/email-verification");
    } catch (error: any) {
      console.log(error);
      store.setRequestLoading(false);
      const resMessage = error.response.data.errors.email.toString();
      //Form submition error notifications
      toast.error(resMessage, {
        position: "top-right",
      });
    }
  };

  //onsubmit run registerUser function with the values collected from the form which is used as data in registerUser
  const onSubmitHandler: SubmitHandler<SignupInput> = (values) => {
    const identytyData = {
      kycType: getValues("kycType"),
      kycMeta: values,
      name: getValues("name"),
    };

    registerUser(identytyData);
  };

  return (
    <div className="relative ">
      {/* tabs */}
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            {/* customer tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-base lg:text-lg font-bold py-3 block leading-normal " +
                  (openTab === 1
                    ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Create as a customer
              </a>
            </li>
            {/* seller tab */}
            <li className="-mb-px last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-base lg:text-lg font-bold py-3  block leading-normal " +
                  (openTab === 2
                    ? "text-[rgb(154,77,12)] border-b-2 border-[rgb(154,77,12)]"
                    : "text-[#6D6D6D] border-b pb-[13px] border-[#6D6D6D]")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Create as a seller
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full">
            <div className="px- py-5 flex-auto">
              <div className="tab-content tab-space">
                {/* create account as seller */}
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <h6 className="mt-8 text-[#121212] font-medium text-[23px] leading-[31.05px]">
                    We need your identity
                  </h6>
                  <p className="mt-2 mb-8 text-[#6D6D6D] text-base leading-5 font-normal">
                    Enter your NIN, Int’l passport, Driver’s license or Voter’s
                    card number below.
                  </p>
                  <div className="grid gap-y-3.5">
                    <label
                      htmlFor="ID"
                      className="text-sm mb-[6px] capitalize block"
                    >
                      Means of ID
                    </label>
                    <select
                      name="ids"
                      id="ids"
                      onChange={handleSelectChange}
                      className="border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] mb-6"
                    >
                      <option value="select">Select</option>
                      {/* <option value="IP">International Passport</option> */}
                      <option value="NIN">NIN</option>
                      {/* <option value="VC">Voter’s Card</option>
                      <option value="DL">Driver’s License</option> */}
                    </select>
                    {selectedValue === "IP" ? (
                      <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                          <div>
                            <TextField
                              name="number"
                              label="Passport number"
                              placeholder="1234 1234 123"
                            />
                            <TextField
                              name="lastName"
                              label="Last name"
                              placeholder="Saka"
                            />
                            {/* <TextField name="name" label = "name" placeholder=''/> */}
                            <div className="mt-6">
                              <Button fullWidth={true}>Next</Button>
                            </div>
                          </div>
                        </form>
                      </FormProvider>
                    ) : selectedValue === "NIN" ? (
                      <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                          <div>
                            <TextField
                              name="number"
                              type="phone"
                              label="NIN number"
                              placeholder="e.g 1234 1234 123"
                            />
                            <div className="mt-6">
                              <Button fullWidth={true}>Next</Button>
                            </div>
                          </div>
                        </form>
                      </FormProvider>
                    ) : selectedValue === "VC" ? (
                      <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                          <div>
                            <TextField
                              name="number"
                              type="phone"
                              label="Voter’s card number"
                              placeholder="e.g 1234 1234 123"
                            />
                            <TextField
                              name="firstName"
                              type="text"
                              label="First name"
                              placeholder="Bukola"
                            />
                            <TextField
                              name="lastName"
                              type="text"
                              label="Last name"
                              placeholder="Saka"
                            />
                            <TextField
                              name="DOB"
                              type="phone"
                              label="Date of birth"
                              placeholder="e.g DD-MM-YYYY"
                            />
                            <div className="flex justify-center gap-4">
                              <TextField
                                name="state"
                                variant="short"
                                type="text"
                                label="State"
                                placeholder="Lagos"
                              />
                              <TextField
                                name="lga"
                                variant="short"
                                type="text"
                                label="LGA"
                                placeholder="Eti-Osa"
                              />
                            </div>
                            <div className="mt-6">
                              <Button fullWidth={true}>Next</Button>
                            </div>
                          </div>
                        </form>
                      </FormProvider>
                    ) : selectedValue === "DL" ? (
                      <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmitHandler)}>
                          <div>
                            <TextField
                              name="number"
                              label="Card number"
                              placeholder="e.g 1234 1234 123"
                            />
                            <TextField
                              name="DOB"
                              label="Date of birth"
                              placeholder="DD-MM-YY"
                            />
                            <div className="mt-6">
                              <Button fullWidth={true}>Next</Button>
                            </div>
                          </div>
                        </form>
                      </FormProvider>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-normal mb-7 w-fit mx-auto">
          Existing user?{" "}
          <a href="/login" className="text-[#121212] font-bold">
            Log in here
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterIdentity;
