var form = document.querySelector('#addForm');

var itemList = document.querySelector('.list-group');

form.addEventListener('submit', addItem);

function addItem(event){
  event.preventDefault();

  // Get input value
  var newItem = document.querySelector('#item').value;

  // Create new li element
  var li = document.createElement('li');

  // Create delete button element
  var deleteBTN = document.createElement('button');

  //  Add class
  li.className = 'list-group-item';

  // Add class
  deleteBTN.className = 'btn btn-danger btn-sm float-right delete';

  // Add to DOM Tree from outside in
  itemList.append(li);
  li.append(newItem);
  deleteBTN.append("X");
  li.append(deleteBTN);

  console.log("deleteBTN.innerHTML");

}
