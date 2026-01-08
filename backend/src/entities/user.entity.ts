import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Reservation } from './reservation.entity';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column({ default: 'customer' })
    role: string;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Reservation, reservation => reservation.user)
    reservations: Reservation[];
}