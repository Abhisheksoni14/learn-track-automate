using Dapper;
using Microsoft.Data.SqlClient;
using TrainingAPI.Models;

namespace TrainingAPI.Services
{
    public interface IDatabaseService
    {
        Task<User?> GetUserByEmailAndRoleAsync(string email, string role);
        Task UpdateLastLoginAsync(int userId);
        Task<IEnumerable<User>> GetAllUsersAsync();
    }

    public class DatabaseService : IDatabaseService
    {
        private readonly string _connectionString;

        public DatabaseService(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection") ?? 
                "Data Source=(localdb)\\MSSQLLocalDB;Initial Catalog=TrainingDB;Integrated Security=true";
        }

        public async Task<User?> GetUserByEmailAndRoleAsync(string email, string role)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"
                SELECT Id, Name, Email, PasswordHash, Role, Department, PhoneNumber, 
                       CreatedAt, LastLoginAt, IsActive 
                FROM Users 
                WHERE Email = @Email AND Role = @Role AND IsActive = 1";
            
            return await connection.QueryFirstOrDefaultAsync<User>(sql, new { Email = email, Role = role });
        }

        public async Task UpdateLastLoginAsync(int userId)
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = "UPDATE Users SET LastLoginAt = @LastLoginAt WHERE Id = @UserId";
            await connection.ExecuteAsync(sql, new { LastLoginAt = DateTime.UtcNow, UserId = userId });
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync()
        {
            using var connection = new SqlConnection(_connectionString);
            var sql = @"
                SELECT Id, Name, Email, Role, Department, PhoneNumber, 
                       CreatedAt, LastLoginAt, IsActive 
                FROM Users 
                WHERE IsActive = 1 
                ORDER BY Name";
            
            return await connection.QueryAsync<User>(sql);
        }
    }
} 