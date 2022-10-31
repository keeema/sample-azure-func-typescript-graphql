import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/mdc-light-indigo/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./main.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import ReactDOM from "react-dom";

import SubscriptionProvider from "./api/subscriptions/SubscriptionProvider";
import App from "./App";

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <SubscriptionProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </SubscriptionProvider>
  </StrictMode>,
  document.getElementById("root")
);
