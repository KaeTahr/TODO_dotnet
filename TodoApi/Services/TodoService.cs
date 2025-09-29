using System;
using TodoApi.Models;

namespace TodoApi.Services;

public class TodoService
{
    private readonly List<TodoItem> _todos = new();
    private int _nextId = 1;

    public IEnumerable<TodoItem> GetAll() => _todos;

    public TodoItem Add(string title)
    {
        var todo = new TodoItem { Id = _nextId++, Title = title, IsComplete = false };
        _todos.Add(todo);
        return todo;
    }

    public bool Delete(int id)
    {
        var todo = _todos.FirstOrDefault(t => t.Id == id);
        if (todo == null) return false;
        _todos.Remove(todo);
        return true;
    }
}
