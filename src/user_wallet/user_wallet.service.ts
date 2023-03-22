import { Injectable } from '@nestjs/common';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserWallet } from './entities/user_wallet.entity';

@Injectable()
export class UserWalletService {
  constructor(@InjectModel(UserWallet) private userWalletRepo: typeof UserWallet){}

  async create(createUserWalletDto: CreateUserWalletDto) {
    return await this.userWalletRepo.create(createUserWalletDto);
  }

  async findAll() {
    return await this.userWalletRepo.findAll({
      include: {
        all: true
      }
    });
  }

  async findOne(id: number) {
    return await this.userWalletRepo.findOne({
      where:{
        id: id
      },
      include:{all:true}
    });
  }

  update(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    return `This action updates a #${id} userWallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} userWallet`;
  }
}
