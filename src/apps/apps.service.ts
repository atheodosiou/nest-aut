import { Injectable } from '@nestjs/common';
import { AppsRepository } from './apps.repository';
import { CreateAppDto } from './dto/create-app.dto';
import { App } from './schemas/apps.schema';

@Injectable()
export class AppsService {
  constructor(private readonly appRepository: AppsRepository) {}

  async getAppById(userId: string): Promise<App> {
    return this.appRepository.findOne({ userId });
  }

  async getApps(): Promise<App[]> {
    return this.appRepository.find({});
  }

  async createApp(app: CreateAppDto): Promise<App> {
    return this.appRepository.create(app);
  }

  async updateApp(
    appId: string,
    appUpdates: Partial<CreateAppDto>,
  ): Promise<App> {
    return this.appRepository.findOneAndUpdate({ _id: appId }, appUpdates);
  }
}
