const default_href = "https://www.publicdomainpictures.net/pictures/80000/velka/cat-dressed-vintage-photo-1393856213kEy.jpg";

function GetBindData() {

    const url = "http://localhost:8080/SimpleLibrarySpring/dashboard";

    let http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        switch (xhr.target.status) {
            case 200:
                const data = JSON.parse(xhr.target.response);
                BindDataToTable(data);
                break;
            default:
                console.log('blad');
                console.log(xhr.target)
        }
    };

    http_request.open('GET', url, true);
    // http_request.setRequestHeader("Authorization", "Basic " + btoa(unescape(encodeURIComponent(un + ":" + pw))));
    http_request.send(null);
}

function BindDataToTable(data) {
    console.log(data)
    if (data != null && data) {
        var books = '';
        for (var i = 0; i < data.length; i++) {
            const dangerButton = "<td><button type=\"button\" class=\"btn btn-danger deletebtn admin-visible\" " +
                "id='" + data[i].id + "' style=\"display: none\" onclick='deleteBook(" + data[i].id + ")'>X</button></td>";
            var tablerow = "<tr>"
                + "<td>" + data[i].id + "</td>"
                + "<td>" + data[i].title + "</td>"
                + "<td>" + data[i].author + "</td>"
                + "<td>" + data[i].year + "</td>"
                + dangerButton
                + "</tr>";
            books += tablerow;
        }
        document.getElementById("tblbody").innerHTML = books;
    }
}

function SingleTileHTML (recipeJson) {
    let tileTop = '<th class="col-sm"><div class="tile  card card-container">';
    let tileBottom = '</div></th>';

}