/*****************GLOBAL VARIABLES ***************************************/
const arrayUsers = JSON.parse(localStorage.getItem("arrayData"));


/***************** FORM ACCOUNT**************************************/
const formPerson = document.getElementById("formLogin");
const signup = document.getElementById("signup");
const login = document.getElementById("login");

/*
Sign up Event
*/
signup.addEventListener("click", (e)=> {
    e.preventDefault();
    window.location.href = '../sections/register.html';
});

/*
Login Event
*/
login.addEventListener("click", (e) => {
    e.preventDefault();

    if(!arrayUsers) {
        Swal.fire( {
            title: "first create an account",
            icon: "warning",
            confirmButtonText: "Aceptar",
            background: "#FDEBD0",
        }) 
    } else {
        validateMail(); 
    }
});

/*
Fuctions
*/
const validateMail = () => {
    const email = document.getElementById("email").value;
    const valMail = arrayUsers.some(user => user.email == email);
    
    if(valMail == true) {
        const buscado = arrayUsers.find(user => user.email == email); 
        valPassword(buscado);
    } else {
        Swal.fire( {
            title: "Account is not correct",
            text: "sign Up, if you don't have account",
            icon: "warning",
            confirmButtonText: "Accept",
            background: "#FDEBD0",
        }) 
    }
}
const valPassword = (user) => {
    const password = document.getElementById("password").value;

    if(user.password == password) {
        Swal.fire ( {
            title: "Correct Credentials",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
        }).then((result) => {
            formPerson.reset();
            window.location.href = '../sections/runningCal.html';
        })
    } else {
        Swal.fire( {
            title: "Password is not correct",
            icon: "warning",
            confirmButtonText: "Aceptar",
            background: "#FDEBD0",
        })
    }
}


/***************** RUNNING CALCULATOR**************************************/
//get forms and buttons by ID
const formu = document.getElementById("forms");
const formu2 = document.getElementById("forms2");
const submit1 = document.getElementById("submit1");
const submit2 = document.getElementById("submit2");

/*
Data to calculate peace
*/
submit1.addEventListener("click", (e) => {
    e.preventDefault();
    
    validation1()
    const hours = parseInt(document.getElementById("hours").value);
    const minutes = parseInt(document.getElementById("minutes").value);
    const distance = parseInt(document.getElementById("distance").value);

    calculationAVG(hours, minutes, distance);

    formu.classList.add('was-validated')
});

/*
Data to calculatie Time
*/
submit2.addEventListener("click", (e) => {
    e.preventDefault();

    validation2()
    const avgMinutes = parseInt(document.getElementById("avgMinutes").value);
    const avgSeconds = parseInt(document.getElementById("avgSeconds").value);
    const avgDistance = parseInt(document.getElementById("distance2").value);

    calculationTime(avgMinutes, avgSeconds, avgDistance);

    formu2.classList.add('was-validated')
});

/*
Fuctions
*/
const validation1 = () => {
    if (document.getElementById("hours").value === "") {
        const verh = document.getElementById("hours");
        verh.value = 0;
    } 
    if (document.getElementById("minutes").value === "") {
        const verm = document.getElementById("minutes");
        verm.value = 0;
    }
} 

const validation2 = () => {
    if (document.getElementById("avgMinutes").value === "") {
        const vermin = document.getElementById("avgMinutes");
        vermin.value = 0;
    } 
    if (document.getElementById("avgSeconds").value === "") {
        const verseg = document.getElementById("avgSeconds");
        verseg.value = 0;
    }
} 

// function calculate Average
const calculationAVG = (h,m,d) => {
    let s = h*3600 + m*60;
    let avgSeconds = s/d;
    let avgmin = Math.floor(avgSeconds/60);
    let avgmod = Math.round(avgSeconds%60);
    console.log(avgmin + "  " + avgmod);                                                                       
    mostrarSolveAVG(avgmin, avgmod);
} 

// function calculate Time
const calculationTime = (m,s,d) => {
    let con2s = (m*60 + s)*d;
    let hour = Math.floor(con2s / 3600);
    let min = Math.floor((con2s % 3600)/60);
    let seg = Math.round((con2s % 3600)%60);

    let avgmin = Math.floor(avgSeconds/60);
    let avgmod = Math.round(avgSeconds%60);                                                                    
    mostrarSolveTime(hour, min, seg);
} 

//show  AVG
const solveAvg = document.getElementById("solveAvg");

const mostrarSolveAVG = (m,s) => {
    let aux = "";
    aux += `<h4 class="resultado alert alert-success" role="alert">Your Average Peace will be ${m}:${s} min/Km</h4>`
    solveAvg.innerHTML = aux;
}

//show Time
const solveTime = document.getElementById("solveTime");

const mostrarSolveTime = (h,m,s) => {
    let aux = "";
    aux += `<h4 class="resultado alert alert-success" role="alert"> Your Time will be ${h}:${m}:${s} </h4>`
    solveTime.innerHTML = aux;
}


/*****************FETH**************************************/
//API weather
const url = "https://weatherdbi.herokuapp.com/data/weather/";
const city = "bogota";
const clima = url + city;
const divClima = document.getElementById("divClima");

setInterval( () => {
    fetch(clima)
        .then( response => response.json())
        .then(({region, currentConditions}) => {
            divClima.innerHTML= `
            <div class = "d-flex align-items-center">
                <h2>Weather </h2>
                <img src="${currentConditions.iconURL}"></img>
            </div>
            <div>
                <p> ${region} </p>
                <p> Hour: ${currentConditions.dayhour} </p>
                <p> Weather: ${currentConditions.comment} </p>
                <p> Temperature: ${currentConditions.temp.c} grades celcius</p>
            <div>
            `
        })
        .catch(error => console.error(error))
}, 3000)


//json data
const records = document.getElementById("records");
const recordList = "../json/records.json";
setInterval( () => {
    fetch(recordList)
        .then(res=> res.json())
        .then(data => {
            data.forEach( rec => {
                records.innerHTML += `
                    <h4>${rec.distance} </h2>
                    <p>Time: ${rec.time} </p>
                    <p>Location: ${rec.location} </p>
                    `
            })
        })
        .catch(error => console.log(error))
}, 2000)