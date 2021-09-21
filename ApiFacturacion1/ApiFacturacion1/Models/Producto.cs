using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiFacturacion1.Models
{
    public class Producto
    {
        [Key]
        public int IdProducto { set; get; }

        public string Nombre { set; get; }

        public decimal Precio { set; get; }
    }
}
