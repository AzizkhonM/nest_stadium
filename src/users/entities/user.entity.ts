import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { UserWallet } from "../../user_wallet/entities/user_wallet.entity";
import { UserCard } from "../../user_card/entities/user_card.entity";


@Table({tableName: "users"})
export class User extends Model<User>{
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement:true,
        primaryKey:true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    username: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    hashed_password: string;

    @Column({
        type: DataType.STRING,
        unique: true
    })
    telegram_link: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    email: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    phone: string;

    @Column({
        type: DataType.STRING,
    })
    user_photo: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    birth_date: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false
    })
    is_owner: boolean;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false,
        allowNull: false
    })
    is_active: boolean;

    @ApiProperty({
        example: "token",
        description: "FOydalanuvchining tasdiqlangan holati"
    })
    @Column({
        type: DataType.STRING,
        unique: true,
    })
    hashed_refresh_token: string;

    @Column({
        type: DataType.STRING
    })
    activation_link: string

    @HasMany(() => UserWallet)
    userWallet: UserWallet

    @HasMany(() => UserCard)
    userCard: UserCard
}
