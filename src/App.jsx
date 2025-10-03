// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import UserProfiles from "./pages/profile";
import SignIn from "./pages/login";
import SignUp from "./pages/signup";
import AppLayout from "./layout/DashboardLayout";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Pagine pubbliche */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Dashboard layout con pagine interne */}
        <Route path="/dashboard" element={<AppLayout />}>
          {/* Qui dentro usiamo Route relative */}
          <Route index element={<Home />} /> {/* /dashboard */}
          <Route path="profile" element={<UserProfiles />} />{" "}
          {/* /dashboard/profile */}
        </Route>
      </Routes>
    </Router>
  );
}
