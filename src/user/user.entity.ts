import { Message } from 'src/message/message.entity';
import { Entity, BaseEntity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
    constructor(name: string) {
        super();
        this.name = name;
    }

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({
        type: 'varchar',
        length: 255,
        nullable: false,
        unique: true,
    })
    public name: string;

    @OneToMany(() => Message, (message) => message.sender, { eager: true })
    public messages: Message[];
}
