
import app from "./app";
import { sequelize } from "./config/db";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
