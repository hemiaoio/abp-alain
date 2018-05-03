using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HeProject.MultiTenancy.Dto;

namespace HeProject.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}
