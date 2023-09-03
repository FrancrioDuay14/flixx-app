//Get current path/page
const global = {
  currentPage: window.location.pathname,
};

//FETCH DATA FROM THEMOVIEDB.ORG API
async function fetchAPIData(endpoint) {
  //Dont use in production, in production => env.file from ur backend server
  const API_KEY = '09711101b2aa2e8df09ae49ce782038f';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  hideSpinner();
  const data = await response.json();

  return data;
  // console.log(data);
}

//get/fetch popular movies
async function displayPopularMovies() {
  const { results } = await fetchAPIData('movie/popular');

  results.forEach((movie) => {
    //ADd popular movie to dom
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img
          src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
          class="card-img-top"
          alt="${movie.title}"
        />`
            : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${movie.title}"
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
  });
}

//Display movie details
async function displayMovieDetails() {
  const movieID = window.location.search.split('=')[1];

  const movie = await fetchAPIData(`movie/${movieID}`);

  //Overlay for background image
  displayBackgroundImage('movie', movie.backdrop_path);

  const div = document.querySelector('div');

  div.innerHTML = `
      <div class="details-top">
      <div>
      ${
        movie.poster_path
          ? `<img
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        class="card-img-top"
        alt="${movie.title}"
      />`
          : `<img
      src="images/no-image.jpg"
      class="card-img-top"
      alt="${movie.title}""
    />`
      }
      </div>
      <div>
        <h2>${movie.title}"</h2>
        <p>
          <i class="fas fa-star text-primary"></i>
          ${movie.vote_average.toFixed('1')}/ 10
        </p>
        <p class="text-muted">Release Date: ${movie.release_date}"</p>
        <p>
        ${movie.overview}"
        </p>
        <h5>Genres</h5>
        <ul class="list-group">
        ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
        </ul>
        <a href="${
          movie.homepage
        }"" target="_blank" class="btn">Visit Movie Homepage</a>
      </div>
    </div>
    <div class="details-bottom">
      <h2>Movie Info</h2>
      <ul>
        <li><span class="text-secondary">Budget:</span> $${numberWithCommas(
          movie.budget
        )}</li>
        <li><span class="text-secondary">Revenue:</span>$${numberWithCommas(
          movie.revenue
        )}</li>
        <li><span class="text-secondary">Runtime:</span> ${movie.runtime}</li>
        <li><span class="text-secondary">Status:</span> ${movie.status}</li>
      </ul>
      <h4>Production Companies</h4>
      <div class="list-group">${movie.production_companies
        .map((company) => `<span>${company.name}</span>`)
        .join(', ')}</div>
    </div>
  `;

  document.querySelector('#movie-details').appendChild(div);
}

//get/fetch popular tv showws
async function displayPopularShows() {
  const { results } = await fetchAPIData('tv/popular');

  results.forEach((show) => {
    //ADd popular show to dom
    const div = document.createElement('div');
    div.classList.add('card');
    div.innerHTML = `
      <a href="tv-details.html?id=${show.id}">
        ${
          show.poster_path
            ? `<img
          src="https://image.tmdb.org/t/p/w500${show.poster_path}"
          class="card-img-top"
          alt="show name"
        />`
            : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="show name"
      />`
        }
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Aired: ${show.first_air_date}</small>
        </p>
      </div> `;
    document.getElementById('popular-shows').appendChild(div);
  });
}

function displayBackgroundImage(type, backgroundPath) {
  const overlayDiv = document.createElement('div');
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundPath})`;
  overlayDiv.style.backgroundSize = 'cover';
  overlayDiv.style.backgroundPosition = 'center';
  overlayDiv.style.backgroundRepeat = 'no-repeat';
  overlayDiv.style.height = '100vh';
  overlayDiv.style.width = '100vw';
  overlayDiv.style.position = 'absolute';
  overlayDiv.style.top = '0';
  overlayDiv.style.left = '0';
  overlayDiv.style.zIndex = '-1';
  overlayDiv.style.opacity = '0.1';

  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overlayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overlayDiv);
  }
}

function numberWithCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
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
      break;
    case '/movie-details.html':
      displayMovieDetails();
      break;
    case '/search.html':
      console.log('Search');
      break;
    case '/shows.html':
      displayPopularShows();
      break;
    case '/tv-details.html':
      console.log('Tv Details');
      break;
  }
  activeLink();

  // fetchAPIData('movie/popular');
}

document.addEventListener('DOMContentLoaded', init);
