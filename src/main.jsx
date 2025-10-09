import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { ActivityProvider } from "./context/ActivityContext.jsx";
import { ItineraryProvider } from "./context/ItineraryContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      <ActivityProvider>
        <ItineraryProvider>
          <App />
        </ItineraryProvider>
      </ActivityProvider>
    </UserProvider>
  </StrictMode>
);
