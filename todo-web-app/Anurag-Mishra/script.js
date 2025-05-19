const inputBox = document.getElementById("todo-input");
const listContainer = document.getElementById("todo-list");

if (!inputBox || !listContainer) {
    throw new Error('Required DOM elements not found.');
}

function addTask() {
    if (inputBox.value.trim() === "") {
        alert("Please enter a task.");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let editBtn = document.createElement("span");
    editBtn.innerHTML = "✏️";
    editBtn.style.cursor = "pointer";
    editBtn.style.marginLeft = "8px";
    editBtn.title = "Edit task";

    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "🗑️";
    deleteBtn.style.cursor = "pointer";
    deleteBtn.style.marginLeft = "8px";
    deleteBtn.title = "Delete task";

    li.append(editBtn);
    li.append(deleteBtn);

    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.justifyContent = "space-between";

    inputBox.value = "";
    inputBox.focus();

    editBtn.onclick = () => {
        let newTask = prompt("Edit your task:", li.firstChild.textContent);
        if (newTask !== null && newTask.trim() !== "") {
            li.childNodes[0].textContent = newTask;
            saveTasks();
        }
    };

    deleteBtn.onclick = () => {
        li.remove();
        saveTasks();
    };

    saveTasks();
}


function saveTasks() {
    localStorage.setItem("tasks", listContainer.innerHTML);
}


function loadTasks() {
    const tasks = localStorage.getItem("tasks");
    if (tasks) {
        listContainer.innerHTML = tasks;
        reinitializeTaskButtons();
    }
}


function reinitializeTaskButtons() {
    const listItems = listContainer.querySelectorAll("li");
    listItems.forEach((li) => {
        const editBtn = li.querySelector("span:nth-child(1)");
        const deleteBtn = li.querySelector("span:nth-child(2)");

        if (editBtn) {
            editBtn.onclick = () => {
                let newTask = prompt("Edit your task:", li.firstChild.textContent);
                if (newTask !== null && newTask.trim() !== "") {
                    li.childNodes[0].textContent = newTask;
                    saveTasks();
                }
            };
        }

        if (deleteBtn) {
            deleteBtn.onclick = () => {
                li.remove();
                saveTasks();
            };
        }
    });
}


listContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "LI") {
        event.target.classList.toggle("checked");
        saveTasks();
    }
});

loadTasks();