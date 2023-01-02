import { Outlet } from "react-router-dom";

const BuyerDashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-[250px] text-white sticky top-0 left-0 h-screen bg-[#3A3A3A] ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil autem aut culpa alias earum quibusdam quisquam esse vero dolorem. Vel, ipsam! Perferendis fugit culpa aliquam adipisci ea! Eum, laborum possimus.
      </div>
      <main className=" pl-4  pt-[70px]">
        <Outlet />
      </main>
    </div>
  );
};

export default BuyerDashboardLayout;
