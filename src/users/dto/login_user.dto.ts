import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginUserDto {
    @ApiProperty({
        example: "email@gmail.com",
        description: "Foydalanuvchining elektron pochtasi"
    })
    @IsEmail()
    email: string

    @ApiProperty({
        example: "password",
        description: "Foydalanuvchining paroli"
    })
    @IsString()
    @IsNotEmpty()
    password: string
}