import { NotFoundException } from '@nestjs/common'
import { CreateNoticeDTO } from 'src/notice/dto/create-notice.dto'
import { Notice } from 'src/util/entitys/notice.entity'
import { NoticeStatus } from 'src/notice/models/notice-status.enum'
import { EntityRepository, Repository } from 'typeorm'

// 데이터베이스 관련 일 (insert, Find, delete.. 등등)
@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  async createNotice(createNoticeDto: CreateNoticeDTO): Promise<Notice> {
    const { title, description } = createNoticeDto

    const notice = this.create({
      title,
      description,
      status: NoticeStatus.PUBLIC,
    })
    // 데이터베이스에 저장
    await this.save(notice)
    return notice
  }

  async getNoticeById(id: number): Promise<Notice> {
    const found = await this.findOne(id)
    if (!found) throw new NotFoundException(`Can't find Notice with id ${id}`)
    return found
  }

  async deleteNotice(id: number): Promise<void> {
    const result = await this.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Notice with id : ${id}`)
    }
  }

  async updateNotice(id: number, status: NoticeStatus): Promise<Notice> {
    const notice = await this.getNoticeById(id)
    notice.status = status
    await this.save(notice)
    return notice
  }

  async getAllNotice(): Promise<Notice[]> {
    return this.find()
  }
}
