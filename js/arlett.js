const URL = 'https://api.themoviedb.org/3/discover/movie?api_key=&language=es-ES';
const URLC = 'https://api.themoviedb.org/3/genre/movie/list?api_key=&language=es-ES';

async function cargarPeliculas(){
    var respuesta = await fetch(URL);
    var data = await respuesta.json();
    var peliculas = data.results;

    //generos o categorias
    var respuestaC = await fetch(URLC);
    var categorias = await respuestaC.json();
    peliculas.forEach(pelicula => {
        var datoscategori = categorias.genres.filter(function(c){
            return c.id === pelicula.genre_ids[0];
        })
        console.log(`Titulo: ${pelicula.title} \n Categorias: ${datoscategori[0].name}`);
    });
}

cargarPeliculas();
