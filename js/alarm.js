<script language="JavaScript" type="text/javascript">
var sound = "drumroll.wav";   // change the name of the wave file to be used as the alarm at left. include

function sivamtime() {
  now = new Date();
 hour = now.getHours();
 min = now.getMinutes();
 sec = now.getSeconds();

 if (min<=9) { min="0"+min; }
 if (sec<=9) { sec="0"+sec; }
 if (hour>12) { 
   hour=hour-12;
   add="pm"; }
   else {
     hour=hour;
     add="am"; }
     if (hour==12) { add="pm"; }
     if (hour==00) { hour="12"; }

     document.hours.clock.value = (hour<=9) ? "0"+hour : hour;
     document.minutes.clock.value = min;
     document.seconds.clock.value = sec;
     document.ampm.clock.value= add;
     setTimeout("sivamtime()", 1000);
   }

   function alarm() {
    timer = "";
    note = document.arlm.message.value;
    if (note == '') {note = 'ALARM!!';}

    hrs = document.arlm.hr.value;
    min = document.arlm.mts.value;
    apm = document.arlm.am_pm.value;

    if (document.arlm.time.selectedIndex==0) { timer = "2"; }
    if (document.arlm.time.selectedIndex==1) { timer = "5"; }
    if (document.arlm.time.selectedIndex==2) { timer = "10"; }
    if (document.arlm.time.selectedIndex==3) { timer = "15"; }
    if (document.arlm.time.selectedIndex==4) { timer = "20"; }
    if (document.arlm.time.selectedIndex==5) { timer = "30"; }

    if ((document.hours.clock.value == hrs) &&
      (document.minutes.clock.value == min) &&
      (document.ampm.clock.value == apm) &&
      (document.arlm.snooze.checked == true)) {
     musicwin=window.open("","","width=200,height=50")
   if (navigator.appName=="Explorer")
     musicwin.document.write("<body onLoad=\"setTimeout('location.reload();window.focus()'," + timer*60*1000 + ");\"><bgsound src=" + sound + " loop='finite'>" + note)
   else
     musicwin.document.write("<body onLoad=\"setTimeout('history.go(0);window.focus()'," + timer*60*1000 + ");\"><embed src=" + sound + " hidden='true' border='0' autostart='true' loop='false'>" + note)
   musicwin.document.close(); return false; }

   if ((document.hours.clock.value == hrs) &&
    (document.minutes.clock.value == min) &&
    (document.ampm.clock.value == apm) &&
    (document.arlm.music.checked == true)) {
     musicwin=window.open("","","width=200,height=50")
   if (navigator.appName=="Explorer")
     musicwin.document.write("<bgsound src=" + sound + " loop='infinite'>" + note)
   else
     musicwin.document.write("<embed src=" + sound + " hidden='true' border='0' autostart='true' loop='true'>" + note)
   musicwin.document.close(); return false; }

   if (document.arlm.snooze.checked == true) { document.arlm.music.checked = true }

     if ((document.arlm.snooze.checked == true) && (document.arlm.time.value == "")) {
       alert('You have not set the\nminutes for snooze!'); return false; }

       if (document.arlm.snooze.checked == false) {
         document.arlm.time.value = ""; }

         if ((document.hours.clock.value == hrs) &&
          (document.minutes.clock.value == min) &&
          (document.ampm.clock.value == apm) &&
          (document.arlm.snooze.checked == false)) {
           alert(note); return false; }

         if (hrs == '') {alert('The Hour field is empty'); return false}
         if (min == '') {alert('The Minute field is empty'); return false}
         if (apm == '') {alert('The am/pm field is empty'); return false}

         if (hrs.length == 1) {document.arlm.hr.value = '0' + hrs}
           if (min.length == 1) {document.arlm.mts.value = '0' + min}
             if (hrs.length > 2) {alert('The Hour is wrongly typed.'); return false}
           if (min.length > 2) {alert('The Minute is wrongly typed.'); return false}
           if (apm != 'am' && apm != 'pm' ) {alert('The am/pm is wrongly typed.'); return false}

           setTimeout("alarm()", 1000);}

//-->
</script>
