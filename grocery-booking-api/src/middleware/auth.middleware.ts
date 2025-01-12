import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

// Define the User type for better type safety
interface User {
    role: string;
    [key: string]: any;
}

// Extend Express Request to include user
declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}

export const authenticate = (roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }

        try {
            const user = jwt.verify(token, process.env.JWT_SECRET!) as User;

            if (!roles.includes(user.role)) {
                res.status(403).json({ message: "Forbidden" });
                return;
            }

            req.user = user;
            next();
        } catch (error) {
            res.status(401).json({ message: "Invalid token" });
            return;
        }
    };
};
