let inputTask = document.getElementById("inputTask");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todos");


/* Adding the todo as a list item with an edit button and a delete button */

addBtn.addEventListener("click",function(){
    if(inputTask.value.trim() == ""){
        alert("Please enter your todo");
    }
    else
    {
        let li = document.createElement("li");

        let task = document.createElement("input");
        task.value = inputTask.value;
        task.setAttribute("value", inputTask.value);
        task.classList.add("editInput");
        task.classList.add("roboto");
        li.appendChild(task);
        saveData();

        let editBtn = document.createElement("button");
        editBtn.classList.add("editBtn");
        li.appendChild(editBtn);

        let deleteBtn = document.createElement("button");
        deleteBtn.classList.add("deleteBtn");
        li.appendChild(deleteBtn);

        let hr = document.createElement("hr");
        hr.style.borderColor = '#a180da';
        

        todoList.append(li);
        todoList.append(hr);
        inputTask.value = "";
        saveData();
    }
});

todoList.addEventListener("click",(event)=>{
    if( event.target.tagName == "SPAN" || event.target.tagName == "LI"){
        event.target.classList.toggle("checked");
        saveData();
    }


    // EDIT FUNCTIONALITY 

    else if(event.target.classList.contains("editBtn")){
        let li = event.target.parentElement;
        let taskInput = li.querySelector("input");

        //removing the readonly attribute to make it editable
        taskInput.removeAttribute("readonly"); 
        taskInput.focus();                            

        //saving the data on clicking on ENTER key
        taskInput.addEventListener("keydown",function onEnter(e){
            if(e.key == "Enter"){
                taskInput.setAttribute("readonly","true"); 
                saveData();
            }   
        })
    }

    //DELETE FUNCTIONALITY
    else if(event.target.classList.contains("deleteBtn")){
        event.target.parentElement.nextElementSibling.remove();
        event.target.parentElement.remove();
        saveData();
    }
});


// save the data in local storage
function saveData(){
    localStorage.setItem("data",todoList.innerHTML);
}

//retrieve data from local storage on page load
function showData(){
    todoList.innerHTML = localStorage.getItem("data");
}

showData();

