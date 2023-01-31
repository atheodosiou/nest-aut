import { Module } from '@nestjs/common';
import { ParkingLocationsService } from './parking-locations.service';
import { ParkingLocationsController } from './parking-locations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ParkingLocation,
  ParkingLocationSchema,
} from './schemas/parking-locations.schema';
import { ParkingLocationsRepository } from './parking-locations.repository';

@Module({
  controllers: [ParkingLocationsController],
  imports: [
    MongooseModule.forFeature([
      { name: ParkingLocation.name, schema: ParkingLocationSchema },
    ]),
  ],
  providers: [ParkingLocationsRepository, ParkingLocationsService],
})
export class ParkingLocationsModule {}
