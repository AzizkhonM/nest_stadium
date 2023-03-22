import { Injectable } from '@nestjs/common';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { InjectModel } from '@nestjs/sequelize';
import { District } from './entities/district.entity';

@Injectable()
export class DistrictsService {
  constructor(@InjectModel(District) private districtRepo: typeof District){}
  
  async create(createDistrictDto: CreateDistrictDto) {
    return await this.districtRepo.create(createDistrictDto);
  }

  async findAll() {
    return await this.districtRepo.findAll({
      include: {
        all: true
      }
    });
  }

  async findOne(id: number) {
    return await this.districtRepo.findOne({
      where: {
        id: id
      },
      include: {
        all: true
      }
    });
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    return await this.districtRepo.update(updateDistrictDto, {
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    return await this.districtRepo.destroy({
      where: {
        id: id
      }
    })
  }
}
