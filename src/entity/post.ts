import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne, IntegerType, } from "typeorm"
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({
        default: '',
    })
    body?: string;

    @Column()
    userId?: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: string;

    @ManyToOne(() => User, (user) => user.post)
    user?: User;
}