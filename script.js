const item = document.getElementById('input');
const submitButton = document.getElementById('submit');
const taskList = document.getElementById('todos');

const items = [];

// Function to add a new task
function addTask() {
  const taskName = item.value.trim();

  if (taskName === '') {
    alert('Task name cannot be empty.');
    return;
  }

  const newTask = {
    name: taskName,
  };
  items.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(items));
  renderTasks();
  item.value = '';
}

// Function to render the tasks in the task list
function renderTasks() {
  taskList.innerHTML = '';
  if (items.length > 0) {
    items.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.textContent = capitalizeFirstLetter(task.name);
      taskList.appendChild(taskItem);
    });
  } else if (items.length === 0) {
    const taskItem = document.createElement('li');
    // taskItem.textContent = capitalizeFirstLetter(task.name);
    taskItem.textContent = 'No tasks to display.';
    taskList.appendChild(taskItem);
  }

  //   filter tasks search input field
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (event) => {
    const filter = event.target.value.toLowerCase();
    const filteredTasks = items.filter((task) =>
      task.name.toLowerCase().includes(filter)
    );
    taskList.innerHTML = '';
    filteredTasks.forEach((task) => {
      const taskItem = document.createElement('li');
      taskItem.textContent = capitalizeFirstLetter(task.name);
      taskList.appendChild(taskItem);
    });
  });
}

// Load tasks from localStorage
const storedTasks = localStorage.getItem('tasks');

if (storedTasks) {
  items.push(...JSON.parse(storedTasks));
}

// Render tasks initially
renderTasks();

// Add event listener to the 'keydown' event on the enter key
item.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

// Function to delete a task
function deleteTask(index) {
  items.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(items));
  renderTasks();
}

// Add event listener to the 'right click' event on the delete buttons
taskList.addEventListener('contextmenu', (event) => {
  event.preventDefault();
  if (event.target.tagName === 'LI') {
    const confirmation = confirm('Are you sure you want to delete');
    if (confirmation) {
      const index = items.findIndex(
        (task) => task.name === event.target.textContent
      );
      deleteTask(index);
    }
  }
});

// Function to mark a task as completed and add a class to it task-completion
taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    event.target.classList.toggle('completed');
  }
});

// Function to capitalize the first letter of each word
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

console.log(items);
