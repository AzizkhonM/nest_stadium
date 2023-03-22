import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ComfortModule } from './comfort/comfort.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comfort } from './comfort/entities/comfort.entity';
import { ConfigModule } from '@nestjs/config';
import { RegionModule } from './region/region.module';
import { DistrictsModule } from './districts/districts.module';
import { UsersModule } from './users/users.module';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserCardModule } from './user_card/user_card.module';
import { MailModule } from './mail/mail.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { BOT_NAME } from './app.constants';
import { Bot } from './bot/models/bot.model';
import { User } from './users/entities/user.entity';
import { UserWallet } from './user_wallet/entities/user_wallet.entity';
import { UserCard } from './user_card/entities/user_card.entity';
import { OtpModule } from './otp/otp.module';
import { Region } from './region/entities/region.entity';
import { District } from './districts/entities/district.entity';
import { BotModule } from './bot/bot.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => ({
        token: process.env.BOT_TOKEN,
        middlewares: [],
        include: [BotModule]
      })
    }),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [User, Bot, UserWallet, UserCard, Region, District, Comfort],
      autoLoadModels: true,
      logging: false,
    }),
    ComfortModule,
    RegionModule,
    DistrictsModule,
    UsersModule,
    UserWalletModule,
    UserCardModule,
    MailModule,
    OtpModule,
    BotModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
