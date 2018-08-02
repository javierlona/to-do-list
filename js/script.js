// Constant variables
const FORM = document.querySelector('#addForm');
const TASKLIST = document.querySelector('.list-group');
const FILTER = document.querySelector('#filter');

// Event listeners
FORM.addEventListener('submit', add_task);
TASKLIST.addEventListener('click', remove_task);
FILTER.addEventListener('keyup', filter_tasks);

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
  
  // Clear input filed(s) on form submit 
  FORM.reset();
}

function remove_task(event) {
  if(event.target.classList.contains('delete')){
    if(confirm("Are you sure?")){
      let delLiTask = event.target.parentElement;
      TASKLIST.removeChild(delLiTask);
    }
  }
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
