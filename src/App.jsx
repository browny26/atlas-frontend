// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Services from "./pages/services";
import UserProfiles from "./pages/profile";
import SignIn from "./pages/login";
import SignUp from "./pages/signup";
import AppLayout from "./layout/DashboardLayout";
import Dashboard from "./pages/dashboard";
import Itineraries from "./pages/itineraries";
import Flights from "./pages/flights";
import Activities from "./pages/activities";
import { useUser } from "./context/UserContext";
import { ProtectedRoute } from "./layout/ProtectedRoute";
import ResetPassword from "./pages/reset-password";
import ForgotPassword from "./pages/forgot-password";
import Adventure from "./pages/adventure";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import NotFound from "./pages/NotFound";

export default function App() {
  const { user } = useUser();
  return (
    <Router>
      <Routes>
        {/* Pagine pubbliche */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/adventure" element={<Adventure />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="profile" element={<UserProfiles />} />{" "}
          <Route path="itineraries" element={<Itineraries />} />{" "}
          <Route path="flights" element={<Flights />} />{" "}
          <Route path="activities" element={<Activities />} />{" "}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
