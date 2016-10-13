using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class AccordionController : Controller
    {
        // GET: Accordion
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Properties()
        {
            Thread.Sleep(700);
            return PartialView();
        }

        public ActionResult Events()
        {
            Thread.Sleep(700);
            return PartialView();
        }
    }
}