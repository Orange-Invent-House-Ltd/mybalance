import React from 'react';
import { useFormContext } from 'react-hook-form';

type FormInputProps = {
  label: string;
  name: string;
};

const Banks: React.FC<FormInputProps> = ({label, name}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className='w-fit mb-3'>
      <label htmlFor={name} className='block'>
        {label}
      </label>
      <select
        className="block border border-[#B7B7B7] w-full rounded-md p-2 outline-none focus:border-[#747373] "
        {...register(name)}
      >
        <option value="select">select gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      {errors[name] && (
        <span className='text-red-500 text-xs pt-1 block'>
          {errors[name]?.message as string}
        </span>
      )}
    </div>
  );
};

export default Banks;