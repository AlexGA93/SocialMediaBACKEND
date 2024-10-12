import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserProfile } from './user_profile.entity';


@Entity('experience')
export class Experience {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserProfile, (profile) => profile.experiences)
    userProfile: UserProfile;

    @Column({ length: 100 })
    title: string;

    @Column({ length: 255 })
    company: string;

    @Column({ length: 100 })
    location: string;

    @Column({ name: 'exp_from' })
    expFrom: Date;

    @Column({ name: 'exp_to' })
    expTo: Date;

    @Column()
    current: boolean;

    @Column({ length: 255 })
    description: string;
}
