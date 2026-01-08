import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { FlightService } from './flight.service';

@Controller('flights')
export class FlightController {
    constructor(private flightService: FlightService) { }

    @Get()
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.flightService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.flightService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.flightService.remove(+id);
    }
}