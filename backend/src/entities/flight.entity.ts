import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';
import { Airport } from './airport.entity';
import { Reservation } from './reservation.entity';

@Entity('flights')
export class Flight {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    flightNumber: string;

    @ManyToOne(() => Airport, airport => airport.departingFlights)
    departureAirport: Airport;

    @ManyToOne(() => Airport, airport => airport.arrivingFlights)
    arrivalAirport: Airport;

    @Column({ type: 'datetime' })
    departureTime: Date;

    @Column({ type: 'datetime' })
    arrivalTime: Date;

    @Column({ type: 'real' })
    price: number;

    @Column({ default: 180 })
    availableSeats: number;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Reservation, reservation => reservation.flight)
    reservations: Reservation[];
}