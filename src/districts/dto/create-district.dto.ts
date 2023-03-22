import { IsNumber, IsString } from "class-validator";
import { ForeignKey } from "sequelize-typescript";

export class CreateDistrictDto {
    @IsString()
    name: string;

    @IsNumber()
    regionId: number;
}