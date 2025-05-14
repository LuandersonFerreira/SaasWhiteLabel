import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventDetails from "./pages/EventDetails";
import CreateEventsForm from "./createvents/CreateEventsForm"; 

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Event/:slug" element={<EventDetails />} />
        <Route path="/createvents/createeventsform" element={<CreateEventsForm />} /> 
      </Routes>
    </Router>
  );
}
