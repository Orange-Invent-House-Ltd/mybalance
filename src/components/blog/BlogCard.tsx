import React from "react";
import { ArrowUp } from "lucide-react";
import { formatDate } from "../../util/DateFormat";

const Card = ({ data }: any) => {
  return (
    <div className="bg-white shadow-lg p-6 h-[600px] ">
      <img
        src={data.coverImageUrl}
        alt="Card Image"
        className=" mb-4 h-[300px] w-full"
      />
      <p className="text-sm text-[#9A4D0C] font-bold">{data.author}</p>
      <div className="flex justify-between items-center w-full">
        <h2 className=" text-xl font-semibold  mt-2">{data.title}</h2>
        <ArrowUp size={32} className="transform rotate-45 text-4xl ml-4" />
      </div>
      {/* <div className="flex items-center mt-4">
        <p className="text-gray-400 text-sm">{data.description}</p>
      </div> */}
      <div>
        <div className="flex items-center space-x-4 user mt-8 mb-6">
          <div className="h-9 w-9 rounded-full overflow-hidden">
            <img
              src={data.coverImageUrl}
              alt="User Profile"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="text-gray-400 text-sm font-semibold">
              {data.author}
            </div>
            <div className="text-gray-400 text-xs">
              {formatDate(data.createdAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
