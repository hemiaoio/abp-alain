using System.ComponentModel.DataAnnotations;

namespace HeProject.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}