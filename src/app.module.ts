import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: '.env' }),
        TypeOrmModule.forRoot(),
        ServeStaticModule.forRoot({ rootPath: `${process.cwd()}/public` }),
        MessageModule,
        UserModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
