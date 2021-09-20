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
    public class DetalleController : ControllerBase
    {
        private readonly AppDbContext context;

        public DetalleController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<ClienteController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Detalles.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}", Name = "GeDetalle")]
        public ActionResult Get(int id)
        {
            try
            {
                var Detalle = context.Detalles.FirstOrDefault(f => f.IdDetalle == id);
                return Ok(Detalle);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<ClienteController>
        [HttpPost]
        public ActionResult Post([FromBody] Detalle Detalle)
        {
            try
            {
                context.Detalles.Add(Detalle);
                context.SaveChanges();
                return CreatedAtRoute("GetDetalle", new { id = Detalle.IdDetalle }, Detalle);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Detalle Detalle)
        {
            try
            {
                if (Detalle.IdDetalle == id)
                {
                    context.Entry(Detalle).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetDetalle", new { id = Detalle.IdDetalle }, Detalle);
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

        // DELETE api/<ClienteController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            try
            {
                var Detalle = context.Detalles.FirstOrDefault(f => f.IdDetalle == id);
                if (Detalle != null)
                {
                    context.Detalles.Remove(Detalle);
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