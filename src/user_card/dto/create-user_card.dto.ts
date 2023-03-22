import { IsNumber, IsPhoneNumber, IsString, MaxLength } from "class-validator";

export class CreateUserCardDto {
    @IsString()
    name: string

    @IsPhoneNumber()
    phone_number: string

    @IsNumber()
    number: bigint

    @MaxLength(2)
    @IsNumber()
    month: number

    @MaxLength(2)
    @IsNumber()
    year: number

    @IsNumber()
    user_id: number
}
