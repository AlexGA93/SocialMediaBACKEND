import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserProfile } from './user_profile.entity';


@Entity('education')
export class Education {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => UserProfile, (profile) => profile.educations)
    userProfile: UserProfile;

    @Column({ length: 100 })
    school: string;

    @Column({ length: 255 })
    degree: string;

    @Column({ name: 'fieldofstudy', length: 100 })
    fieldOfStudy: string;

    @Column({ name: 'exp_from' })
    expFrom: Date;

    @Column({ name: 'exp_to' })
    expTo: Date;

    @Column()
    current: boolean;

    @Column({ length: 255 })
    description: string;
}
