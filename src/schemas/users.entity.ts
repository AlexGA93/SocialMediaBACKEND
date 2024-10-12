import { Entity, Column, PrimaryGeneratedColumn, Check, JoinColumn, OneToOne, OneToMany } from 'typeorm';
import { Password } from './password.entity';
import { UserProfile } from './user_profile.entity';
import { PostLikes } from './post_likes.entity';
import { UserPost } from './user_post.entity';

@Entity('users')
@Check('age > 18')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  second_name: string;

  @Column()
  age: number;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 10 })
  role: string;

  @Column({ type: 'timestamp' })
  registered_at: Date;

  @OneToOne(() => Password, (password) => password.user, { cascade: true })
  @JoinColumn({ name: 'id_user' })
  password: Password;

  @OneToOne(() => UserProfile, (profile) => profile.id, { cascade: true })
  @JoinColumn({ name: 'id_user' })
  profile: UserProfile;

  @OneToMany(() => UserPost, (post) => post.id, { cascade: true })
  posts: UserPost[];

  @OneToMany(() => PostLikes, (like) => like.id, { cascade: true })
  postLikes: PostLikes[];
}
