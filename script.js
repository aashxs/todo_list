let btn = document.getElementById("add_todo");
let item = document.getElementById("item");
let deadline = document.getElementById("deadline");
let priority = document.getElementById("priority");
let todayDiv = document.getElementById("today");
let futureDiv = document.getElementById("future");
let completedDiv = document.getElementById("completed");



let todoList=[];

 

if (JSON.parse(localStorage.getItem("todoList"))) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  window.addEventListener("load", () => {
    renderTodoList(todoList);
  });
}

btn.addEventListener("click", () => {
let today = [];
let future = [];
let completed = [];
    
  let userDate = new Date(deadline.value);
  let todaydate = new Date();
  userDate.setHours(0, 0, 0, 0);
  todaydate.setHours(0, 0, 0, 0);

  if (
    item.value != "" &&
    deadline.value != "" &&
    priority.value != "PRIORITY" &&
    userDate.getTime() == todaydate.getTime()
  ) {
    let todoObj = {
      name: item.value,
      date: deadline.value,
      priority: priority.value,
      complete: false,
    };
    today.push(todoObj);
    todoList = today.concat(future).concat(completed).concat(todoList);
    if(todoList){
    localStorage.setItem("todoList", JSON.stringify(todoList));}
    renderTodoList(todoList);
    
  } else if (
    item.value != "" &&
    deadline.value != "" &&
    priority.value != "PRIORITY" &&
    userDate.getTime() > todaydate.getTime()
  ) {
    let todoObj = {
      name: item.value,
      date: deadline.value,
      priority: priority.value,
      complete: false,
    };
    future.push(todoObj);
    todoList = today.concat(future).concat(completed).concat(todoList);
    if(todoList){
    localStorage.setItem("todoList", JSON.stringify(todoList))};
    renderTodoList(todoList);
   
  } else {
    alert("CHECK YOU STATS");
  }
  item.value = "";
  console.log("Ashish")
  deadline.value = "";
  priority.value = "PRIORITY";
});
function renderTodoList(array) {
  let i = 1;
  let j = 1;
  let k = 1;
  todayDiv.innerHTML = "";
  futureDiv.innerHTML = "";
  completedDiv.innerHTML = "";
  let heading1 = document.createElement("p");
  heading1.innerText = "Today's TodoList";
  todayDiv.appendChild(heading1);
  let heading2 = document.createElement("p");
  heading2.innerText = "Future TodoList";
  futureDiv.appendChild(heading2);
  let heading3 = document.createElement("p");
  heading3.innerText = "Completed TodoList";
  completedDiv.appendChild(heading3);

  array.forEach((element, index) => {
    let mainDiv = document.createElement("div");
    mainDiv.className = "mainDiv_"+element.priority;
    let p1 = document.createElement("p");

    let p2 = document.createElement("p");
    p2.innerText = element.date;
    let p3 = document.createElement("p");
    p3.innerText = element.priority;
    let p4 = document.createElement("p");
    let img1 = document.createElement("img");
    img1.src = "assests/tick.svg";
    img1.onclick = function () {
        completedtodoList(element, index);
      };
    let img2 = document.createElement("img");
    img2.src = "assests/delete.svg";
    img2.onclick = function () {
      deletetodoList(element, index);
    };
    p4.appendChild(img1);
    p4.appendChild(img2);
    mainDiv.appendChild(p1);
    mainDiv.appendChild(p2);
    mainDiv.appendChild(p3);
    mainDiv.appendChild(p4);
    let userDate = new Date(element.date);
    let todaydate = new Date();
    userDate.setHours(0, 0, 0, 0);
    todaydate.setHours(0, 0, 0, 0);

    if (!element.complete && userDate.getTime() == todaydate.getTime()) {
      p1.innerText = `${i}.${element.name}`;
      i++;
      todayDiv.appendChild(mainDiv);
    } else if (!element.complete && userDate.getTime() > todaydate.getTime()) {
      p1.innerText = `${j}.${element.name}`;
      j++;
      futureDiv.appendChild(mainDiv);
    } else {
      p1.innerText = `${k}.${element.name}`;
      k++;
      p4.removeChild(img1)
      completedDiv.appendChild(mainDiv);
    }
  });
}
function deletetodoList(element, id) {
  todoList = JSON.parse(localStorage.getItem("todoList"));
  todoList = todoList.filter((value, index) => id !== index);
  localStorage.setItem("todoList", JSON.stringify(todoList));
  
  renderTodoList(todoList);
}

function completedtodoList(element, id) {
    
    todoList = JSON.parse(localStorage.getItem("todoList"));
    todoList[id].complete=true;
    localStorage.setItem("todoList", JSON.stringify(todoList));
    renderTodoList(todoList);
  }
  