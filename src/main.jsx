import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ActivityProvider } from "./context/ActivityContext.jsx";
import { ItineraryProvider } from "./context/ItineraryContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}>
      <UserProvider>
        <ActivityProvider>
          <ItineraryProvider>
            <App />
          </ItineraryProvider>
        </ActivityProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
