import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './User';

@Entity()
export class Token {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ default: '' })
    token?: string;

    @Column()
    userId?: string;

    @OneToOne(type => User, user => user.token)
    @JoinColumn()
    user?: User
}
