import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";
import { MaxLength } from "class-validator";

@Table({tableName: "user_cards"})
export class UserCard extends Model<UserCard>{
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    id: number

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    name: string

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone_number: string

    @Column({
        type: DataType.BIGINT,
        allowNull: false,
        unique: true
    })
    number: bigint

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    month: number

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    year: number

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_main: boolean

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id: number;

    @BelongsTo(() => User)
    user: User[]
}
