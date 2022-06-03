function GetBindData() {

    const url = "http://localhost:8080/RecipeApp/dashboard/all";
    const un = sessionStorage.getItem("username");
    const pw = sessionStorage.getItem("password");

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        switch (xhr.target.status) {
            case 200:
                const data = JSON.parse(xhr.target.response);
                BindDataToTable(data);
                if (sessionStorage.getItem("username") != null) {
                    showLoggedDashboard();
                }
                break;
            case 401:
                logout();
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
        let recipes = '';
        for (let i = 0; i < data.length; i += 3) {
            let tiles = [];
            if (i + 3 > data.length) {
                if (i + 2 > data.length) {
                    tiles = [data[i]];
                } else {
                    tiles = [data[i], data[i + 1]];
                }
            } else {
                tiles = [data[i], data[i + 1], data[i + 2]];
            }
            recipes += TripleTileHTML(tiles)
        }
        document.getElementById("tblbody").innerHTML = recipes;
    }
}

function TripleTileHTML(tiles) {
    let row = '<div class="row"><tr>';
    let rowBottom = '</tr></div>';
    for (let i = 0; i < tiles.length; i++) {
        row += SingleTileHTML(tiles[i]);
    }
    row += rowBottom
    return row;
}

function SingleTileHTML(recipeJson) {
    const basic_img = "https://www.publicdomainpictures.net/pictures/80000/velka/cat-dressed-vintage-photo-1393856213kEy.jpg";
    let tileTop = '<th class="col-sm"><div class="tile card card-container" onclick="showRecipe(\'' + recipeJson.id + '\')"><img class="recipe-img-card" src="';
    let alt = '" alt="';
    let title = '"/><p class="recipe-title">';
    let afterTitle = '</p><div class="rating">';
    let checkedStar = '<i class="star fa fa-star checked"></i>';
    let uncheckedStar = '<i class="star fa fa-star"></i>';
    let tileBottom = '</div></div></th>';
    let url = "";
    if (recipeJson.photo == null || recipeJson.photo.url == null) {
        url = basic_img;
    } else {url = recipeJson.photo.url;}

    let starsNumber = recipeJson.level;
    let tile = tileTop + url + alt + recipeJson.name + " photo" + title + recipeJson.name + afterTitle;
    for (let i = 1; i < 6; i++) {
        if (i > starsNumber) {
            tile += uncheckedStar;
        } else {
            tile += checkedStar;
        }
    }
    return tile + tileBottom;
}

function showRecipe(id) {
    console.log("in show recipe?")
    sessionStorage.setItem("recipe", id);
    window.location.href = "recipe.html";
}

function showLoggedDashboard() {
    var adminElements = document.getElementsByClassName("logged-visible");
    for (var i = 0; i < adminElements.length; i++) {
        adminElements[i].style.display = "block";
    }
    document.getElementById("logout-btn-text").innerHTML = "Logout";
}

function addRecipe(form) {
    const n = form.NameOf.value;
    const i = form.Ingredients.value;
    const d = form.Description.value;
    const s = form.Stars.value;
    let u = form.Url.value;
    console.log("got add recipe data");
    console.log(n, i, d, s, u)
    if (u == null || u.length == 0) {
        u = "https://www.publicdomainpictures.net/pictures/80000/velka/cat-dressed-vintage-photo-1393856213kEy.jpg";
    }
    var json = {
        "name": n,
        "description": d,
        "ingredients": i,
        "level": s,
        "url": u
    };
    console.log(json)

    const url = "http://localhost:8080/RecipeApp/dashboard";
    const un = sessionStorage.getItem("username");
    const pw = sessionStorage.getItem("password");

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        switch (xhr.target.status) {
            case 200:
                var data = JSON.parse(xhr.target.response);
                BindDataToTable(data);
                showLoggedDashboard();
                break;
            case 401:
                logout();
                break;
            case 500:
                console.log('blad 500');
                console.log(xhr.target)
                var responseJSON = JSON.parse(xhr.target.responseText);
                var modal = document.getElementById("addBookErrorModal");
                var span = document.getElementsByClassName("close")[0];
                document.getElementById("addBookErrorModal-text").innerHTML = responseJSON.message;
                modal.style.display = "block";
                span.onclick = function () {
                    modal.style.display = "none";
                }
                window.onclick = function (event) {
                    if (event.target === modal) {
                        modal.style.display = "none";
                    }
                }
                GetBindData();
                break;
            default:
                console.log('blad');
                console.log(xhr.target)
        }
    };

    http_request.open('POST', url, true);
    http_request.setRequestHeader("Authorization", "Basic " + btoa(unescape(encodeURIComponent(un + ":" + pw))));
    http_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http_request.send(JSON.stringify(json));
}

function deleteBook(id) {
    console.log("got delete book data");
    console.log(id)

    const url = "http://localhost:8080/RecipeApp/dashboard/" + id;
    const un = sessionStorage.getItem("username");
    const pw = sessionStorage.getItem("password");

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        if (xhr.target.status == 200) {
            var data = JSON.parse(xhr.target.response);
            GetBindData();
            showLoggedDashboard();
        } else {
            console.log('blad');
            console.log(xhr.target)
        }
    };

    http_request.open('DELETE', url, true);
    http_request.setRequestHeader("Authorization", "Basic " + btoa(unescape(encodeURIComponent(un + ":" + pw))));
    http_request.send(null);
}

function logout() {
    console.log("in logout")
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    window.location.href = "login.html";
}