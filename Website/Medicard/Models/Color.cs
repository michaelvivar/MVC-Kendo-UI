using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Medicard.Models
{
    public class Color
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public static List<Color> List()
        {
            List<Color> list = new List<Color>();

            list.Add(new Color { Id = Guid.NewGuid(), Name = "Red" });
            list.Add(new Color { Id = Guid.NewGuid(), Name = "Blue" });
            list.Add(new Color { Id = Guid.NewGuid(), Name = "Green" });
            list.Add(new Color { Id = Guid.NewGuid(), Name = "Yellow" });
            list.Add(new Color { Id = Guid.NewGuid(), Name = "Pink" });
            list.Add(new Color { Id = Guid.NewGuid(), Name = "Black" });
            list.Add(new Color { Id = Guid.NewGuid(), Name = "White" });

            return list;
        }
    }
}