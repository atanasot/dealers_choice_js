const express = require("express");
const avengers = require("./avengers");
const app = express();
const path = require("path");
const morgan = require("morgan");
const PORT = 3000;

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const movies = avengers.moviesList();
  const html = `<!DOCTYPE html>
    <html>
        <head>
            <title>Avenger Movies</title>
            <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
            <h1>Avenger Movies</h1>
            <div class="movie-list">
                ${movies
                  .map(
                    (movie) => `
                <div class="item">
                    <p>
                        <a href="/movies/${movie.movieId}">${movie.movieId}. ${movie.title} | ${movie.year} | Director: ${movie.director}</a>
                    </p>
                </div>
                `
                  )
                  .join("")}
            </div>
            <a class="colored" href="/stars">Avenger Stars</a>
        </body>
    </html>
    `;
  res.send(html);
});

app.get("/stars", (req, res) => {
  const stars = avengers.starsList();
  const html = `<!DOCTYPE html>
      <html>
          <head>
              <title>Avenger Stars</title>
              <link rel="stylesheet" href="/style.css"/>
          </head>
          <body>
                <span>
                    <h1>Avenger Stars</h1>
                </span>
              <div class="stars-list">
                  ${stars
                    .map(
                      (star) => `
                  <div class="item">
                      <p>
                          <a href="/stars/${star.id}">${star.id}. ${star.name}</a>
                      </p>
                  </div>
                  `
                    )
                    .join("")}
              </div>
              <a class="colored" href="/">Back to Movies</a>
          </body>
      </html>
      `;
  res.send(html);
});

app.get("/movies/:movieId", (req, res) => {
  const id = req.params.movieId;
  const movie = avengers.findMovie(id);
  res.send(`<!DOCTYPE html>
    <html>
        <head>
            <title>Avenger Movies</title>
            <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
            <div class="movie-item">
                <p> <h2>${movie.movieId}.${movie.title}</h2> Year: ${
    movie.year
  } | Director: ${movie.director} | Starring:</p>
                <ul id="actors-list">
                    ${movie.actors
                      .map((actor) => `<li><a href='/stars/${avengers.getStarId(actor)}'>${actor}</a></li>`)
                      .join("")}
                </ul>
            </div>
            <a class="colored" href="/">Back to Movies</a>
        </body>
    </html>
    `);
});

app.get("/stars/:id", (req, res) => {
  const id = req.params.id;
  const star = avengers.findStar(id);
  const moviesIn = avengers.listMoviesByStar(star.name);
  console.log(moviesIn);
  res.send(`<!DOCTYPE html>
    <html>
        <head>
            <title>Avenger Star</title>
            <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
            <div class="star-item">
                <p> <h2>${star.id}.${star.name}</p>
                <ul id="movies-list">
                    ${moviesIn
                      .map(
                        (movie) =>
                          `<li><a href=/movies/${movie.movieId}>${movie.title}</a><\li>`
                      )
                      .join(" ")}
                </ul>
            </div>
            <a class="colored" href="/">Back to Movies</a>
        </body>
    </html>
    `);
});

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
