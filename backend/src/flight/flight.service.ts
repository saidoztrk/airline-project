import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flight } from '../entities/flight.entity';

@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Flight)
        private flightRepository: Repository<Flight>,
    ) { }

    findAll() {
        return this.flightRepository.find({
            relations: ['departureAirport', 'arrivalAirport'],
        });
    }

    findOne(id: number) {
        return this.flightRepository.findOne({
            where: { id },
            relations: ['departureAirport', 'arrivalAirport'],
        });
    }

    create(data: any) {
        const flight = this.flightRepository.create(data);
        return this.flightRepository.save(flight);
    }

    async update(id: number, data: any) {
        await this.flightRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.flightRepository.delete(id);
        return { message: 'Flight deleted' };
    }
}