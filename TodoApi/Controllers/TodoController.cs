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
            Console.WriteLine("Getting all todos");
            return Ok(_service.GetAll());
        }

        [HttpPost]
        public ActionResult<TodoItem> AddTodo([FromBody] TodoItem todo)
        {
            Console.WriteLine("Received new todo:");
            if (!ModelState.IsValid)
            {
                Console.WriteLine(System.Text.Json.JsonSerializer.Serialize(ModelState));
                return BadRequest(ModelState);
            }

            var created = _service.Add(todo);
            return CreatedAtAction(nameof(GetTodos), new { id = created.Id }, created);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTodo(int id)
        {
            var deleted = _service.Delete(id);
            if (!deleted) return NotFound();
            return NoContent();
        }

        [HttpPut("{id}")]
        public ActionResult<TodoItem> UpdateTodo(int id, [FromBody] TodoItem incoming) =>
        _service.Update(id, t =>
        {
            t.Title = incoming.Title;
            t.Description = incoming.Description;
            t.AssignedTo = incoming.AssignedTo;
            t.Status = incoming.Status;

        }) is { } updated ? Ok(updated) : NotFound();

    }
}
