using System;
using System.Collections.Generic;

namespace SoundLineBackend.Models;

public partial class User
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string Email { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

    public string PasswordSalt { get; set; } = null!;

    public string FirstName { get; set; } = null!;

    public string LastName { get; set; } = null!;

    public DateTime? CreateTime { get; set; }

    public virtual ICollection<BandMember> BandMembers { get; set; } = new List<BandMember>();
}
