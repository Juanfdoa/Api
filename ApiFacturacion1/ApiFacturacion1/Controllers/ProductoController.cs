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
    public class ProductoController : ControllerBase
    {
        private readonly AppDbContext context;

        public ProductoController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<ProductoController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Productos.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ProductoController>/5
        [HttpGet("{id}", Name="GetProducto")]
        public ActionResult Get(int id)
        {
            try
            {
                var Producto = context.Productos.FirstOrDefault(f => f.IdProducto == id);
                return Ok(Producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<ProductoController>
        [HttpPost]
        public ActionResult Post([FromBody] Producto Producto)
        {
            try
            {
                context.Productos.Add(Producto);
                context.SaveChanges();
                return CreatedAtRoute("GetProducto", new { id = Producto.IdProducto }, Producto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ProductoController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Producto Producto)
        {
            try
            {
                if (Producto.IdProducto == id)
                {
                    context.Entry(Producto).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetProducto", new { id = Producto.IdProducto }, Producto);
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

        // DELETE api/<ProductoController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var Producto = context.Productos.FirstOrDefault(f => f.IdProducto == id);
                if (Producto != null)
                {
                    context.Productos.Remove(Producto);
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
