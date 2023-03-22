import { Injectable } from '@nestjs/common';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserCard } from './entities/user_card.entity';

@Injectable()
export class UserCardService {
  constructor(@InjectModel(UserCard) private userCardRepo: typeof UserCard){}

  async create(createUserCardDto: CreateUserCardDto) {
    return  await this.userCardRepo.create(createUserCardDto);
  }

  async findAll() {
    return  await this.userCardRepo.findAll({
      include:{all:true}
    });
  }

  async findOne(id: number) {
    return await this.userCardRepo.findOne({
      where:{
        id: id
      },
      include:{all:true}
    });
  }

  update(id: number, updateUserCardDto: UpdateUserCardDto) {
    return `This action updates a #${id} userCard`;
  }

  remove(id: number) {
    return `This action removes a #${id} userCard`;
  }
}
