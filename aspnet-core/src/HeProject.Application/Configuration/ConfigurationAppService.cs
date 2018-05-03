using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using HeProject.Configuration.Dto;

namespace HeProject.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : HeProjectAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
