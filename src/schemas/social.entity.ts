import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserProfile } from './user_profile.entity';

@Entity('social')
export class Social {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserProfile, (profile) => profile.socialMedia)
    userProfile: UserProfile;

    @Column({ length: 100 })
    youtube: string;

    @Column({ length: 100 })
    facebook: string;

    @Column({ length: 100 })
    twitter: string;

    @Column({ length: 100 })
    instagram: string;
}
