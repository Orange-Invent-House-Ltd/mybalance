import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layout/Layout";

import Home from "./pages/dashboard/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
