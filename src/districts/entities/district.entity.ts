import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Region } from "../../region/entities/region.entity";

@Table({tableName: "districts"})
export class District extends Model<District>{
    @Column({
        type: DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    name:string;

    @ForeignKey(() => Region)
    @Column({
        type:DataType.INTEGER
    })
    region_id:number;

    @BelongsTo(() => Region)
    region: Region[];
}
