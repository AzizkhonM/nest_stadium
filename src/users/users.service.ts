import { BadRequestException, ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { Op } from "sequelize"
import * as bcrypt from "bcrypt"
import { v4 as uuidv4, v4 } from "uuid"
import { LoginUserDto } from './dto/login_user.dto';
import { MailService } from '../mail/mail.service';
import { PhoneUserDto } from './dto/phone-user.dto';
import * as otpGenerator from "otp-generator"
import { BotService } from '../bot/bot.service';
import { Otp } from '../otp/entities/otp.entity';
import { AddMinutesToDate } from '../helpers/addMinutes';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { dates, decode, encode } from '../helpers/crypto';
import { FindUserDto } from './dto/findUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    @InjectModel(Otp) private readonly otpRepo: typeof Otp,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly botService: BotService
  ){}

  async registration(createUserDto: CreateUserDto, res: Response) {
    const user =  await this.userRepo.findOne({
      where: {
        username: createUserDto.username
      }
    });
    if (user){
      throw new BadRequestException("Ushbu username band")
    }
    if (createUserDto.password != createUserDto.confirm_password){
      throw new BadRequestException("Parollar bir-biriga mos emas")
    }
    
    const hashed_password = await bcrypt.hash(createUserDto.password, 7)
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password
    })
    const tokens = await this.getTokens(newUser)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)
    const uniqueKey: string = uuidv4()

    const updatedUser = await this.userRepo.update({
      hashed_refresh_token: hashed_refresh_token,
      activation_link: uniqueKey
    },
    {
      where: { id: newUser.id }, returning: true
    })

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    await this.mailService.sendUserConfirmation(updatedUser[1][0])

    const response = {
      message: "Foydalanuvchining elektron pochta manziliga faollashtiruvchi havolali xat yuborildi",
      user: updatedUser[1][0],
      tokens
    }

    return response
  }

  async login(loginUserDto: LoginUserDto, res: Response){
    const { email, password } = loginUserDto
    const user = await this.userRepo.findOne({
      where: {
        email
      }
    })
    if(!user){
      throw new UnauthorizedException("Foydalanuvchi ro'yxatdan o'tmagan")
    }
    const IsMatchPass = await bcrypt.compare(password, user.hashed_password)
    if(!IsMatchPass){
      throw new UnauthorizedException("Parol noto'g'ri")
    }

    const tokens = await this.getTokens(user)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedUser = await this.userRepo.update({
      hashed_refresh_token: hashed_refresh_token
    },
    {
      where: {
        id: user.id
      },
      returning: true
    })

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    });

    const response = {
      message: "Foydalanuvchi tizimga muvaffaqiyatli kirdi",
      user: updatedUser[1][0],
      tokens
    }

    return response

  }

  async activate(link: string){
    if(!link){
      throw new BadRequestException("Faollashtiruvchi havola topilmadi")
    }
    const updatedUser = await this.userRepo.update(
      { is_active: true },
      { where: {
        activation_link: link, is_active: false
      }, returning: true }
    )

    if(!updatedUser[1][0]){
      throw new BadRequestException("Foydalanuvchi allaqachon faollashtirilgan")
    }

    const response = {
      message: "Foydalanuvchi muvaffaqiyatli faollashtirildi",
      user: updatedUser
    }

    return response
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response){
    
    const decodedToken = this.jwtService.decode(refreshToken)
    if(user_id != decodedToken["id"]){
      throw new BadRequestException("Foydalanuvchi topilmadi")
    }

    const user = await this.userRepo.findOne({where: {
      id: user_id
    }})
    if(!user || !user.hashed_refresh_token){
      throw new BadRequestException("Foydalanuvchi topilmadi")
    }
    
    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token
    )
    if(!tokenMatch){
      throw new ForbiddenException("Taqiqlandi")
    }

    const tokens = await this.getTokens(user)

    const hashed_refresh_token = await bcrypt.hash(tokens.refresh_token, 7)

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: hashed_refresh_token },
      { where: { id: user.id }, returning: true }
    )

    res.cookie("refresh_token", tokens.refresh_token, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true
    })

    const response = {
      message: "Refresh token yangilandi",
      user: updatedUser
    }

    return response

  }


  async newOTP(phoneUserDto: PhoneUserDto){
    const phone_number = phoneUserDto.phone_number
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false
    })
    

    const isSend = await this.botService.sendOTP(phone_number, otp)
    console.log(isSend);
    
    if(!isSend){
      throw new HttpException(
        "Avval Botdan ro'yxatdan o'ting",
        HttpStatus.BAD_REQUEST
      )
    }

    const now = new Date()
    const expiration_time = AddMinutesToDate(now, 5)
    await this.otpRepo.destroy({
      where: { [Op.and]: [{ check: phone_number }, { verified: false }]},
    })
    const newOtp = await this.otpRepo.create({
      id: v4(),
      check: phone_number,
      otp,
      expiration_time
    })
    const details = {
      timeStamp: now,
      check: phone_number,
      success: true,
      message: "OTP jo'natildi",
      otp_id: newOtp.id
    }
    const encoded = await encode(JSON.stringify(details))
    return { status: "Muvaffaqiyatli", details: encoded }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto){
    const { verification_key, otp, check } = verifyOtpDto
    const current_date = new Date()
    const decoded = await decode(verification_key)
    const obj = JSON.parse(decoded)
    const check_obj = obj.check
    if(check_obj != check){
      throw new BadRequestException("OTP bu raqamga yuborilmagan")
    }
    const result = await this.otpRepo.findOne({
      where: { id: obj.otp_id }
    })
    if(result != null){
      if(!result.verified){
        if(dates.compare(result.expiration_time, current_date)){
          if(otp === result.otp){
            const user = await this.userRepo.findOne({
              where: { phone: check }
            })
            if(user){
              const updatedUser = await this.userRepo.update(
                { is_owner: true },
                { where: { id: user.id }, returning: true }
              )
              await this.otpRepo.update(
                { verified: true },
                { where: { id: obj.otp_id }, returning: true }
              )
              const response = {
                message: "Foydalanuvchi loyiha egasiga aylandi",
                user: updatedUser[1][0]
              }
              return response
            }
          } else {
            throw new BadRequestException("OTP topilmadi")
          }
        } else {
          throw new BadRequestException("OTP ning amal qilish muddati tugagan")
        }
      } else {
        throw new BadRequestException("OTP ishlatilmoqda")
      }
    } else{
      throw new BadRequestException("Bunday foydalanuvchi mavjud emas")
    }
  }

  async findAll(findUserDto: FindUserDto) {
    const where = {}
    if(findUserDto.first_name){
      where["first_name"] = {
        [Op.like]: `%${findUserDto.first_name}%`
      }
    }
    if(findUserDto.last_name){
      where["last_name"] = {
        [Op.like]: `%${findUserDto.last_name}`
      }
    }
  }

  async findOne(id: number) {
    return await this.userRepo.findOne({
      where: {
        id: id
      },
      include: {
        all: true
      }
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepo.update(updateUserDto, {
      where: {
        id: id
      }
    });
  }

  async remove(id: number) {
    return await this.userRepo.destroy({
      where: {
        id: id
      }
    });
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    console.log(userData);
    if (!userData) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }
    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true }
    );

    res.clearCookie('refresh_token');

    const response = {
      message: 'Foydalanuvchi tizimdan muvaffaqiyatli chiqarildi',
      user: updatedUser[1][0],
    };

    return response;
  }


  async getTokens(user: User){
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner
    }

    const [ accessToken, refreshToken ] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN_KEY,
        expiresIn: process.env.REFRESH_TOKEN_TIME
      })
    ])

    return {
      access_token: accessToken,
      refresh_token: refreshToken
    }
  }

}
