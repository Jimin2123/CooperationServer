import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CreateNoticeDTO } from 'src/modules/notice/dto/create-notice.dto'
import { Notice } from 'src/entitys/notice.entity'
import { NoticeStatus } from 'src/modules/notice/models/notice-status.enum'
import { NoticeRepository } from './notice.repository'
import { User } from 'src/entitys/user.entity'

@Injectable()
export class NoticeService {
  constructor(@InjectRepository(NoticeRepository) private noticeRepository: NoticeRepository) {}

  async createNotice(createNoticeDto: CreateNoticeDTO, user: User): Promise<Notice> {
    return this.noticeRepository.createNotice(createNoticeDto, user)
  }

  async getNoticeById(id: number): Promise<Notice> {
    return this.noticeRepository.getNoticeById(id)
  }

  async deleteNotice(id: number): Promise<void> {
    return this.noticeRepository.deleteNotice(id)
  }

  async updateNotice(id: number, status: NoticeStatus): Promise<Notice> {
    return this.noticeRepository.updateNotice(id, status)
  }

  async getAllNotice(user: User): Promise<Notice[]> {
    return this.noticeRepository.getAllNotice(user)
  }
}
