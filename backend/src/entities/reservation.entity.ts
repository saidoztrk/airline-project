import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Flight } from './flight.entity';

@Entity('reservations')
export class Reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, user => user.reservations)
    user: User;

    @ManyToOne(() => Flight, flight => flight.reservations)
    flight: Flight;

    @Column()
    passengerName: string;

    @Column()
    seatNumber: string;

    @Column({ default: 'confirmed' })
    status: string;

    @CreateDateColumn()
    reservationDate: Date;
}