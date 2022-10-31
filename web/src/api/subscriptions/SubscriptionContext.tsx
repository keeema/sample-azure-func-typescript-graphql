import { createContext } from "react";

export interface ISubscriptionContext {
  connection?: signalR.HubConnection;
}

export const SubscriptionContext = createContext<ISubscriptionContext>({});
SubscriptionContext.displayName = "SubscriptionContext";
