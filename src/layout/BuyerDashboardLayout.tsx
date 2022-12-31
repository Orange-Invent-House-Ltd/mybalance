import { Outlet } from "react-router-dom";

const BuyerDashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-[287px] text-white sticky top-0 left-0 h-screen bg-green-600 ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil autem aut culpa alias earum quibusdam quisquam esse vero dolorem. Vel, ipsam! Perferendis fugit culpa aliquam adipisci ea! Eum, laborum possimus.
      </div>
      <main className=" px-2  pt-[70px]">
        <Outlet />
      </main>
    </div>
  );
};

export default BuyerDashboardLayout;
