import { Model,Table,DataType,Column } from "sequelize-typescript";

@Table({tableName:'comfort'})
export class Comfort extends Model<Comfort>{
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique: true
    })
    name:string;
}
