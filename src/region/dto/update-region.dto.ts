import { PartialType } from '@nestjs/mapped-types';
import { CreateRegionDto } from './create-region.dto';
import { IsString } from 'class-validator';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
    @IsString()
    name: string
}
