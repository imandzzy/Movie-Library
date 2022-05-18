//movieRouter express
const express = require('express');
const router = express.Router();
const db = require('../db');

//
function emptyOrRows(rows) {
  if (!rows) {
    return [];
  }
  return rows;
}

//function that get movies from the database db mysql
async function getMovies() {
  const rows = await db.query(
    `SELECT movie.movie_id, movie.name, description, release_year, poster, duration, trailer, rating, imdb, GROUP_CONCAT(genre.name) AS 'genre' FROM movie 
    JOIN movie_genre on movie.movie_id = movie_genre.movie_id 
    JOIN genre on movie_genre.genre_id = genre.genre_id
    GROUP by movie.movie_id
    ORDER BY movie.movie_id DESC;`
  );

  const data = emptyOrRows(rows);

  return { data }
}

//function that add a new movie to our database
async function addMovie(movie) {
  let { name, description, release_year, poster, duration, trailer, rating, imdb, genres } = movie;
  console.log(genres);
  
  //here we insert data of a new movie
  await db.query(
    `INSERT INTO movie(name, description, release_year, poster, duration, trailer, rating, imdb) 
    VALUES("${name}", "${description}", ${release_year}, "${poster}", ${duration}, "${trailer}", ${rating || 0}, "${imdb}")`
  );

  const genre_sql = genres.map(g => `((SELECT MAX(movie_id) FROM movie WHERE name='${name}'), ${g})`);
  
  //here 
  await db.query(
    `INSERT INTO movie_genre(movie_id, genre_id) VALUES ${genre_sql}`
  );

  const movie_db = await db.query(`
    SELECT movie.movie_id, movie.name, description, release_year, poster, duration, trailer, rating, imdb, GROUP_CONCAT(genre.name) AS 'genre' FROM movie 
    JOIN movie_genre on movie.movie_id = movie_genre.movie_id 
    JOIN genre on movie_genre.genre_id = genre.genre_id 
    WHERE movie.name = "${name}"
    GROUP by movie.movie_id;`
  );

  return {
    data: movie_db[0]
  }
}

async function updateMovie(movie) {
  let { movie_id, name, description, release_year, poster, duration, trailer, rating, imdb, genres } = movie;

  await db.query(
    `UPDATE movie 
    SET name="${name}", description="${description}",release_year=${release_year}, poster="${poster}", duration=${duration}, trailer="${trailer}", rating=${rating || 0}, imdb="${imdb}"
    WHERE movie_id=${movie_id} `
  );

  await db.query(`DELETE FROM movie_genre WHERE movie_id=${movie_id}`);

  const genre_sql = genres.map(g => `(${movie_id}, ${g})`);

  await db.query(
    `INSERT INTO movie_genre(movie_id, genre_id) VALUES ${genre_sql}`
  );

  const movie_db = await db.query(`
    SELECT movie.movie_id, movie.name, description, release_year, poster, duration, trailer, rating, imdb, GROUP_CONCAT(genre.name) AS 'genre' FROM movie 
    JOIN movie_genre on movie.movie_id = movie_genre.movie_id 
    JOIN genre on movie_genre.genre_id = genre.genre_id 
    WHERE movie.name = "${name}"
    GROUP by movie.movie_id;`
  );

  return {
    data: movie_db[0]
  }
}

async function deleteMovie({ movie_id }) {
  await db.query(`DELETE FROM movie_genre WHERE movie_id=${movie_id}`);
  await db.query(`DELETE FROM movie WHERE movie_id=${movie_id}`);

  return 'DELETED';
}

router.get('/', async function (req, res, next) {
  try {
    const movies = await getMovies(req.query.page);
    res.json({ movies: movies.data });
  } catch (err) {
    console.error(`Error while getting movies `, err.message);
    next(err);
  }
});

router.post('/add', async function (req, res, next) {
  try {
    const movies = await addMovie(req.body);
    res.json(movies);
  } catch (err) {
    console.error(`Error while creating the movie `, err.message, err.sql);
    next(err);
  }
});

router.put('/update', async function (req, res, next) {
  try {
    const movies = await updateMovie(req.body);
    res.json(movies);
  } catch (err) {
    console.error(`Error while updating the movie `, err.message, err.sql);
    next(err);
  }
});

router.delete('/delete', async function (req, res, next) {
  try {
    const response = await deleteMovie(req.body);
    res.json(response);
  } catch (err) {
    console.error(`Error while deleting the movie `, err.message, err.sql);
    next(err);
  }
});

module.exports = router;