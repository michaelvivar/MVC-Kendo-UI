using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Notification()
        {
            return PartialView();
        }

        public ActionResult Iframe()
        {
            return PartialView();
        }

        public ActionResult Ajax()
        {
            return PartialView();
        }

        public ActionResult Window()
        {
            return PartialView();
        }
    }
}