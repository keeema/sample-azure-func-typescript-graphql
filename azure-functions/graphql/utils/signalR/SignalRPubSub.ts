import { PubSubEngine } from "graphql-subscriptions";

export interface IMessage {
  target: string;
  arguments: unknown[];
}

export class SignalRPubSub extends PubSubEngine {
  constructor(private signalROutputBinding: IMessage[]) {
    super();
  }

  async publish<T>(triggerName: string, payload: T): Promise<void> {
    const message: IMessage = {
      target: triggerName,
      arguments: [payload],
    };

    this.signalROutputBinding.push(message);
  }

  async subscribe(): Promise<number> {
    return 0;
  }

  unsubscribe() {
    return;
  }
}
