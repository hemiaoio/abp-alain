using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace HeProject.Controllers
{
    public abstract class HeProjectControllerBase: AbpController
    {
        protected HeProjectControllerBase()
        {
            LocalizationSourceName = HeProjectConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
