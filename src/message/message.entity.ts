import { User } from 'src/user/user.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Message extends BaseEntity {
    constructor(senderId: number, senderName: string, message: string) {
        super();
        this.senderId = senderId;
        this.senderName = senderName;
        this.message = message;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public senderId: number;

    @Column()
    public senderName: string;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
    })
    public message: string;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    public date: Date;

    @ManyToOne(() => User, (user) => user.messages, { eager: false })
    @JoinColumn()
    public sender: User;
}
