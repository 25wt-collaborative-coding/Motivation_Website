//page for handling sign in with google
function sighInLoad(){//runs on page load
    console.log("load sign in");
    // gapi.load("auth2", function(){//note that I dont know what I am doing
    //     gapi.auth2.init();
    // });
}

function onSignIn(googleUser){
    console.log("sign in called");
}

function clickButton(){
    console.log("button clicked");
}
