if (annyang) {
    // Commands only visisble when the menu is open
    var menuCommands = {
        'test': function () {
            alert("you couldn't do this before!");
        },
        'restart': function() {
            alert("Restarting");
            annyang.removeCommands(['test', 'restart']);
        }
    }

    // Initial Commands
    var commands = {
        'wake up': function () {
            test();
        },
        'one' : function () {
            responsiveVoice.speak("1");
        },
        'two' : function () {
            responsiveVoice.speak("2");
        },
        'three' : function () {
            responsiveVoice.speak("3");
        },
        'display commands' : function () {
            responsiveVoice.speak("Menu appear");
        },
        'menu' : function () {
            document.getElementById("modalTrigger").click();
            responsiveVoice.speak("Alright");
            annyang.addCommands(menuCommands);
        },
        'close (menu)' : function() {
            document.getElementById("modalDismiss").click();
            responsiveVoice.speak("OK");
        },
        'set an alarm for *time' : setAlarm,
        'create an alarm for *time' : setAlarm,
        'make an alarm for *time' : setAlarm,
        'stop alarm' : function() {
            //alert("Stopping Alarm");
            document.getElementById("resetbutton").click();
            displayAlarm("No alarms set");

            if (alarmIsSet) 
            {
                alarmIsSet = false;
                responsiveVoice.speak("Alright, I have cancelled your alarm");
            }
            else
            {
                responsiveVoice.speak("You did not have an alarm set");
            }
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

var alarmIsSet = false;

/****************************************************
* Functionality for setting the alarm by parsing the 
* voice command given.
*****************************************************/
function setAlarm(time) {
    //alert("Time: " + time.split(":"));

    // TODO: Simplify this
    if (time.includes('.'))
    {
        var timeWithoutAmPm = time.replace('.', '');
        timeWithoutAmPm = timeWithoutAmPm.replace('.', '');
    }

    // Tell the user that the alarm has been set
    responsiveVoice.speak("Ok, I have set an alarm for " + timeWithoutAmPm + " for you");

    var timeArray = time.split(":");
    //alert(timeArray[0]);
    //alert(timeArray[1]);

    // No minutes included (ex. '11 o'clock' or '11 pm')
    if (timeArray[1] == null)
    {
        var hour = timeArray[0][0] + timeArray[0][1];

        // Switch to military time
        if (timeArray[0].includes("p.m.")) {
            hour = parseInt(hour) + 12;
        }

        // Concatenate the "0" before it if it's in the single digits
        if (hour < 10) {
            hour = "0" + hour;
        }

        // Set values
        document.getElementById("hour").value = hour;
        document.getElementById("min").value = "00";
        document.getElementById("sec").value = "00";

        // Click to set the alarm
        document.getElementById("submitbutton").click();
    }
    else 
    {
        var hour = parseInt(timeArray[0]);

        // Switch to military time
        if (timeArray[1].includes("p.m.") && (parseInt(timeArray[0]) != 12)) {
            hour = hour + 12;
        }

        // Concatenate the "0" before it if it's in the single digits
        if (hour < 10) {
            hour = "0" + hour;
        }

        // Set values
        document.getElementById("hour").value = hour;
        document.getElementById("min").value = timeArray[1][0] + timeArray[1][1];
        document.getElementById("sec").value = "00";

        // Click to set the alarm
        document.getElementById("submitbutton").click();
    }

    // Indicate that the alarm has been set
    alarmIsSet = true;
    displayAlarm(time);
}

function displayAlarm(time) 
{
    var alarmDisp = document.getElementById("alarmDisplay");

    if (alarmIsSet) 
    {
        alarmDisp.style.display = "visible";
        alarmDisp.innerHTML = time;
    }
    else
    {
        alarmDisp.style.display = "none";
    }
}