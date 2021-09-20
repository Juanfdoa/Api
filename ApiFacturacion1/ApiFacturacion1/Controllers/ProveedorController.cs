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
    public class ProveedorController : ControllerBase
    {
        private readonly AppDbContext context;

        public ProveedorController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<ProveedorController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Proveedores.ToList());
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ProveedorController>/5
        [HttpGet("{id}", Name="GetProveedor")]
        public ActionResult Get(int id)
        {
            try
            {
                var Proveedor = context.Proveedores.FirstOrDefault(f => f.IdProveedor == id);
                return Ok(Proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<ProveedorController>
        [HttpPost]
        public ActionResult Post([FromBody] Proveedor Proveedor)
        {
            try
            {
                context.Proveedores.Add(Proveedor);
                context.SaveChanges();
                return CreatedAtRoute("GetProveedor", new { id = Proveedor.IdProveedor }, Proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ProveedorController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Proveedor Proveedor)
        {
            try
            {
                if (Proveedor.IdProveedor == id)
                {
                    context.Entry(Proveedor).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetProveedor", new { id = Proveedor.IdProveedor }, Proveedor);
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

        // DELETE api/<ProveedorController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var Proveedor = context.Proveedores.FirstOrDefault(f => f.IdProveedor == id);
                if (Proveedor != null)
                {
                    context.Proveedores.Remove(Proveedor);
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
