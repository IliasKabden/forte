using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebAPI.Models;

namespace WebAPI.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly NoteDBContext _dbContext;

        public NoteRepository(NoteDBContext _db)
        {
            _dbContext = _db;
        }

        public IEnumerable<Note> Get()
        {
            return _dbContext.DbNote.ToList();
        }

        public Note GetById(int? id)
        {
            return _dbContext.DbNote.Find(id);
        }

        public void New(Note note)
        {
            _dbContext.DbNote.Add(note);
            Save();
        }

        public void Update(Note note)
        {
            _dbContext.Entry(note).State = EntityState.Modified;
        }

        public void Delete(int? id)
        {
            var note = _dbContext.DbNote.Find(id);
            if (note != null) _dbContext.DbNote.Remove(note);
        }

        public void Save()
        {
            _dbContext.SaveChanges();
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _dbContext.Dispose();
                }
            }
            this._disposed = true;
        }
        public void Dispose()
        {
            Dispose(true);
        }
    }
}
