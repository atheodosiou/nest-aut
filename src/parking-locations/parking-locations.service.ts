import { Injectable } from '@nestjs/common';
import { DeleteResult } from 'src/common/interfaces/delete-result.interface';
import {
  ParkingLocationCreateDto,
  ParkingLocationUpdateDto,
} from './dto/parking-locations.dto';
import { ParkingLocationsRepository } from './parking-locations.repository';
import { ParkingLocation } from './schemas/parking-locations.schema';

@Injectable()
export class ParkingLocationsService {
  constructor(
    private readonly parkinLocationsRepository: ParkingLocationsRepository,
  ) {}

  async park(
    parkingLocation: ParkingLocationCreateDto,
  ): Promise<ParkingLocation> {
    return this.parkinLocationsRepository.create({
      active: true,
      ...parkingLocation,
    });
  }

  async getActiveParkingLocation(userId: string): Promise<ParkingLocation> {
    return this.parkinLocationsRepository.findOne({ userId, active: true });
  }

  async unpark(userId: string, pLocId: string): Promise<ParkingLocation> {
    return this.parkinLocationsRepository.findOneAndUpdate(
      { userId, _id: pLocId },
      { active: false },
    );
  }

  async getParkingLocationById(
    userId: string,
    pLocId: string,
  ): Promise<ParkingLocation> {
    return this.parkinLocationsRepository.findOne({ userId, _id: pLocId });
  }

  async getParkingLocations(userId: string): Promise<ParkingLocation[]> {
    return this.parkinLocationsRepository.find({ userId, active: false });
  }

  async createParkingLocation(
    parkingLocation: ParkingLocationCreateDto,
  ): Promise<ParkingLocation> {
    return this.parkinLocationsRepository.create(parkingLocation);
  }

  async updateParkingLocation(
    userId: string,
    pLocId: string,
    pLocUpdates: ParkingLocationUpdateDto,
  ): Promise<ParkingLocation> {
    return this.parkinLocationsRepository.findOneAndUpdate(
      { _id: pLocId, userId },
      pLocUpdates,
    );
  }

  async deleteParkingLocation(
    userId: string,
    pLocId: string,
  ): Promise<DeleteResult> {
    return this.parkinLocationsRepository.findOneAndDelete({
      _id: pLocId,
      userId,
    });
  }
}
