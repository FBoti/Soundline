using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace SoundLineBackend.Models;

public partial class SoundLineContext : DbContext
{
    public SoundLineContext()
    {
    }

    public SoundLineContext(DbContextOptions<SoundLineContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Band> Bands { get; set; }

    public virtual DbSet<BandMember> BandMembers { get; set; }

    public virtual DbSet<Instrument> Instruments { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;port=3306;database=soundline;user=root;password=;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Band>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("bands");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CreateTime)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("timestamp")
                .HasColumnName("createTime");
            entity.Property(e => e.Description)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.FoundationDate)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("foundationDate");
            entity.Property(e => e.Name)
                .HasMaxLength(100)
                .HasColumnName("name");
        });

        modelBuilder.Entity<BandMember>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("band_members");

            entity.HasIndex(e => e.BandId, "band_id");

            entity.HasIndex(e => e.InstrumentId, "instrument_id");

            entity.HasIndex(e => new { e.UserId, e.BandId }, "user_id").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.BandId)
                .HasColumnType("int(11)")
                .HasColumnName("band_id");
            entity.Property(e => e.InstrumentId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("instrument_id");
            entity.Property(e => e.JoinTime)
                .HasDefaultValueSql("'curdate()'")
                .HasColumnType("date")
                .HasColumnName("joinTime");
            entity.Property(e => e.UserId)
                .HasColumnType("int(11)")
                .HasColumnName("user_id");

            entity.HasOne(d => d.Band).WithMany(p => p.BandMembers)
                .HasForeignKey(d => d.BandId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("band_members_ibfk_2");

            entity.HasOne(d => d.Instrument).WithMany(p => p.BandMembers)
                .HasForeignKey(d => d.InstrumentId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("band_members_ibfk_3");

            entity.HasOne(d => d.User).WithMany(p => p.BandMembers)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("band_members_ibfk_1");
        });

        modelBuilder.Entity<Instrument>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("instruments");

            entity.HasIndex(e => e.Name, "name").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.InstrumentFamily)
                .HasMaxLength(50)
                .HasColumnName("instrument_family");
            entity.Property(e => e.Name)
                .HasMaxLength(50)
                .HasColumnName("name");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("users");

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.Username, "username").IsUnique();

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.CreateTime)
                .HasDefaultValueSql("'current_timestamp()'")
                .HasColumnType("timestamp")
                .HasColumnName("createTime");
            entity.Property(e => e.Email)
                .HasMaxLength(50)
                .HasColumnName("email");
            entity.Property(e => e.FirstName)
                .HasMaxLength(25)
                .HasColumnName("first_name");
            entity.Property(e => e.LastName)
                .HasMaxLength(25)
                .HasColumnName("last_name");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.Username)
                .HasMaxLength(25)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
