// Constant variables
const FORM = document.querySelector('#addForm');
const TASKLIST = document.querySelector('.list-group');
const FILTER = document.querySelector('#filter');

// Event listeners
FORM.addEventListener('submit', add_task);
TASKLIST.addEventListener('click', remove_task);
FILTER.addEventListener('keyup', filter_tasks);
// Called right after DOM is loaded
document.addEventListener('DOMContentLoaded', get_tasks);

function get_tasks() {
  let tasks;

  // Check if tasks are already stored
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    // Set tasks with what's already there
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
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
    deleteBTN.className = 'btn btn-danger btn-sm float-right delete';

    // Add to DOM Tree from outside in
    TASKLIST.append(liElement);
    liElement.append(newTask);
    deleteBTN.append("X");
    liElement.append(deleteBTN);

  });

}

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
  deleteBTN.className = 'btn btn-danger btn-sm float-right delete';

  // Add to DOM Tree from outside in
  TASKLIST.append(liElement);
  liElement.append(newTask);
  deleteBTN.append("X");
  liElement.append(deleteBTN);

  // Call function add task to local storage
  store_in_local_storage(newTask);
  
  // Clear input filed(s) on form submit 
  FORM.reset();
}

function store_in_local_storage(task){
  let tasks;

  // Check if tasks are already stored
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    // Add task to array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  // Add task to local storage
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
      // localStorage.clear();
      remove_task_from_local_storage(event.target.parentElement);
    }
  }
}

function remove_task_from_local_storage(taskItem){
  console.log(taskItem);
  stringItem = JSON.parse(taskItem);
  console.log(stringItem);
  localStorage.removeItem('taskItem');
  let tasks;
  // Check if tasks are already stored
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }
  else{
    // Add task to array
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task, index){
    if(taskItem.textContent === task){
      tasks.splice(index, 1);
    }
  });

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
      tasksArray[i].style.display = 'block';
    }
    else{
      tasksArray[i].style.display = 'none';
    }
  }
}
