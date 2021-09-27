import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @Get(':name')
    async findByName(@Param('name') name: string): Promise<User> {
        return this.userService.findByName(name);
    }

    @Post()
    async create(@Body('username') username: string): Promise<User> {
        return this.userService.create(username);
    }
}
