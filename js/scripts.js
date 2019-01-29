// Business Logic for Tasks

function ToDoList () {
  this.tasks = [],
  this.currentId = 0
}

ToDoList.prototype.addTask = function(task) {
  task.id = this.assignId();
  this.tasks.push(task);
}

ToDoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

ToDoList.prototype.findTask = function(id) {
  for (var i = 0; i < this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id === id) {
        return this.tasks[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.deleteTask = function(id) {
  for (var i = 0; i < this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id === id) {
        delete this.tasks[i];
        return true;
      }
    }
  };
  return false;
}

// Business Logic for To Do List

function Task(task) {
  this.task = task
}

Task.prototype.item = function() {
  return task.task;
}

// User Interface
var toDoList = new ToDoList();

function displayTaskDetails(toDoListToDisplay) {
  var toDoList = $("ul#output");
  var htmlForTaskInfo = "";
  toDoListToDisplay.tasks.forEach(function(task) {
    htmlForTaskInfo += "<li id=" + task.id + ">" + task.task + "</li>";
  });
  toDoList.html(htmlForTaskInfo);
};

function showTask (taskId) {
  var task = toDoList.findTask(taskId);
  $("#output").show();
  $(".task").html(this.task);

  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class ='deleteButton' id =" +  + task.id +">Delete</button>");
}

function attachTaskListeners() {
  $("ul#output").on("click", "li", function() {
    showTask(this.id);
  });

  $("buttons").on("click", ".deleteButton", function() {
    toDoList.deleteTask(this.id);
    $("#output").hide();
    displayTaskDetails(toDoList);
  });

};

$(document).ready(function() {
  attachTaskListeners();

  $("form#input").submit(function(event) {
    event.preventDefault();
    var inputtedNewTask = $("input#new-input").val();

    $("input#new-input").val("");
    var newTask = new Task(inputtedNewTask);
    toDoList.addTask(newTask);
    displayTaskDetails(toDoList);
  })
})
