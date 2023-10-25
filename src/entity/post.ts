import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, JoinColumn, ManyToOne, } from "typeorm"
import { User } from "./User";

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({
        default: '',
        type: 'varchar',
        length: 300,
    })
    body?: string;

    @Column()
    userId?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;

    @ManyToOne(() => User, (user) => user.post)
    user?: User;
}