import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import {
  ParkingLocationCreateDto,
  ParkingLocationUpdateDto,
} from './dto/parking-locations.dto';
import { ParkingLocationsService } from './parking-locations.service';
import { ParkingLocation } from './schemas/parking-locations.schema';

@Controller('parking-locations')
export class ParkingLocationsController {
  constructor(
    private readonly parkingLocationsService: ParkingLocationsService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('/park')
  async park(
    @Req() requst: any,
    @Body() body: ParkingLocationCreateDto,
  ): Promise<ParkingLocation> {
    const userId = requst?.user?._id;
    return this.parkingLocationsService.park({ userId, ...body });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/unpark/:id')
  async unpark(
    @Param('id') id: string,
    @Req() requst: any,
  ): Promise<ParkingLocation> {
    const userId = requst?.user?._id;
    return this.parkingLocationsService.unpark(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/parked')
  async getActiveParkingLocation(@Req() requst: any): Promise<ParkingLocation> {
    const userId = requst?.user?._id;
    return this.parkingLocationsService.getActiveParkingLocation(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getParkingLocations(@Req() requst: any): Promise<ParkingLocation[]> {
    const userId = requst?.user?._id;
    return this.parkingLocationsService.getParkingLocations(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getParkingLocation(
    @Param('id') id: string,
    @Req() requst: any,
  ): Promise<ParkingLocation> {
    const userId = requst?.user?._id;
    return this.parkingLocationsService.getParkingLocationById(userId, id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(
    @Body() body: ParkingLocationCreateDto,
    @Req() request: any,
  ): Promise<ParkingLocation> {
    const userId = request?.user?._id;
    return this.parkingLocationsService.createParkingLocation({
      userId,
      ...body,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateParkingLocation(
    @Param('id') id: string,
    @Req() request: any,
    @Body() updates: any,
  ): Promise<ParkingLocation> {
    const uId = request?.user?._id;
    const { _id, userId, createdAt, updatedAt, __v, ...result } = updates;
    return this.parkingLocationsService.updateParkingLocation(uId, id, result);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteParkingLocation(
    @Param('id') id: string,
    @Req() request: any,
  ): Promise<{ message: string }> {
    const userId = request?.user?._id;
    const result = await this.parkingLocationsService.deleteParkingLocation(
      userId,
      id,
    );
    if (result.acknowledged && result.deletedCount > 0) {
      return { message: 'Parking location deleted successfully' };
    } else if (result.acknowledged && result.deletedCount === 0) {
      return { message: 'Parking location was not found' };
    } else {
      return { message: 'Deletion of the parking location faild' };
    }
  }
}
