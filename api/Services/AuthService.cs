using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using TrainingAPI.Models;

namespace TrainingAPI.Services
{
    public interface IAuthService
    {
        Task<object?> LoginAsync(string email, string password, string role);
        string GenerateJwtToken(User user);
    }

    public class AuthService : IAuthService
    {
        private readonly IDatabaseService _databaseService;
        private readonly IConfiguration _configuration;

        public AuthService(IDatabaseService databaseService, IConfiguration configuration)
        {
            _databaseService = databaseService;
            _configuration = configuration;
        }

        public async Task<object?> LoginAsync(string email, string password, string role)
        {
            // Get user from database
            var user = await _databaseService.GetUserByEmailAndRoleAsync(email, role);
            
            if (user == null)
            {
                return null;
            }

            // Verify password
            if (!BCrypt.Net.BCrypt.Verify(password, user.PasswordHash))
            {
                return null;
            }

            // Update last login
            await _databaseService.UpdateLastLoginAsync(user.Id);

            // Generate JWT token
            var token = GenerateJwtToken(user);

            // Return user data (without password) and token
            return new
            {
                message = "Login successful",
                token = token,
                user = new
                {
                    id = user.Id,
                    name = user.Name,
                    email = user.Email,
                    role = user.Role,
                    department = user.Department,
                    phoneNumber = user.PhoneNumber,
                    createdAt = user.CreatedAt,
                    lastLoginAt = user.LastLoginAt
                }
            };
        }

        public string GenerateJwtToken(User user)
        {
            var jwtSettings = _configuration.GetSection("JwtSettings");
            var key = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"] ?? "your-super-secret-key-change-in-production");

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Role, user.Role),
                    new Claim("userId", user.Id.ToString()),
                    new Claim("userEmail", user.Email),
                    new Claim("userRole", user.Role)
                }),
                Expires = DateTime.UtcNow.AddHours(24),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature
                )
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
} 