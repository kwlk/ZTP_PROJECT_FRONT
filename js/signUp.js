function signUp(form) {
    console.log("in signUp")
    const url = "http://localhost:8080/RecipeApp/user_dashboard/createNewUser";
    const un = form.Username.value;
    const pw = form.Password.value;
    console.log("got username and password");
    console.log(un, pw)
    const json = {
        "username": un,
        "password": pw
    };

    http_request = new XMLHttpRequest();
    http_request.onload = function(xhr) {
        if (xhr.target.status === 200) {
            console.log("got response from server")
            sessionStorage.setItem('username', un);
            sessionStorage.setItem('password', pw);
            window.location.href="dashboard.html";
            const data = JSON.parse(xhr.target.response);
            console.log(data)
        } else {
            console.log('blad');
            console.log(xhr.target.status)
            console.log(xhr.target)
            document.getElementById("badLogin").style.display = "block";
        }
    };

    http_request.open('POST', url, true);
    http_request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    http_request.send(JSON.stringify(json));
}