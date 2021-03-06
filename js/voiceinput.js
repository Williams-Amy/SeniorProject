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
        },
        'test alarm' : function() {
            document.getElementById("alarmTrigger").click();
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
        'dismiss alarm' : function() {
            console.log("Dismissing alarm");
            
            // Indicate that the alarm has been dismissed
            alarmIsSet = false;
            displayAlarm();

            document.getElementById("alarmModalDismiss").click();
            responsiveVoice.speak("Alarm dismissed");
        },
        'set an alarm for *time' : setAlarm,
        'create an alarm for *time' : setAlarm,
        'make an alarm for *time' : setAlarm,
        'stop alarm' : cancelAlarm,
        'cancel alarm' : cancelAlarm,
        'create a note saying *text' : function(text) {
            console.log("Create a note with text: " + text);
            responsiveVoice.speak("Note created");
            text = text.toUpperCase();
            addNote(text);
        },
        'create a note that says *text' : function(text) {
            console.log("Create a note with text: " + text);
            responsiveVoice.speak("Note created");
            text = text.toUpperCase();
            addNote(text);
        },
        'add a note that says *text' : function(text) {
            console.log("Create a note with text: " + text);
            responsiveVoice.speak("Note created");
            text = text.toUpperCase();
            addNote(text);
        },
        'add a note saying *text' : function(text) {
            console.log("Create a note with text: " + text);
            responsiveVoice.speak("Note created");
            text = text.toUpperCase();
            addNote(text);
        },
        'delete note *number' : function(number) {
            console.log("Deleting note " + number);
            responsiveVoice.speak("Note " + number + " deleted");
            deleteNote(number);
        },
        'remove note *number' : function(number) {
            console.log("Deleting note " + number);
            responsiveVoice.speak("Note " + number + " deleted");
            deleteNote(number);
        },
        '(Show me) Traffic' : mapToggle,
        '(Show me the) Traffic Map' : mapToggle,
        '(Show me) Traffic Data' : mapToggle,
        'Close Traffic' : mapToggle,
        'Close (the) Traffic Map' : mapToggle,
        'Close Traffic Data' : mapToggle,
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
    console.log("Setting an alarm for: " + time);
    var timeWithoutAmPm = time;

    // Format string for speaking back to the user
    if (time.includes('.')) {
        var timeWithoutAmPm = time.replace('.', '');
        timeWithoutAmPm = timeWithoutAmPm.replace('.', '');
    }

    
    var timeArray = time.split(":");
    //alert(timeArray[0]);
    //alert(timeArray[1]);


    // No minutes included (ex. '11 o'clock' or '11 pm')
    if (timeArray[1] == null) {

        var hour = timeArray[0][0] + timeArray[0][1];
        var origHour = hour;

        if (origHour[1] == " ") {
            origHour = origHour[0];
        }

        // Special case: "12 o'clock"
        if (hour == "12") {
            if (timeArray[0].includes("a.m.")) {
                hour = "00";
            }
            else {
                hour = "12";
            }
        }
        else {
            // Switch to military time
            if (timeArray[0].includes("p.m.")) {
                hour = parseInt(hour) + 12;
            }

            // Concatenate the "0" before it if it's in the single digits
            if (hour < 10) {
               hour = "0" + hour[0];
           }
       }

        // Set values
        document.getElementById("hour").value = hour;
        document.getElementById("min").value = "00";
        document.getElementById("sec").value = "00";

        var amOrPm = "PM";
        if (hour < 12) {
            amOrPm = "AM";
        }
        // Tell the user that the alarm has been set
        responsiveVoice.speak("Ok, I have set an alarm for " + origHour + ":00 " + amOrPm);

        // Click to set the alarm
        document.getElementById("submitbutton").click();

        // Indicate that the alarm has been set
        alarmIsSet = true;
        displayAlarm(origHour + ":00 " + amOrPm);
    }
    else {
        var hour = parseInt(timeArray[0]);
        var origHour = hour;

        // Special case: "12 o'clock"
        if (hour == 12) {
            if (timeArray[1].includes("a.m.")) {
                hour = "00";
            }
            else {
                hour = "12";
            }
        }
        else {
            // Switch to military time
            if (timeArray[1].includes("p.m.") && (parseInt(timeArray[0]) != 12)) {
                hour = hour + 12;
            }

            // Concatenate the "0" before it if it's in the single digits
            if (hour < 10) {
                hour = "0" + hour;
            }
        }

        // if (isInt(hour)) {
        //     alert('Was not an Int');
        // }

        // Set values
        document.getElementById("hour").value = hour;
        document.getElementById("min").value = timeArray[1][0] + timeArray[1][1];
        document.getElementById("sec").value = "00";

        var amOrPm = "PM";
        if (hour < 12) {
            amOrPm = "AM";
        }

        // Tell the user that the alarm has been set
        responsiveVoice.speak("Ok, I have set an alarm for " + origHour + ":" + timeArray[1][0] + timeArray[1][1] + " " + amOrPm);

        // Click to set the alarm
        document.getElementById("submitbutton").click();

        // Indicate that the alarm has been set
        alarmIsSet = true;
        displayAlarm(origHour + ":" + timeArray[1][0] + timeArray[1][1] + " " + amOrPm);
    }
}

function isInt(value) {
  return !isNaN(value) && 
         parseInt(Number(value)) == value && 
         !isNaN(parseInt(value, 10));
}

/***************************************************
* Cancel/Stop the alarm that is currently set.
****************************************************/
function cancelAlarm() {
    console.log("Stopping Alarm");
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
}

/***************************************************
* Handles whether or not the alarm is displayed
***************************************************/
function displayAlarm(time) {
    var alarmDisp = document.getElementById("alarmDisplay");

    if (alarmIsSet) {
        //alarmDisp.style.removeProperty('display');
        //alarmDisp.style.display = "visible";
        alarmDisp.innerHTML = time;
    }
    else {
        //alarmDisp.style.removeProperty('display');
        //alarmDisp.style.display = "none";
        alarmDisp.innerHTML = "No alarms set";
    }
}

// The map starts off not being displayed
var mapOn = false;

/***************************************************
* Turns the map iFrame display on or off
****************************************************/
function mapToggle() {
  var trafficMap = document.getElementById("trafficMap");

  if (mapOn) {
    console.log("Map was visible");
    trafficMap.style.display = "none";

    mapOn = false;
}
else {
    console.log("Map was not visible");
    trafficMap.style.display = "";

    // Reload the map
    trafficMap.src = trafficMap.src;

    mapOn = true;
}
}