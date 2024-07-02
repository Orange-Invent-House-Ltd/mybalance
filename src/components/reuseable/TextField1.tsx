import clsx from "clsx";
import { InputHTMLAttributes, useEffect, useRef } from "react";
import { UseControllerProps, useController } from "react-hook-form";

interface ITextField extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  disabled?: boolean;
  variant?: "long" | "short";
}
const TextField = ({
  label,
  variant,
  ...props
}: UseControllerProps<any> & ITextField) => {
  const { field, fieldState } = useController(props);

  // Prevent increase and decrease function of input of type number
  // useEffect(() => {
  //   const handleWheel = (event: WheelEvent) => {
  //     if (document?.activeElement === inputRef?.current) {
  //       event.preventDefault();
  //     }
  //   };

  //   const inputElement = inputRef?.current;
  //   inputElement?.addEventListener('wheel', handleWheel);

  //   return () => {
  //     inputElement?.removeEventListener('wheel', handleWheel);
  //   };
  // }, []);

  return (
    <div className="w-full">
      <p
        className={clsx("text-sm mb-[6px] capitalize", {
          "text-[#DA1E28]": fieldState.invalid,
        })}
      >
        {label}
      </p>

      <input
        {...field}
        {...props}
        className={clsx(
          "border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] disabled:opacity-75 disabled:hover:cursor-not-allowed",
          {
            "w-[165px]": variant === "short",
            "border-[#DA1E28] focus:border-[#DA1E28]": fieldState.invalid,
          }
        )}
        onWheel={(event) => event.currentTarget.blur()}
      />

      <p
        className={clsx("text-sm mt-[6px]", {
          "text-[#DA1E28]": fieldState.invalid,
        })}
      >
        {fieldState.error?.message}
      </p>
    </div>
  );
};

export default TextField;
