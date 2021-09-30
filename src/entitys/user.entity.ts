import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm'
import { Notice } from './notice.entity'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  username: string

  @Column()
  password: string

  @OneToMany(type => Notice, notice => notice.user, { eager: true })
  notice: Notice[]
}
