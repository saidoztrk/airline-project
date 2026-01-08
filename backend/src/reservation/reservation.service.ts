import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from '../entities/reservation.entity';

@Injectable()
export class ReservationService {
    constructor(
        @InjectRepository(Reservation)
        private reservationRepository: Repository<Reservation>,
    ) { }

    findAll() {
        return this.reservationRepository.find({
            relations: ['user', 'flight', 'flight.departureAirport', 'flight.arrivalAirport'],
        });
    }

    findOne(id: number) {
        return this.reservationRepository.findOne({
            where: { id },
            relations: ['user', 'flight', 'flight.departureAirport', 'flight.arrivalAirport'],
        });
    }

    create(data: any) {
        const reservation = this.reservationRepository.create(data);
        return this.reservationRepository.save(reservation);
    }

    async update(id: number, data: any) {
        await this.reservationRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.reservationRepository.delete(id);
        return { message: 'Reservation deleted' };
    }
}