
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export class User extends Model {
    public id!: number;
    public name!: string;
    public email!: string;
    public password!: string;
    public role!: "ADMIN" | "USER";
}

User.init(
    {
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        name: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role: { type: DataTypes.ENUM("ADMIN", "USER"), allowNull: false },
    },
    { sequelize, modelName: "User", timestamps: true }
);
