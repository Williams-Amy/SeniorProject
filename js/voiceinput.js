if (annyang) {
    // Commands only visisble when the menu is open
    var menuCommands = {
        'potato': function () {
            alert("you couldn't do this before!");
        },
        'restart': function() {
            alert("Restarting");
            annyang.removeCommands(['potato', 'restart']);
        }
    }

    // Initial Commands
    var commands = {
        'wake up': function () {
            test();
        },
        'one' : function () {
            alert("1");
        },
        'two' : function () {
            alert("2");
        },
        'three' : function () {
            alert("3");
        },
        'display commands' : function () {
            alert("Menu appear");
        },
        'menu' : function () {
            document.getElementById("modalTrigger").click();
            annyang.addCommands(menuCommands);
        },
        'close (menu)' : function() {
            document.getElementById("modalDismiss").click();
        },
        'random': function() {
            alert("random");
            frames[iframe1].document.getElementById("microsoftnews").innerHTML = "lskdfj;laskdjf";
        },
        'set a timer for *minminutes' : setTimer,
        'set a timer for *min and *sec seconds' : setTimer
    };
    
    // Add our commands to annyang
    annyang.addCommands(commands);

    // Start listening. You can call this here, or attach this call to an event, button, etc.
    annyang.start();
}
else {
    alert("Error: Voice recognition service is currently unavailable");
}

function setTimer(minutes) {
    alert(minutes);
}

function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}