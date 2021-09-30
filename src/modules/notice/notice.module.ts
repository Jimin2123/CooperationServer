import { Module } from '@nestjs/common'
import { NoticeService } from './notice.service'
import { NoticeController } from './notice.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NoticeRepository } from './notice.repository'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([NoticeRepository]), AuthModule],
  providers: [NoticeService],
  controllers: [NoticeController],
})
export class NoticeModule {}
