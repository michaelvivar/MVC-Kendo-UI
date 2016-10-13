using Medicard.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Medicard.Models
{
    public class Country
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public RecordStatus Status { get; set; }

        public static List<Country> List()
        {
            List<Country> list = new List<Country>();

            list.Add(new Country { Id = new Guid("647c5eda-38f0-402a-9354-666221491852"), Name = "Afghanistan", Code = "+93", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Brazil", Code = "+55", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Cambodia", Code = "+855", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Canada", Code = "+1", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "China", Code = "+86", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Denmark", Code = "+45", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Egypt", Code = "+20", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Finland", Code = "+358", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "France", Code = "+33", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Greece", Code = "+30", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "India", Code = "+91", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Indonesia", Code = "+62", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Italy", Code = "+39", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Japan", Code = "+81", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "South Korea", Code = "+82", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Malaysia", Code = "+60", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Netherlands", Code = "+31", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "New Zealand", Code = "+64", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Panama", Code = "+507", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Philippines", Code = "+63", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Russia", Code = "+7", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Singapore", Code = "+65", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Taiwan", Code = "+886", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "Thailand", Code = "+66", Status = RecordStatus.Inactive });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "United Kingdom", Code = "+44", Status = RecordStatus.Active });
            list.Add(new Country { Id = Guid.NewGuid(), Name = "United States", Code = "+1", Status = RecordStatus.Active });

            return list;
        }
    }
}