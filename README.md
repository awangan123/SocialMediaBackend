# Social Media REST API

Welcome to the **Fullstack Social Media REST API** project! This backend service is built using **Node.js, Express.js, and MongoDB** to handle user authentication, posts, comments, messaging, and more.

## 🚀 Features

- CRUD Operations
- JWT Token Authentication
- Image Uploads
- Comments and Replies
- Story Uploads (Auto-delete after 24 hours)
- Post Likes and Dislikes
- Messaging System
- User Authentication (Login, Register, Logout)
- Blocking & Following Functionality

---

## 📂 Project Structure

```
📦 social-media-api
 ┣ 📂 config
 ┣ 📂 controllers
 ┣ 📂 middleware
 ┣ 📂 models
 ┣ 📂 routes
 ┣ 📂 utils
 ┣ 📜 .env.example
 ┣ 📜 index.js
 ┣ 📜 package.json
```

---

## 🔧 Installation & Setup

1. **Clone the repository**
```bash
  git clone https://github.com/snehasishdey333/social-media-api.git
  cd social-media-api
```

2. **Install dependencies**
```bash
  npm install
```

3. **Setup Environment Variables**
   - Copy `.env.example` to `.env`
   - Update MongoDB URI and JWT secrets

4. **Start the Server**
```bash
  npm start
```

The API will be running at **http://localhost:5000**

---

## 🛠️ API Endpoints

### Auth Routes
- `POST /auth/register` - User Registration
- `POST /auth/login` - User Login
- `POST /auth/logout` - User Logout

### User Routes
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user details
- `DELETE /users/:id` - Delete user
- `POST /users/follow/:id` - Follow a user
- `POST /users/unfollow/:id` - Unfollow a user
- `POST /users/block/:id` - Block a user
- `POST /users/unblock/:id` - Unblock a user

### Post Routes
- `POST /posts/` - Create a new post
- `GET /posts/` - Get all posts
- `GET /posts/:id` - Get a specific post
- `PUT /posts/:id` - Update a post
- `DELETE /posts/:id` - Delete a post

### Comment Routes
- `POST /comments/:postId` - Add a comment
- `PUT /comments/:id` - Update a comment
- `DELETE /comments/:id` - Delete a comment

### Story Routes
- `POST /stories/` - Create a story
- `GET /stories/` - Get all stories
- `DELETE /stories/:id` - Delete a story

### Messaging Routes
- `POST /messages/` - Send a message
- `GET /messages/:conversationId` - Get messages
- `DELETE /messages/:id` - Delete a message

---

## 🖼️ Image Upload
- Uses **Multer** for handling file uploads.
- Supports profile picture and cover photo updates.

---

## 🔑 Authentication
- JWT (JSON Web Token) is used for authentication.
- Tokens are validated via middleware before accessing protected routes.
---

## 🤝 Contributing
Feel free to contribute by submitting issues or pull requests.

---

## 📜 License
This project is **MIT Licensed**.

---
