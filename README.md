# 📚 InkedReads - Book Library Website

## 🌟 Project Overview

InkedReads is a comprehensive book library website that allows users to explore, discover, and manage their reading journey. Built using the MERN stack (MongoDB, Express.js, React, Node.js), the platform integrates multiple APIs to provide a rich book discovery experience.

### 🔑 Key Features

- User Authentication & Profiles
- Book Discovery
- Award-Winning Books Lists
- Personal Reading Library
- Book Recommendations
- Book Details and Information

## 🚀 Technologies Used

### Frontend
- React.js
- React Router
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### APIs
- Gutenberg API (Public Domain Books)
- Google Books API
- Rapid API (Award-Winning Books)

## 📦 Installation

### Prerequisites
- Node.js (v14 or later)
- MongoDB
- npm or Yarn

### Clone the Repository
```bash
git clone https://github.com/yourusername/inkedreads.git
cd inkedreads
```

### Install Dependencies

#### Backend
```bash
cd backend
npm install
```

#### Frontend
```bash
cd frontend
npm install
```

## 🔧 Configuration

### Environment Variables

Create `.env` files in both backend and frontend directories:

#### Backend `.env`
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GOOGLE_BOOKS_API_KEY=your_google_books_api_key
RAPID_API_KEY=your_rapid_api_key
```

#### Frontend `.env`
```
REACT_APP_BACKEND_URL=http://localhost:5000
REACT_APP_GOOGLE_BOOKS_API_KEY=your_google_books_api_key
```

## 🌈 Features Breakdown

### 1. User Authentication
- Sign Up
- Login
- Profile Management
- Password Recovery

### 2. Book Discovery
- Search Books
- Filter by Genre
- View Book Details
- Add to Personal Library

### 3. APIs Integration
- Gutenberg API: Access public domain books
- Google Books API: Fetch detailed book information
- Rapid API: Retrieve award-winning book lists

### 4. Personal Library
- Track Reading Progress
- Mark Books as Read/Unread
- Create Reading Lists
- Rate and Review Books

## 🗂️ Project Structure

```
inkedreads/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`

### Books
- `GET /api/books/search`
- `GET /api/books/details/:id`
- `GET /api/books/awards`

### User Library
- `GET /api/library/mybooks`
- `POST /api/library/add`
- `DELETE /api/library/remove`

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🛡️ Security

- JWT Authentication
- Password Hashing
- Input Validation
- CORS Configuration
- Environment-based Configuration

## 🚧 Future Roadmap

- [ ] Social Sharing Features
- [ ] Advanced Recommendation Engine
- [ ] Reading Challenge Tracker
- [ ] Offline Mode Support

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

## 📞 Contact

SWATHI K: swathikuppusamy2005@gmail.com

Project Link: https://inkedreads.netlify.app/

## 🙏 Acknowledgements

- React.js
- Node.js
- MongoDB
- Gutenberg API
- Google Books API
- Rapid API
