using System;
using System.Collections.Generic;

namespace SoundLineBackend.Models;

public partial class Band
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public DateTime? FoundationDate { get; set; }

    public DateTime? CreateTime { get; set; }

    public virtual ICollection<BandMember> BandMembers { get; set; } = new List<BandMember>();
}
