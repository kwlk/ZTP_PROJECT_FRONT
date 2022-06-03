function GetBindData() {

    const url = "http://localhost:8080/RecipeApp/dashboard/all";

    http_request = new XMLHttpRequest();
    http_request.onload = function (xhr) {
        switch (xhr.target.status) {
            case 200:
                const data = JSON.parse(xhr.target.response);
                BindRecipe(data);
                if (sessionStorage.getItem("username") != null) {
                    showLoggedDashboard();
                }
                break;
            default:
                console.log('blad');
                console.log(xhr.target)
        }
    };

    http_request.open('GET', url, true);
    http_request.send(null);
}

function BindRecipe(data) {
    // console.log(data)
    const recipeId = sessionStorage.getItem("recipe");
    // console.log(recipeId);
    if (data != null && data) {
        for (let i = 0; i < data.length; i ++) {
            // console.log(data[i].id);
            // console.log(data[i].id == recipeId);
            if (data[i].id == recipeId) {

                if (data[i].photo != null && data[i].photo.url != null && data[i].photo.url.length > 0) {
                    document.getElementById("recipe-img-card").src = data[i].photo.url;
                }
                document.getElementById("recipe-title").innerHTML = data[i].name;
                document.getElementById("recipe-title").innerHTML = data[i].name;
                document.getElementById("ingredients-list").innerHTML = putIngredientsInList(data[i].ingredients);
                document.getElementById("recipe-body").innerHTML = data[i].description;
                break;
            }
        }
    }
}

function putIngredientsInList (ingredientsString) {
    console.log(ingredientsString);
    const ingredientsList = ingredientsString.split(", ");
    console.log(ingredientsList);
    let htmlList = "";
    for (let i = 0; i < ingredientsList.length; i++) {
        htmlList += "<li>" + ingredientsList[i] + "</li>";
    }
    return htmlList;
}

function backToDashboard() {
    console.log("in logout")
    // sessionStorage.removeItem('username');
    // sessionStorage.removeItem('password');
    window.location.href = "dashboard.html";
}

function showLoggedDashboard() {
    var adminElements = document.getElementsByClassName("logged-visible");
    for (var i = 0; i < adminElements.length; i++) {
        adminElements[i].style.display = "block";
    }
    document.getElementById("logout-btn-text").innerHTML = "Logout";
}

function logout() {
    console.log("in logout")
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password');
    window.location.href = "login.html";
}