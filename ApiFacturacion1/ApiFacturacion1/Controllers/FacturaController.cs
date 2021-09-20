using ApiFacturacion1.Context;
using ApiFacturacion1.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ApiFacturacion1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FacturaController : ControllerBase
    {
        private readonly AppDbContext context;

        public FacturaController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<FacturaController>
        [HttpGet]
        public ActionResult Get()
        {   
                try
                {
                    return Ok(context.Factura.ToList());
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
           
        }

        // GET api/<FacturaController>/5
        [HttpGet("{id}", Name="GetFactura")]
        public ActionResult Get(int id)
        {
            try
            {
                var Factura = context.Factura.FirstOrDefault(f => f.IdFactura == id);
                return Ok(Factura);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<FacturaController>
        [HttpPost]
        public ActionResult Post([FromBody] Factura Factura)
        {
            try
            {
                context.Factura.Add(Factura);
                context.SaveChanges();
                return CreatedAtRoute("GetFactura", new { id = Factura.IdFactura }, Factura);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<FacturaController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Factura Factura)
        {
            try
            {
                if (Factura.IdFactura == id)
                {
                    context.Entry(Factura).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetFactura", new { id = Factura.IdFactura }, Factura);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<FacturaController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var Factura = context.Factura.FirstOrDefault(f => f.IdFactura == id);
                if (Factura != null)
                {
                    context.Factura.Remove(Factura);
                    context.SaveChanges();
                    return Ok(id);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
