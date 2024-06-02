import {
  Entity,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
  ManyToOne,
} from 'typeorm'
import { User } from './User'
import { Room } from './Room'

@Entity()
export class RoomUser extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  userId?: number

  @Column()
  roomId?: string

  @CreateDateColumn()
  readonly createdDate?: Date

  @UpdateDateColumn()
  readonly updatedDate?: Date

  @ManyToOne(() => Room, room => room.roomUsers)
  room?: Room

  @ManyToOne(() => User, user => user.roomUsers)
  user?: User
}
