const elForm = document.querySelector(".form");
const elInput = document.querySelector(".form__input");
const elList = document.querySelector(".list");

const badge1 = document.querySelector(".badge1");
const badge2 = document.querySelector(".badge2");
const badge3 = document.querySelector(".badge3");


const todos = [];

elList.addEventListener("click", evte => {
    if(evte.target.matches(".delete-item")){
        const btnId = Number(evte.target.dataset.todoId);
        const findIndexArr = todos.findIndex(todo => todo.id === btnId);
        todos.splice(findIndexArr , 1);
        renderTodo(todos, elList);


    }
    else if(evte.target.matches(".todo-checked")){
        const checkedId = Number(evte.target.dataset.todoId);
        const findTodo = todos.find(todo => todo.id === checkedId);
        findTodo.isComplete = !findTodo.isComplete;
        renderTodo(todos, elList);
    }
});





function renderTodo(arr, element) {
    element.innerHTML = "";

     badge1.textContent = arr.length;
     badge2.textContent = arr.filter(e => e.isComplete === true).length;
     badge3.textContent = arr.filter(e => e.isComplete === false).length;


    arr.forEach(todo => {
        const newItem = document.createElement("li");
        const newButton = document.createElement("button");
        const inputCheck = document.createElement("input");


        newItem.textContent = todo.title;
        if(todo.isComplete){
            inputCheck.checked = true;
            newItem.style.textDecoration = "line-through";
        }



        inputCheck.type = "checkbox";
        inputCheck.classList.add("todo-checked")

        newButton.textContent = "Delete";
        newButton.classList.add("delete-item")
        newButton.dataset.todoId = todo.id;
        inputCheck.dataset.todoId = todo.id;


        element.appendChild(newItem);
        newItem.appendChild(inputCheck);
        newItem.appendChild(newButton);




    });
}


elForm.addEventListener("submit", evt => {
    evt.preventDefault();
    const elInputVaal = elInput.value.trim();
    const todo = {
        id:todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        title:elInputVaal,
        isComplete:false
    };

    todos.push(todo);
    renderTodo(todos,elList);
    elInput.value = "";

});
