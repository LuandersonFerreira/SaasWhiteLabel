import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Views/Home/index.jsx";
import Login from "./Views/Login/index.jsx";
import HomeLayout from "./layout/Home/index.jsx";
import Event from "./Views/Event/index.jsx";
import CreateInvite from "./Views/Event/Invites/Create/index.jsx";
import AnswerInvite from "./Views/Event/Invites/Answer/index.jsx";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route
            path="/Event/:eventId/create-invite"
            element={<CreateInvite />}
          />
          <Route path="/Event/:eventName" element={<Event />} />
          <Route path="/invite/:inviteId" element={<AnswerInvite />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
