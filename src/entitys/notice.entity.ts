import { NoticeStatus } from 'src/modules/notice/models/notice-status.enum'
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { User } from './user.entity'

@Entity()
export class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  status: NoticeStatus

  @ManyToOne(type => User, user => user.notice, { eager: false })
  user: User
}
