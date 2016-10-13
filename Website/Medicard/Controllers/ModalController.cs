using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class ModalController : Controller
    {
        // GET: Modal
        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public ActionResult Create(Guid? id)
        {
            Thread.Sleep(700);
            return PartialView();
        }

        [HttpPost]
        public ActionResult Create()
        {
            var messages = new List<string>();
            var data = "";
            messages.Add("Records successfully saved!");
            return Json(new { ActionStatus = "Success", Messages = messages, DataResult = data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Methods()
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