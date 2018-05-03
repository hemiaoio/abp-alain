using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using HeProject.Authorization;

namespace HeProject
{
    [DependsOn(
        typeof(HeProjectCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class HeProjectApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<HeProjectAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(HeProjectApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}
