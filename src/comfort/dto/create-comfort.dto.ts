import { IsString } from "class-validator";

export class CreateComfortDto {
    @IsString()
    name:string;
}
