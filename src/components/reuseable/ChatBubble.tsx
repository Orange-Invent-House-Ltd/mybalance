import clsx from "clsx";
import React, { FC } from "react";
interface IChatBubble {
    user:boolean
}
const ChatBubble:FC<IChatBubble> = ({user}) => {
  return (
    <div
      className={clsx("  block  w-[315px]", {
        "ml-auto ": !user,
      })}
    >
      <div className="flex  items-center justify-between">
        <p className="font-medium text-lg">{ user? 'you':'MyBalance'}</p>
        <p className="text-[#6D6D6D] text-sm ">Friday 2:21pm</p>
      </div>
      <div
        className={clsx(" shadow rounded-md   py-2 px-4 ", {
          "bg-[#F2F4F7] rounded-tl-none text-black": user,
          "bg-[#B1580E] rounded-tr-none  text-white": !user,
        })}
      >
        Hey Jamjam, can you please elaborate on your question?
      </div>
    </div>
  );
};

export default ChatBubble;
