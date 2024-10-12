import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';
import { UserPost } from './user_post.entity';


@Entity('post_likes')
export class PostLikes {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.postLikes)
    user: User;

    @ManyToOne(() => UserPost, (post) => post.id)
    post: UserPost;

    @CreateDateColumn({ name: 'registered_at' })
    registeredAt: Date;
}
