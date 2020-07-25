// document.cookie = "name=janice" 
// 讀取API

// url = "http://localhost:13523/getImg"
// data = fetch(url)
//             .then(function(response) {
//                 data = response.json().then(function(data){
//                     $.getJSON(data.filename, function(json) { // 讀取本地 Json 檔案，裡面可以有任意物件
//                         console.log(json);
//            .data         });
//                 })
//             })

if (localStorage.getItem("get_focused_score_image")) {
    $.get("http://localhost:13523/anotherGetPrediction", {user_id: localStorage.getItem("user_id")}, function(response, status){
        let base64Image = JSON.parse(response).base64Image;
        console.log(123);
        $("#image").replaceWith(`<img src='data:image/png;base64, ${base64Image}'></img>`);
    });

    localStorage.setItem("get_focused_score_image", false);
}

$("#first_box").click(() => {
    let url = "http://localhost:13523/startRecord";
    if (localStorage.getItem("user_id")) {
        user_id = localStorage.getItem("user_id");
        $.get(url, {user_id: user_id}, function(response){
            window.location.assign("./watching.html");
        });
    } else {
        $.get(url, {user_id: ""}, function(response){
            let user_id = JSON.parse(response).user_id
            alert(user_id);
            alert(typeof(user_id))
            localStorage.setItem("user_id", user_id);
            window.location.assign("./watching.html");
        });
    }
});

$("#sixth_box").click (() => {
    let url = "http://localhost:13523/stopAll";
});
    

// $(document).ready(function(){
//     $("#second_box").click(function() {
//         url = "http://localhost:13523/test"
//         $.get(url, function(data,status){
//             alert("數據：" + data + "\n狀態：" + status);
//         });
//     });
// });

// $(document).ready(function(){
//     $("#third_box").click(function() {
//         url = "http://localhost:13523/test"
//         $.get(url, function(data,status){
//             alert("數據：" + data + "\n狀態：" + status);
//         });
//     });
// });

// $(document).ready(function(){
//     $("#fourth_box").click(function() {
//         url = "http://localhost:13523/test"
//         $.get(url, function(data,status){
//             alert("數據：" + data + "\n狀態：" + status);
//         });
//     });
// });

// $(document).ready(function(){
//     $("#fifth_box").click(function() {
//         url = "http://localhost:13523/test"
//         $.get(url, function(data,status){
//             alert("數據：" + data + "\n狀態：" + status);
//         });
//     });
// });

// $(document).ready(function(){
//     $("#sixth_box").click(function() {
//         url = "http://localhost:13523/test"
//         $.get(url, function(data,status){
//             alert("數據：" + data + "\n狀態：" + status);
//         });
//     });
// });






// D3 的部分 by Eason
svg = d3.selectAll("svg")

d3.csv("./data/sample_len900.csv", function(error, data) { 
    if (error) throw error;
    console.log(data);
    var dataset = [];
    for(i in data){
        x = parseInt(data[i]["TimeStamp"])
        y = 600 - Math.round(data[i]["FocusRecord"]*400)
        dataset.push([x,y]);
    }
    console.log("dataset", dataset);

 
    var line = d3.line();
    
    svg.append("path")
        .attr("d", line(dataset))
        .attr("stroke", "black")
        .attr("stroke-width", "1px")
        .attr("fill", "none");
    //create x, y bar

})