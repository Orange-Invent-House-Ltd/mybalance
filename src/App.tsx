import { BrowserRouter, Route, Routes } from "react-router-dom";
import BuyerDashboardLayout from "./layout/BuyerDashboardLayout";
import Home from "./pages/buyer/dashboard/Home";



const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BuyerDashboardLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
