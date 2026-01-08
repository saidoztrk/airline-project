import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Flight } from './flight.entity';

@Entity('airports')
export class Airport {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true, length: 3 })
    code: string;

    @Column()
    name: string;

    @Column()
    city: string;

    @Column()
    country: string;

    @OneToMany(() => Flight, flight => flight.departureAirport)
    departingFlights: Flight[];

    @OneToMany(() => Flight, flight => flight.arrivalAirport)
    arrivingFlights: Flight[];
}