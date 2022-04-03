let searchBar = document.getElementById("searchBar")
let searchButton = document.getElementById("searchButton")
let cardCityName = document.getElementById("cityName")
let cardDate = document.getElementById("date")
let cardDescription = document.getElementById("description")
let cardCityTemp = document.getElementById("cityTemp")

let apiKey = "2c0d8f240926bd0d30e9d247ad69ffdb"
let lat
let long

window.addEventListener("load", () => {
    const location = navigator.geolocation.getCurrentPosition(locationOk)
})

const locationOk = (pos) => { 
    lat = pos.coords.latitude
    long = pos.coords.latitude
    console.log(`Estas en: ${lat} y ${long}`)
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`

}





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