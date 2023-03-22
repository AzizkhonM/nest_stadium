import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    hashed_password: string;

    @IsOptional()
    @IsString()
    telegram_link: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    user_photo: string;

    @IsOptional()
    @IsString()
    birth_date: string;

    @IsOptional()
    @IsBoolean()
    is_owner: boolean;

    @IsOptional()
    @IsBoolean()
    is_active: boolean;

    @IsOptional()
    @IsString()
    hashed_refresh_token: string;
}
