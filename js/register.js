/*****************VARIABLES ***************************************/
let arrayPeople = localStorage.getItem("arrayData") ? JSON.parse(localStorage.getItem("arrayData")) : [];


/*****************OBJETO PERSONA**************************************/
class Person {
    constructor(nombre, apellido, edad, email, password) {
        this.id = arrayPeople.length;
        this.name = nombre;
        this.lastName = apellido;
        this.age = edad;
        this.email = email;
        this.password = password;
    }
}

/***************** FORM **************************************/
const formPerson = document.getElementById("formLogin");

formPerson.addEventListener("submit", (e)=> {
    e.preventDefault();

    const name = document.getElementById("nombre").value;
    const lastName = document.getElementById("apellido").value;
    const age = document.getElementById("edad").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const val = arrayPeople.some(user => user.email == email);
    if ( val == false) {
        const person = new Person(name, lastName, age, email, password);
        arrayPeople.push(person);

        //convert  to JSON and add data to localStorage
        localStorage.setItem("arrayData", JSON.stringify(arrayPeople));
        Swal.fire ( {
            title: "Account Created successfully",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        }).then((result) => {
            formPerson.reset();
            window.location.href = '../index.html';
        })
    } else {
        Swal.fire( {
            title: "Wrong email",
            text: "this email is already in use",
            icon: "warning",
            confirmButtonText: "Aceptar",
            background: "#FDEBD0",
        })  
        formPerson.reset();
    }
})