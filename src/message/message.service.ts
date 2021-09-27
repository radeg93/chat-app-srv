import { Injectable } from '@nestjs/common';
import { Message } from './message.entity';

@Injectable()
export class MessageService {
    public async getAll(): Promise<Message[]> {
        return Message.find();
    }

    public async createMessage(senderId: number, senderName: string, message: string): Promise<Message> {
        const newMessage: Message = new Message(senderId, senderName, message);
        return await newMessage.save();
    }
}
