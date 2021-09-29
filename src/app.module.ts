import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { NoticeModule } from './notice/notice.module'
import { DiscordModule } from './discord/discord.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeORMConfig } from './configs/typeorm-config'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    UserModule,
    NoticeModule,
    DiscordModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // envFilePath: `.env${process.env.NODE_ENV ? `, ${process.env.NODE_ENV}` : ''}`,
    }),
  ],
})
export class AppModule {}
