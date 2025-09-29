using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Services;

namespace TodoApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TodoController : Controller
    {
        private readonly TodoService _service;

        public TodoController(TodoService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TodoItem>> GetTodos()
        {
            return Ok(_service.GetAll());
        }

        [HttpPost]
        public ActionResult<TodoItem> AddTodo([FromBody] TodoItem todo)
        {
            if (string.IsNullOrWhiteSpace(todo.Title))
                return BadRequest("Title is required.");

            var added = _service.Add(todo.Title);
            return CreatedAtAction(nameof(GetTodos), new { id = added.Id }, added);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var deleted = _service.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}
