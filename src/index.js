import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store, { persisitor } from "./redux-store";
import { PersistGate } from "redux-persist/integration/react";
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-naa1krld53ltpkn3.us.auth0.com"
      clientId="nuVnELh8cTFwwzkTtIbGVKYc52H5BpWY"
      redirectUri={window.location.origin}
      cacheLocation="localstorage"
    >
      <Provider store={store}>
        <PersistGate persistor={persisitor}>
          <App />
        </PersistGate>
      </Provider>
    </Auth0Provider>
  </React.StrictMode>
);
