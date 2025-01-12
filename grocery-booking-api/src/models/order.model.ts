
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class Order extends Model {
    public id!: number;
    public userId!: number;
    public totalAmount!: number;
}

Order.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        userId: { type: DataTypes.INTEGER, allowNull: false },
        totalAmount: { type: DataTypes.FLOAT, allowNull: false, defaultValue: 0 },
    },
    { sequelize, modelName: "Order", timestamps: true }
);
