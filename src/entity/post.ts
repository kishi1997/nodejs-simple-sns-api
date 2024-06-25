import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { User } from './User'
import { Message } from './Message'

@Entity()
export class Post extends BaseEntity {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({
    default: '',
  })
  body?: string

  @Column()
  userId?: number

  @CreateDateColumn()
  readonly createdDate?: Date

  @UpdateDateColumn()
  readonly updatedDate?: Date

  @ManyToOne(() => User, user => user.post)
  user?: User

  @OneToMany(() => Message, message => message.post)
  messages?: Message[]
}
