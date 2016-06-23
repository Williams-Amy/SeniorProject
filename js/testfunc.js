function triggerAlarmModal() {
	// This needs to sleep for a while or it fails
	sleep(1000);
    document.getElementById("alarmTrigger").click();

}

function sleepTest(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
  }
}
}