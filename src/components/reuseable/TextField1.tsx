import clsx from "clsx";
import React from "react";
import { InputHTMLAttributes } from "react";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: any;
  helperText?: any;
  disabled?: boolean;
  variant?: "long" | "short";
}

const TextField: React.FC<ITextField> = (props) => {
  return (
    <div className="w-full">
      <p
        className={clsx("text-sm mb-[6px] capitalize", {
          "text-[#DA1E28]": props.error,
        })}
      >
        {props.label}
      </p>

      <input
        {...props}
        name="text"
        className={clsx(
          "border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373]",
          {
            "w-[165px]":
            props.variant== "short",
            "border-[#DA1E28] focus:border-[#DA1E28]": props.error,
          }
        )}
      />

      <p
        className={clsx("text-sm mt-[6px]", {
          "text-[#DA1E28]": props.error,
        })}
      >
        {props.helperText}
      </p>
    </div>
  );
};

export default TextField;
