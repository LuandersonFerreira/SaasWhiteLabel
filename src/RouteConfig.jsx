import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./Views/Home/index.jsx";
import Login from "./Views/Login/index.jsx";
import HomeLayout from "./layout/Home/index.jsx";
import Event from "./Views/Event/index.jsx";
// import AnswerInvite from "./Views/Event/Invites/Answer/index.jsx";
import CreateEventForm from "./createevents/CreateEventForm.jsx";
import GuestHome from "./Views/Guest/index.jsx";

const RouteConfig = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path=":id" element={<Event />} />
          <Route path="/CriarEvento" element={<CreateEventForm />} />
        </Route>
        <Route path="/login" element={<Login />} />
        {/* <Route path="/Convite/:inviteId" element={<AnswerInvite />} /> */}
        <Route path="/Convite/:guestId" element={<GuestHome />} />
        <Route path="*" element={<h1>Página não encontrada</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteConfig;
