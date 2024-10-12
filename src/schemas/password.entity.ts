import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';


@Entity('password')
export class Password {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'id_user', type: 'int' })
    id_user: number;

    @Column({ name: 'user_password' , type: 'varchar', length: 255})
    user_password: string;

    @CreateDateColumn({ name: 'registered_at' })
    registeredAt: Date;


    @OneToOne(() => User, (user) => user.id, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'id_user' }) // Establish the join column
    user: User;
}