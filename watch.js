var SetMinute = 0;
function Check_Time() {
    SetMinute += 1;
    var Check_i = document.getElementById("Check_i");

    var Cal_Hour = Math.floor(SetMinute / 3600);
    var Cal_Minute = Math.floor(Math.floor(SetMinute % 3600) / 60);
    var Cal_Second = SetMinute % 60;

    if (Cal_Minute < 10){
        Cal_Minute = "0" + parseInt(Cal_Minute);
    }

    if (Cal_Second < 10){
        Cal_Second = "0" + parseInt(Cal_Second);
    }

    Check_i.innerHTML = Cal_Minute + ":" + Cal_Second;

    // Check_i.innerHTML = "0" + Cal_Minute + ":" + "0" +Cal_Second ;

}
setTimeout(() => {
    var mm = window.setInterval("Check_Time()", 1000);
}, 1100)