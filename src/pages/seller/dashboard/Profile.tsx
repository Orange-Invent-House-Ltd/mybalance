import React, { useEffect, useState } from "react";
import { Button } from "../../../components/reuseable/Button";
import TextField from "../../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useEditProfile, useUploadAvatar } from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { useUser } from "../../../hooks/queries";
import loading from "../../../assets/Icons/loadingSpinner.svg";

const Profile = () => {
  const { handleSubmit, control, reset } = useForm();
  const { mutate, isLoading } = useEditProfile();
  const { mutate: uploadAvatar, isLoading: upLoadIsLoading } =
    useUploadAvatar();

  const { data: user } = useUser();
  useEffect(() => {
    reset({
      name: user?.fullName,
      // email: user?.email,
      phone: user?.phoneNumber,
    });
  }, [reset]);
  const onSubmit = (data: any) => {
    mutate(data);
  };
  const words = user?.fullName.split(" ");
  const firstLetter = words?.[0][0]; // Get the first letter of the first word
  const secondLetter = words?.[1] && words[1].length > 0 ? words[1][0] : "";
  const [previewURL, setPreviewUrl] = useState<any>();
  const form = new FormData();
  function upload(e: any) {
    const file = e.target.files[0];
    form.append("image", file);

    setPreviewUrl(URL.createObjectURL(file));

    uploadAvatar(form);
  }

  return (
    <div>
      <header className="mb-16">
        <h1 className="text-[23px] capitalize font-medium ">profile</h1>
        <p className="text-[#303030] text-sm mt-4">
          Manage your profile and personal details here.
        </p>
      </header>
      <div>
        <div className="flex items-center gap-5 ">
          <label htmlFor="photoURL">
            {user?.avatar ? (
              <div className="relative w-[60px] h-[60px] object-cover overflow-hidden rounded-full">
                {upLoadIsLoading && (
                  <div className="absolute z-10 top-0 w-full h-full flex items-center justify-center left-0 bg-white/70 z-50">
                    <img
                      src={loading}
                      className="animate-spin mx-auto "
                      alt="loading spinner"
                    />
                  </div>
                )}
                <img
                  src={previewURL || user?.avatar}
                  alt=""
                  className=" bg-slate-200 cursor-pointer h-full w-full object-cover "
                />
              </div>
            ) : (
              <div className="w-[60px] cursor-pointer h-[60px] bg-[#CDD2FD] border-2 border-[#9BA6FA] text-2xl text-white rounded-full  flex items-center justify-center uppercase font-bold">
                {firstLetter}
                {secondLetter}
              </div>
            )}
          </label>
          <label htmlFor="photoURL">
            <p className="cursor-pointer">Tap to change photo</p>
          </label>
          <input
            onChange={upload}
            id="photoURL"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg, image/gif, image/webp"
          />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 relative mt-5  w-full max-w-[350px]"
        >
          {isLoading && <LoadingOverlay />}
          <TextField
            control={control}
            placeholder="eg. musty feet"
            label="eg. musty feet"
            name="businessName"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            placeholder="sales of sneakers, footwear etc"
            label="Describe your service"
            name="service"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            label="Address"
            placeholder="Ikeja, lagos"
            name="address"
            rules={{ required: "this field is required" }}
          />

          <TextField
            control={control}
            placeholder="09088776565"
            label="Phone"
            name="phone"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            placeholder="e.g UBA"
            label="Bank name"
            name="bankName"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            placeholder="e.g 000000000"
            label="Bank account number"
            name="accNumber"
            rules={{ required: "this field is required" }}
          />
          <TextField
            control={control}
            placeholder="e.g 000000000"
            label="Valid ID number"
            name="validId"
            rules={{ required: "this field is required" }}
          />

          <Button fullWidth>update profile</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
