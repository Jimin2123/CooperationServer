import { Module } from '@nestjs/common'
import { NoticeModule } from './modules/notice/notice.module'
import { DiscordModule } from './modules/discord/discord.module'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeORMConfig } from './configs/typeorm-config'
import { AuthModule } from './modules/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    NoticeModule,
    DiscordModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      // envFilePath: `.env${process.env.NODE_ENV ? `, ${process.env.NODE_ENV}` : ''}`,
    }),
    AuthModule,
  ],
})
export class AppModule {}
