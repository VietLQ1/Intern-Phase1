import { MessageBus } from "./messageBus";

export class Message{
    public code: string;
    public context: any;
    public sender: any;
    public constructor(code: string,  sender: any, context?: any){
        this.code = code;
        this.context = context;
        this.sender = sender;
    }
    public static send(code: string, sender: any, context?: any): void{
        let message = new Message(code, sender, context);
        MessageBus.postMessage(message);
    }
    public static subscribe(code: string, handler: (message: Message) => void): void{
        MessageBus.addSubscription(code, { handle: handler });
    }
    public static unsubscribe(code: string, handler: (message: Message) => void): void{
        MessageBus.removeSubscription(code, { handle: handler });
    }
}