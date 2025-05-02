# Blog API

A simple Blog API built using **Node.js**, **Express**, and **MongoDB** for managing blog posts and comments.

## 🚀 Features
- ✅ **CRUD operations for Blog Posts** (Create, Read, Update, Delete)
- ✅ **Commenting system for posts**
- ✅ **Delete comments (own or admin-controlled)**
- ✅ **User Authentication & Authorization**
- ✅ **Timestamps for posts and comments**
- ✅ **Admin privileges for managing posts & comments**

---

## 📌 API Endpoints

### **Blog Post Routes**
| Method   | Route               | Description               | Auth Required |
|----------|---------------------|---------------------------|--------------|
| `POST`   | `/blogs/posts`      | Create a new blog post    | ✅ Yes       |
| `GET`    | `/blogs/posts`      | Get all blog posts        | ✅ Yes       |
| `GET`    | `/blogs/posts/:id`  | Get a single blog post    | ✅ Yes       |
| `PUT`    | `/blogs/posts/:id`  | Update own blog post      | ✅ Yes       |
| `DELETE` | `/blogs/posts/:id`  | Delete own blog post      | ✅ Yes       |

### **Comment Routes**
| Method   | Route                         | Description                  | Auth Required |
|----------|-------------------------------|------------------------------|--------------|
| `POST`   | `/blogs/posts/:id/comments`   | Add a comment to a post      | ✅ Yes       |
| `GET`    | `/blogs/posts/:id/comments`   | Get all comments for a post  | ✅ Yes       |
| `PUT`    | `/blogs/comments/:id`         | Update own comment           | ✅ Yes       |
| `DELETE` | `/blogs/comments/:id`         | Delete own comment           | ✅ Yes       |
| `DELETE` | `/blogs/comments/:id/admin`   | Admin delete any comment     | ✅ Yes (Admin) |

---

## 🔐 Authentication & Authorization
- Uses **JWT Authentication** for secure access.
- Requires **users to log in** before creating, updating, or deleting posts and comments.
- Admin users have **special privileges** for managing all posts and comments.

---

## 🛠️ Technologies Used
- **Node.js** + **Express.js**
- **MongoDB** + **Mongoose**
- **JWT Authentication** for secure user access
- **Postman** for API Testing

---

## 🔑 Login Credentials (For Testing)

### **Admin Account**
Use these credentials to log in as an admin:
{
    "email": "admin@mail.com",
    "username": "admin1",
    "password": "admin123"
}


### Non-Admin
json
{
    "email": "angelonoelsigue@mail.com",
    "username": "angelonoel",
    "password": "password"
}