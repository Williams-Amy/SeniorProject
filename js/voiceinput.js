if (annyang) {
    // Let's define our first command. First the text we expect, and then the function it should call
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
            alert("Menu appear");
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
