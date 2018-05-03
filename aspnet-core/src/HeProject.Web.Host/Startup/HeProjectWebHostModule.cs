using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HeProject.Configuration;

namespace HeProject.Web.Host.Startup
{
    [DependsOn(
       typeof(HeProjectWebCoreModule))]
    public class HeProjectWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public HeProjectWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

		public override void PreInitialize()
		{
            Configuration.Navigation.Providers.Add<AppNavigationProvider>();
		}
		public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(HeProjectWebHostModule).GetAssembly());
        }
    }
}
