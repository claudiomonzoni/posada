import moment from "moment";
if(window.location.pathname === "/"){
  import ("moment/locale/es")
  .then((lang)=>{
    return lang
  })
}

const revisar = document.getElementById("revisar");
//inputs
const nombre = document.getElementById("nombre");
const habitaciones = document.getElementById("habitaciones");
const llegada = document.getElementById("llegada");
const salida = document.getElementById("salida");
const adultos = document.getElementById("adultos");
const ninos = document.getElementById("ninos");
const btncotizar = document.getElementById("btncotizar");


//user agent
const ua = navigator.userAgent;

//obtengo los datos de los inputs

//si es cel app si es pc web.app
const actualizar = (e) => {
  e.preventDefault();

  if (
    nombre.value === "" ||
    habitaciones.value === "" ||
    llegada.value === "" ||
    salida.value === "" ||
    adultos.value === "" ||
    ninos.value === ""
  ) {
    console.log("vacio");
  } else {
    btncotizar.classList.remove("desactivado");
  }

  //comprobar si es cel o pc
  let whats = "";
  if (/Mobile/i.test(ua)) {
    whats = "https://api.whatsapp.com/send/?phone=5217551397152&text=";
  } else {
    whats = "https://web.whatsapp.com/send/?phone=5217551397152&text=";
  }
  //obtener las noches
  moment.locale("es");
  const llegadaM = moment(llegada.value).format("dddd D MMMM YYYY");
  const salidaM = moment(salida.value).format("dddd D MMMM YYYY");

  const mensaje = `
  <hr>
  <b> Por favor revise los datos para su reservación</b>
  <hr>
Name / Nombre: <b> ${nombre.value} </b> <br>
Tipo de habitación: <b> ${habitaciones.value} </b> <br>
Fecha de llegada: <b> ${llegadaM} </b> <br>
Fecha de Salida: <b> ${salidaM} </b> <br>
Numero de adultos: <b> ${adultos.value}</b> </br>
Numero de niños: <b> ${ninos.value}</b>
`;

  revisar.innerHTML = mensaje;
  envio(whats, llegadaM, salidaM);
};

// fin actualizar

const envio = (whats, llegadaM, salidaM) => {
  const url = `
  ${whats}Hola,%20me%20contacto%20desde%20zihuacentro.com,%20deseo%20cotizar:%0aNombre:%20${nombre.value}%0aHabitación:%20${habitaciones.value},%0aNo.%20de%20adultos:%20${adultos.value},%0aNo.%20de%20niños:%20${ninos.value}%0aFecha%20de%20Llagada:%20${llegadaM}%0aFecha%20de%20Salida:%20${salidaM}
  %0aComentarios:%20
  `;
  btncotizar.href = url;
};

nombre.addEventListener("focusout", actualizar);
habitaciones.addEventListener("focusout", actualizar);
llegada.addEventListener("focusout", actualizar);
salida.addEventListener("focusout", actualizar);
adultos.addEventListener("focusout", actualizar);
ninos.addEventListener("focusout", actualizar);
