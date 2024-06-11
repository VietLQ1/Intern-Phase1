import { Message } from "./message";
export interface IMessageHandler {
    handle(message: Message): void;
}