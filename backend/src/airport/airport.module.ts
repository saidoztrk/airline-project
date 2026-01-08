import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportController } from './airport.controller';
import { AirportService } from './airport.service';
import { Airport } from '../entities/airport.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Airport])],
    controllers: [AirportController],
    providers: [AirportService],
})
export class AirportModule { }