import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "../../users/entities/user.entity";

@Table({tableName: "user_wallet"})
export class UserWallet extends Model<UserWallet>{
    @Column({
        type: DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        unique: true
    })
    wallet: number

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    user_id: number;

    @BelongsTo(() => User)
    user: User[]
}
