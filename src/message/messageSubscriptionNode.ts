import { Message } from "./message";
import { IMessageHandler } from "./IMessageHandler";
export class MessageSubscriptionNode {
    public messageCode : Message;
    public handler : IMessageHandler;
    constructor(messageCode : Message, handler : IMessageHandler) {
        this.messageCode = messageCode;
        this.handler = handler;
    }
}