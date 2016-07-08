function startTime() {
    var today = new Date();
    var digitalH = today.getHours();
    var digitalM = today.getMinutes();
    var digitalS = today.getSeconds();

    digitalM = checkTime(digitalM);
    digitalS = checkTime(digitalS);

        // AM or PM?
        var amOrPm = digitalH/12;
        if (amOrPm < 1) {
          amOrPm = "AM"
        } else {
          amOrPm = "PM"
        }

        // Try to fix bug with 12%12=0
        //before value below was digitalH%12

        // Set values
        document.getElementById('time').innerHTML =
        calculateActualHours(digitalH) + ":" + digitalM;
        document.getElementById('ampm').innerHTML =
        ":" + digitalS + " " + amOrPm;
        var t = setTimeout(startTime, 500);
      }

      function calculateActualHours(digitalH)
      {
        if (digitalH == 12 || digitalH == 24)
        {
          return 12;
        }
        else 
        {
          return digitalH%12;
        }
      }

    // add zero in front of numbers < 10
    function checkTime(i) 
    {
      if (i < 10) {i = "0" + i};  
      return i;
    }