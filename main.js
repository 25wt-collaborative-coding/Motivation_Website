function main(){
    console.log("started program");
}

function deleatOpenPage(){
    /**
     * gets the most recently opened page and deleats it
     */
    console.log("ran deleatOpenPage");
    const tabsElem = document.getElementById("tabs");
    let pageElem = tabsElem.nextElementSibling;
    while (!(pageElem === null)){
        console.log("enteredWhile loop");
        pageElem.remove();
        pageElem = tabsElem.nextElementSibling;
    }
}



