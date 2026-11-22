using System;
using System.Collections.Generic;

namespace SoundLineBackend.Models;

public partial class BandMember
{
    public int Id { get; set; }

    public int UserId { get; set; }

    public int BandId { get; set; }

    public int? InstrumentId { get; set; }

    public DateTime? JoinTime { get; set; }

    public virtual Band Band { get; set; } = null!;

    public virtual Instrument? Instrument { get; set; }

    public virtual User User { get; set; } = null!;
}
