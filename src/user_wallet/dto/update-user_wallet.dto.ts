import { PartialType } from '@nestjs/mapped-types';
import { CreateUserWalletDto } from './create-user_wallet.dto';
import { IsNumber } from 'class-validator';

export class UpdateUserWalletDto extends PartialType(CreateUserWalletDto) {
    @IsNumber()
    user_id: number;

    @IsNumber()
    wallet: number
}
