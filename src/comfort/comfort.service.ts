import { Injectable } from '@nestjs/common';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Comfort } from './entities/comfort.entity';

@Injectable()
export class ComfortService {
  constructor(@InjectModel(Comfort) private  comfortRepo: typeof Comfort){}

  async create(createComfortDto: CreateComfortDto) {
    return await this.comfortRepo.create(createComfortDto);
  }

  async findAll() {
    return await this.comfortRepo.findAll({
      include:{all:true}
    })
  }

  async findOne(id: number) {
    return await this.comfortRepo.findOne({
      where:{
        id: id
      },
      include:{all:true}
    });
  }

  async update(id: number, updateComfortDto: UpdateComfortDto) {
    return await this.comfortRepo.update(updateComfortDto,{
      where:{
        id: id
      }
    });
  }

  async remove(id: number) {
    return await this.comfortRepo.destroy({
      where:{
        id: id
      }
    });
  }
}
