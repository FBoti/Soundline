using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SoundLineBackend.Models;
using SoundLineBackend.Models.DTOs;
using SoundLineBackend.Services;

namespace SoundLineBackend.Controllers
{
    namespace SoundLineBackend.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        public class UserController : ControllerBase
        {
            private readonly SoundLineContext _context;
            private readonly PasswordHasher _passwordHasher;

            public UserController(SoundLineContext context, PasswordHasher passwordHasher)
            {
                _context = context;
                _passwordHasher = passwordHasher;
            }

            [HttpPost("register")]
            public async Task<IActionResult> Register([FromBody] NewUserDTO newUserDto)
            {
                var userExists = await _context.Users
                    .AnyAsync(u => u.Username == newUserDto.Username || u.Email == newUserDto.Email);

                if (userExists)
                {
                    return BadRequest(new { message = "A felhasználónév vagy az email cím már foglalt." });
                }

                var (hash, salt) = _passwordHasher.HashPassword(newUserDto.Password);

                var user = new User
                {
                    Username = newUserDto.Username,
                    Email = newUserDto.Email,
                    PasswordHash = hash,
                    PasswordSalt = salt,
                    FirstName = newUserDto.FirstName,
                    LastName = newUserDto.LastName
                };

                await _context.Users.AddAsync(user);
                await _context.SaveChangesAsync();


                return StatusCode(201, new
                {
                    message = "Sikeres regisztráció!",
                    userId = user.Id
                });
            }

            [HttpGet]
            public async Task<IActionResult> GetAllUsers()
            {
                var users = await _context.Users.ToListAsync();

                var userDtos = users.Select(u => new UserResponseDTO
                {
                    Id = u.Id,
                    Username = u.Username,
                    Email = u.Email,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    CreateTime = u.CreateTime
                }).ToList();
                return Ok(userDtos);
            }
        }
    }
}
