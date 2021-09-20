using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiFacturacion1.Models
{
    public class Detalle
    {
        [Key]
        public int IdDetalle { set; get; }

        public int IdFactura { set; get; }

        public int IdProducto { set; get; }

        public int Cantidad { set; get; }

        public int Total { set; get; }
    }
}
