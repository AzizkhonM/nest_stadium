import { Module } from '@nestjs/common';
import { DistrictsService } from './districts.service';
import { DistrictsController } from './districts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './entities/district.entity';

@Module({
  imports: [SequelizeModule.forFeature([District])],
  controllers: [DistrictsController],
  providers: [DistrictsService]
})
export class DistrictsModule {}
