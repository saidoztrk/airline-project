import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { AirportModule } from './airport/airport.module';
import { FlightModule } from './flight/flight.module';
import { ReservationModule } from './reservation/reservation.module';
import { User } from './entities/user.entity';
import { Airport } from './entities/airport.entity';
import { Flight } from './entities/flight.entity';
import { Reservation } from './entities/reservation.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [User, Airport, Flight, Reservation],
      synchronize: true,
    }),
    AuthModule,
    AirportModule,
    FlightModule,
    ReservationModule, // ← Eklendi
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }