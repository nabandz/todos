function todoActivity() {
  const form = document.querySelector(".todo");
  const input = document.querySelector(".todo__input");
  const todoList = document.querySelector(".todo__list");

  const todos = JSON.parse(localStorage.getItem("todos"));

  if (todos) {
    todos.forEach((todo) => addTodo(todo));
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
  });

  function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
      todoText = todo.text;
    }

    if (todoText.trim()) {
      const todoItem = document.createElement("li");
      todoItem.classList.add("todo__item");

      if (todo && todo.completed) {
        todoItem.classList.add("todo__item_completed");
      }

      todoItem.innerText = todoText;

      todoItem.addEventListener("click", () => {
        todoItem.classList.toggle("todo__item_completed");

        updateLocalStorage();
      });

      todoItem.addEventListener("contextmenu", (e) => {
        e.preventDefault();

        todoItem.remove();

        updateLocalStorage();
      });

      todoList.appendChild(todoItem);

      input.value = "";

      updateLocalStorage();
    }
  }

  function updateLocalStorage() {
    const todoItems = document.querySelectorAll(".todo__item");

    const todos = [];

    todoItems.forEach((item) => {
      console.log(item);
      todos.push({
        text: item.innerText,
        completed: item.classList.contains("todo__item_completed"),
      });
    });

    localStorage.setItem("todos", JSON.stringify(todos));
  }
}
export default todoActivity;
