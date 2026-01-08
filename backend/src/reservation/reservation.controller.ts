import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';

@Controller('reservations')
export class ReservationController {
    constructor(private reservationService: ReservationService) { }

    @Get()
    findAll() {
        return this.reservationService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.reservationService.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.reservationService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.reservationService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.reservationService.remove(+id);
    }
}