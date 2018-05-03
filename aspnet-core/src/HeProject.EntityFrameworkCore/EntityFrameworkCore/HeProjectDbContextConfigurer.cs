using System;
using System.Data.Common;
using System.IO;
using HeProject.Web;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;

namespace HeProject.EntityFrameworkCore
{
    public static class HeProjectDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<HeProjectDbContext> builder, string connectionString)
        {
            var connectionStringBuilder = new SqliteConnectionStringBuilder();
            if (connectionString.ToLower().Replace("data source=","").StartsWith("app_data"))
            {
                try
                {
                    var hostPath = WebContentDirectoryFinder.CalculateContentRootFolder();
                    connectionStringBuilder.DataSource = Path.Combine(hostPath, connectionString.Remove(0,12));
                }
                catch (Exception)
                {
                    connectionStringBuilder.DataSource = Path.Combine(AppContext.BaseDirectory, connectionString.Remove(0,12));
                }
                connectionString = connectionStringBuilder.ConnectionString;
            }
            builder.UseSqlite(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<HeProjectDbContext> builder, DbConnection connection)
        {
            builder.UseSqlite(connection);
        }
    }
}