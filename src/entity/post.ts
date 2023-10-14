import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm"

@Entity()
export class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id?: string;

    @Column({
        type: 'varchar',
        length: 300,
    })
    text?: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt?: Date;
}
export default Post