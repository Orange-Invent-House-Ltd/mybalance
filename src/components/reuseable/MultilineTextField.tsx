import clsx from 'clsx';
import React, { TextareaHTMLAttributes } from 'react'
interface IMultilineTextField
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: boolean;
  helperText?:string
}
const MultilineTextField = (props: IMultilineTextField) => {
  return (
    <div className="w-full">
      <p
        className={clsx("text-sm mb-[6px] capitalize", {
          "text-[#DA1E28]": props.error,
        })}
      >
        {props.label}
      </p>

      <textarea
        rows={5}
        cols={60}
        name="text"
        placeholder="Enter text"
        className="w-full resize-none rounded-md outline-none  p-3  focus-within:border-[#747373] border border-[#B7B7B7]"
      ></textarea>

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

export default MultilineTextField