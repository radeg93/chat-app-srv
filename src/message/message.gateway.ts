import { SubscribeMessage, WebSocketGateway, OnGatewayConnection, WebSocketServer, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageService } from './message.service';
import { Message } from './message.entity';

@WebSocketGateway(4100, { namespace: 'message', cors: true })
export class MessageGateway implements OnGatewayConnection {
    @WebSocketServer()
    webSocketServer: Server;

    constructor(private messageService: MessageService) {}

    public async handleConnection(client: any): Promise<void> {
        const messages: Message[] = await this.messageService.getAll();
        client.emit('all-messages-to-client', messages);
    }

    @SubscribeMessage('new-message-to-server')
    public async handleNewMessage(@MessageBody() data: { senderId: number; senderName: string; message: string }): Promise<void> {
        await this.messageService.createMessage(data.senderId, data.senderName, data.message);
        const messages: Message[] = await this.messageService.getAll();
        this.webSocketServer.emit('all-messages-to-client', messages);
    }
}
