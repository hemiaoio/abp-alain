using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using HeProject.Authorization.Roles;
using HeProject.Authorization.Users;
using HeProject.MultiTenancy;

namespace HeProject.EntityFrameworkCore
{
    public class HeProjectDbContext : AbpZeroDbContext<Tenant, Role, User, HeProjectDbContext>
    {
        /* Define a DbSet for each entity of the application */
        
        public HeProjectDbContext(DbContextOptions<HeProjectDbContext> options)
            : base(options)
        {
        }
    }
}
