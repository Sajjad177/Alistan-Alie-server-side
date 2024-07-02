### 🌐 [Live link to Artisan Alley](https://assignment-10-ea7c5.web.app) 🌐

## 📜 Project Overview :

- **Project Concept** : This server-side component supports the art and craft website, providing backend services for managing user data, product listings, and orders.
- **Problem Solved** : Facilitate smooth operation of online marketplace through data management, data protection.


---

## 🌟 Features

### User Authentication and Authorization :
- **Secure user registration**, login, and role-based access control for buyers and sellers.

### Product Management :
- **CRUD operations** for managing art and craft product listings, including details, pricing, and availability.

### User Data :
- **User added product update and delete very too easy

---

## 🛠 Technology Used : 
**JWT**, **MongoDB**

<br/>

## How to Clone and Run the Project Locally : 

1. **Clone the repository:**
   - First, you need to clone the **server side**. Open your terminal and type:
     ```bash
     git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
     ```
2. **Open files in VS Code:**
   - After opening the **server-side** files in VS Code, install npm dependencies both file:
     ```bash
     npm install
     ```
3. **Environment setup:**
   - In your server side configure environment variables by creating a `.env` file in the root directory. Add the following variables:
     ```plaintext
     PORT=3000
     MONGODB_URI=mongodb://localhost:27017/art_and_craft_db
     JWT_SECRET=your_jwt_secret_key_here
     ```
     Replace `your_jwt_secret_key_here` with your actual keys.
4. **Access the server :**
   - run code is `nodemon index.js ` or `npm run dev` and also check which file are you now. 
   - Open your web browser and navigate to `http://localhost:3000` to view the application locally.
