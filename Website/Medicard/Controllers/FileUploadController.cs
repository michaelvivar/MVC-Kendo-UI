using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class FileUploadController : Controller
    {
        // GET: FileUpload
        public ActionResult Index()
        {
            return View();
        }

        public JsonResult Upload()
        {
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public JsonResult Remove()
        {
            return Json(true, JsonRequestBehavior.AllowGet);
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