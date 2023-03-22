import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface BotAttr{
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: boolean
}

@Table({ tableName: "bot" })
export class Bot extends Model<Bot, BotAttr>{

    @ApiProperty({
        example: 123456789,
        description: "Foydalanuvchi ID si"
    })
    @Column({
        type: DataType.BIGINT,
        primaryKey: true,
        allowNull: false
    })
    user_id: number

    @ApiProperty({
        example: "Username",
        description: "Foydalanuvchi username i"
    })
    @Column({
        type: DataType.STRING 
    })
    username: string

    @ApiProperty({
        example: "John",
        description: "Foydalanuvchi ismi"
    })
    @Column({
        type: DataType.STRING
    })
    first_name: string

    @ApiProperty({
        example: "Doe",
        description: "Foydalanuvchi familiyasi"
    })
    @Column({
        type: DataType.STRING
    })
    last_name: string

    @ApiProperty({
        example: "+998971234567",
        description: "Foydalanuvchi telefon raqami"
    })
    @Column({
        type: DataType.STRING
    })
    phone_number: string

    @ApiProperty({
        example: "false",
        description: "Foydalanuvchi statusi"
    })
    @Column({
        type: DataType.STRING,
        defaultValue: false
    })
    status: boolean

}