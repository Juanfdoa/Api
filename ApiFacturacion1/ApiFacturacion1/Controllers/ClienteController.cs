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
    public class ClienteController : ControllerBase
    {
        private readonly AppDbContext context;

        public ClienteController(AppDbContext context)
        {
            this.context = context;
        }
        // GET: api/<ClienteController>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                return Ok(context.Clientes.ToList());
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<ClienteController>/5
        [HttpGet("{id}", Name = "GetCliente")]
        public ActionResult Get(int id)
        {
            try
            {
                var Cliente = context.Clientes.FirstOrDefault(f => f.IdCliente == id);
                return Ok(Cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<ClienteController>
        [HttpPost]
        public ActionResult Post([FromBody] Cliente Cliente)
        {
            try
            {
                context.Clientes.Add(Cliente);
                context.SaveChanges();
                return CreatedAtRoute("GetCliente", new { id = Cliente.IdCliente }, Cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<ClienteController>/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Cliente Cliente)
        {
            try
            {
                if (Cliente.IdCliente == id)
                {
                    context.Entry(Cliente).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetCliente", new { id = Cliente.IdCliente }, Cliente);
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
                var Cliente = context.Clientes.FirstOrDefault(f => f.IdCliente == id);
                if (Cliente != null)
                {
                    context.Clientes.Remove(Cliente);
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

