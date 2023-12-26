import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { CarsService } from './cars.service';
import { AppModule } from '../app.module';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('cars')
// @UsePipes( ValidationPipe)
export class CarsController {
  
  
  constructor(
    private readonly carsService: CarsService
  ){}
  
  
  @Get()
  AllCars()
  {
    return this.carsService.getAll();
  }

  @Get(':id')
  getCarById(@Param('id', ParseUUIDPipe) id: string)
  {
    return this.carsService.getOneById(id);
  }

  @Post()
  createCar(
    @Body() createCarDto: CreateCarDto)
  {

    return this.carsService.create(createCarDto);
  }

  @Patch(':id')
  updateCar(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCarDto: UpdateCarDto)
  {
    return this.carsService.update(id, updateCarDto);  
  }

  @Delete(':id')
  deleteCar(@Param('id', ParseUUIDPipe) id: string)
  {
      return this.carsService.deleteCars(id); 
        
  }
  
}
