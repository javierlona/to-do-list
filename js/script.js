// Constant variables
const FORM = document.querySelector('#addForm');
const TASKLIST = document.querySelector('.list-group');
const FILTER = document.querySelector('#filter');

// Event listeners
FORM.addEventListener('submit', add_task, false);
TASKLIST.addEventListener('click', remove_task, false);
FILTER.addEventListener('keyup', filter_tasks, false);

function get_existing_tasks(){
  let tasks;
  // Check if tasks are already stored
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    // Set tasks with what's already there
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

// domcontentloaded event not firing, hence an IIFE function
document.addEventListener('DOMContentLoaded', function () {
  // Fires each time page is refreshed
  tasks = get_existing_tasks();
  // Loop to create the DOM elements to display
  tasks.forEach(function(task) {
    // Get input value
    let newTask = document.createTextNode(task);
    // Create new li element
    let liElement = document.createElement('li');
    // Create delete button element
    let deleteBTN = document.createElement('button');

    //  Add classes
    liElement.className = 'list-group-item';
    deleteBTN.className = 'btn btn-danger btn-lg float-right delete';
    deleteBTN.innerHTML = '<i class="fas fa-trash-alt"></i>';

    // Add to DOM Tree from outside in
    TASKLIST.append(liElement);
    liElement.append(newTask);
    liElement.append(deleteBTN);
  })
}());

function add_task(event){
  event.preventDefault();

  // Get input value
  let newTask = document.querySelector('#task').value;
  // Create new li element
  let liElement = document.createElement('li');
  // Create delete button element
  let deleteBTN = document.createElement('button');

  //  Add classes
  liElement.className = 'list-group-item';
  deleteBTN.className = 'btn btn-danger btn-lg float-right delete';
  deleteBTN.innerHTML = '<i class="fas fa-trash-alt"></i>';

  // Add to DOM Tree from outside in
  TASKLIST.append(liElement);
  liElement.append(newTask);
  liElement.append(deleteBTN);

  // Call function add task to local storage
  store_in_local_storage(newTask);
  
  // Clear input filed(s) on form submit 
  FORM.reset();
}

function store_in_local_storage(task){
  tasks = get_existing_tasks();
  // Add task to tasks array
  tasks.push(task);
  /* You can only store string values in localStorage. 
     You'll need to serialize the array object and 
     then store it in localStorage.
  */
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function remove_task(event) {
  if(event.target.classList.contains('delete')){
    if(confirm("Are you sure?")){
      let delLiTask = event.target.parentElement;
      TASKLIST.removeChild(delLiTask);
      // Remove from Local Storage
      remove_task_from_local_storage(delLiTask);
    }
  }
}

function remove_task_from_local_storage(delLiTask){
  tasks = get_existing_tasks();
  // Go through each task in localStorage
  tasks.forEach(function(task, index){
    // Determine if selected task matches one in the array
    if(delLiTask.textContent === task){
      // Remove selected task from the tasks array
      tasks.splice(index, 1);
    }
  });
  // Add the remaining tasks to localStorage
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function filter_tasks(event) {
  // Grab and convert to lowercase the users search term
  let text = event.target.value.toLowerCase();
  // Select all the li tasks
  let tasks = TASKLIST.querySelectorAll('li');
  // Create an array of the tasks and traverse them
  let tasksArray = Array.from(tasks);
  for (let i = 0; i < tasksArray.length; i++) {
    let taskName = tasksArray[i].firstChild.textContent;
    // Check if it's a match
    if(taskName.toLowerCase().indexOf(text) != -1){
      // Display task
      tasksArray[i].style.display = 'block';
    }
    else{
      // Don't display task
      tasksArray[i].style.display = 'none';
    }
  }
}
