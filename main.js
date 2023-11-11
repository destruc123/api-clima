// OBTENER ELEMENTOS DEL DOM

const ciudadGeolocalizada = document.getElementById("ciudad-geolocalizada");
const temperaturaGeolocalizada = document.getElementById("temperatura-geolocalizada");
const informacionGeolocalizada = document.getElementById("informacion-geolocalizada");
const humedadGeolocalizada = document.getElementById("humedad-geolocalizada");
const vientoGeolocalizado = document.getElementById("viento-geolocalizado");
const iconoGeolocalizado = document.getElementsByClassName("caja-ciudad");
const permitirUbicacion = document.getElementById("permitir-ubicacion");


// Tu clave API de OpenWeather
const claveAPI = "6c0d3feb4e345e0f7d513c4a3e82e61f";

// Creación de la función Clima
function clima(){
  if ("geolocation" in navigator) {
    // Localizamos el dispositivo que ingresa a la página
    navigator.geolocation.getCurrentPosition(function(position) {
      let latitud = position.coords.latitude;
      let longitud = position.coords.longitude;
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitud}&lon=${longitud}&appid=${claveAPI}&lang=es&units=metric`;
      

      // Realizamos una petición fetch con la url de la API
      fetch(url)
        .then(respuesta => respuesta.json())
        .then(info => {
          
          // Introducimos en el DOM los elementos seleccionados
          let ciudad = info.name;
          ciudadGeolocalizada.textContent = ciudad;

          let temperatura = info.main.temp;
          temperaturaGeolocalizada.textContent = `${temperatura} °C`

          let informacion = info.weather[0].description;
          informacionGeolocalizada.textContent = informacion.toUpperCase();

          let humedad = info.main.humidity;
          humedadGeolocalizada.textContent = `${humedad} %`

          let viento = ((info.wind.speed) * 3.6).toFixed(2);
          vientoGeolocalizado.textContent = `${viento} Km/h`;

          let icono = info.weather[0].icon;

          let img = document.createElement("img");
          img.src = `http://openweathermap.org/img/wn/${icono}.png`;
          img.classList.add("icono")
          iconoGeolocalizado[0].appendChild(img);
        })
        .catch(error => console.error(error));
    });
  } else {
    console.log("Geolocalización no disponible en este navegador");
  }
}

clima();