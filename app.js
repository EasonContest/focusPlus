// const cookies = document.cookie

// 讀取API

// url = "http://localhost:13523/getImg"
// data = fetch(url)
//             .then(function(response) {
//                 data = response.json().then(function(data){
//                     $.getJSON(data.filename, function(json) { // 讀取本地 Json 檔案，裡面可以有任意物件
//                         console.log(json);
//                     });
//                 })
//             })


$("#first_box").click(() => {
    console.log(123);
    url = "http://localhost:13523/startRecord";
    $.get(url, {user_id: ""}, function(response, status){
        alert(response);
        window.location.assign("./watching.html");
        // alert("已經開始紀錄了喔!!");
    });
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


