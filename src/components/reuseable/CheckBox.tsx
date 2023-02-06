import "./checkbox.css"
import { useState } from "react";


interface ICheckbox{
  value: string;
}

const CheckBox = ({value}:ICheckbox) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChecked =()=>{
    setIsChecked(!isChecked)
  }
  return (
    <label htmlFor={value} onClick={handleChecked} className={isChecked? "checked" : "unchecked" }>
      <span className='text-base font-normal'> {value} </span>
    </label>
  )
}

export default CheckBox