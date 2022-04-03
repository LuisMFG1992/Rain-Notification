let searchBar = document.getElementById("searchBar");
let searchButton = document.getElementById("searchButton");
let cardCityName = document.getElementById("cityName");
let cardDate = document.getElementById("date");
let cardDescription = document.getElementById("description");
let cardCityTemp = document.getElementById("cityTemp");

let apiKey = "2c0d8f240926bd0d30e9d247ad69ffdb";
let lat;
let long;

window.addEventListener("load", () => {
    const location = navigator.geolocation.getCurrentPosition(locationOk);
})

const locationOk = (pos) => { 
    lat = pos.coords.latitude;
    long = pos.coords.longitude;
    getDataOnLoad(lat, long);
};

const getDataOnLoad = async (lat, long) => {

    try {

        if (navigator.geolocation) {
        const url = `http://api.openweathermap.org/geo/1.0/reverse?lat=-34.58170562581985&lon=-58.450708224583714&limit=5&appid=${apiKey}`;
        const respuesta = await fetch(url);
        const respuestaJSON = await respuesta.json();
        const actualCity = respuestaJSON[0].name;

        let cityName = actualCity;
        let cityUpperCase = cityName[0].toUpperCase() + cityName.substring(1);
        cardCityName.innerText = cityUpperCase;

        let hoy = new Date();
        let currentDay = hoy.toDateString();
        let currentTime = `${hoy.getHours()} : ${hoy.getMinutes()} : ${hoy.getSeconds()}`;
        cardDate.innerText = `Updated: ${currentDay} - ${currentTime} hs`;

        // TODO: OPTIMIZAR = AL ESTAR AMBOS FETCH CON AWAIT EL PRIMERO FRENA LA PETICION DEL OTRO. NO ES PRACTICO.

        const url2 = `https://api.openweathermap.org/data/2.5/weather?q=${actualCity}&appid=${apiKey}&units=metric`;
        const respuesta2 = await fetch(url2);
        const respuestaJSON2 = await respuesta2.json();
        console.log('respuestaJSON', respuestaJSON2);

        let status = respuestaJSON2.weather[0].description;
        let statusToUpperCase = status[0].toUpperCase() + status.substring(1);
        cardDescription.innerText = statusToUpperCase;
        
        let temp = Math.round(respuestaJSON2.main.temp);
        cardCityTemp.innerText = `${temp}°C`;

        } else {
            alert("ERROR EN TRY.");
        };

    } catch (err) {
        console.log("ERROR", err);
    };
};

searchBar.addEventListener("keypress", (evt) => { 
    if (evt.code == "Enter") {
        let city = searchBar.value        
        getData(city)
    }
})

searchButton.addEventListener("click", () => { 
    let city = searchBar.value
    getData(city)
})


const getData = async (city) => {
    try{
        
        // let apiKey = "2c0d8f240926bd0d30e9d247ad69ffdb"
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
        const respuesta = await fetch(url)
        const respuestaJSON = await respuesta.json()

        if (respuesta.ok) {

            console.log(respuestaJSON)
            
            let cityName = respuestaJSON.name
            let cityUpperCase = cityName[0].toUpperCase() + cityName.substring(1)
            cardCityName.innerText = cityUpperCase
            
            let hoy = new Date()
            let currentDay = hoy.toDateString()
            let currentTime = `${hoy.getHours()} : ${hoy.getMinutes()} : ${hoy.getSeconds()}`
            cardDate.innerText = `Updated: ${currentDay} - ${currentTime} hs`
            
            let status = respuestaJSON.weather[0].description
            let statusToUpperCase = status[0].toUpperCase() + status.substring(1)
            cardDescription.innerText = statusToUpperCase
            
            let temp = Math.round(respuestaJSON.main.temp)
            cardCityTemp.innerText = `${temp}°C`

        } else {
            alert("The name of the city or country you are searching is invalid. Please try again.")
        }

    } catch (err) {
        console.log("ERROR", err)
    }
}