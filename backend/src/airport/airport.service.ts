import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Airport } from '../entities/airport.entity';

@Injectable()
export class AirportService {
    constructor(
        @InjectRepository(Airport)
        private airportRepository: Repository<Airport>,
    ) { }

    findAll() {
        return this.airportRepository.find();
    }

    findOne(id: number) {
        return this.airportRepository.findOne({ where: { id } });
    }

    create(data: any) {
        const airport = this.airportRepository.create(data);
        return this.airportRepository.save(airport);
    }

    async update(id: number, data: any) {
        await this.airportRepository.update(id, data);
        return this.findOne(id);
    }

    async remove(id: number) {
        await this.airportRepository.delete(id);
        return { message: 'Airport deleted' };
    }
}