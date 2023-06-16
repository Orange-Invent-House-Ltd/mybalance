import React from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from "clsx";

type FormInputProps = {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;
  variant?: "short" | "medium" |"long";
};

const FormInput: React.FC<FormInputProps> = ({label, name, type = 'text', placeholder, disabled, variant="long"}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='mb-3'>
      <label htmlFor={name} className={clsx("text-sm mb-[6px] capitalize", {
          "text-[#DA1E28]": errors[name],
        })}>
        {label}
      </label>
      <input
        type={type}
        disabled={disabled}
        placeholder= {placeholder}
        className={clsx(
          "block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] ",
          {
            "w-[319px]":
            variant== "medium",
            "w-[165px]":
            variant== "short",
            "border-[#DA1E28] focus:border-[#DA1E28]": errors[name],
            'disabled disabled:opacity-75 hover:cursor-not-allowed' : disabled
          }
        )}
        {...register(name)}
      />
      {errors[name] && (
        <span className='text-red-500 text-xs pt-1 block'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default FormInput;