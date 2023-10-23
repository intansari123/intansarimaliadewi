// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    // Get the form and item list elements
    const form = document.getElementById('item-form');
    const itemList = document.getElementById('item-list');
  
    // Add event listener to the form for form submission
    form.addEventListener('submit', function (event) {
      // Prevent the default form submission
      event.preventDefault();
  
      // Get the value from the input field
      const itemInput = document.getElementById('item-input');
      const newItemText = itemInput.value.trim();
  
      // Check if the input is not empty
      if (newItemText !== '') {
        // Create a new list item
        const newItem = document.createElement('li');
        newItem.innerText = newItemText;
  
        // Create a remove button for the new item
        const removeButton = document.createElement('button');
        removeButton.className = 'remove-item btn-link text-red';
        removeButton.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  
        // Add event listener to the remove button to remove the item when clicked
        removeButton.addEventListener('click', function () {
          newItem.remove();
        });
  
        // Append the remove button to the new list item
        newItem.appendChild(removeButton);
  
        // Append the new item to the item list
        itemList.appendChild(newItem);
  
        // Clear the input field
        itemInput.value = '';
      }
    });
  });
  