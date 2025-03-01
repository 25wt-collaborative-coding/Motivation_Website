function openWeeklyCalander(){
    const calanderHolder = document.createElement("div");
    openPage = "calendar weekly";
    calanderHolder.id = "calanderHolder";
    calanderHolder.classList.add("calendarHolder");
    const currDate = new Date();
    let currCheckingDate = currDate;
    const weekdays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const currDayIndex = currDate.getDay();//the current day
    let dayIndex = currDayIndex;//a changing variable repersenting what day the loop is handling
    const todayDate = new Date();
    let weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    
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
        showTasksButton.classList.add("showTasksButton");
        currDayInfo.appendChild(weekDayTextElem);
        currDayInfo.appendChild(showTasksButton);
        showTasksButton.innerText = "show tasks";
        const taskList = document.createElement("div");
        taskList.classList.add("calendarTaskList");
        taskList.currentlyShown = false;
        showTasksButton.onclick = (() => showTasksButtonPressed(taskList, `showTaskButton${i}`));
        for (let taskIndex=0; taskIndex<tasks.length; taskIndex++){
            const currTask = tasks[taskIndex];
            const taskDate = new Date(currTask.date);
            const currCheckingDateAsISO = currCheckingDate.toISOString();
            if (currTask.date === currCheckingDateAsISO.substring(0, 10)){//${currCheckingDate.getFullYear()}-${currCheckingDate.getMonth()}-${currCheckingDate.getDate()}`){
                const currTaskDiv = displayOneTask(currTask);//will fill in future with corrosponding task div
                taskList.appendChild(currTaskDiv);
            }
            else if (currTask.frequency === "daily" && currTask.lastComplete === currCheckingDateAsISO.substring(0, 10)){
            }
            else if (currTask.frequency === "daily" &&currTask.lastChecked != currCheckingDateAsISO.substring(0, 10)){
                const currTaskDiv = displayOneTask(currTask);
                currTaskDiv.classList.add("aTaskDisplay")
                currTaskDiv.classList.remove("completedTask")
                taskList.appendChild(currTaskDiv);
            }
            else if (dayIndex===currDayIndex && taskDate < todayDate && taskDate >= weekAgo){
                const currTaskDiv = displayOneTask(currTask);
                taskList.appendChild(currTaskDiv);
            }
            else if(currTask.frequency === "weekly" && currTask.lastChecked != currCheckingDateAsISO.substring(0, 10) && weekdays[dayIndex]===currTask.day){
                const currTaskDiv = displayOneTask(currTask);
                currTaskDiv.classList.add("aTaskDisplay")
                currTaskDiv.classList.remove("completedTask")
                taskList.appendChild(currTaskDiv);

            }
            else if (currTask.frequency === "weekly" && weekdays[dayIndex]===currTask.day){
                const currTaskDiv = displayOneTask(currTask);
                currTaskDiv.classList.remove("aTaskDisplay")
                currTaskDiv.classList.add("completedTask")
                taskList.appendChild(currTaskDiv);
            }
        }
        currDayHolder.appendChild(currDayInfo);
        currDayHolder.appendChild(taskList);
        calanderHolder.appendChild(currDayHolder);

        currCheckingDate.setDate(currCheckingDate.getDate() + 1);
        dayIndex = trueMod((dayIndex+1), 7);
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

function openCalanderPage(whatCalander="weekly"){
    /**
     * this function triggers when the calander tap is clicked
     * it defults to opening the weekly calander
     */
    deleatOpenPage();
    const calanderSelection = document.createElement("div");
    calanderSelection.id = "calanderSelection";
    const body = document.getElementById("body");
    const selectWeeklyButton = document.createElement("button");
    selectWeeklyButton.innerText = "weekly calendar";
    const selectMonthlyButton = document.createElement("button");
    selectMonthlyButton.innerText = "monthly calendar";
    calanderSelection.appendChild(selectWeeklyButton);
    calanderSelection.appendChild(selectMonthlyButton);
    selectMonthlyButton.classList.add("calendarSelection");
    selectWeeklyButton.classList.add("calendarSelection");
    selectWeeklyButton.onclick = (() => openCalanderPage("weekly"));//fix me
    selectMonthlyButton.onclick = (() => openCalanderPage("monthly"));//fix me
    body.appendChild(calanderSelection);
    if (whatCalander==="weekly"){
        openWeeklyCalander();
    }
    else if(whatCalander === "monthly"){
        openMonthlyCalander();
    }  
    else{
        console.log("calendar does not exist");
    }
    // const numberOfSpins = document.createElement("div");
    // let spinsText = "You have " + numSpins.toString() + " unused reward spin(s)!"
    // numberOfSpins.innerText = spinsText;
    // numberOfSpins.classList.add("nSpins");
    // numberOfSpins.id = "spinNum"
    // body.insertBefore(numberOfSpins, document.getElementById("tabs"));
}



