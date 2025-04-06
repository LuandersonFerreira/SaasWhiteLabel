import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Views/Home/index.jsx";
import Login from "./Views/Login/index.jsx";
import CreateInvite from "./Views/CreateInvite/index.jsx";
import Invite from "./Views/Invite/index.jsx";
import HomeLayout from "./layout/Home/index.jsx";
import Event from "./Views/Event/index.jsx";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/Event/create-invite" element={<CreateInvite />} />
          <Route path="/Event/:eventId" element={<Event />} />
          <Route path="/invite/:inviteId" element={<Invite />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
