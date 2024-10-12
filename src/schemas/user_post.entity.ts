import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('user_post')
export class UserPost {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @Column({ name: 'post_text', length: 255 })
    postText: string;

    @Column({ name: 'post_name', length: 255 })
    postName: string;

    @Column({ name: 'id_like' })
    idLike: number;

    @CreateDateColumn({ name: 'registered_at' })
    registeredAt: Date;
}
