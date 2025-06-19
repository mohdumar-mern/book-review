# 📚 Book Review Platform

A full-stack Book Review Platform where users can browse books, download PDFs, leave reviews, and manage their profiles. Admins can add, update, and delete books. Built with React, Node.js, Express, MongoDB, and Cloudinary for media storage.


## 🔗 Live Demo
🚀 https://yourdomain.com

## 📌 Features
### 👥 User Functionality

- Register & login with form validation
- Auth token stored in Redux + localStorage
- View book list & individual book details
- Submit star-based reviews
- Download PDF books
- Update profile info

### 🛠 Admin Functionality

- Add new books (with image + PDF upload to Cloudinary)
- Delete books
- View all books with pagination
- Role-based access control

### 🌐 SEO & UX

- Dynamic <title> and <meta> tags with react-helmet
- Fully responsive and mobile-friendly
- Fast client-side search
- Accessible form validation and feedback



---

## 📦 Tech Stack

| Frontend        | Backend            | Cloud/File | Auth & State    | Utilities |
|----------------|--------------------|------------|-----------------|-------------|
| React + Vite   | Node.js + Express  | Cloudinary | JWT, Redux Toolkit |React Hook Form|
| Tailwind CSS   | MongoDB + Mongoose | Multer     | Redux Persist   | react-helmet-async|
|React Router    | Mongo Atlas        |            |Protected Routes |lucide-react |

---

## 📁 Project Structure

book-review-platform/
│
├── server/
│ ├── config/
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── middleware/
│ └── server.js
│ └── app.js
│
├── client/
│ ├── src/
│ │ ├── app/
│ │ ├── components/
│ │ ├── features/
│ │ ├── pages/
│ │ ├── routes/
│ │ ├── services/
│ │ └── App.jsx
│
├── README.md


## 🧪 Environment Variables

### client/.env

- VITE_BACKEND_API =http://localhost:3000/api
- VITE_NODE_ENV=production


### server/.env
- PORT=3000
- MONGO_URI=your_mongo_connection_string
- JWT_SECRET=your_jwt_secret
- CLOUDINARY_CLOUD_NAME=your_cloud_name
- CLOUDINARY_API_KEY=your_api_key
- CLOUDINARY_API_SECRET=your_api_secret


## 🚀 Getting Started (Local Development)



##📄 License
MIT

## ✨ Author
### Developed by Mohd Umar — MERN Stack Developer
- 🌐 [Portfolio Website](https://mohd-umar-mern.vercel.app)
- 💼 [LinkedIn](https://www.linkedin.com/in/mohd-umar-mern-stack-developer/)