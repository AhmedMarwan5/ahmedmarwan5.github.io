const inputDiv = document.getElementById("inputDiv");
const input = document.getElementById("input");
const btn = document.getElementById("btn");
const tasksList = document.getElementById("tasksList");
const NoTasksP = document.getElementById("NoTasksAvailable");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const yesNoDiv = document.getElementById("yesNoDiv");
const deleteAllDiv = document.getElementById("deleteAllDiv");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

// create tasks

// document.querySelector("header").onkeydown = (e)=>{
//     if(e.key === "Enter" && e.code === "Enter"){
//         createTasks();
//     };
// };

if(localStorage.tasks != null){
    tasksArray = JSON.parse(localStorage.getItem("tasks"));
}else{
    tasksArray = [];
}

function createTasks(){
    if(input.value != ""){
        tasksArray.push({
            task : input.value,
            completed : false,
        });
        // save in localstorage
        localStorage.setItem("tasks", JSON.stringify(tasksArray));
    };
    showTasks();
};


//  show tasks

showTasks();

function showTasks(){
    if(tasksArray != ""){
        // tasksDiv.classList.remove("hidden");
        NoTasksP.classList.add("hidden");
        deleteAllDiv.classList.remove("hidden")
    }else{
        // tasksDiv.classList.add("hidden");
        NoTasksP.classList.remove("hidden");
        deleteAllDiv.classList.add("hidden");
    };
    tasksList.innerHTML = "";
    for(let i = 0; i < tasksArray.length; i++){
        let color = "rgb(160, 0, 0)";
        let underline = "none";
        if(tasksArray[i].completed == true){
            color = "green";
            underline = "line-through";
            
        }else{
            color = "rgb(160, 0, 0)";
            underline = "none";
        };
        deleteAllBtn.innerHTML = `Delete All (${i+1})`;
        tasksList.innerHTML += 
        `<li style="background-color: ${color}">
            <span style="border-radius: 12px 0 0 12px;
                border: 1px dashed black;
                width: 40px;
                height: 100%;
                background-color: white;
                color: black;
                font-size: 35px;">${i+1}
            </span>
            <p style="text-decoration: ${underline}" ondblclick="checkTasks(${i})">${tasksArray[i].task}</p>
            <button class="update-btn" onclick="updateTask(${i})"><svg xmlns="http://www.w3.org/2000/svg" height="30px" viewBox="0 -960 960 960" width="30px" fill="#FFFFFF"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z"/></svg></button>
            <button onclick="deleteTask(${i})">✖</button>
        </li>`;
    };
    clearInput();
};

// clearInput

function clearInput(){
    input.value = "";
};


// delete all

function showYesNo(){
    deleteAllBtn.classList.add("hidden");
    yesNoDiv.classList.remove("hidden");
}

function deleteAll(){
    if(tasksArray != ""){
        tasksArray = [];
        localStorage.tasks = "[]";
        switchInputBtnBack();
        undoDelete();
    };
    showTasks();
};

function undoDelete(){
    deleteAllBtn.classList.remove("hidden");
    yesNoDiv.classList.add("hidden");
};


// delete tasks

function deleteTask(i){
    tasksArray.splice(i, 1);
    localStorage.tasks = JSON.stringify(tasksArray);
    showTasks();
    if(tasksArray.length == 1){
        switchInputBtnBack();
        btn.onclick = () => createTasks();
    };
};


// update tasks

function switchInputBtn(i){
    input.setAttribute("placeholder", `Update Task No. ${i+1}`)
    btn.innerHTML = "📝";
    btn.style.fontSize = "20px";
};

function switchInputBtnBack(){
    input.setAttribute("placeholder", "Add A Task");
    btn.innerHTML = "+";
    btn.style.fontSize = "27px";
};

function updateTask(i){
    window.scrollTo(0, 0);
    input.focus();
    switchInputBtn(i);
    btn.onclick = ()=>{
        if(input.value != ""){
            tasksArray[i].task = input.value;
            localStorage.tasks = JSON.stringify(tasksArray);
            showTasks();
            switchInputBtnBack();
            btn.onclick = () => createTasks();
            btn.blur();
        }else{
            switchInputBtnBack();
            btn.onclick = () => createTasks();
            btn.blur();
        }
    };
};

// check tasks

let completed = [];

function checkTasks(i){
    if(tasksArray[i].completed === false){
        tasksArray[i].completed = true;
        localStorage.tasks = JSON.stringify(tasksArray);
        showTasks();
    }else{
        tasksArray[i].completed = false;
        localStorage.tasks = JSON.stringify(tasksArray);
        showTasks();
    }
};

