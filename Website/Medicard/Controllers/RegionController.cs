using Medicard.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Medicard.Controllers
{
    public class RegionController : Controller
    {
        // GET: Region
        public JsonResult Data()
        {
            List<Region> list = Region.List();
            return Json(new { Data = list, Total = list.Count }, JsonRequestBehavior.AllowGet);
        }
    }
}