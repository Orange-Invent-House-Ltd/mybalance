import clsx from "clsx";
import React, { useState } from "react";
import minusIcon from "../../assets/Icons/minusIcon.svg";
import plusIcon from "../../assets/Icons/plusIcon.svg";

interface IAccordion {
  title: string;
  content: string;
}
const Accordion = ({ content, title }: IAccordion) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className=" py-5"
      onClick={() => {
        setOpen(!open);
      }}
    >
      <header className="flex items-center cursor-pointer transition-all  justify-between">
        <h1 className="text-[#0B0B0B] mb-2 capitalize  text-lg font-medium  ">
      {title}
        </h1>
        <img src={!open ? plusIcon : minusIcon} alt="Your SVG" />
      </header>

      <p
        className={clsx(
          "text-base text-[#4F4F4F]  overflow-hidden font-normal transition-all ",
          {
            "max-h-96 ease-in": open === true,
            "max-h-0 ": open === false,
          }
        )}
      >
       {content}
      </p>
    </div>
  );
};

export default Accordion;
