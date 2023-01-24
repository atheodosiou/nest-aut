import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateAppDto } from './dto/create-app.dto';
import { App, AppDocument } from './schemas/apps.schema';

@Injectable()
export class AppsRepository {
  constructor(@InjectModel(App.name) private appModel: Model<AppDocument>) {}

  async findOne(appFilterQuery: FilterQuery<App>): Promise<App> {
    return this.appModel.findOne(appFilterQuery);
  }

  async find(appFilterQuery: FilterQuery<App>): Promise<App[]> {
    return this.appModel.find(appFilterQuery);
  }

  async create(app: CreateAppDto): Promise<App> {
    const newApp = new this.appModel(app);
    return newApp.save();
  }

  async findOneAndUpdate(
    appFilterQuery: FilterQuery<App>,
    app: Partial<App>,
  ): Promise<App> {
    return this.appModel.findOneAndUpdate(appFilterQuery, app, {
      new: true,
    });
  }
}
