import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { AirportService } from './airport.service';

@Controller('airports')
export class AirportController {
    constructor(private airportService: AirportService) { }

    @Get()
    findAll() {
        return this.airportService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.airportService.findOne(+id);
    }

    @Post()
    create(@Body() body: any) {
        return this.airportService.create(body);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() body: any) {
        return this.airportService.update(+id, body);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.airportService.remove(+id);
    }
}