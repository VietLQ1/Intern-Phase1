import { IMessageHandler } from './IMessageHandler';
import { Message } from './message';
import { MessageSubscriptionNode } from './messageSubscriptionNode';
export class MessageBus {
    private static _subscriptions: {[code : string] : IMessageHandler[]} = {};
    private static _messageQueue: MessageSubscriptionNode[] = [];
    private constructor() {}
    public static addSubscription(code: string, handler: IMessageHandler): void {
        if (MessageBus._subscriptions[code] === undefined) {
            MessageBus._subscriptions[code] = [];
        }
        if (MessageBus._subscriptions[code].indexOf(handler) !== -1) {
            return;
        }
        MessageBus._subscriptions[code].push(handler);
    }
    public static removeSubscription(code: string, handler: IMessageHandler): void {
        if (MessageBus._subscriptions[code] === undefined) {
            return;
        }
        let nodeIndex = MessageBus._subscriptions[code].indexOf(handler);
        if (nodeIndex !== -1) {
            MessageBus._subscriptions[code].splice(nodeIndex, 1);
        }
    }
    public static postMessage(message: Message): void {
        if (MessageBus._subscriptions[message.code] !== undefined) {
            for (let handler of MessageBus._subscriptions[message.code]) {
                MessageBus._messageQueue.push(new MessageSubscriptionNode(message, handler));
            }
        }
    }
    public static update(time: number): void {
        while (MessageBus._messageQueue.length > 0) {
            let messageNode = MessageBus._messageQueue.pop();
            if (messageNode) {
                messageNode.handler.handle(messageNode.messageCode);
            }
        }
    }
}