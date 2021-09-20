using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiFacturacion1.Models
{
    public class Factura
    {
        [Key]
        public int IdFactura { set; get; }

        public int IdCliente { set; get; }

        public DateTime Fecha { set; get; }
    }
}
