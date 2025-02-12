import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Views/Home/index.jsx";
import Login from "./Views/Login/index.jsx";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1> Not Found </h1>} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;