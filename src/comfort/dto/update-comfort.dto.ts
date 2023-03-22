import { PartialType } from '@nestjs/mapped-types';
import { CreateComfortDto } from './create-comfort.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateComfortDto extends PartialType(CreateComfortDto) {
    @IsString()
    name:string;

}
