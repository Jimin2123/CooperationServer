import { Module } from '@nestjs/common'
import { UserModule } from './user/user.module'
import { NoticeModule } from './notice/notice.module'
import { DiscordModule } from './discord/discord.module'

@Module({
  imports: [UserModule, NoticeModule, DiscordModule],
})
export class AppModule {}
