
# Product Management API
  This is a backend API for managing products and categories in an inventory system. It provides endpoints to Create, Read, Update, and Delete (CRUD) products and categories, as well as search and filter products.

# Features
  •	Product Management – Add, update, delete, and fetch products  
  •	Category Management – Create and retrieve categories  
  •	Filtering & Search– Find products by category, name  
  •	Discounted Pricing– Calculates discounted price automatically  
  •	Error Handling– Handles validation & duplicate entries  

# Technologies Used
  •	Node.js with Express.js
  
  •	MongoDB with Mongoose
  
  •	Postman for API testing

# API Endpoints & Testing

  "Product Routes"
  
  •	POST= /api/products/create - Create a new product
  
  •	GET= /api/products/ - Get all products
  
  •	GET= /api/products?category= - Filter products by category
  
  •	GET= /api/products?name= - Search products by name
  
  •	PUT= /api/products/update/:id - Update product details
  
  •	DELETE= /api/products/delete/:id - Delete a product
    
  "Category Routes"
    
  •	POST=	/api/categories/create  -  Create a new category
  
  •	GET=	/api/categories  -  Get all categories


# Database Schema (ER Diagram)
  ![ER Diagram](https://github.com/user-attachments/assets/0aa93599-ea5d-4c39-b46f-ca605f3a60e1)

