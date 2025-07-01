# Training Management API (.NET)

A simple .NET 8 Web API for the Training Management System using Dapper for data access.

## Features

- 🔐 **JWT Authentication** - Secure token-based authentication
- 👥 **Role-Based Access** - Employee, L&D Team, and Admin roles
- 🗄️ **Dapper ORM** - Lightweight data access
- 🔒 **BCrypt Password Hashing** - Secure password storage
- 📚 **Swagger Documentation** - API documentation and testing

## Prerequisites

- .NET 8 SDK
- SQL Server (LocalDB or full instance)
- Visual Studio 2022 or VS Code

## Quick Start

### 1. Database Setup

1. **Open SQL Server Management Studio or Azure Data Studio**
2. **Run the database setup script:**
   ```sql
   -- Execute the contents of Database/SetupDatabase.sql
   ```

### 2. API Setup

1. **Navigate to the API directory:**
   ```bash
   cd api
   ```

2. **Restore packages:**
   ```bash
   dotnet restore
   ```

3. **Update connection string** in `appsettings.json` if needed:
   ```json
   {
     "ConnectionStrings": {
       "DefaultConnection": "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TrainingDB;Integrated Security=true"
     }
   }
   ```

4. **Run the API:**
   ```bash
   dotnet run
   ```

5. **Access Swagger UI:**
   Navigate to `https://localhost:7001/swagger` or `http://localhost:5001/swagger`

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `GET /api/auth/verify` - Verify JWT token (requires authentication)
- `GET /api/auth/health` - Health check

### Login Request Format
```json
{
  "email": "employee@demo.com",
  "password": "password123",
  "role": "employee"
}
```

### Login Response Format
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Employee",
    "email": "employee@demo.com",
    "role": "employee",
    "department": "Engineering",
    "phoneNumber": null,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastLoginAt": "2024-01-01T12:00:00Z"
  }
}
```

## Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| Employee | employee@demo.com | password123 |
| L&D Team | ld@demo.com | password123 |
| Admin | admin@demo.com | password123 |

## Project Structure

```
api/
├── Controllers/
│   └── AuthController.cs      # Authentication endpoints
├── Models/
│   └── User.cs               # User model
├── Services/
│   ├── AuthService.cs        # Authentication logic
│   └── DatabaseService.cs    # Data access with Dapper
├── Database/
│   └── SetupDatabase.sql     # Database setup script
├── Program.cs                # Application entry point
├── appsettings.json          # Configuration
└── TrainingAPI.csproj        # Project file
```

## Configuration

### JWT Settings
Update the JWT secret key in `appsettings.json`:
```json
{
  "JwtSettings": {
    "SecretKey": "your-super-secret-jwt-key-change-this-in-production-minimum-32-characters"
  }
}
```

### Database Connection
Update the connection string in `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "your-connection-string-here"
  }
}
```

## Development

### Running in Development Mode
```bash
dotnet run --environment Development
```

### Building for Production
```bash
dotnet build --configuration Release
dotnet run --configuration Release
```

### Testing with Swagger
1. Open `https://localhost:7001/swagger`
2. Click "Authorize" and enter your JWT token
3. Test the endpoints directly from the UI

## Security Notes

- Change the JWT secret key in production
- Use HTTPS in production
- Implement proper password policies
- Add rate limiting for production use
- Consider adding refresh tokens for better security

## Troubleshooting

### Common Issues

1. **Database Connection Error:**
   - Ensure SQL Server is running
   - Check connection string in `appsettings.json`
   - Verify database exists and tables are created

2. **JWT Token Issues:**
   - Check JWT secret key length (minimum 32 characters)
   - Verify token expiration settings

3. **CORS Issues:**
   - CORS is configured to allow all origins in development
   - Restrict origins in production

## Next Steps

- Add user registration endpoint
- Implement password reset functionality
- Add training request management
- Implement role-based authorization middleware
- Add logging and monitoring 