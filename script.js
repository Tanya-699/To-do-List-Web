const inputBox = document.getElementById("input-box");
const prioritySelect = document.getElementById("priority");
const dueDateInput = document.getElementById("due-date");
const listContainer = document.getElementById("list-container");
const searchBox = document.getElementById("search-box");

document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  enableDragAndDrop();
});

function addTask() {
  if (inputBox.value.trim() === "") {
    alert("Please enter a task!");
    return;
  }

  const taskText = inputBox.value;
  const priority = prioritySelect.value;
  const dueDate = dueDateInput.value || "No Due Date";

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${taskText} - <small>[${priority}] Due: ${dueDate}</small></span>
    <div>
      <button class="edit-btn" onclick="editTask(this)">✏️</button>
      <button class="delete-btn" onclick="deleteTask(this)">❌</button>
    </div>
  `;

  li.addEventListener("click", () => {
    li.classList.toggle("checked");
    saveTasks();
  });

  listContainer.appendChild(li);
  inputBox.value = "";
  saveTasks();
}

function editTask(button) {
  const li = button.parentElement.parentElement;
  const taskDetails = li.innerText.split(" - ")[0];
  const newTask = prompt("Edit your task:", taskDetails);
  if (newTask) {
    li.innerHTML = li.innerHTML.replace(taskDetails, newTask);
    saveTasks();
  }
}

function deleteTask(button) {
  button.parentElement.parentElement.remove();
  saveTasks();
}

function clearAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    listContainer.innerHTML = "";
    saveTasks();
  }
}

function saveTasks() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

function loadTasks() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";
}

function filterTasks() {
  const filter = searchBox.value.toLowerCase();
  document.querySelectorAll("li").forEach((li) => {
    li.style.display = li.innerText.toLowerCase().includes(filter)
      ? "flex"
      : "none";
  });
}

function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

function enableDragAndDrop() {
  new Sortable(listContainer, {
    animation: 150,
    onEnd: saveTasks,
  });
}
