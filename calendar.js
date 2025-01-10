function openCalander(){
    deleatOpenPage();
    const calanderHolder = document.createElement("div");
    calanderHolder.id = "calanderHolder";
    const currDate = new Date();
    let currCheckingDate = currDate;
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currDayIndex = currDate.getDay();//the current day
    let dayIndex = currDayIndex;//a changing variable repersenting what day the loop is handling

    for (let i=0; i<7; i++){
        const currDayHolder = document.createElement("div");
        currDayHolder.classList.add("weekDay");
        const currDayInfo = document.createElement("div");
        currDayInfo.classList.add("dayTop");
        const weekDayText = weekdays[dayIndex];
        const weekDayTextElem = document.createElement("div");
        weekDayTextElem.innerText = weekDayText + " ";
        showTasksButton = document.createElement("button");
        showTasksButton.id = `showTaskButton${i}`;
        currDayInfo.appendChild(weekDayTextElem);
        currDayInfo.appendChild(showTasksButton);
        showTasksButton.innerText = "show tasks";
        const taskList = document.createElement("div");
        taskList.classList.add("calanderTaskList");

        taskList.currentlyShown = false;
        showTasksButton.onclick = (() => showTasksButtonPressed(taskList, `showTaskButton${i}`));
        for (let taskIndex=0; taskIndex<tasks.length; taskIndex++){
            const currTask = tasks[taskIndex];
            const currCheckingDateAsISO = currCheckingDate.toISOString();
            if (currTask.date === currCheckingDateAsISO.substring(0, 10)){//${currCheckingDate.getFullYear()}-${currCheckingDate.getMonth()}-${currCheckingDate.getDate()}`){
                const currTaskDiv = displayOneTask(currTask);//will fill in future with corrosponding task div
                taskList.appendChild(currTaskDiv);
            }
            else if (currTask.frequency.includes("daily"||"day")){
                const currTaskDiv = displayOneTask(currTask);
                taskList.appendChild(currTaskDiv);
            }

        }
        currDayHolder.appendChild(currDayInfo);
        currDayHolder.appendChild(taskList);
        calanderHolder.appendChild(currDayHolder);

        currCheckingDate.setDate(currCheckingDate.getDate() + 1);
        dayIndex = (dayIndex+1)%7;
    }

    const body = document.getElementById("body");
    body.appendChild(calanderHolder);


}

function showTasksButtonPressed(dayDiv, buttonID){
    const buttonDiv = document.getElementById(buttonID);
    if(dayDiv.currentlyShown){
        dayDiv.style.display = "none";
        dayDiv.currentlyShown = false;
        buttonDiv.innerText = "show tasks";
    }
    else if(!dayDiv.currentlyShown){
        dayDiv.style.display = "block";
        dayDiv.currentlyShown = true;
        buttonDiv.innerText = "hide tasks";
    }
    else{
        console.log("impossable state reached in, showTasksButtonPressed");
    }

}
