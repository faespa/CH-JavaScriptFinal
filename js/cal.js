// get object form local storage and convert from JSOn to Object
//const cliente = JSON.parse(localStorage.getItem("data"));
    
//get forms and buttons by ID
const formu = document.getElementById("forms");
const formu2 = document.getElementById("forms2");
const submit1 = document.getElementById("submit1");
const submit2 = document.getElementById("submit2");

//Data to calculate peace
    submit1.addEventListener("click", (e) => {
        e.preventDefault();
        
        validation1()
        const hours = parseInt(document.getElementById("hours").value);
        const minutes = parseInt(document.getElementById("minutes").value);
        const distance = parseInt(document.getElementById("distance").value);

        calculationAVG(hours, minutes, distance);

        formu.classList.add('was-validated')
    })

//Data to calculatie Time
    submit2.addEventListener("click", (e) => {
        e.preventDefault();

        validation2()
        const avgMinutes = parseInt(document.getElementById("avgMinutes").value);
        const avgSeconds = parseInt(document.getElementById("avgSeconds").value);
        const avgDistance = parseInt(document.getElementById("distance2").value);

        calculationTime(avgMinutes, avgSeconds, avgDistance);

        formu2.classList.add('was-validated')
    })

// functions validations
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

// funcrion calculate average
const calculationAVG = (h,m,d) => {
    let s = h*3600 + m*60;
    let avgSeconds = s/d;
    let avgmin = Math.floor(avgSeconds/60);
    let avgmod = Math.round(avgSeconds%60);
    console.log(avgmin + "  " + avgmod);                                                                       
    mostrarSolveAVG(avgmin, avgmod);
} 

// funcrion calculate Time
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
    aux += `<h4 class="resultado alert alert-success" role="alert">, Your Average Peace will be ${m}:${s} min/Km</h4>`
    solveAvg.innerHTML = aux;
}

//show Time
const solveTime = document.getElementById("solveTime");

const mostrarSolveTime = (h,m,s) => {
    let aux = "";
    aux += `<h4 class="resultado alert alert-success" role="alert"> Your Time will be ${h}:${m}:${s} </h4>`
    solveTime.innerHTML = aux;
}
