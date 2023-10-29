import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToOne, OneToMany } from "typeorm"
import { Token } from "./Token";
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

    @OneToOne(() => Token, (token) => token.user,{
        cascade: true,
    })
    token?: Token;

    @OneToMany(() => Post, (post) => post.user)
    post?: Post[];
}