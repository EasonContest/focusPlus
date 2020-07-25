var json = []
url = "http://localhost:13523/get_history";
$.get(url, function(response){
    json=response
    console.log(Object.keys(json).length);
}).then((val) => {
    var forTable = document.querySelector('.for-table tbody');
    for (var i = 0, len = Object.keys(json).length; i < len; i++) {
        forTable.innerHTML += 
            '<tr>' +
                '<td>' + json[Object.keys(json)[i]]["name"] + '</td>' +
                '<td>' + json[Object.keys(json)[i]]["time"] + '</td>' +
            '</tr>';
    }
})