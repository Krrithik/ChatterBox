import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { BrowserRouter } from "react-router-dom";

import { UserAuthProvider } from "./context/userAuthContext.jsx";
import { ChatProvider } from "./context/userChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserAuthProvider>
      <ChatProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChatProvider>
    </UserAuthProvider>
  </StrictMode>
);
