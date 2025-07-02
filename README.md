# Learn Track Automate - Training Management System

A modern training request management system with role-based access control for employees, L&D teams, and administrators.

## Features

- 🔐 **Authentication System** - Secure login with JWT tokens
- 👥 **Role-Based Access** - Employee, L&D Team, and Admin portals
- 📊 **Dashboard Analytics** - Real-time statistics and insights
- 🎨 **Modern UI** - Beautiful, responsive design with Tailwind CSS
- 🔄 **Real-time Updates** - Live data synchronization

## Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- Lucide React Icons
- React Router DOM
- React Query

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8080`

### Backend Setup

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp env.example .env
   ```

4. **Start the server:**
   ```bash
npm run dev
```

The API will be available at `http://localhost:5000`

## Demo Credentials

### Employee Access
- **Email:** employee@demo.com
- **Password:** password123
- **Role:** Employee

### L&D Team Access
- **Email:** ld@demo.com
- **Password:** password123
- **Role:** L&D Team

### Admin Access
- **Email:** admin@demo.com
- **Password:** password123
- **Role:** Admin

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token
- `GET /api/user/profile` - Get user profile

### Health Check
- `GET /api/health` - Server health status

## Project Structure

```
abhyas/
├── src/
│   ├── components/
│   │   ├── auth/          # Authentication components
│   │   ├── dashboard/     # Dashboard components
│   │   ├── layout/        # Layout components
│   │   └── ui/           # UI components
│   ├── contexts/         # React contexts
│   ├── pages/           # Page components
│   └── lib/             # Utility functions
├── server/              # Backend API
│   ├── server.js        # Main server file
│   └── package.json     # Backend dependencies
└── public/              # Static assets
```

## Development

### Running Both Frontend and Backend

1. **Terminal 1 - Frontend:**
   ```bash
   npm run dev
   ```


   ```

### Building for Production

1. **Frontend:**
   ```bash
   npm run build
   ```


## Environment Variables


```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
