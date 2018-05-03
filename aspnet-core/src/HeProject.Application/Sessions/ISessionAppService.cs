using System.Threading.Tasks;
using Abp.Application.Services;
using HeProject.Sessions.Dto;

namespace HeProject.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
