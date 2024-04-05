import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Post } from './Post'
import { Message } from './Message'
import { RoomUser } from './RoomUser'

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @Column()
  email?: string

  @Column()
  password?: string

  @Column({ default: '' })
  iconImageUrl?: string

  @CreateDateColumn()
  readonly createdDate?: Date

  @UpdateDateColumn()
  readonly updatedDate?: Date

  @OneToMany(() => Post, post => post.user)
  post?: Post[]

  @OneToMany(() => Message, message => message.user)
  messages?: Message[]

  @OneToOne(() => RoomUser, roomUser => roomUser.user)
  room_user?: RoomUser[]
}
