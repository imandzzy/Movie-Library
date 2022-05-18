const API_BASE = 'http://localhost:3100';

const Movie = movie => `<div id='movie_${movie.movie_id}' class='movie' title='movie cover'
    onclick='setModalMovieInfo(${JSON.stringify({
  ...movie,
  description: escape(movie.description)
})})'
    style='background-image: url(${(movie.poster || movie.poster.length > 0) || 'https://wallpaperaccess.com/full/2063918.jpg'});' 
    data-bs-toggle="modal" data-bs-target="#movieInfoModal"
  >
    <div class='info'>
      <div class='rating'><div class='star'>⭐</div>${Math.round(movie.rating * 10) / 10}</div>
      <h1>${movie.name}</h1>
      <div class='genres'>
        ${movie.genre.split(',').map(g => `<div>${g}</div>`).join('')}
      </div>
    </div>
</div>`

const convertMinsToHrsMins = (mins) => {
  let h = Math.floor(mins / 60);
  let m = mins % 60;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

// CONTROL MODALS
const setModalMovieInfo = movie => {
  document.getElementById('movieInfoModal').innerHTML = `
    <div class="modal-dialog modal-lg " >
      <div class="modal-content">
        <div class="modal-header">
          <div class="d-flex flex-column">
            <h4 class="modal-title">${movie.name}</h4>
            <div class="movie-info">
              ${movie.release_year} • ${convertMinsToHrsMins(movie.duration)}
            </div>
          </div>
          <a href="https://www.imdb.com/title/${movie.imdb}"><img class="imdb-img" src='https://m.media-amazon.com/images/G/01/IMDb/BG_rectangle._CB1509060989_SY230_SX307_AL_.png'></a>
          <button type="button" id="closemodal" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
          <iframe width="100%" height="500" src="${movie.trailer}" title="YouTube video player" frameborder="" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          <div class='d-flex justify-content-between'>
            <div class='movieInfoModal-genres'>
              ${movie.genre.split(',').map(g => `<div>${g}</div>`).join('')}
            </div>
            <div class='movieInfoModal-rating'><div class='star'>⭐</div>${Math.round(movie.rating * 10) / 10}</div>
          </div>
          ${decodeURIComponent(movie.description)}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addAndUpdateMovieModal" onclick='setUpdateModalData(${JSON.stringify(movie)});'">Edit Movie</button>
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal" onclick="deleteMovie(${movie.movie_id})">Delete Movie</button>
        </div>
      </div>
    </div>
    `;
}

const setUpdateModalData = movie => {
  document.getElementById("movie-form").reset();
  document.getElementsByClassName('movie-modal')[0].innerText = 'Edit movie';
  document.getElementById('submit-movie-btn').innerText = 'Update';

  Object.entries(movie).forEach(entry => {
    let [key, value] = entry;
    if (key === 'description') {
      value = decodeURIComponent(value);
    }
    if (key === 'genre') {
      let genres = value.toLowerCase().split(',');
      Object.entries(document.getElementsByClassName('genre-input')).forEach(g => {
        if (genres.includes(g[1].getAttribute('genre').toLowerCase())) {
          g[1].checked = true;
        }
      })
    } else {
      document.getElementById(key).value = value;
    }
  });
}

const formReset = () => {
  document.getElementsByClassName('movie-modal')[0].innerText = 'Add a movie';
  document.getElementById('submit-movie-btn').innerText = 'Submit';
  document.getElementById("movie-form").reset();
}

// MOVIE
const getMovies = async () => {
  const response = await fetch(`${API_BASE}/movies`);
  const { movies } = await response.json();
  document.getElementById('movie-list').innerHTML = movies.map(movie => Movie(movie)).join('');
}

const addAndUpdateMovie = async () => {
  let myForm = document.getElementById('movie-form');
  let formData = new FormData(myForm);
  let data = {
    genres: []
  };
  const updatemovie = document.getElementById('submit-movie-btn').innerText.toLowerCase() === 'update';
  for (var p of formData) {
    let name = p[0];
    let value = p[1];
    if (name === 'genre') data.genres.push(value);
    else data[name] = value;
  }

  if (data.genres.length === 0) {
    return alert("Please select movie's genre.");
  }
  fetch(`${API_BASE}/movie/${updatemovie ? "update" : "add"}`, {
    method: updatemovie ? 'PUT' : 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      if (!data.data) {
        if (data.message.includes('Duplicate')) {
          alert("Movie name already exists.")
        }
        return
      };
      document.getElementById('closemodal').click();
      if (updatemovie) {
        let card = document.getElementById(`movie_${data.data.movie_id}`)
        var newCard = document.createElement('div');
        newCard.innerHTML = Movie(data.data);
        card.innerHTML = newCard.firstChild.innerHTML;
        card.style.backgroundImage = `url('${data.data.poster.length > 0 ? data.data.poster : "https://wallpaperaccess.com/full/2063918.jpg"}')`;
        card.setAttribute("onclick", `setModalMovieInfo(${JSON.stringify({ ...data.data, genre: data.data.genre })})`);
      } else {
        document.getElementById('movie-list').innerHTML = Movie(data.data) + document.getElementById('movie-list').innerHTML;
      }
    })
    .catch((error) => {
      console.log(error.message);
      alert("Server is down!");
    }
    );
}

const deleteMovie = async movie_id => {
  const response = await fetch(`${API_BASE}/movie/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movie_id }),
  });

  const movie = await response.json();

  if (movie === "DELETED") {
    document.getElementById(`movie_${movie_id}`).remove();
  }
}