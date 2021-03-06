const elForm = document.querySelector(".form");
const elInput = document.querySelector(".form__input");
const elList = document.querySelector(".list");

const allBtns = document.querySelector(".btns");

const button1 = document.querySelector(".all-btn");
const button2 = document.querySelector(".complate-btn");
const button3 = document.querySelector(".uncomplate-btn");



const badgeAll = document.querySelector(".badge1");
const badgeComplate = document.querySelector(".badge2");
const badgeUnComplate = document.querySelector(".badge3");

const templateTodo = document.querySelector(".template").content;

const localTodos = JSON.parse(window.localStorage.getItem("list"));
const todos = localTodos || [];
renderTodo(todos, elList)

elList.addEventListener("click", evt => {
    if(evt.target.matches(".delete-item")){
        const btnId = evt.target.dataset.todoId;
        const findIndexArr = todos.findIndex(todo => todo.id == btnId);
        todos.splice(findIndexArr , 1);
        window.localStorage.setItem("list" , JSON.stringify(todos));
        renderTodo(todos, elList);

    }
    else if(evt.target.matches(".todo-checked")){
        const checkedId = evt.target.dataset.todoId;

        const findTodo = todos.find(todo => todo.id == checkedId);

        findTodo.isComplete = !findTodo.isComplete;
        window.localStorage.setItem("list" , JSON.stringify(todos));

        renderTodo(todos, elList);
    }
});





function renderTodo(arr, element) {
    element.innerHTML = "";



    const countAll = todos.length;
    badgeAll.textContent = countAll;

    const countComplate = todos.filter(e => e.isComplete == true).length;
    badgeComplate.textContent = countComplate;

     badgeUnComplate.textContent = countAll - countComplate;

     const fragment = document.createDocumentFragment()

    arr.forEach(todo => {

        const clonedTemp = templateTodo.cloneNode(true);

        clonedTemp.querySelector(".list-item").textContent = todo.title;
        clonedTemp.querySelector(".todo-checked").dataset.todoId = todo.id;
        clonedTemp.querySelector(".delete-item").dataset.todoId = todo.id;


        fragment.appendChild(clonedTemp);
        // const newItem = document.createElement("li");
        // const newButton = document.createElement("button");
        // const inputCheck = document.createElement("input");


        // newItem.textContent = todo.title;

        // if(todo.isComplete){
        //     inputCheck.checked = true;
        //     newItem.style.textDecoration = "line-through";
        // }



        // inputCheck.type = "checkbox";
        // inputCheck.classList.add("todo-checked")

        // newButton.textContent = "Delete";
        // newButton.classList.add("delete-item")
        // newButton.dataset.todoId = todo.id;
        // inputCheck.dataset.todoId = todo.id;


        // newItem.appendChild(inputCheck);
        // newItem.appendChild(newButton);

        // element.appendChild(newItem);


    });
    elList.appendChild(fragment);
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
    window.localStorage.setItem("list" , JSON.stringify(todos));
    elInput.value = "";

});


allBtns.addEventListener("click", evt => {
        if(evt.target.matches(".all-btn")){
         renderTodo(todos , elList);
        };

        if(evt.target.matches(".complate-btn")){
         const filteredComplate = todos.filter(e => e.isComplete === true);

         renderTodo(filteredComplate , elList)
        };


        if(evt.target.matches(".uncomplate-btn")){
         const filteredUnComplate = todos.filter(e => e.isComplete === false);
        renderTodo(filteredUnComplate , elList);
        };
});
