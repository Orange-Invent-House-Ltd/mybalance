import React from 'react'
import { Outlet } from 'react-router-dom'

const SellerDashboardLayout = () => {
  return (
    <div className="flex">
      <div className="w-[350px] bg-red-500"></div>
      <main className="w-full pl-6 pr-[5%] pt-4 md:pt-[70px] pb-10">
        <Outlet />
      </main>
    </div>
  );
}

export default SellerDashboardLayout