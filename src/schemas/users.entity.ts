import { Entity, Column, PrimaryGeneratedColumn, Check, JoinColumn, OneToOne, OneToMany, Unique, CreateDateColumn } from 'typeorm';

@Entity('users')
@Check('age > 18')
@Unique(['email'])
export class User {
  
  @PrimaryGeneratedColumn() // id autoincrement
  id: number;

  @Column({ type: 'varchar', length: 100 })
  first_name: string;

  @Column({ type: 'varchar', length: 100 })
  second_name: string;

  @Column({ type: 'int', width: 3 })
  age: number;

  @Column({ type: 'varchar', length: 100 })
  email: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: string;

  @CreateDateColumn({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Cambiar 'timestamp' a 'datetime'
  registered_at: Date;
}
