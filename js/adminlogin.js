const user = "admin";
const password = 12345;

const formLogin = document.getElementById("formLogin");
const btnlogin = document.getElementById("btn-login");

const parrafo = document.createElement("p");
parrafo.className = "parrafo-login";
parrafo.style.color = "red";

btnlogin.addEventListener("click", ()=> {
    const nombreInput = document.getElementById("floatingInput");
    const passInput = document.getElementById("floatingPassword");

    if (nombreInput.value ==  user && passInput.value == password) {
        window.location.href = "sections/admin.html";
    } else if (nombreInput.value ==  "" || passInput.value == ""){
        parrafo.innerText = "Llene todos los campos";
        formLogin.appendChild(parrafo);
    } else {
        parrafo.innerText = "Datos erroneos";
        formLogin.appendChild(parrafo);
    }
}); 

