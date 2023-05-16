import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Spinner from "./Spinner";

interface LoadingButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
  loading: boolean;
  textColor?: string;
  children: React.ReactNode;
  disabled?: boolean;
  success?: boolean;
  variant?: "outlined" | "contained";
  fullWidth?: boolean;
  danger?: boolean;
};

export const LoadingButton = ( props: LoadingButtonProps) => {
  const { children, success, variant = "contained", loading = false, fullWidth, disabled, danger} = props;
  return (
    <button
      disabled = {disabled}
      type="submit"
      {...props}
      className={twMerge(
        `rounded-md py-3 px-4 capitalize cursor-pointer transition-all`,
        `${loading && "bg-[#ccc]"} ${disabled && "bg-primary-light hover:bg-primary-light hover:cursor-not-allowed"} ${success && "bg-secondary hover:bg-white hover:text-black"} 
        ${variant==="outlined" && "border border-primary-normal text-primary-normal hover:bg-primary-normal/10"} ${fullWidth && "w-full md:w-full"} ${danger && "bg-red-500"}
        ${variant==="contained" && 'bg-primary-normal  text-white hover:bg-primary-dark'}`
      )}
    >
      {loading ? (
        <div className="flex items-center">
          <Spinner />
          <span className="text-slate-500 inline-block">Loading...</span>
        </div>
      ) : (
        <span>{children}</span>
      )}
    </button>
  );
};