import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Seller from "./pages/seller/index";
import Buyer from "./pages/buyer/index";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/buyer/login" replace />} />
        <Route path="/buyer/*" element={<Buyer />} />
        <Route path="/seller/*" element={<Seller />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
