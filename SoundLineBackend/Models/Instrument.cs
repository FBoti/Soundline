using System;
using System.Collections.Generic;

namespace SoundLineBackend.Models;

public partial class Instrument
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string InstrumentFamily { get; set; } = null!;

    public virtual ICollection<BandMember> BandMembers { get; set; } = new List<BandMember>();
}
