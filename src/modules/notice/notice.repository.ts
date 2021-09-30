import { NotFoundException } from '@nestjs/common'
import { CreateNoticeDTO } from 'src/modules/notice/dto/create-notice.dto'
import { Notice } from 'src/entitys/notice.entity'
import { NoticeStatus } from 'src/modules/notice/models/notice-status.enum'
import { EntityRepository, Repository } from 'typeorm'
import { User } from 'src/entitys/user.entity'

// 데이터베이스 관련 일 (insert, Find, delete.. 등등)
@EntityRepository(Notice)
export class NoticeRepository extends Repository<Notice> {
  async createNotice(createNoticeDto: CreateNoticeDTO, user: User): Promise<Notice> {
    const { title, description } = createNoticeDto

    const notice = this.create({
      title,
      description,
      status: NoticeStatus.PUBLIC,
      user,
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

  async getAllNotice(user: User): Promise<Notice[]> {
    const query = this.createQueryBuilder('notice')
    query.where('notice.userId = :userId', { userId: user.id })
    const notice = await query.getMany()

    return notice
  }
}
