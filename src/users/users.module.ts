import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from '../mail/mail.module';
import { BotModule } from '../bot/bot.module';
import { OtpModule } from '../otp/otp.module';
import { Otp } from '../otp/entities/otp.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Otp]), JwtModule.register({}), MailModule, BotModule, OtpModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
