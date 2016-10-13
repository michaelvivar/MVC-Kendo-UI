using Medicard.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Medicard.Models
{
    public class Region
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Code { get; set; }
        public RecordStatus Status { get; set; }

        public static List<Region> List()
        {
            List<Region> list = new List<Region>();

            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 1", Code = "Region1", Status = RecordStatus.Active }); 
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 2", Code = "Region2", Status = RecordStatus.Active }); 
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 3", Code = "Region3", Status = RecordStatus.Active }); 
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 4", Code = "Region4", Status = RecordStatus.Active }); 
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 5", Code = "Region5", Status = RecordStatus.Active }); 
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 6", Code = "Region6", Status = RecordStatus.Active }); 
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 7", Code = "Region7", Status = RecordStatus.Active }); 
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 8", Code = "Region8", Status = RecordStatus.Active });
            list.Add(new Region { Id = Guid.NewGuid(), Name = "Region 9", Code = "Region9", Status = RecordStatus.Active }); 
    

            return list;
        }
    }
}