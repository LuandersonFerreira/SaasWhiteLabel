import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Views/Home/index.jsx";
import CreateInvite from "./Views/CreateInvite/index.jsx";
import Invite from "./Views/Invite/index.jsx";
import HomeLayout from "./layout/Home/index.jsx";
import Login from "./Views/Login/Login.jsx";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<h1> Not Found </h1>} />
        <Route path="/Login" element={<Login />} />

        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/Event/create-invite" element={<CreateInvite />} />
          <Route path="/invite/:inviteId" element={<Invite />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
