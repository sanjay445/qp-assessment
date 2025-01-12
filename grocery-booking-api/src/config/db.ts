import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
    dialect: 'postgres',
    host: 'localhost',   // or the correct host (e.g., '127.0.0.1')
    username: 'postgres', // The username you want to use (e.g., 'postgres')
    password: 'your_password',  // The password for the 'postgres' role
    database: 'grocery', // Replace with your database name
    port: 5432, // Default port for PostgreSQL
});

sequelize.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });
