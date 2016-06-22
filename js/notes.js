// Initialize Firebase Data
var config = {
    apiKey: "AIzaSyBvNc90G8Qgolc1ojkB6h_dU4X940CTsS8",
    authDomain: "project-503436789893709174.firebaseapp.com",
    databaseURL: "https://project-503436789893709174.firebaseio.com",
    storageBucket: "project-503436789893709174.appspot.com",
};

var noteApp = firebase.initializeApp(config);

// Initialize a few notes for the sake of demonstration
noteApp.database().ref("1/1").set("TEST 1");
noteApp.database().ref("2/1").set("TEST 2");
noteApp.database().ref("3/1").set("TEST 3");


// Listeners for firebase actions
noteApp.database().ref().on("child_added", function(snapshot) 
{
    createNote(snapshot);
});

noteApp.database().ref().on("child_removed", function(snapshot) 
{
    // TBD
});

noteApp.database().ref().on("child_changed", function(snapshot) 
{
    // TBD
});

/************************************************************
* Create the note element, settings id's, classes, text etc.
* Append it to the document
************************************************************/
function createNote(snapshot) 
{
    // Create a div: id = key
    var div = document.createElement("DIV");
    div.className = "note";
    div.id = snapshot.key;

    // Title h3 tag: class = noteTitle
    var titleElement = document.createElement("H3");
    titleElement.className = "noteTitle";
    titleElement.id = "noteTitle" + snapshot.key;

    // Text p tag: class = noteText
    var textElement = document.createElement("P");
    textElement.className = "noteText";
    textElement.id = "noteText" + snapshot.key;


    // Add the title and text
    var titleTextNode = document.createTextNode("Note " + snapshot.key);
    var textNode = document.createTextNode(snapshot.val().toString().substring(1));

    // Append nodes to respective elements
    titleElement.appendChild(titleTextNode);
    textElement.appendChild(textNode);

    // Add nodes to div and div to body
    div.appendChild(titleElement);
    div.appendChild(textElement);

    document.getElementById("notes").appendChild(div);
}

var noteNums = [];

function updateArray() {
    noteNums = [];

    $("div.note").each(function() {
        noteNums.push(this.id);
  });
}

function addNote(text) {
    updateArray();

    //alert("Array Length: " + noteNums.length);
    var newID = parseInt(++noteNums.length);

    // noteApp.database().ref(newID + "/1").set("Test " + newID);    
    noteApp.database().ref(newID + "/1").set(text);    
}

function deleteNote(num) {
    updateArray();

    // If it's the last element
    if (num == noteNums.length) {
        // alert("Only one item needed changing");

        // Remove from database
        noteApp.database().ref(num + "/1").remove();

        // Remove from page
        var element = document.getElementById(num);
        element.parentNode.removeChild(element);
    }
    else {
        // Remove from database
        noteApp.database().ref(num + "/1").remove();

        // Remove from page
        // var element = document.getElementById(num);
        // element.parentNode.removeChild(element);

        for (var i = 0; i < noteNums.length; i++) {
            // alert("Note numbers: " + noteNums[i]);

            // For numbers that need to be shifted
            if (noteNums[i] > num) {
                // Store the original number for later
                var origNum = noteNums[i];
                //alert("This element needs to be shifted: " + origNum);

                // Change the number in the array
                noteNums[i] = origNum - 1;

                var eleText = document.getElementById("noteText" + origNum).innerHTML;
                //alert(eleText);

                //alert("Removing: " + origNum);

                // Remove from database
                noteApp.database().ref(origNum + "/1").remove();

                // Remove from page
                var element = document.getElementById(origNum);
                element.parentNode.removeChild(element);

                noteApp.database().ref(noteNums[i] + "/1").set(eleText);
                // var origText = noteApp.database().ref(origNum + "/1").val();
                // alert(origText);
                //    noteApp.database().ref(noteNums + "/1").set();
            }
        }

        // Remove from page
        var element = document.getElementById(num);
        element.parentNode.removeChild(element);
    }
}
