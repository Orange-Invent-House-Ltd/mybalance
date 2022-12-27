import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className=''>
              <main className=' '>
                  
        <Outlet />
              </main>
   
    </div>
  );
};

export default Layout;
