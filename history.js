var json = [{ "name": "小傑", "age": "05:06" },
            { "name": "小明", "age": "04:10" }];
var forTable = document.querySelector('.for-table tbody');
 
for (var i = 0, len = json.length; i < len; i++) {
    forTable.innerHTML += 
        '<tr>' +
            '<td>' + json[i].name + '</td>' +
            '<td>' + json[i].age + '</td>' +
        '</tr>';
}