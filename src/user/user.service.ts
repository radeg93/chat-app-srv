import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UserService {
    public async findAll(): Promise<User[]> {
        return User.find();
    }

    public async findById(id: number): Promise<User> {
        return User.findOne({ where: { id } });
    }

    public async findByName(name: string): Promise<User> {
        return await User.findOne({ where: { name } });
    }

    public async create(name: string): Promise<User> {
        const user: User = new User(name);
        return await user.save();
    }
}
