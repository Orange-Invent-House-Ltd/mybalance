import React, { useEffect, useState } from "react";
import { Button } from "../../../components/reuseable/Button";
import TextField from "../../../components/reuseable/TextField1";
import { useForm } from "react-hook-form";
import { useEditProfile, useUploadAvatar } from "../../../hooks/mutations";
import LoadingOverlay from "../../../components/reuseable/LoadingOverlay";
import { useUser } from "../../../hooks/queries";

const Profile = () => {
  const { handleSubmit, control, reset } = useForm();
  const { mutate, isLoading } = useEditProfile();
  const { mutate: uploadAvatar } = useUploadAvatar();

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
              <img
                src={previewURL || user?.avatar}
                alt=""
                className="w-[60px] bg-gray-200 cursor-pointer h-[60px] object-cover rounded-full"
              />
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
            label="full name"
            name="name"
            rules={{ required: "this field is required" }}
          />
          {/* <TextField
            control={control}
            label="email"
            name="email"
            rules={{ required: "this field is required" }}
          /> */}
          <TextField
            control={control}
            label="phone"
            name="phone"
            rules={{ required: "this field is required" }}
          />

          <Button fullWidth>update profile</Button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
