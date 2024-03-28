import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { HousekeepersProvider } from "./context/housekeepers/index";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HousekeepersProvider>
    <GoogleOAuthProvider clientId="545755340812-q8uumr13l7t7fvr23hf2ldg64fj92jl3.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  </HousekeepersProvider>
);
