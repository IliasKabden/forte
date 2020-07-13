namespace WebAPI.Models
{
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    public class Note
    {
        [Key]
        public int UID { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string FullName { get; set; }

        [Column(TypeName = "nvarchar(16)")]
        public string Mobile { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Organization { get; set; }

        [Column(TypeName = "nvarchar(3)")]
        public string Importance { get; set; }
    }
}
