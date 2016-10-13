using Medicard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class GridController : Controller
    {
        // GET: Grid
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Region()
        {
            Thread.Sleep(700);
            return PartialView();
        }

        [HttpGet]
        public ActionResult Edit(Guid? id)
        {
            Thread.Sleep(700);
            return PartialView();
        }

        [HttpPost]
        public ActionResult Edit()
        {
            return Json(new { Data = "", Messages = "Record has been saved", Status = "Success" }, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Data()
        {
            List<Country> list = Country.List();
            return Json(new { Data = list, Total = list.Count }, JsonRequestBehavior.AllowGet);
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

        public ActionResult Subscriptions()
        {
            Thread.Sleep(700);
            return PartialView();
        }
    }
}