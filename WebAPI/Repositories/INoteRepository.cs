using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public interface INoteRepository
    {
        IEnumerable<Note> Get();
        Note GetById(int? id);
        void New(Note note);
        void Update(Note note);
        void Delete(int? id);
        void Save();
    }
}
