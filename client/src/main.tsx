import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";

import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);
