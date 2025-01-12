
import { Request, Response } from "express";
import { GroceryItem } from "../models/groceryItem.model";

export const AdminController = {
    getGroceries: async (_req: Request, res: Response) => {
        const groceries = await GroceryItem.findAll({
            order: [["id", "ASC"]]
        });
        res.json({ data: groceries });
    },
    
    addGrocery: async (req: Request, res: Response): Promise<any> => {
        try {
            const groceryItems = req.body; // Expecting an array of objects [{ name, price, quantity }, ...]

            if (!Array.isArray(groceryItems) || groceryItems.length === 0) {
                return res.status(400).json({ message: "Input must be a non-empty array of grocery items." });
            }

            // Validate input structure
            const invalidItems = groceryItems.filter(item =>
                !(item.name && typeof item.price === "number" && typeof item.quantity === "number")
            );
            if (invalidItems.length > 0) {
                return res.status(400).json({
                    message: "Each item must have a 'name', 'price', and 'quantity' with valid types.",
                    invalidItems,
                });
            }

            // Bulk create grocery items
            const groceries = await GroceryItem.bulkCreate(groceryItems);
            res.status(201).json({
                data: groceries,
                message: "Products added successfully",
            });
        } catch (error: any) {
            console.error("Error adding groceries:", error);
            res.status(500).json({ error: error.message });
        }
    },

    removeGroceryItem: async (req: Request, res: Response): Promise<any> => {
        const groceryItemId = req.params.id;  // The ID of the grocery item to delete

        try {
            const groceryItem = await GroceryItem.findByPk(groceryItemId);
            if (!groceryItem) {
                return res.status(404).json({ message: "Grocery item not found" });
            }

            // Delete the grocery item
            await groceryItem.destroy();
            res.status(200).json({ message: "Grocery item removed successfully" });
        } catch (error: any) {
            console.error("Error removing grocery item:", error);
            res.status(500).json({ message: "Error removing grocery item", error: error.message });
        }
    },

    updateGroceryItem: async (req: Request, res: Response): Promise<any> => {
        const groceryItemId = req.params.id;  // The ID of the grocery item to update
        const { name, price } = req.body;    // Details to be updated

        try {
            const groceryItem = await GroceryItem.findByPk(groceryItemId);
            if (!groceryItem) {
                return res.status(404).json({ message: "Grocery item not found" });
            }

            // Update the grocery item details
            groceryItem.name = name || groceryItem.name;
            groceryItem.price = price || groceryItem.price;

            await groceryItem.save();  // Save the updated grocery item to the database
            res.status(200).json({ data: groceryItem, message: "Grocery item updated successfully" });
        } catch (error: any) {
            console.error("Error updating grocery item:", error);
            res.status(500).json({ message: "Error updating grocery item", error: error.message });
        }
    },

    updateInventory: async (req: Request, res: Response): Promise<any> => {
        const groceryItemId = req.params.id;  // The ID of the grocery item to update
        const { quantity } = req.body;        // New quantity to set in inventory

        if (quantity < 0) {
            return res.status(400).json({ message: "Quantity cannot be negative" });
        }

        try {
            const groceryItem = await GroceryItem.findByPk(groceryItemId);
            if (!groceryItem) {
                return res.status(404).json({ message: "Grocery item not found" });
            }

            // Update the inventory level (quantity)
            groceryItem.quantity = quantity;

            await groceryItem.save();  // Save the updated grocery item to the database
            res.status(200).json({ message: "Inventory updated successfully", groceryItem });
        } catch (error: any) {
            console.error("Error updating inventory:", error);
            res.status(500).json({ message: "Error updating inventory", error: error.message });
        }
    }
};
