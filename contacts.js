function validateForm() {
    var name = document.forms["myForm"]["name"].value;
    var email = document.forms["myForm"]["email"].value;
    var message = document.forms["myForm"]["message"].value;

    if (name === "") {
        alert("Введите имя");
        return false;
    }
    if (email === "" || !email.includes("@") || !email.includes(".")) {
        alert("Введите корректный email");
        return false;
    }
    if (message === "") {
        alert("Введите сообщение");
        return false;
    }
    
    return true;
}