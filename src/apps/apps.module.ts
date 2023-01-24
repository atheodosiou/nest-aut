import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppsController } from './apps.controller';
import { AppsRepository } from './apps.repository';
import { AppsService } from './apps.service';
import { App, AppSchema } from './schemas/apps.schema';

@Module({
  controllers: [AppsController],
  imports: [MongooseModule.forFeature([{ name: App.name, schema: AppSchema }])],
  providers: [AppsRepository, AppsService],
})
export class AppsModule {}
