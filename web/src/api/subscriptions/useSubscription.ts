import { useContext, useEffect } from "react";

import { SubscriptionContext } from "./SubscriptionContext";

export function useSubscription<TType>(
  notification: string,
  handler: (notification: TType) => void
) {
  const subscriptionContext = useContext(SubscriptionContext);

  useEffect(() => {
    console.log(`Listen for notification '${notification}'`);
    const handlerWrapper = (notificationData: TType) => {
      console.log(`Handled notification '${notification}'`);
      handler(notificationData);
    };
    subscriptionContext.connection?.on(notification, handlerWrapper);
    return () => {
      console.log(`Stop listening for notification '${notification}'`);
      subscriptionContext.connection?.off(notification, handlerWrapper);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionContext, notification]);
}
