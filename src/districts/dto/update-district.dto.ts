import { PartialType } from '@nestjs/mapped-types';
import { CreateDistrictDto } from './create-district.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto extends PartialType(CreateDistrictDto) {
    @IsString()
    name: string;

    @IsOptional()
    @IsNumber()
    regionId: number;
}
