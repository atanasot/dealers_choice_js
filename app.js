const express = require("express");
const avengers = require("./avengers");
const app = express();
const path = require("path");
const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  console.log("In / route");
  const movies = avengers.moviesList();
  const html = `<!DOCTYPE html>
    <html>
        <head>
            <title>Avenger Movies</title>
            <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
            <div class="movie-list">
                ${movies.map((movie) => `
                <div class="movie-item">
                    <p>
                        <a href="/movies/${movie.movieId}" ${movie.title}</a>
                        <span>${movie.movieId}.${movie.title} | ${movie.year} | Director: ${movie.director}</span>
                    </p>
                </div>
                `).join("")}
            </div>
        </body>
    </html>
    `;
  res.send(html);
});

app.get('/movies/:movieId', (req, res) => {
    const id = req.params.movieId
    const movie = avengers.findMovie(id)
    console.log(movie)
    res.send(`<!DOCTYPE html>
    <html>
        <head>
            <title>Avenger Movies</title>
            <link rel="stylesheet" href="/style.css"/>
        </head>
        <body>
            <div class="movie-item">
                <p>${movie.movieId}. ${movie.title} | Year: ${movie.year} | Director: ${movie.director} | Starring:</p>
                <ul id="actors-list">
                    ${movie.actors.map(actor => `<li>${actor}</li>`).join('')}
                </ul>
            </div>
            <a href="/">Back to movies list</a>
        </body>
    </html>
    `)
})

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});
