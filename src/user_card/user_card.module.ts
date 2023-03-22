import { Module } from '@nestjs/common';
import { UserCardService } from './user_card.service';
import { UserCardController } from './user_card.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCard } from './entities/user_card.entity';

@Module({
  imports: [SequelizeModule.forFeature([UserCard])],
  controllers: [UserCardController],
  providers: [UserCardService]
})
export class UserCardModule {}
