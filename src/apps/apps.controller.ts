import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AppsService } from './apps.service';
import { CreateAppDto } from './dto/create-app.dto';
import { App } from './schemas/apps.schema';

@Controller('apps')
export class AppsController {
  constructor(private readonly appsService: AppsService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':appId')
  async getUser(@Param('appId') appId: string): Promise<App> {
    return this.appsService.getAppById(appId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getApps(): Promise<App[]> {
    return this.appsService.getApps();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createApp(@Body() createAppDto: CreateAppDto): Promise<App> {
    return this.appsService.createApp(createAppDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':appId')
  async updateUser(
    @Param('appId') appId: string,
    @Body() updateAppDto: Partial<CreateAppDto>,
  ): Promise<App> {
    return this.appsService.updateApp(appId, updateAppDto);
  }
}
