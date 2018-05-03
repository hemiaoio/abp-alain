using System.Threading.Tasks;
using Abp.Application.Services;
using HeProject.Authorization.Accounts.Dto;

namespace HeProject.Authorization.Accounts
{
    public interface IAccountAppService : IApplicationService
    {
        Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input);

        Task<RegisterOutput> Register(RegisterInput input);
    }
}
