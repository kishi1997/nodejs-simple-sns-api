import { Entity, PrimaryGeneratedColumn, BaseEntity, CreateDateColumn, UpdateDateColumn, Column, OneToMany, } from "typeorm"
import { Message } from "./Message";

@Entity()
export class Room extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id?: string;

    @Column()
    usersId?: string

    @CreateDateColumn()
    readonly createdDate?: Date

    @UpdateDateColumn()
    readonly updatedDate?: Date

    @OneToMany(()=> Message, (message)=> message.room)
    messages?: Message[];
}