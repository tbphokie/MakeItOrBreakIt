$(document).ready(function () {
    $.get("/api/users", function (data) {
        console.log(data)
        var userTable = $("#user-table");
        // userTable.empty()
        for (var i = 0; i < data.length; i++) {
            var tableRow = $("<tr>")
            var rowSpan = $("<a>")
            rowSpan.append(data[i].username + "'s habits")
            rowSpan.attr("href", "/user/" + data[i].id)
            rowSpan.attr("class", "user-login-link")
            tableRow.append(rowSpan)
            userTable.append(tableRow)
        }
    })
});