
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class GroceryItem extends Model {
    public id!: number;
    public name!: string;
    public price!: number;
    public quantity!: number;
}

GroceryItem.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false, unique: true },
        price: { type: DataTypes.FLOAT, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    { sequelize, modelName: "GroceryItem", timestamps: true }
);
