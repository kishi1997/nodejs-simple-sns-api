import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne, UpdateDateColumn, CreateDateColumn, } from "typeorm"
import { User } from "./User";
import { Post } from "./Post";
import { Room } from "./Room";

@Entity()
export class Message extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    content?: string;

    @Column()
    userId?: number;

    @Column()
    roomId?: string;

    @Column({ nullable: true })
    postId?: number

    @CreateDateColumn()
    readonly createdDate?: Date

    @UpdateDateColumn()
    readonly updatedDate?: Date

    @ManyToOne(() => User, (user) => user.messages)
    user?: User;

    @ManyToOne(() => Post, (post) => post.messages)
    post?: Post;

    @ManyToOne(() => Room, (room) => room.messages)
    room?: Room;
}