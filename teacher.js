var clock = setInterval(printword , 1000);
function printword(){
    url="http://localhost:13523/getLastPredictionValue"
    $.get(url, {user_id: 0}, function(response){
        document.getElementById("c1").style.width =String(JSON.parse(response)['v'])+"%";
        for(let i=2;i<11;i++){
            document.getElementById("c"+String(i)).style.width =String(40+Math.random()*20)+"%";
        }
    }); 
}