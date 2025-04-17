import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GrazProvider } from "graz";
import { nobleTestnet } from "./config/chainInfo";
import { ChainInfo } from "@keplr-wallet/types";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./App.tsx";

const queryClient = new QueryClient();

const grand: ChainInfo = nobleTestnet;

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <GrazProvider
        grazOptions={{
          chains: [grand],
        }}
      >
        <App />
      </GrazProvider>
    </QueryClientProvider>
  </StrictMode>
);
