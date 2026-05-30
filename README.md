# 🗺️ Helpzo – Local Service Finder

A full-stack web application to connect users with verified local service workers — plumbers, electricians, carpenters, mechanics, and more.

---

## 🚀 Tech Stack

| Layer      | Technology                          |
|------------|-------------------------------------|
| Frontend   | React.js 18, React Router v6        |
| Styling    | Tailwind CSS, Google Fonts (DM Sans + Syne) |
| Backend    | Node.js, Express.js                 |
| Database   | MongoDB (Mongoose ODM)              |
| Auth       | JWT (JSON Web Tokens) + bcryptjs    |
| HTTP       | Axios                               |

---

## 📁 Project Structure

```
helpzo/
├── frontend/
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── components/
│       │   ├── Navbar.js         # Sticky navbar with auth state
│       │   ├── WorkerCard.js     # Worker card with rating, badge, actions
│       │   └── SearchBar.js      # Search + category filter chips
│       ├── pages/
│       │   ├── Home.js           # Hero + worker grid with filters
│       │   ├── Login.js          # Login with validation
│       │   ├── Register.js       # Register with password strength
│       │   ├── WorkerProfile.js  # Full worker profile detail
│       │   └── RegisterWorker.js # Add new worker (protected)
│       ├── services/
│       │   └── api.js            # Axios instance + API wrappers
│       ├── App.js                # Router + layout
│       ├── index.js
│       └── styles.css            # Tailwind + custom CSS
│
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema (with bcrypt)
│   │   └── Worker.js             # Worker schema
│   ├── routes/
│   │   ├── authRoutes.js         # /api/auth
│   │   └── workerRoutes.js       # /api/workers
│   ├── controllers/
│   │   ├── authController.js     # register, login, getMe
│   │   └── workerController.js   # CRUD + seed
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT protect middleware
│   ├── server.js                 # Express entry point
│   └── .env.example
│
└── README.md
```

---

## ⚙️ Setup & Running Instructions

### Prerequisites
- Node.js v16+
- MongoDB (local or Atlas)
- npm or yarn

---

### 1. Clone & Install

```bash
# Install backend dependencies
cd helpzo/backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

### 2. Configure Environment

```bash
# In helpzo/backend/
cp .env.example .env
```

Edit `.env`:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/helpzo   # or your Atlas URI
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

For **MongoDB Atlas**, replace `MONGO_URI` with:
```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/helpzo
```

---

### 3. Run the Backend

```bash
cd helpzo/backend
npm start
# Server runs on http://localhost:5000
```

---

### 4. Run the Frontend

```bash
cd helpzo/frontend
npm start
# App opens at http://localhost:3000
```

---

### 5. Load Sample Data

Once both servers are running:
1. Open the app at http://localhost:3000
2. Click **"Load Sample Data"** on the homepage (shown when no workers exist)
3. 10 sample workers will be seeded into the database

Alternatively, via API:
```bash
curl -X POST http://localhost:5000/api/workers/seed
```

---

## 🔌 API Reference

### Auth Endpoints

| Method | Endpoint              | Access  | Description         |
|--------|-----------------------|---------|---------------------|
| POST   | `/api/auth/register`  | Public  | Register new user   |
| POST   | `/api/auth/login`     | Public  | Login, get JWT      |
| GET    | `/api/auth/me`        | Private | Get current user    |

### Worker Endpoints

| Method | Endpoint              | Access  | Description              |
|--------|-----------------------|---------|--------------------------|
| GET    | `/api/workers`        | Public  | Get all workers + filter |
| GET    | `/api/workers/:id`    | Public  | Get single worker        |
| POST   | `/api/workers`        | Private | Create worker profile    |
| PUT    | `/api/workers/:id`    | Private | Update worker profile    |
| DELETE | `/api/workers/:id`    | Private | Delete worker            |
| POST   | `/api/workers/seed`   | Public  | Seed sample data         |

### Query Parameters for `GET /api/workers`

| Param      | Example              | Description              |
|------------|----------------------|--------------------------|
| `category` | `?category=plumber`  | Filter by category       |
| `location` | `?location=Brooklyn` | Filter by location       |
| `search`   | `?search=Carlos`     | Search name/category/loc |

---

## 🗄️ Database Schema

### User
```js
{
  name:      String (required),
  email:     String (required, unique),
  password:  String (hashed with bcrypt),
  createdAt: Date
}
```

### Worker
```js
{
  name:         String (required),
  category:     String (enum: plumber|electrician|carpenter|mechanic|painter|cleaner|gardener|other),
  location:     String (required),
  rating:       Number (default: 4.0, range 0–5),
  availability: Boolean (default: true),
  experience:   Number (years, required),
  phone:        String,
  bio:          String (max 300 chars),
  reviewCount:  Number (default: 0),
  createdAt:    Date
}
```

---

## 🎨 Features Overview

- **Homepage**: Hero section with search bar + category chips + responsive worker grid
- **Search & Filter**: By name, location, and service category (real-time)
- **Worker Cards**: Avatar, name, star rating, availability badge, category tag, location, experience
- **Worker Profile**: Full detail view with call and message buttons
- **Auth**: JWT-based register/login with protected routes
- **Add Worker**: Form with category grid selector (requires login)
- **Sample Data**: One-click seed for 10 demo workers
- **Responsive**: Mobile-first design throughout

---

## 🛠️ Development Tips

- Backend uses `nodemon` for hot reload: `npm run dev`
- Frontend proxies `/api` requests to `localhost:5000` via the `proxy` field in `package.json`
- JWT tokens are stored in `localStorage` under key `helpzo_token`
- Tailwind classes are available via CDN — no build step needed for base utilities

---

## 📄 License

MIT — free to use for personal and commercial projects.
