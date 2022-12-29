import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuyerDashboardLayout from "./layout/BuyerDashboardLayout";
import Login from "./pages/buyer/auth/Login";
import Home from "./pages/buyer/dashboard/Home";



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuyerDashboardLayout />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="/login" element={ <Login/> }/>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
