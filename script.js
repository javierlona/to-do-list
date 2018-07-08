// Constant variables
const FORM = document.querySelector('#addForm');
const ITEMLIST = document.querySelector('.list-group');
const FILTER = document.querySelector('#filter');

// Event listeners
FORM.addEventListener('submit', add_item);
ITEMLIST.addEventListener('click', remove_item);
FILTER.addEventListener('keyup', filter_items);


function add_item(event){
  event.preventDefault();

  // Get input value
  var newItem = document.querySelector('#item').value;
  // Create new li element
  var li = document.createElement('li');
  // Create delete button element
  var deleteBTN = document.createElement('button');

  //  Add classes
  li.className = 'list-group-item';
  deleteBTN.className = 'btn btn-danger btn-sm float-right delete';

  // Add to DOM Tree from outside in
  ITEMLIST.append(li);
  li.append(newItem);
  deleteBTN.append("X");
  li.append(deleteBTN);
}

function remove_item(event) {
  if(event.target.classList.contains('delete')){
    if(confirm("Are you sure?")){
      var delLiItem = event.target.parentElement;
      ITEMLIST.removeChild(delLiItem);
    }
  }
}

function filter_items(event) {
  console.log("Here");
  let text = event.target.value.toLowerCase();
  console.log(text);
}
