# Backend API – User and Product Management

This project represents a **Backend API** developed with **Node.js and Express**, using **Handlebars** for views, database connection, and best practices for architecture.  
The goal is to showcase a professional example of development with **QA applied** (tests, evidence, and test cases).

---

## 🚀 Main Technologies
- Node.js + Express  
- Handlebars (views)  
- SQL database  
- Postman/Newman for API testing  
- Jest/Mocha (for optional unit tests)

---

## 🛠️ Installation & Execution
```bash
# 1. Clone repository
git clone https://github.com/ramironfunes/Backend.git

# 2. Install dependencies
npm install

# 3. Start the server
npm start

By default, the server runs at:
👉 http://localhost:3000

📌 Main Endpoints
Method	Endpoint	Description
GET	/api/users	List users
POST	/api/users	Create user
GET	/api/products	List products
POST	/api/products	Create product
Examples

GET /api/users
Response 200:

[
  { "id": 1, "name": "Ramiro", "email": "ramiro@test.com" },
  { "id": 2, "name": "Jimena", "email": "jimena@test.com" }
]


POST /api/users
Request:

{ "name": "Catalina", "email": "cata@test.com" }


Response 201:

{ "id": 3, "name": "Catalina", "email": "cata@test.com" }

🧪 QA – Test Cases & Evidence
Functional Test Cases

Users

✅ Create valid user → expected 201

❌ Create user without email → expected 400 (bug: returns 500)

✅ Get users → expected 200 + non-empty list

Products

✅ Create valid product → expected 201

❌ Create product with negative price → expected 400

✅ List products → expected 200 + non-empty list

🗺️ Architecture
flowchart TD
    A[Client/API Client] --> B[Express Server]
    B --> C[Routes]
    C --> D[Controllers]
    D --> E[Models]
    E --> F[(Database)]
    B --> G[Views - Handlebars]
