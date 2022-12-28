import { Outlet } from "react-router-dom";

const BuyerDashboardLayout = () => {
  return (
    <div className=''>
              <main className=' '>
                  
        <Outlet />
              </main>
   
    </div>
  );
};

export default BuyerDashboardLayout;
