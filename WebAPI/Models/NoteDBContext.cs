using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAPI.Models
{
    public class NoteDBContext:DbContext
    {
        public NoteDBContext(DbContextOptions<NoteDBContext> options):base(options)
        {

        }

        public DbSet<Note> DbNote { get; set; }
    }

}
