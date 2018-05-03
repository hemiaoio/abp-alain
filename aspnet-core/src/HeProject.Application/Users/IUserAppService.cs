using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using HeProject.Roles.Dto;
using HeProject.Users.Dto;

namespace HeProject.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}
