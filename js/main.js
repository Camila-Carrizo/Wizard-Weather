const APIkey = 'e563c7b17b719fe78107787a6d36d399'

// buscar elementos

divResultados = document.getElementById('resultados')
inputCiudad = document.getElementById('input')
error = document.querySelector('.error')
h3Ciudad = document.getElementById('nombre-ciudad')
h1nombreClima = document.getElementById('nombre-clima')
h3fechaActual = document.getElementById('fecha-actual')
h2Temperatura = document.getElementById('temperatura')
divClima = document.getElementById('clima-de-hoy')
inicio = document.getElementById('inicio')
main = document.getElementById('main')
btnDespliegue = document.getElementById('btn-despliegue')
sectionBusqueda = document.getElementById('busqueda')
imagenClima = document.querySelector('img[alt="icono-clima"]')


// peticion a la api

async function peticionAPI(nombreCiudad, APIkey){
    try {
        const promesa = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${nombreCiudad}&appid=${APIkey}`)
        const r = await promesa.json()

        //COMPROBAR ENCABEZADO
        //mostrarError(`${nombreCiudad} no es una ubicación válida`)
        if (r.cod === '404') {
            mostrarError(`${nombreCiudad} no es una ubicación válida`);
        } else {
            // Ciudad encontrada, muestra los resultados
            divResultados.style.display = 'flex';
            inicio.style.display = 'none';
            inputCiudad.value = '';
            mostrarInfo(r);
            determinarMomentoDia(r);
            estilosElementos(r);} 
        //ERROR DE INFORMACION
    }catch(error){

    }



//funcion para mostrar error

function mostrarError(mensaje) {

    error.innerText = mensaje
    error.style.display = 'block';
    error.style.opacity = 1;
    setTimeout(() => {
        error.style.opacity = 0;
    }, 500);
    setTimeout(() => {
        error.style.display = 'none';
    }, 1000);
}

//Obtener hora y fecha pais

function obtenerHoraFecha(infoCiudad) {
    let timestamp = infoCiudad.dt * 1000;
    let timeZone = infoCiudad.timezone * 1000;
    let date = new Date(timestamp + timeZone);
    
    const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let dia = diasSemana[date.getUTCDay()];
    let mes = meses[date.getUTCMonth()];
    let nroMes = date.getUTCDate()
    let hora = date.getUTCHours();
    let minutos = date.getUTCMinutes();
    
    let fechaFormateada = `${dia}, ${nroMes} de ${mes}` 
    let horaFormateada = `${hora < 10 ? '0' : ''}${hora}:${minutos < 10 ? '0' : ''}${minutos}`;

    return {fechaFormateada, horaFormateada}


    
}

//obtiene la info segun la ciudad

function obtenerInfo(infoCiudad){
    fechaHora = obtenerHoraFecha(infoCiudad);
    gradosCelsius = pasarACelsius(infoCiudad.main.temp);
    climaActual = infoCiudad.weather[0].main
    ubicacion = `${infoCiudad.name}, ${infoCiudad.sys.country} - ${fechaHora.horaFormateada}`
    fechaDelDia = fechaHora.fechaFormateada
 
    return {fechaDelDia, gradosCelsius, climaActual, ubicacion}
};

function mostrarInfo(infoCiudad){



    info = obtenerInfo(infoCiudad)

    h3fechaActual.innerText = info.fechaDelDia;
    h2Temperatura.innerText = `${info.gradosCelsius}°C`;
    h1nombreClima.innerText = info.climaActual
    h3Ciudad.innerText = info.ubicacion

}
//función de conversion de temperatura

function pasarACelsius(gradosKelvin){ 
    return Math.round(gradosKelvin - 273.15)
}

//funciones para cambiar estilo

function estilosElementos(infoCiudad) {
    info = obtenerInfo(infoCiudad)
    clima = info.climaActual
    switch(clima) {
        case 'Clouds':
            btnDespliegue.className = 'btn-nublado' 
            sectionBusqueda.className = 'busqueda-nublado'
            inputCiudad.className = 'input-nublado'
            divResultados.className = 'resultados-nublado'
            imagenClima.src =  '../imgs/icono-nublado.png'       
          break;
        case 'Snow':
            btnDespliegue.className = 'btn-nieve'
            sectionBusqueda.className = 'busqueda-nieve'
            inputCiudad.className = 'input-nieve'
            divResultados.className = 'resultados-nieve'
            imagenClima.src = '../imgs/icono-nieve.png'
          break;
        case 'Windy':
            btnDespliegue.className = 'btn-viento'
            sectionBusqueda.className = 'busqueda-viento'
            inputCiudad.className = 'input-viento'
            divResultados.className = 'resultados-viento'
            imagenClima.src = '../imgs/icono-viento.png'
          break;
        case 'Clear':
        case 'Sunny':
            btnDespliegue.className = 'btn-soleado'
            sectionBusqueda.className = 'busqueda-soleado'
            inputCiudad.className = 'input-soleado'
            divResultados.className = 'resultados-soleado'
            imagenClima.src = '../imgs/icono-soleado.png'
          break;
        case 'Thunderstorm':
            btnDespliegue.className = 'btn-tormenta'
            sectionBusqueda.className = 'busqueda-tormenta'
            inputCiudad.className = 'input-tormenta'
            divResultados.className = 'resultados-tormenta'
            imagenClima.src = '../imgs/icono-tormenta.png'
          break;
        case 'Rain':
            btnDespliegue.className = 'btn-default'
            sectionBusqueda.className = 'busqueda-default'
            inputCiudad.className = 'input-default'
            divResultados.className = 'resultados-default'
            imagenClima.src = '../imgs/icono-lluvia.png'
        break;
        default:
            btnDespliegue.className = 'btn-default'
            sectionBusqueda.className = 'busqueda-default'
            inputCiudad.className = 'input-default'
            divResultados.className = 'resultados-default'
            imagenClima.src = '../imgs/icono-default.png'
            break;
      }
      
}


function determinarMomentoDia(infoCiudad){

info = obtenerInfo(infoCiudad)
fechaHora = obtenerHoraFecha(infoCiudad)
clima = info.climaActual
hora = parseInt(fechaHora.horaFormateada.split(':')[0],10)
console.log(clima)
console.log(hora)

switch(true){
    case hora >= 6 && hora < 12 && clima === 'Clouds':
        main.className = 'nublado-mañana'
        break;
    case hora >= 12 && hora < 19 && clima === 'Clouds':
        main.className = 'nublado-tarde'
        break;
    case (hora >= 19 || hora < 6) && clima === 'Clouds':
        main.className = 'nublado-noche'
        break;
    
    case hora >= 6 && hora < 12 && (clima === 'Clear' || clima === 'Sunny'):
        main.className = 'soleado-mañana'
        break;
    case hora >= 12 && hora < 19 && (clima === 'Clear' || clima === 'Sunny'):
        main.className = 'soleado-tarde'
        break;
    case (hora >= 19 || hora < 6) && (clima === 'Clear' || clima === 'Sunny'):
        main.className = 'soleado-noche'
        break;
    case hora >= 6 && hora < 12 && clima === 'Thunderstorm':
        main.className = 'tormenta-mañana'
        break;
    case hora >= 12 && hora < 19 && clima === 'Thunderstorm':
        main.className = 'tormenta-tarde'
        break;
    case (hora >= 19 || hora < 6) && clima === 'Thunderstorm':
        main.className = 'tormenta-noche'
        break;
        case hora >= 6 && hora < 12 && clima === 'Rain':
            main.className = 'lluvioso-mañana'
            break;
        case hora >= 12 && hora < 19 && clima === 'Rain':
            main.className = 'lluvioso-tarde'
            break;
        case (hora >= 19 || hora < 6) && clima === 'Rain':
            main.className = 'lluvioso-noche'
            break;
     case hora >= 6 && hora < 12 && clima === 'Windy':
        main.className = 'viento-mañana'
        break;
    case hora >= 12 && hora < 19 && clima === 'Windy':
        main.className = 'viento-tarde'
        break;
    case (hora >= 19 || hora < 6) && clima === 'Windy':
        main.className = 'viento-noche'
        break;
     case hora >= 6 && hora < 12 && clima === 'Snow':
        main.className = 'nieve-mañana'
        break;
    case hora >= 12 && hora < 19 && clima === 'Snow':
        main.className = 'nieve-tarde'
        break;
    case (hora >= 19 || hora < 6) && clima === 'Snow':
        main.className = 'nieve-noche'
        break;
    default:
        main.className = 'default'
        break;
}

}





// controlador de eventos del input
inputCiudad.addEventListener('keydown', async (event) => {

    const nombreCiudad = inputCiudad.value

    if(event.key==='Enter'){
        //controla que el input no este vacio
        if(nombreCiudad === ''){
            mostrarError('Ingresar una ciudad, por favor');
            
        } else {
            peticionAPI(nombreCiudad, APIkey)
        
        }
    }

})

}
