//get forms and buttons by ID
const formu = document.getElementById("forms");
const submit1 = document.getElementById("submit1");

let arrayTime = localStorage.getItem("arrayTimes") ? JSON.parse(localStorage.getItem("arrayTimes")) : [];
class Time {
    constructor(hours, minutes, segundes, distance) {
        this.hours = hours;
        this.minutes = minutes;
        this.segundes = segundes;
        this.distance = distance;
    }
}

//Data to add
    submit1.addEventListener("click", (e) => {
        e.preventDefault();     
        validation1();
        saveRun();
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
    if (document.getElementById("segundes").value === "") {
        const verm = document.getElementById("segundes");
        verm.value = 0;
    }
} 

// funcrion save data
const saveRun = () => {
    const hours = parseInt(document.getElementById("hours").value);
    const minutes = parseInt(document.getElementById("minutes").value);
    const segundes = parseInt(document.getElementById("segundes").value);
    const distance = parseInt(document.getElementById("distance").value);
    
    const time = new Time(hours, minutes, segundes, distance);                                                                    
    arrayTime.push(time);
    localStorage.setItem("arrayTimes", JSON.stringify(arrayTime));
    Swal.fire ( {
        title: "Time Saved",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
    }).then((result) => {
        formu.reset();
    })
} 


//show  Saved Times
const listTimes = document.getElementById("listTimes");

arrayTime.forEach( time => {
    console.log(time);
    listTimes.innerHTML += `
        <h5>${time.distance} Km</h2>
        <p>${time.hours} : ${time.minutes} : ${time.segundes}</p>
    </li>
    `
})

