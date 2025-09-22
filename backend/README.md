# Food API Documentation

## Food Endpoints

### 1. Add Food Item

- **URL:** `/food/add`
- **Method:** `POST`
- **Description:** Adds a new food item to the database. Accepts form data including an image file.
- **Request Body:**
  - `name` (string, required): Name of the food item
  - `description` (string, required): Description of the food item
  - `price` (number, required): Price of the food item
  - `category` (string, required): Category of the food item
  - `image` (file, required): Image file of the food item (multipart/form-data)
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `message` (string): Success or error message
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/food/add \
    -F "name=Paneer Butter Masala" \
    -F "description=Delicious paneer curry" \
    -F "price=250" \
    -F "category=Main Course" \
    -F "image=@/path/to/image.jpg"
  ```

---

### 2. List Food Items

- **URL:** `/food/list`
- **Method:** `GET`
- **Description:** Retrieves a list of all food items.
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `data` (array): List of food items
- **Example Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "name": "Paneer Butter Masala",
        "description": "Delicious paneer curry",
        "price": 250,
        "category": "Main Course",
        "image": "1631371234567 image.jpg"
      }
      // ... more items ...
    ]
  }
  ```

---

### 3. Remove Food Item

- **URL:** `/food/remove`
- **Method:** `POST`
- **Description:** Removes a food item by its ID.
- **Request Body:**
  - `id` (string, required): The ID of the food item to remove
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `message` (string): Success or error message
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/food/remove \
    -H "Content-Type: application/json" \
    -d '{"id": "<food_id>"}'
  ```

---
## User Endpoints

### 4. User Login

- **URL:** `/user/login`
- **Method:** `POST`
- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**
  - `email` (string, required): User's email address
  - `password` (string, required): User's password
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `token` (string): JWT token (on success)
  - `message` (string): Error message (on failure)
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/user/login \
    -H "Content-Type: application/json" \
    -d '{"email": "test@example.com", "password": "yourpassword"}'
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "token": "<jwt_token>"
  }
  ```
- **Example Error Response:**
  ```json
  {
    "success": false,
    "message": "User doesn't exist"
  }
  ```

---

### 5. User Register

- **URL:** `/user/register`
- **Method:** `POST`
- **Description:** Registers a new user and returns a JWT token.
- **Request Body:**
  - `name` (string, optional): User's name
  - `email` (string, required): User's email address
  - `password` (string, required): User's password (min 8 characters)
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `token` (string): JWT token (on success)
  - `message` (string): Error message (on failure)
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/user/register \
    -H "Content-Type: application/json" \
    -d '{"name": "Test User", "email": "test@example.com", "password": "yourpassword"}'
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "token": "<jwt_token>"
  }
  ```
- **Example Error Response:**
  ```json
  {
    "success": false,
    "message": "Email already in use"
  }
  ```
---

## Cart Endpoints

### 6. Add Item to Cart

- **URL:** `/cart/add`
- **Method:** `POST`
- **Description:** Adds an item to the authenticated user's cart. Requires JWT authentication.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  - `itemId` (string, required): The ID of the food item to add
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `message` (string): Success or error message
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/cart/add \
    -H "Authorization: Bearer <jwt_token>" \
    -H "Content-Type: application/json" \
    -d '{"itemId": "<food_id>"}'
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "Added to cart"
  }
  ```

---

### 7. Remove Item from Cart

- **URL:** `/cart/remove`
- **Method:** `POST`
- **Description:** Removes an item from the authenticated user's cart. Requires JWT authentication.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  - `itemId` (string, required): The ID of the food item to remove
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `message` (string): Success or error message
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/cart/remove \
    -H "Authorization: Bearer <jwt_token>" \
    -H "Content-Type: application/json" \
    -d '{"itemId": "<food_id>"}'
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "Removed from cart"
  }
  ```

---

### 8. Get Cart Data

- **URL:** `/cart/get`
- **Method:** `POST`
- **Description:** Fetches the cart data for the authenticated user. Requires JWT authentication.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  - (none)
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `cartdata` (object): The user's cart data (itemId as key, quantity as value)
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/cart/get \
    -H "Authorization: Bearer <jwt_token>"
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "cartdata": {
      "<food_id>": 2,
      "<another_food_id>": 1
    }
  }
  ```

---


## Order Endpoints

### 9. Place Order

- **URL:** `/order/place`
- **Method:** `POST`
- **Description:** Places a new order for the authenticated user and creates a Razorpay order.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  - `cart` (object, required): Cart items (itemId as key, quantity as value)
  - `amount` (number, required): Total order amount
  - `address` (string, required): Delivery address
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `orderId` (string): Razorpay order ID
  - `amount` (number): Order amount
  - `currency` (string): Currency code
  - `message` (string): Success or error message
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/order/place \
    -H "Authorization: Bearer <jwt_token>" \
    -H "Content-Type: application/json" \
    -d '{"cart": {"<food_id>": 2}, "amount": 500, "address": "123 Main St"}'
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "orderId": "order_Jv1...",
    "amount": 50000,
    "currency": "INR",
    "message": "order placed"
  }
  ```

---

### 10. Verify Payment

- **URL:** `/order/verify`
- **Method:** `POST`
- **Description:** Verifies the payment after Razorpay checkout.
- **Request Body:**
  - `razorpay_order_id` (string, required)
  - `razorpay_payment_id` (string, required)
  - `razorpay_signature` (string, required)
  - `paymentStatus` (string, required): "success" or "failed"
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `message` (string): Success or error message
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/order/verify \
    -H "Content-Type: application/json" \
    -d '{
      "razorpay_order_id": "order_Jv1...",
      "razorpay_payment_id": "pay_Jv1...",
      "razorpay_signature": "...",
      "paymentStatus": "success"
    }'
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "message": "Payment verified successfully"
  }
  ```
- **Example Failure Response:**
  ```json
  {
    "success": false,
    "message": "Payment failed. Order deleted."
  }
  ```

---

### 11. Get User Orders

- **URL:** `/order/order-item`
- **Method:** `POST`
- **Description:** Fetches all orders for a specific user. Requires JWT authentication.
- **Headers:**
  - `Authorization: Bearer <jwt_token>`
- **Request Body:**
  - `userId` (string, required): User's ID
- **Response:**
  - `success` (boolean): Indicates if the operation was successful
  - `data` (array): List of orders
- **Example Request (using curl):**
  ```bash
  curl -X POST http://localhost:4000/order/order-item \
    -H "Authorization: Bearer <jwt_token>" \
    -H "Content-Type: application/json" \
    -d '{"userId": "<user_id>"}'
  ```
- **Example Success Response:**
  ```json
  {
    "success": true,
    "data": [
      {
        "_id": "...",
        "items": { "<food_id>": 2 },
        "amount": 500,
        "address": "123 Main St",
        "status": "Food Processing"
      }
      // ... more orders ...
    ]
  }
  ```

---

## Notes
- All endpoints are prefixed with `/food`, `/user`, `/cart`, and `/order` as per their functionality.
- For image uploads, use `multipart/form-data`.
- Images are served from `/images/<filename>`.
