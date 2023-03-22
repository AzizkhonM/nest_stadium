import { IsNumber, isNumber } from "class-validator";

export class CreateUserWalletDto {
    @IsNumber()
    user_id: number;

    @IsNumber()
    wallet: number
}
