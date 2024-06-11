export class Message{
    public code: string;
    public context: any;
    public sender: any;
    public constructor(code: string,  sender: any, context?: any){
        this.code = code;
        this.context = context;
        this.sender = sender;
    }
}