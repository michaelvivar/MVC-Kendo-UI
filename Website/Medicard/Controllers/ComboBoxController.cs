using Medicard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class ComboBoxController : Controller
    {
        // GET: ComboBox
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Country()
        {
            return Json(Models.Country.List().Select(c => new { Value = c.Id, Text = c.Name }), JsonRequestBehavior.AllowGet);
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