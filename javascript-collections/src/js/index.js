import '../scss/styles.scss';

const addTodoButton = document.getElementById('add-todo');

addTodoButton.addEventListener('click', () => {
    const row = document.createElement('tr');

    const titleCell = document.createElement('td');
    const title = titleCell.appendChild(document.createElement('span'));
    const titleInput = titleCell.appendChild(document.createElement('input'));

    const descriptionCell = document.createElement('td');
    const description = descriptionCell.appendChild(document.createElement('span'));
    const descriptionInput = descriptionCell.appendChild(document.createElement('input'));

    const buttonsCell = document.createElement('td');
    const saveButton = buttonsCell.appendChild(document.createElement('button'));
    saveButton.innerText = 'Save';
    const editButton = buttonsCell.appendChild(document.createElement('button'));
    editButton.innerText = 'Edit';
    editButton.style.display = 'none';
    const removeButton = buttonsCell.appendChild(document.createElement('button'));
    removeButton.innerText = 'Remove';

    const saveTodo = () => {
        title.innerText = titleInput.value;
        titleInput.style.display = 'none';
        title.style.display = 'inline';

        description.innerText = descriptionInput.value;
        descriptionInput.style.display = 'none';
        description.style.display = 'inline';

        saveButton.style.display = 'none';
        editButton.style.display = 'inline';
    };

    const removeTodo = () => {
        row.remove();
    };

    const editTodo = () => {
        titleInput.value = title.innerText;
        titleInput.style.display = 'inline';
        title.style.display = 'none';

        descriptionInput.value = description.innerText;
        descriptionInput.style.display = 'inline';
        description.style.display = 'none';

        saveButton.style.display = 'inline';
        editButton.style.display = 'none';
    };

    saveButton.addEventListener('click', saveTodo);
    removeButton.addEventListener('click', removeTodo);
    editButton.addEventListener('click', editTodo);

    row.append(titleCell, descriptionCell, buttonsCell);

    document.getElementById('todo-list').appendChild(row);
});