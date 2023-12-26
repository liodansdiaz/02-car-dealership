import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { CarsService } from 'src/cars/cars.service';
import { BrandsService } from 'src/brands/brands.service';
import { CarsModule } from 'src/cars/cars.module';
import { BrandsModule } from 'src/brands/brands.module';

@Module({
  imports: [CarsModule, BrandsModule],
  controllers: [SeedController],
  providers: [SeedService],
})
export class SeedModule {}
