using Medicard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class DualListBoxController : Controller
    {
        // GET: DualListBox
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Data()
        {
            return Json(Country.List().Select(o => new { Text = o.Name, Value = o.Id }).ToArray(), JsonRequestBehavior.AllowGet);
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