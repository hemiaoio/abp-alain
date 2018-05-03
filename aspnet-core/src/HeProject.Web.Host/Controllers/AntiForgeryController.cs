using Microsoft.AspNetCore.Antiforgery;
using HeProject.Controllers;

namespace HeProject.Web.Host.Controllers
{
    public class AntiForgeryController : HeProjectControllerBase
    {
        private readonly IAntiforgery _antiforgery;

        public AntiForgeryController(IAntiforgery antiforgery)
        {
            _antiforgery = antiforgery;
        }

        public void GetToken()
        {
            _antiforgery.SetCookieTokenAndHeader(HttpContext);
        }
    }
}
