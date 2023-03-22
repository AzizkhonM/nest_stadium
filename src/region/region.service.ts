import { Injectable } from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Region } from './entities/region.entity';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepo: typeof Region){}

  async create(createRegionDto: CreateRegionDto) {
    return await this.regionRepo.create(createRegionDto)
  }

  async findAll() {
    return await this.regionRepo.findAll({
      include: {
        all: true
      }
    });
  }

  async findOne(id: number) {
    return await this.regionRepo.findOne({
      where: {
        id: id
      },
      include: {
        all: true
      }
    });
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    return await this.regionRepo.update(updateRegionDto, {
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    return await this.regionRepo.destroy({
      where: {
        id: id
      }
    });
  }
}
