//definition for a task object
//
//example
//newtaks = {
// name:"brushTeath",
// description:"brush my teath in the morning",
// compleated: false,
// repeats: "daily",
// start: 
// deadline: TBD,
// time: 15:00 note, this is in military time
// date: 2025-02-01
// 
//}
const teethTask = {
    name:"brush teeth",
    frequency: "daily"
}
const roomClean = {
    name:"clean room",
    frequency: "daily"
}
const drinkWater = {
    name:"drink 8oz water",
    frequency: "8x per day"
}



const tasks = [teethTask, roomClean, drinkWater];
let mostRecentNewTaskTimeSelection = null;

function openTasks(){
    /**
     * runs when tasks bar opened
    */
    deleatOpenPage();
    const taskDisplays = document.createElement("div");
    taskDisplays.classList.add("taskSection");
    const newTaskButton = document.createElement("button");
    newTaskButton.innerText = "add new task";
    newTaskButton.classList.add("newTaskButton");
    newTaskButton.onclick = addNewTask;
    taskDisplays.appendChild(newTaskButton);
    const allTasks = document.createElement("div");
    allTasks.classList.add("allTasks");
    taskDisplays.appendChild(allTasks);
    const dailyTask = document.createElement("div");
    dailyTask.classList.add("dailyTask");
    dailyTask.innerText = "Daily";
    allTasks.appendChild(dailyTask);
    const todayTask = document.createElement("div");
    todayTask.classList.add("todayTask");
    todayTask.innerText = "Today";
    allTasks.appendChild(todayTask);
    const futureTask = document.createElement("div");
    futureTask.classList.add("futureTask");
    futureTask.innerText = "Future";
    allTasks.appendChild(futureTask);
    if (tasks.length === 0){//message for when you have no tasks
        const noTaskMessage = document.createElement("div");
        noTaskMessage.classList.add("noTaskMessage");
        noTaskMessage.innerText = "You have no tasks, go add some.";
        taskDisplays.appendChild(noTaskMessage);
    }
    const body = document.getElementById("body");
    body.appendChild(taskDisplays);
    for(let i=0; i<tasks.length; i++){//loop thorugh all tasks and add to task list
        const taskToDisplay = tasks[i];
        const thisTask = document.createElement("div");
        thisTask.classList.add("aTaskDisplay");
        const currTaskButton = document.createElement("input");
        currTaskButton.type = "checkbox";
        currTaskButton.onchange = boxChecked;
        thisTask.appendChild(currTaskButton);
        const currNameElem = document.createElement("div");
        currNameElem.innerText = taskToDisplay.name;
        thisTask.appendChild(currNameElem);
        const currDateElem = document.createElement("div");
        currDateElem.classList.add("aDate");
        currDateElem.innerText = taskToDisplay.frequency;
        thisTask.appendChild(currDateElem);
        if(taskToDisplay.frequency==="daily"){
            dailyTask.appendChild(thisTask)
        }
        else if(taskToDisplay.frequency==="one time"){
            todayTask.appendChild(thisTask)
        }
        else{
            taskDisplays.appendChild(thisTask);
        }; /** Right now weekly = else, so fix weekly: choose what day of the week and then make it assigned to today or future. 
        Fix today (if date equals today or earlier) or future (if date equals tomorrow or later) */
        
    }
    

}


function addNewTask(){
    //console.log("started add new tasks");
    const createTaskElem = document.createElement("div");
    createTaskElem.classList.add("addNewTaskScreen");
    createTaskElem.id = "newTaskScreen";
    const enterName = document.createElement("input");
    enterName.id = "newTaskName";
    enterName.classList.add("newTaskBox");
    const enterNameText = document.createElement("div");
    enterNameText.innerText = "enter task name:";
    enterNameText.classList.add("newTaskText");
    const firstRow = document.createElement("div");
    firstRow.classList.add("addNewTaskScreenRow");
    firstRow.appendChild(enterNameText);
    firstRow.appendChild(enterName);
    createTaskElem.appendChild(firstRow);
    const buttonHolder = document.createElement("div");//This could also be called secondRow
    buttonHolder.id = "buttonHolder";
    buttonHolder.classList.add("addNewTaskScreenRow");
    const taskFrequencyText = document.createElement("div");
    taskFrequencyText.innerText = "task frequency:";
    taskFrequencyText.classList.add("newTaskText");
    buttonHolder.appendChild(taskFrequencyText);
    const dalyButton = document.createElement("button");
    dalyButton.innerText = "daily";
    dalyButton.id = "makeDailyTaskButton";
    dalyButton.onclick = () => {
        if (mostRecentNewTaskTimeSelection !== "daily"){
            const prevTaskHolder = document.getElementById("buttonHolder");
            while (prevTaskHolder.nextElementSibling.id !== "lastCreateTaskRow"){
                prevTaskHolder.nextElementSibling.remove();
            }
            const createTaskElem = document.getElementById("newTaskScreen");
            mostRecentNewTaskTimeSelection = "daily";
            const daly = document.getElementById("makeDailyTaskButton");
            daly.setAttribute("style", "background-color:#55b6bd;");
            const weekly = document.getElementById("makeWeeklyTaskButton");
            weekly.setAttribute("style", "background-color:#d0dbda;");
            const onetime = document.getElementById("makeOnetimeTaksButton");
            onetime.setAttribute("style", "background-color:#d0dbda;");
            const enterTimeElem = document.createElement("input");
            enterTimeElem.type = "time";
            enterTimeElem.id = "timeInputBox";
            const enterTimeText = document.createElement("label");
            enterTimeText.innerText = "enter time:";
            const enterTimeRow = document.createElement("div");
            enterTimeRow.appendChild(enterTimeText);
            enterTimeRow.appendChild(enterTimeElem);
            createTaskElem.insertBefore(enterTimeRow, document.getElementById("lastCreateTaskRow"));
        }
    }
    buttonHolder.appendChild(dalyButton);
    const weeklyButton = document.createElement("button");
    weeklyButton.id = "makeWeeklyTaskButton";
    weeklyButton.onclick = () => {//trigers when the weekbutton is pressed
        if (mostRecentNewTaskTimeSelection !== "weekly"){
            const prevTaskHolder = document.getElementById("buttonHolder");
            while (prevTaskHolder.nextElementSibling.id !== "lastCreateTaskRow"){
                prevTaskHolder.nextElementSibling.remove();
            }
            mostRecentNewTaskTimeSelection = "weekly";
            const createTaskElem = document.getElementById("newTaskScreen");
            const daly = document.getElementById("makeDailyTaskButton");
            daly.setAttribute("style", "background-color:#d0dbda;");
            const weekly = document.getElementById("makeWeeklyTaskButton");
            weekly.setAttribute("style", "background-color:#55b6bd;");
            const onetime = document.getElementById("makeOnetimeTaksButton");
            onetime.setAttribute("style", "background-color:#d0dbda;");
            const enterTimeElem = document.createElement("input");
            enterTimeElem.type = "time";
            enterTimeElem.id = "timeInputBox";
            const enterTimeText = document.createElement("label");
            enterTimeText.innerText = "enter time:";
            const enterTimeRow = document.createElement("div");
            enterTimeRow.appendChild(enterTimeText);
            enterTimeRow.appendChild(enterTimeElem);
            createTaskElem.insertBefore(enterTimeRow, document.getElementById("lastCreateTaskRow"));
            const daySelection = document.createElement("select");
            daySelection.classList.add("daySelectionMenu");
            daySelection.innerText = "text for test";//for test, deleat me
            const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
            const currDate = new Date();
            const indexStart = (currDate.getDay()-1)%7;
            let index = indexStart;
            for (let i=0; i<7;i++){
                const currDay = weekdays[index];
                const CurrOption = document.createElement("option");
                CurrOption.value = currDay;
                CurrOption.innerText = currDay;
                daySelection.appendChild(CurrOption);
                index = (index+1)%7;
            }
            createTaskElem.insertBefore(daySelection, document.getElementById("lastCreateTaskRow"));
        }
    }
    buttonHolder.appendChild(weeklyButton);
    weeklyButton.innerText = "weekly";
    const oneTimeButton = document.createElement("button");
    oneTimeButton.id = "makeOnetimeTaksButton";
    oneTimeButton.onclick = () => {
        if (mostRecentNewTaskTimeSelection !== "oneTime"){
            const prevTaskHolder = document.getElementById("buttonHolder");
            while (prevTaskHolder.nextElementSibling.id !== "lastCreateTaskRow"){
                prevTaskHolder.nextElementSibling.remove();
            }
            mostRecentNewTaskTimeSelection = "one time";
            const daly = document.getElementById("makeDailyTaskButton");
            daly.setAttribute("style", "background-color:#d0dbda;");
            const weekly = document.getElementById("makeWeeklyTaskButton");
            weekly.setAttribute("style", "background-color:#d0dbda;");
            const onetime = document.getElementById("makeOnetimeTaksButton");
            onetime.setAttribute("style", "background-color:#55b6bd;");
            const dateSelecter = document.createElement("input");
            dateSelecter.type = "date";
            dateSelecter.id = "dateSelecter";
            const dateSelecterDescription = document.createElement("label");
            dateSelecterDescription.innerText = "select task date:";
            const dateRow = document.createElement("div");
            dateRow.classList.add("addNewTaskScreenRow");
            dateRow.appendChild(dateSelecterDescription);
            dateRow.appendChild(dateSelecter);
            const createTaskElem = document.getElementById("newTaskScreen");
            createTaskElem.insertBefore(dateRow, document.getElementById("lastCreateTaskRow"));
            const enterTimeElem = document.createElement("input");
            enterTimeElem.type = "time";
            enterTimeElem.id = "timeInputBox";
            const enterTimeText = document.createElement("label");
            enterTimeText.innerText = "enter time:";
            const enterTimeRow = document.createElement("div");
            enterTimeRow.appendChild(enterTimeText);
            enterTimeRow.appendChild(enterTimeElem);
            createTaskElem.insertBefore(enterTimeRow, document.getElementById("lastCreateTaskRow"));
        }
        
    }
    buttonHolder.appendChild(oneTimeButton);
    oneTimeButton.innerText = "one time";
    oneTimeButton.classList.add("timeButton");
    dalyButton.classList.add("timeButton");
    weeklyButton.classList.add("timeButton");
    createTaskElem.appendChild(buttonHolder);
    const lastRow = document.createElement("div");
    lastRow.id = "lastCreateTaskRow"
    const createTaskButton = document.createElement("button");
    createTaskButton.innerText = "create task";
    createTaskButton.onclick = newTaskCreated;
    lastRow.appendChild(createTaskButton);
    const cancelButton = document.createElement("button");
    cancelButton.innerText = "cancel";
    cancelButton.onclick = deleateAddNewTaskScreen;
    lastRow.appendChild(cancelButton);

    createTaskElem.appendChild(lastRow);

    const body = document.getElementById("body");
    body.appendChild(createTaskElem);
    cancelButton.classList.add("timeButton");
    createTaskButton.classList.add("timeButton");
    lastRow.classList.add("cancelCreate");

}

function closeDropDown(){
    console.log("add later");
}


function newTaskCreated(){
    /**
     * runs the diologe for creating a new task
     */
    const newTask = {};
    const nameFeld = document.getElementById("newTaskName");
    const newTaskName = nameFeld.value;
    newTask.name = newTaskName;
    newTask.frequency = mostRecentNewTaskTimeSelection;
    let date;
    if (mostRecentNewTaskTimeSelection === "one time"){//update to include any event type with a date property
        date = document.getElementById("dateSelecter").value;
    }
    else{
        date = null;
    }
    let time;
    if(mostRecentNewTaskTimeSelection === "one time" || mostRecentNewTaskTimeSelection === "daily" || mostRecentNewTaskTimeSelection === "weekly"){
        time = document.getElementById("timeInputBox").value;
    }
    else{
        time = null;
    }
    console.log(date);
    newTask.date = date;
    newTask.time = time;
    console.log(time);
    tasks.push(newTask);
    deleateAddNewTaskScreen();
    openTasks();

}

function deleateAddNewTaskScreen(){
    /**
     * deleats the add new task screen
     */
    const newTaskScreen = document.getElementById("newTaskScreen");
    newTaskScreen.remove();
}




function boxChecked(){
    /**
     * this function activates whenever the checkbox is checked,
     * it must be updated to do something in the future
     * it must work diffrently depending on if it was checked or unchecked.
     */
    console.log("boxChecked");
    
}

