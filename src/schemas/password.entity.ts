import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { User } from './users.entity';


@Entity('password')
export class Password {
    @PrimaryGeneratedColumn()
    id: number;

    // 'id_user' será la clave foránea que hace referencia a 'User.id'
    @OneToOne(() => User)
    @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
    user: User;

    @Column({ type: 'varchar', length: 255 })
    user_password: string;

    @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
    registered_at: Date;
    
}