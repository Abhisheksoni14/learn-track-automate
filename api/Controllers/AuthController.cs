using Microsoft.AspNetCore.Mvc;
using TrainingAPI.Services;

namespace TrainingAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            try
            {
                // Validate request
                if (string.IsNullOrEmpty(request.Email) || 
                    string.IsNullOrEmpty(request.Password) || 
                    string.IsNullOrEmpty(request.Role))
                {
                    return BadRequest(new { message = "Email, password, and role are required" });
                }

                // Validate email format
                if (!IsValidEmail(request.Email))
                {
                    return BadRequest(new { message = "Invalid email format" });
                }

                // Validate role
                if (!new[] { "employee", "ld", "admin" }.Contains(request.Role.ToLower()))
                {
                    return BadRequest(new { message = "Invalid role. Must be employee, ld, or admin" });
                }

                // Attempt login
                var result = await _authService.LoginAsync(
                    request.Email, 
                    request.Password, 
                    request.Role.ToLower()
                );

                if (result == null)
                {
                    return Unauthorized(new { message = "Invalid email, password, or role" });
                }

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpGet("verify")]
        public IActionResult VerifyToken()
        {
            try
            {
                var userId = User.FindFirst("userId")?.Value;
                var userEmail = User.FindFirst("userEmail")?.Value;
                var userRole = User.FindFirst("userRole")?.Value;

                if (string.IsNullOrEmpty(userId))
                {
                    return Unauthorized(new { message = "Invalid token" });
                }

                return Ok(new
                {
                    message = "Token is valid",
                    user = new
                    {
                        userId = userId,
                        email = userEmail,
                        role = userRole
                    }
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Internal server error", error = ex.Message });
            }
        }

        [HttpGet("health")]
        public IActionResult Health()
        {
            return Ok(new { status = "OK", message = "Server is running", timestamp = DateTime.UtcNow });
        }

        private bool IsValidEmail(string email)
        {
            try
            {
                var addr = new System.Net.Mail.MailAddress(email);
                return addr.Address == email;
            }
            catch
            {
                return false;
            }
        }
    }

    public class LoginRequest
    {
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
    }
} 