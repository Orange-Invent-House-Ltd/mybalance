import clsx from 'clsx';
import React, { TextareaHTMLAttributes } from 'react'
import { UseControllerProps, useController } from 'react-hook-form';
interface IMultilineTextField
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
  helperText?:string
}
const MultilineTextField = ({label,...props}: UseControllerProps<any> &  IMultilineTextField) => {
   const { field, fieldState } = useController(props);
  return (
    <div className="w-full">
      <p
        className={clsx("text-sm mb-[6px] capitalize", {
          "text-[#DA1E28]": fieldState.invalid,
        })}
      >
        {label}
      </p>

      <textarea
        {...field}
        {...props}
        rows={5}
        cols={60}
        name="text"
        className="w-full resize-none rounded-md outline-none  p-3  focus-within:border-[#747373] border border-[#B7B7B7]"
      ></textarea>

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

export default MultilineTextField