using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class MultiSelectController : Controller
    {
        // GET: MultiSelect
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Color()
        {
            return Json(Models.Color.List().Select(c => new { Value = c.Id, Text = c.Name }), JsonRequestBehavior.AllowGet);
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
    }
}