//Get current path/page
const global = {
  currentPage: window.location.pathname,
};

//FETCH DATA FROM THEMOVIEDB.ORG API
async function fetchAPIData(endpoint) {
  //Dont use in prodcution, in production => env.file from ur backend server
  const API_KEY = '09711101b2aa2e8df09ae49ce782038f';
  const API_URL = 'https://api.themoviedb.org/3/';

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  return data;
  // console.log(data);
}

//get/fetch popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  // addToDom(results);
  results.forEach((movie) => {
    addToDom(movie);
  });
}

//ADd popular movie to dom
function addToDom(movie) {
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="Movie Title"
      />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="Movie Title"
    />`
      }
    </a>
    <div class="card-body">
      <h5 class="card-title">${movie.original_title}</h5>
      <p class="card-text">
        <small class="text-muted">Release: ${movie.release_date}</small>
      </p>
    </div> `;
  document.getElementById('popular-movies').appendChild(div);
}

//Highlight active link
function activeLink() {
  const links = document.querySelectorAll('.nav-link');
  links.forEach((link) => {
    if (link.getAttribute('href') === global.currentPage) {
      link.classList.add('active');
    }
  });
}

//Routing page
function init() {
  switch (global.currentPage) {
    case '/':
    case '/index.html':
      displayPopularMovies();
      console.log('home');
      break;
    case '/movie-details.html':
      console.log('movie details');
      break;
    case '/search.html':
      console.log('Search');
      break;
    case '/shows.html':
      console.log('Tv shows');
      break;
    case '/tv-details.html':
      console.log('Tv Details');
      break;
  }
  activeLink();

  // fetchAPIData('movie/popular');
}

document.addEventListener('DOMContentLoaded', init);
