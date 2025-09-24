# Express User-Product API

REST API built with **Node.js** and **Express** for managing users and products.  
Includes basic QA/test cases and a simple views layer using Handlebars.

---

## 🚀 Technologies & Tools

- Node.js + Express  
- Handlebars (views)  
- SQL database (o la base que uses)  
- Postman / Newman (para pruebas de endpoints)  
- (Opcional) Mocha / Jest para tests unitarios  

---

## 🛠️ How to Run Locally

```bash
# Clone the repo
git clone https://github.com/ramironfunes/express-user-product-api.git

# Go into project folder
cd express-user-product-api

# Install dependencies
npm install

# Run the server
npm start
By default, the app will run at:
http://localhost:3000

📌 Endpoints
Method	Path	Description
GET	/api/users	Get list of users
POST	/api/users	Create a new user
GET	/api/products	Get list of products
POST	/api/products	Create a new product

Example Usage
GET /api/users
Response – Status 200

json
Copy code
[
  { "id": 1, "name": "Ramiro", "email": "ramiro@test.com" },
  { "id": 2, "name": "Jimena", "email": "jimena@test.com" }
]
POST /api/products
Request Body

json
Copy code
{ "name": "Vaso", "price": 1500 }
Response – Status 201

json
Copy code
{ "id": 3, "name": "Vaso", "price": 1500 }
