let searchBar = document.getElementById("searchBar")
let searchButton = document.getElementById("searchButton")
let cardCityName = document.getElementById("cityName")
let cardDate = document.getElementById("date")
let cardDay = document.getElementById("day")
let cardDescription = document.getElementById("description")
let cardCityTemp = document.getElementById("cityTemp")
let cityName;


const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];



searchBar.addEventListener("keypress", (evt) => { 
    if (evt.code == "Enter") {
        let city = searchBar.value        
        getData(city)
    }
})

const getData = async (city) => {
    let apiKey = "2c0d8f240926bd0d30e9d247ad69ffdb"
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    const respuesta = await fetch(url)
    const respuestaJSON = await respuesta.json()
    // console.log(city, respuestaJSON)
    
    cityName = city
    let cityUpperCase = cityName[0].toUpperCase() + cityName.substring(1)
    cardCityName.innerText = cityUpperCase
    
    let hoy = new Date()
    let currentDay = hoy.toDateString().substring(4)
    let currentTime = `${hoy.getHours()} : ${hoy.getMinutes()} : ${hoy.getSeconds()}`
    cardDate.innerText = `Updated: ${currentDay} - ${currentTime} hs`     

    
    let numberDay = new Date().getDay()
    let dayOfTheWeek = days[numberDay]
    cardDay.innerText = dayOfTheWeek

    let status = respuestaJSON.weather[0].description
    let statusToUpperCase = status[0].toUpperCase() + status.substring(1)
    cardDescription.innerText = statusToUpperCase

    let temp = Math.round(respuestaJSON.main.temp)
    cardCityTemp.innerText = `${temp}°C`
}