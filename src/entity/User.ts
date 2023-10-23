import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, OneToOne } from "typeorm"
import { Token } from "./Token";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column()
    name?: string;

    @Column()
    email?: string;

    @Column()
    password?: string;

    @Column({ default: '' })
    iconImageUrl?: string;

    @OneToOne(type => Token, token => token.user,{
        cascade: true,
    })
    token?: Token;
}