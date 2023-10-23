window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];
    const name = document.querySelector('#name');
    const newTodoForm = document.querySelector('#new-todo-form');
    
    const username = localStorage.getItem('username') || '';
    name.value = username;
    name.addEventListener('change', (e) => {
        localStorage.setItem('username', e.target.value);
    });

    newTodoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false
        };
        console.log(todo.category);
        
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));

        e.target.reset();

        DisplayTodos();

    });
    DisplayTodos();
});

const DisplayTodos = () => {
    const todoList = document.querySelector('#todo-list');

    todoList.innerHTML = '';

    todos.forEach ( todo => {
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item');
        const label = document.createElement('label');
        const input = document.createElement('input');
        const  span = document.createElement('span');
        const contentDiv = document.createElement('div');
        const actionsDiv = document.createElement('div');
        const edit = document.createElement('button');
        const DeleteBtn = document.createElement('button');
        input.type = 'checkbox';
        span.classList.add('bubble');
        input.checked = todo.done;
        if(todo.category == 'Buisness'){
            span.classList.add('buisness');
        }
        else{
            span.classList.add('personal');
        }
        contentDiv.classList.add('todo-content');
        contentDiv.innerHTML = `<input type="text" value="${todo.content}" readonly />`;
        actionsDiv.classList.add('actions');
        edit.classList.add('edit');
        edit.innerHTML = 'Edit';
        DeleteBtn.classList.add('delete');
        DeleteBtn.innerHTML = 'Delete';

        label.appendChild(input);
        label.appendChild(span);
        todoItem.appendChild(label);
        todoItem.appendChild(contentDiv);
        actionsDiv.appendChild(edit);
        actionsDiv.appendChild(DeleteBtn);
        todoItem.appendChild(actionsDiv);
        todoList.appendChild(todoItem);

        if(todo.done){
            todoItem.classList.add('done')
        }

        input.addEventListener('click', (e) => {
            todo.done = e.target.checked;
            localStorage.setItem('todos',JSON.stringify(todos));
            if(todo.done){
                todoItem.classList.add('done');
            }else{
                todoItem.classList.remove('done');
            }
    
            DisplayTodos();
        });

        edit.addEventListener('click', (e) => {
            const input = contentDiv.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur', (e) => {
                input.setAttribute('readonly', 'true');
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos));
                DisplayTodos();
            });
    });

    DeleteBtn.addEventListener('click', () => {
        todos = todos.filter(t => t != todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        DisplayTodos();
    })
});

};

const clearStorage = () => {
    localStorage.clear();
    setTimeout(() => {
        window.location.reload();
    },1000)
}