using Medicard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class AutoCompleteController : Controller
    {
        // GET: AutoComplete
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Methods()
        {
            Thread.Sleep(700);
            return PartialView();
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

        public JsonResult Data(Args arg)
        {
            // TODO: Filter results
            return Json(Country.List().Select(c => c.Name).ToArray(), JsonRequestBehavior.AllowGet);
        }
    }

    public class Args
    {
        public string value { get; set; }
    }
}