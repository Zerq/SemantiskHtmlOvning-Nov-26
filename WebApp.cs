using Microsoft.AspNetCore.StaticFiles;
namespace Hobby;

public class WebApp{  
   public static void Run()
   {
      var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

      var builder = WebApplication.CreateBuilder();
      builder.Services.AddControllers()
         .AddJsonOptions(options =>
         {
            options.JsonSerializerOptions.PropertyNameCaseInsensitive = false;
            options.JsonSerializerOptions.PropertyNamingPolicy = null;
         });

      builder.Services.AddCors();

      var app = builder.Build();
      app.UseHttpsRedirection();

      app.UseCors(MyAllowSpecificOrigins);
      app.UseRouting();
      app.MapDefaultControllerRoute();
      app.MapControllers();

      app.UseDefaultFiles();

      var extensionpProvider = new FileExtensionContentTypeProvider();
      extensionpProvider.Mappings.Add(".tsx", "text/plain");

      app.UseStaticFiles(new StaticFileOptions
      {
         ServeUnknownFileTypes = true,
         ContentTypeProvider = extensionpProvider,
      });

      app.Run();
   }
}
