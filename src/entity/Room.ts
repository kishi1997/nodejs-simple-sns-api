import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  OneToMany,
  OneToOne,
} from 'typeorm'
import { Message } from './Message'
import { RoomUser } from './RoomUser'

@Entity()
export class Room extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id?: string

  @Column()
  usersId?: string

  @CreateDateColumn()
  readonly createdDate?: Date

  @UpdateDateColumn()
  readonly updatedDate?: Date

  @OneToMany(() => Message, message => message.room)
  messages?: Message[]

  @OneToMany(() => RoomUser, roomUser => roomUser.room)
  roomUsers?: RoomUser[]
}
