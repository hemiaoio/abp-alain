using System.Threading.Tasks;
using HeProject.Configuration.Dto;

namespace HeProject.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
