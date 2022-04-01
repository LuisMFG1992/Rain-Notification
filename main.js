
let apiKey = "2c0d8f240926bd0d30e9d247ad69ffdb"
let city = "Paris"
let days = 7

let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

fetch(url)
    .then( res => { return res.json()})
    .then( data => {console.log(data)})
    .catch( err => console.log("FETCH ERROR"))

//**TODO: **/
// ** 1. Con esta API parece ser que solo puedo aceeder a solo 1 dia a la vez **/
// ** 2. Buscar otra API o ver si lo hago solo con 1 dia 
// ** 3. Tomar el dato del input y usarlo para buscar en la URL al presionar el boton
// ** 4. Pq no puedo usar los iconos de FontAwesome? Quiero poner un telescopio en el boton de busqueda