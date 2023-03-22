import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsEmail, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({
        example: "Ism", description: "Foydalanuvchining ismi"
    })
    @IsNotEmpty()
    @IsString()
    first_name: string;

    @ApiProperty({
        example: "Familiya", description: "Foydalanuvchining familiyasi"
    })
    @IsNotEmpty()
    @IsString()
    last_name: string;

    @ApiProperty({
        example: "user1", description: "Foydalanuvchining username'i"
    })
    @IsNotEmpty()
    @IsString()
    username: string;

    @ApiProperty({
        example: "password",
        description: "Foydalanuvchining paroli"
    })
    @IsNotEmpty()
    @MinLength(6)
    @IsStrongPassword()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    confirm_password: string

    @ApiProperty({
        example: "email@gmail.com || email@mail.ru",
        description: "Foydalanuvchining elektron pochtasi"
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "901234567",
        description: "Foydalanuvchining telefon raqami"
    })
    @IsPhoneNumber()
    phone: string;

    @ApiProperty({
        example: "2000-01-01",
        description: "Foydalanuvchining tug'ilgan sanasi"
    })
    @IsNotEmpty()
    @IsDateString()
    birth_date: string;

}
