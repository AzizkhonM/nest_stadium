import { ApiProperty } from "@nestjs/swagger";
import { Model } from "sequelize-typescript";
import { Column, DataType, Table } from "sequelize-typescript";

interface OtpAttr{
    id: string
    otp: string
    expiration_time: Date
    verified: boolean;
    check: string
}

@Table({ tableName: "otp" })
export class Otp extends Model<Otp, OtpAttr>{

    @ApiProperty({
        example: "1111111111111111111",
        description: "OTP ID"
    })
    @Column({
        type: DataType.UUID,
        primaryKey: true,
        allowNull: false
    })
    id: string

    @ApiProperty({
        example: "1978",
        description: "OTP"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    otp: string

    @ApiProperty({
        example: "2023-02-27T08:10:10.000Z",
        description: "amal qilish muddati"
    })
    @Column({
        type: DataType.DATE,
        allowNull: false
    })
    expiration_time: Date

    @ApiProperty({
        example: false,
        description: "Tasdiqlangan yoki Tasdiqlanmagan"
    })
    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    verified: boolean

    @ApiProperty({
        example: "998971234567",
        description: "Telefon raqami tekshirish"
    })
    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    check: string

}
