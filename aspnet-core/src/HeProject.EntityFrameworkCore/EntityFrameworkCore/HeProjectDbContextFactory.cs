using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using HeProject.Configuration;
using HeProject.Web;

namespace HeProject.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class HeProjectDbContextFactory : IDesignTimeDbContextFactory<HeProjectDbContext>
    {
        public HeProjectDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<HeProjectDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            HeProjectDbContextConfigurer.Configure(builder, configuration.GetConnectionString(HeProjectConsts.ConnectionStringName));

            return new HeProjectDbContext(builder.Options);
        }
    }
}
