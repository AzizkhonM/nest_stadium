import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsString } from "class-validator";

export class FindUserDto extends PartialType(CreateUserDto){

    first_name: string;

    last_name: string;

    username: string;

    telegram_link: string

    email: string;

    phone: string;

    user_photo: string

    birthday_begin: Date

    birthday_end: Date

}