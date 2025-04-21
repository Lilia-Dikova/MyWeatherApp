let darkMode = localStorage.getItem("darkMode");
const darkModeToggle = document.querySelector('#dark-mode-toggler');


let city = document.querySelector('#city-title');
let temp = document.querySelector('#temp');
let tempMin = document.querySelector('#temp-min');
let tempMax = document.querySelector('#temp-max');
let description = document.querySelector('#description');
let wind = document.querySelector('#wind');
let humidity = document.querySelector('#humidity');
let visibility = document.querySelector('#visibility');
let weatherImg = document.querySelector('#weather-image');
let xMark = document.querySelector('.x-mark')
let btnSearch = document.querySelector('.btn-search')




const enableDarkMode = () => {
    document.body.classList.add("darkmode");
    localStorage.setItem("darkMode", 'enabled');

    if (localStorage.getItem("img")) {
        console.log(localStorage.getItem("img"))

        weatherImg.src=`/images/darkMode/${localStorage.getItem("img")}`;
    }
}

const disableDarkMode = () => {
    document.body.classList.remove("darkmode")
    localStorage.setItem("darkMode", null);
    weatherImg.src=`/images/whiteMode/${localStorage.getItem("img")}`;
}


darkModeToggle.addEventListener("click", () => {
    darkMode = localStorage.getItem("darkMode");

    if (darkMode !== "enabled") {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
})

localStorage.removeItem("img")

if (darkMode === "enabled") {
    enableDarkMode();
}



const APIkey = '3b0120af83b763a8b1bff160e0246d93';
const URL = `https://api.openweathermap.org/data/2.5/weather?units=metric&appid=${APIkey}&`;


async function getData(url) {

    try {
        const response = await fetch(url);

        if (!response.ok) {
            actionTrigger.classList.add("error")
            actionTrigger.focus();
            throw new Error(`HTTP error! Status: ${response.status}`);

        }
        
        const data = await response.json();
        return data;

    } catch (err) {
        throw new Error('Invalid city name')
    }
}

const actionTrigger = document.querySelector('#city-name')
actionTrigger.addEventListener("keydown", onEnter)

btnSearch.addEventListener("click",  completeTask)


async function onEnter(event) {
    actionTrigger.classList.remove("error")
    xMark.style.display = "block";


    xMark.addEventListener('click', ()=> {
        actionTrigger.value = '';
        xMark.style.display = "none";
    
    })
    if (event.key === 'Enter') {
       await completeTask();
        
    }
}

async function completeTask () {
    

    let cityName = actionTrigger.value;

        const url = URL + `q=${cityName}`

        data = await getData(url);

        city.innerHTML = data.name;
        description.innerHTML = data.weather[0].description;
        temp.innerHTML = `&nbsp;${Math.round (data.main.temp)}°`;
        tempMin.innerHTML = `&nbsp;${Math.round (data.main.temp_min)}°`;
        tempMax.innerHTML = `&nbsp;${Math.round (data.main.temp_max)}°`;
        wind.innerHTML = `${data.wind.speed} m/s.`;
        humidity.innerHTML = `${data.main.humidity} %`;
        visibility.innerHTML = `${data.visibility/1000}/km`;
        

        darkMode = localStorage.getItem("darkMode");
        
        let path = 'images/whiteMode/'

        if (darkMode == "enabled") {
            path = 'images/darkMode/'
        }
        weatherImg.src = `${path}${data.weather[0].main.toLowerCase()}.png`;
        localStorage.setItem("img", `${data.weather[0].main.toLowerCase()}.png`)
        
}
