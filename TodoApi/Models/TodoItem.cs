using System;

namespace TodoApi.Models;
public enum TodoStatus { Todo, InProgress, Done }

public class TodoItem
{
    public int Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;

    // normally we would have a model for users and use for author/assignedto
    // for simplicity we will use strings hardcoded into a dropdown
    // in the frontend
    public string Author { get; set; } = string.Empty;
    public string AssignedTo { get; set; } = string.Empty;
    public TodoStatus Status { get; set; } = TodoStatus.Todo;
    // Time tracking?
    //public int TimeSpentMinutes { get; set; } = 0;
    // comments?
}