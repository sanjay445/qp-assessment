
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class OrderItem extends Model {
    public id!: number;
    public orderId!: number;
    public groceryItemId!: number;
    public quantity!: number;
    public price!: number;
}

OrderItem.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        orderId: { type: DataTypes.INTEGER, allowNull: false },
        groceryItemId: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
    },
    { sequelize, modelName: "OrderItem", timestamps: true }
);
