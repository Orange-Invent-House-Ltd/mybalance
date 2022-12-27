import clsx from "clsx";
import React, { ButtonHTMLAttributes, ReactNode } from "react";

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: "outlined" | "contained";
}
export const Button = (props: IButton) => {
  const { children, fullWidth, disabled, variant = "contained" } = props;
  return (
    <button
      disabled={disabled}
      {...props}
      className={clsx(
        "rounded-md py-3 px-2 capitalize cursor-pointer transition-all",
        {
          "w-full": fullWidth === true,
          "bg-primary-normal  text-white hover:bg-primary-dark ":
            variant === "contained",
          "bg-primary-light hover:bg-primary-light hover:cursor-not-allowed":
            variant === "contained" && disabled,
          "border border-primary-normal text-primary-normal hover:bg-primary-normal/10 ":
            variant === "outlined",
          "border-primary-light text-primary-light cursor-not-allowed hover:bg-white ":
            variant === "outlined" && disabled,
        }
      )}
    >
      {children}
    </button>
  );
};
