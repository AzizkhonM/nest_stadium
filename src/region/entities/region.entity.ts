import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { District } from "../../districts/entities/district.entity";

@Table({tableName: "regions"})
export class Region extends Model<Region>{
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    name:string;

    @HasMany(() => District)
    district: District;
}
