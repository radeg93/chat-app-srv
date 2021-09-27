import { SubscribeMessage, WebSocketGateway, WebSocketServer, MessageBody, OnGatewayConnection } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { User } from 'src/user/user.entity';
import { UserService } from './user.service';

@WebSocketGateway(4100, { namespace: 'user', cors: true })
export class UserGateway implements OnGatewayConnection {
    @WebSocketServer()
    webSocketServer: Server;

    constructor(private userService: UserService) {}

    public async handleConnection(client: any): Promise<void> {
        const users: User[] = await this.userService.findAll();
        client.emit('all-users-to-client', users);
    }

    @SubscribeMessage('new-user-to-server')
    public async handleNewMessage(@MessageBody() username: string): Promise<void> {
        await this.userService.create(username);
        const users: User[] = await this.userService.findAll();
        this.webSocketServer.emit('all-users-to-client', users);
    }
}
