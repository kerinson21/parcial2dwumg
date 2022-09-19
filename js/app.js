const URL = 'https://api.themoviedb.org/3/';
var seccion = 'discover';
var option = 'movie';
var api_key = 'f2dc9601342a6b6fa8fb988fa67f60ac';
var language = 'es-ES';
const URL_GENERO = 'https://api.themoviedb.org/3/discover/movie?api_key=f2dc9601342a6b6fa8fb988fa67f60ac&language=es-ES&with_genres=';

var tarjeta = document.getElementById("peliculas");
var select = document.getElementById("categorias")

const API_URL = `${URL}${seccion}/${option}/?api_key=${api_key}&language=${language}&page=10`;
const API_URL_CATEGORIA = `${URL}genre/${option}/list?api_key=${api_key}&language=${language}&page=10`;
async function cargar(){
    var respusta = await fetch(API_URL);
    var datos = await respusta.json();
    var data = datos.results;
    var respuestacat = await fetch(API_URL_CATEGORIA);
    var categorias = await respuestacat.json();
   // console.log(categorias.genres.filter(ca => {return ca.id == 18})[0].name);
    imprimirDatos(data, categorias);
}

async function cargarCategorias(){
    var respuesta = await fetch(API_URL_CATEGORIA);
    var categorias = await respuesta.json();
    var select = document.getElementById('categorias');

    categorias.genres.forEach(c => {
        var option = document.createElement('option');
        option.text = c.name;
        option.value = c.id;
        select.add(option);
    });
}

async function buscarXCateria(){
    document.getElementById('seccion_series').classList.add('d-none')
    var select = document.getElementById('categorias');
    tarjeta.innerHTML = '';
    var respuestaCategoria = await fetch(`${URL_GENERO}${select.value}`);
    var data = await respuestaCategoria.json();

    var rcategoria = await fetch(API_URL_CATEGORIA);
    var datacategoria = await rcategoria.json();

    var categorias = data.results;
    imprimirDatos(categorias,datacategoria);

    
}

function imprimirDatos(datos, datacategoria){
  datos.forEach(p => {
    tarjeta.innerHTML += `<div class="col-md-3 col-sm-12">
    <div class="card m-2 my-4" style="width: 25rem; height: 25rem;">
     <img src="https://image.tmdb.org/t/p/original${p.backdrop_path}" class="card-img-top" alt="${p.title}"> 
        <div class="card-body">
          <h5 class="card-title">${p.title}</h5>
          <p class="card-text">Fecha de Estreno: <strong>${p.release_date}</strong></p>
          <p class="card-text">Categoria: <strong>${datacategoria.genres.filter(c => {return c.id === p.genre_ids[0]})[0].name}</strong></p>
        </div>
      </div>
</div>`
});
}


async function cargarSeries(){

    var serieselement= document.getElementById('series');
    var respuestaSerie = await fetch('https://api.themoviedb.org/3/tv/popular?api_key=f2dc9601342a6b6fa8fb988fa67f60ac&language=es-ES');
    var data = await respuestaSerie.json();
    var i = 0;
    var series = data.results;

    series.forEach(s => {
      serieselement.innerHTML += `<div class="carousel-item" id="item${i++}">
      <img src="https://image.tmdb.org/t/p/original${s.poster_path}" class="d-block w-100"alt="..." style="width: 20rem; height: 60rem;">
      <div class="carousel-caption">
        <h3>${s.name}</h3>
        <p>${s.overview}</p>
      </div>
    </div>`
    document.getElementById('slideto').innerHTML += `<li data-target="#carouselExampleCaptions" data-slide-to="${i}" id="li${i}"></li>`;
    });

    document.getElementById('item0').classList.add('active');
    // document.getElementById('li0').classList.add('active')
}

cargar();
cargarSeries();












