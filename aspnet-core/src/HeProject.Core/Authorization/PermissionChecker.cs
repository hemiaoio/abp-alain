using Abp.Authorization;
using HeProject.Authorization.Roles;
using HeProject.Authorization.Users;

namespace HeProject.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
