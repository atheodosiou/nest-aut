import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { ParkingLocationCreateDto } from './dto/parking-locations.dto';
import { ParkingLocation } from './schemas/parking-locations.schema';
import { DeleteResult } from '../common/interfaces/delete-result.interface';

@Injectable()
export class ParkingLocationsRepository {
  constructor(
    @InjectModel(ParkingLocation.name)
    private parkingModel: Model<ParkingLocation>,
  ) {}

  async findOne(
    parkingLocationFilterQuery: FilterQuery<ParkingLocation>,
  ): Promise<ParkingLocation> {
    return this.parkingModel.findOne(parkingLocationFilterQuery);
  }

  async find(
    parkingLocationFilterQuery: FilterQuery<ParkingLocation>,
  ): Promise<ParkingLocation[]> {
    return this.parkingModel.find(parkingLocationFilterQuery);
  }

  async create(user: ParkingLocationCreateDto): Promise<ParkingLocation> {
    const newUser = new this.parkingModel(user);
    return newUser.save();
  }

  async findOneAndUpdate(
    parkingLocationFilterQuery: FilterQuery<ParkingLocation>,
    pLocation: Partial<ParkingLocation>,
  ): Promise<ParkingLocation> {
    return this.parkingModel.findOneAndUpdate(
      parkingLocationFilterQuery,
      pLocation,
      {
        new: true,
      },
    );
  }

  async findOneAndDelete(
    parkingLocationFilterQuery: FilterQuery<ParkingLocation>,
  ): Promise<DeleteResult> {
    return this.parkingModel.deleteOne(parkingLocationFilterQuery);
  }
}
