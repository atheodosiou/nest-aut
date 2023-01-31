export class ParkingLocationUpdateDto {
  latitude: number;
  longitude: number;
  vehicle: string;
  parkedAt: string;
  active: boolean;
  notes?: string;
}

export class ParkingLocationCreateDto extends ParkingLocationUpdateDto {
  userId: string;
}
