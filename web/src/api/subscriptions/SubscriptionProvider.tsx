import * as signalR from "@microsoft/signalr";
import { PropsWithChildren, useEffect, useState } from "react";

import { SubscriptionContext } from "./SubscriptionContext";

export default function SubscriptionProvider({
  children,
}: PropsWithChildren<object>) {
  const [connection, setConnection] = useState<signalR.HubConnection | null>(
    null
  );

  useEffect(() => {
    async function negotiate() {
      const newConnection = new signalR.HubConnectionBuilder()
        .withUrl("/api")
        .configureLogging(signalR.LogLevel.Error)
        .withAutomaticReconnect()
        .build();

      try {
        await newConnection.start();
        setConnection(newConnection);
      } catch (err) {
        console.error(err);
      }
    }
    void negotiate();
  }, []);

  return connection ? (
    <SubscriptionContext.Provider value={{ connection }}>
      {children}
    </SubscriptionContext.Provider>
  ) : (
    <div>Inicializace</div>
  );
}
