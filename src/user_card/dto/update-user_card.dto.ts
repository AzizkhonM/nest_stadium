import { PartialType } from '@nestjs/swagger';
import { CreateUserCardDto } from './create-user_card.dto';
import { IsNumber, IsOptional, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class UpdateUserCardDto extends PartialType(CreateUserCardDto) {
    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsPhoneNumber()
    phone_number: string

    @IsOptional()
    @IsNumber()
    number: bigint

    @IsOptional()
    @MaxLength(2)
    @IsNumber()
    month: number

    @IsOptional()
    @MaxLength(2)
    @IsNumber()
    year: number

    @IsOptional()
    @IsNumber()
    user_id: number
}
