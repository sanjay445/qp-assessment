// middleware/auth.middleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { GroceryItem } from "../models/groceryItem.model";
import { User } from "../models/user.model";
import { Order } from "../models/order.model";
import { OrderItem } from "../models/orderItem.model";
import { sequelize } from "../config/db";

export const UserController = {

    login: async (req: Request, res: Response): Promise<any> => {
        const { name, password } = req.body;

        // Example check: Validate username and password (you should use hash comparison in real applications)
        const user = await User.findOne({ where: { name } });
        if (!user || user.password !== password) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: '1h' });

        // Send the token in the response
        res.status(200).json({ token });
    },

    getGroceries: async (_req: Request, res: Response) => {
        const groceries = await GroceryItem.findAll({
            order: [["id", "ASC"]]
        });
        res.json({ data: groceries });
    },

    createOrder: async (req: any, res: Response): Promise<any> => {
        console.log("User data in request:", req.user);

        if (req.user) {
            const { items, totalAmount } = req.body;

            if (!items || items.length === 0) {
                return res.status(400).json({ message: "Order must contain at least one item" });
            }

            if (totalAmount <= 0) {
                return res.status(400).json({ message: "Total amount must be greater than zero" });
            }

            // Start a transaction to ensure atomicity
            const transaction = await sequelize.transaction();

            try {
                // Check stock for each item
                for (const item of items) {
                    const groceryItem = await GroceryItem.findByPk(item.id, { transaction });

                    if (!groceryItem) {
                        throw new Error(`Item with ID ${item.id} does not exist.`);
                    }

                    if (groceryItem.quantity < item.quantity) {
                        throw new Error(`Insufficient stock for item: ${groceryItem.name}`);
                    }
                }

                // Create the Order
                const order = await Order.create(
                    { userId: req.user.id, totalAmount },
                    { transaction }
                );

                // Create OrderItems and update inventory
                for (const item of items) {
                    await OrderItem.create(
                        {
                            orderId: order.id,
                            groceryItemId: item.id,
                            quantity: item.quantity,
                            price: item.price,
                        },
                        { transaction }
                    );

                    // Decrement stock
                    const groceryItem = await GroceryItem.findByPk(item.id, { transaction });
                    if (groceryItem) {
                        groceryItem.quantity -= item.quantity;
                        await groceryItem.save({ transaction });
                    }
                }

                // Commit transaction
                await transaction.commit();

                res.status(201).json({
                    order: order,
                    message: "Order created successfully",
                });
            } catch (error: any) {
                // Rollback transaction on error
                await transaction.rollback();

                console.error("Error creating order:", error);
                res.status(500).json({
                    message: error.message || "Error creating order",
                });
            }
        } else {
            res.status(400).json({ message: "No user data available" });
        }
    }
};
