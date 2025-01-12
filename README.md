# Grocery Booking API Documentation

Tech Stack used:

* **Backend:** *Node.js with typescript*
* **ORM:** *Sequelize*
* **Database:** *PostgreSQL*

##### Create Database 'grocery' and grant all permissions

```
CREATE ROLE grocery_user WITH LOGIN PASSWORD 'your_password'; (Create role)
CREATE DATABASE grocery; (Create grocery database)
GRANT ALL PRIVILEGES ON DATABASE grocery TO grocery_user; (Grant all permission to the user)
```

##### Steps to execute the code

```
npm i 
npx sequelize-cli db:migrate  (To migrate the table schema to the database)
npx sequelize-cli db:seed:all (To seed the sample data to the table for testing)
yarn start
```



This API provides endpoints for a grocery booking system with two roles: User and Admin. Below are the detailed specifications for each endpoint.

## User Endpoints

### 1. User Login

```
POST /api/user/login
```

**Request Body:**

```json
{
    "name": "User1",
    "password": "user_password"
}
```

### (Note: Use Bearer token which you can get from the Login API responce to hit the other APIs)

### 2. Get Grocery Items (User)

```
GET /api/user/grocery
```

**Response:**

```json
{
    "data": [{
        "id": 1,
        "name": "Apples",
        "price": 50,
        "quantity": 100,
        "createdAt": "2025-01-11T08:54:42.196Z",
        "updatedAt": "2025-01-11T08:54:42.196Z"
    }]
}
```

### 3. Create Order

```
POST /api/user/order
```

**Request Body:**

```json
{
    "items": [
        {
            "id": 1,
            "price": 40,
            "quantity": 1
        },
        {
            "id": 2,
            "price": 40,
            "quantity": 1
        }
    ],
    "totalAmount": 80
}
```

**Response:**

```json
{
    "order": {
        "id": 1,
        "userId": 2,
        "totalAmount": 80,
        "updatedAt": "2025-01-11T17:48:55.257Z",
        "createdAt": "2025-01-11T17:48:55.257Z"
    },
    "message": "Order created successfully"
}
```

**Note:** When an order is created, the quantity of the products will be automatically deducted from the stock.

## Admin Endpoints

### 1. Admin Login

```
POST /api/admin/login
```

**Request Body:**

```json
{
    "name": "User1",
    "password": "user_password"
}
```

### (Note: Use Bearer token which you can get from the Login API responce to hit the other APIs)

### 2. Get Grocery Items (Admin)

```
GET /api/admin/grocery
```

**Response:**

```
{
    "name": "Admin",
    "password": "admin_password"
}

```

### 3. Add Grocery Items

```
POST /api/admin/grocery
```

**Request Body:**

```json
[{
    "name": "Ice cream",
    "price": 10,
    "quantity": 10
}]
```

**Response:**

```json
{
    "data": [{
        "id": 7,
        "name": "Ice cream",
        "price": 10,
        "quantity": 10,
        "updatedAt": "2025-01-11T16:48:24.689Z",
        "createdAt": "2025-01-11T16:48:24.689Z"
    }],
    "message": "Product added successfully"
}
```

### 4. Delete Grocery Product

```
DELETE /api/admin/grocery/:id
```

**Response:**

```json
{
    "message": "Grocery item removed successfully"
}
```

### 5. Update Grocery Product Details

```
PUT /api/admin/grocery/:id
```

**Request Body:**

```json
{
    "name": "Apple",
    "price": 40
}
```

**Response:**

```json
{
    "data": {
        "id": 1,
        "name": "Apple",
        "price": 40,
        "quantity": 100,
        "createdAt": "2025-01-11T08:54:42.196Z",
        "updatedAt": "2025-01-11T17:09:24.281Z"
    },
    "message": "Grocery item updated successfully"
}
```

### 6. Update Inventory Levels

```
PATCH /api/admin/grocery/:id/inventory
```

**Request Body:**

```json
{
    "quantity": 160
}
```

**Response:**

```json
{
    "message": "Inventory updated successfully",
    "groceryItem": {
        "id": 2,
        "name": "Bananas",
        "price": 40,
        "quantity": 160,
        "createdAt": "2025-01-11T08:54:42.196Z",
        "updatedAt": "2025-01-11T17:20:08.385Z"
    }
}
```
