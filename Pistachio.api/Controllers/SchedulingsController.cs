using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Pistachio.Api.Data;
using Pistachio.Api.Models;

namespace Pistachio.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SchedulingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SchedulingsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/schedulings
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var schedulings = await _context.Schedulings
                .Include(s => s.User)
                .Include(s => s.Service)
                .ToListAsync();

            return Ok(schedulings);
        }

        // GET: api/schedulings/{id}
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var scheduling = await _context.Schedulings
                .Include(s => s.User)
                .Include(s => s.Service)
                .FirstOrDefaultAsync(s => s.Id == id);

            if (scheduling == null)
                return NotFound();

            return Ok(scheduling);
        }

        [HttpPost]
        public async Task<IActionResult> Create(Scheduling scheduling)
        {
            _context.Schedulings.Add(scheduling);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetById), new { id = scheduling.Id }, scheduling);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, Scheduling scheduling)
        {
            if (id != scheduling.Id) return BadRequest();

            _context.Entry(scheduling).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Schedulings.Any(s => s.Id == id))
                    return NotFound();
                else
                    throw;
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var scheduling = await _context.Schedulings.FindAsync(id);
            if (scheduling == null) return NotFound();

            _context.Schedulings.Remove(scheduling);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
