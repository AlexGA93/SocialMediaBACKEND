import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './users.entity';
import { Experience } from './experience.entity';
import { Education } from './education.entity';
import { Social } from './social.entity';

@Entity('user_profile')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  id_user: number;

  @Column({ length: 100 })
  company: string;

  @Column({ length: 100 })
  website: string;

  @Column({ length: 100 })
  location: string;

  @Column({ length: 100 })
  user_status: string;

  @Column({ length: 255 })
  skills: string;

  @Column({ length: 255 })
  bio: string;

  @Column({ length: 255 })
  github: string;
  
  @OneToMany(() => Experience, (experience) => experience.userProfile, { cascade: true })
  experiences: Experience[];

  @OneToMany(() => Education, (education) => education.userProfile, { cascade: true })
  educations: Education[];

  @OneToMany(() => Social, (social) => social.userProfile, { cascade: true })
  socialMedia: Social[];
}