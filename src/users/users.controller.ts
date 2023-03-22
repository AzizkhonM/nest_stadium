import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Response } from 'express';
import { LoginUserDto } from './dto/login_user.dto';
import { CookieGetter } from '../decorators/cookieGetter.decorator';
import { PhoneUserDto } from './dto/phone-user.dto';
import { VerifyOtpDto } from './dto/verifyOtp.dto';
import { BeforeFindAfterExpandIncludeAll } from 'sequelize-typescript';
import { FindUserDto } from './dto/findUser.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Register User' })
  @Post('/signup')
  registration(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }

  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({status: 200, type: User})
  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  @ApiOperation({ summary: "Logout User" })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post("signout")
  logout(
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ){
    return this.usersService.logout(refreshToken, res)
  }

  @ApiOperation({ summary: "Activate User" })
  @ApiResponse({ status: 200, type: User })
  @Get("activate/:link")
  activate(@Param("link") link: string){
    return this.usersService.activate(link)
  }
    

  @Post(":id/refresh")
  refresh(
    @Param("id") id: string,
    @CookieGetter("refresh_token") refreshToken: string,
    @Res({ passthrough: true }) res: Response
  ){
    return this.usersService.refreshToken(+id, refreshToken, res)
  }

  @Post("/otp")
  newOtp(@Body() phoneUserDto: PhoneUserDto){
    return this.usersService.newOTP(phoneUserDto)
  }

  @Post("find")
    findAll(@Body() findUserDto: FindUserDto){
      return this.usersService.findAll(findUserDto)
    }

  @Post("/verify")
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto){
    return this.usersService.verifyOtp(verifyOtpDto)
  }

/*   @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  } */

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
