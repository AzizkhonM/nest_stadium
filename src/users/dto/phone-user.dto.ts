import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPhoneNumber } from "class-validator";

export class PhoneUserDto{
    @ApiProperty({
        example: "998971234567",
        description: "Foydalanuvchi telefon raqami"
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string
}