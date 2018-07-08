var form = document.querySelector('#addForm');

var itemList = document.querySelector('.list-group');

form.addEventListener('submit', addItem);

function addItem(e){
  e.preventDefault();

  // Get input value
  var newItem = document.querySelector('#item').value;

  // Create new li element
  var li = document.createElement('li');

  //  Add class
  li.className = 'list-group-item';

  // Add to DOM Tree from outside in
  itemList.append(li);
  li.append(newItem);

  console.log(newItem.value);


}
