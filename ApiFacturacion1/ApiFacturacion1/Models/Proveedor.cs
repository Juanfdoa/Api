using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiFacturacion1.Models
{
    public class Proveedor
    {
        [Key]
        public int IdProveedor { set; get; }

        public string Nombre { set; get; }

        public int Nit { set; get; }

        public int Telefono { set; get; }

        public string Direccion { set; get; }
    }
}
