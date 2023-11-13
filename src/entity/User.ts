import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, OneToMany } from "typeorm"
import { Post } from "./Post";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    name?: string;

    @Column()
    email?: string;

    @Column()
    password?: string;

    @Column({ default: '' })
    iconImageUrl?: string;

    @OneToMany(() => Post, (post) => post.user)
    post?: Post[];
}