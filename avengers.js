const moviesData = [
  {
    movieId: 1,
    title: "Iron Man",
    year: 2008,
    director: "Jon Favreau",
    actors: [
      "Robert Downey Jr.",
      "Terrence Howard",
      "Gwyneth Paltrow",
      "Jeff Bridges",
    ],
  },
  {
    movieId: 2,
    title: "The Incredible Hulk",
    year: 2008,
    director: "Louis Leterrier",
    actors: ["Edward Norton", "Liv Tyler", "Tim Roth", "William Hurt"],
  },
  {
    movieId: 3,
    title: "Iron Man 2",
    year: 2010,
    director: "Jon Favreau",
    actors: [
      "Robert Downey Jr.",
      "Gwyneth Paltrow",
      "Don Cheadle",
      "Scarlett Johansson",
    ],
  },
  {
    movieId: 4,
    title: "Thor",
    year: 2011,
    director: "Kenneth Branagh",
    actors: [
      "Chris Hemsworth",
      "Natalie Portman",
      "Anthony Hopkins",
      "Tom Hiddleston",
    ],
  },
  {
    movieId: 5,
    title: "Captain America: The First Avenger",
    year: 2011,
    director: "Joe Johnston",
    actors: [
      "Chris Evans",
      "Hayley Atwell",
      "Sebastian Stan",
      "Tommy Lee Jones",
    ],
  },
  {
    movieId: 6,
    title: "Marvel's The Avengers",
    year: 2012,
    director: "Joss Whedon",
    actors: [
      "Robert Downey Jr.",
      "Chris Evans",
      "Mark Ruffalo",
      "Chris Hemsworth",
    ],
  },
  {
    movieId: 7,
    title: "Iron Man 3",
    year: 2013,
    director: "Shane Black",
    actors: [
      "Robert Downey Jr.",
      "Gwyneth Paltrow",
      "Don Cheadle",
      "Guy Pearce",
    ],
  },
];

const starsData = [
  { id: 1, name: "Robert Downey Jr." },
  { id: 2, name: "Terrence Howard" },
  { id: 3, name: "Gwyneth Paltrow" },
  { id: 4, name: "Jeff Bridges" },
  { id: 5, name: "Don Cheadle" },
  { id: 6, name: "Scarlett Johansson" },
  { id: 7, name: "Edward Norton" },
  { id: 8, name: "Liv Tyler" },
  { id: 9, name: "Tim Roth" },
  { id: 10, name: "William Hurt" },
  { id: 11, name: "Chris Hemsworth" },
  { id: 12, name: "Natalie Portman" },
  { id: 13, name: "Anthony Hopkins" },
  { id: 14, name: "Tom Hiddleston" },
  { id: 15, name: "Chris Evans" },
  { id: 16, name: "Hayley Atwell" },
  { id: 17, name: "Sebastian Stan" },
  { id: 18, name: "Tommy Lee Jones" },
  { id: 19, name: "Mark Ruffalo" },
  { id: 20, name: "Guy Pearce" },
];

const moviesList = () => [...moviesData];

const starsList = () => [...starsData];

const findMovie = (id) => {
  const movie = moviesData.find((movie) => movie.movieId === +id);
  return { ...movie };
};

const findStar = (id) => {
  const star = starsData.find((star) => star.id === +id);
  return { ...star };
};

const getStarId = (name) => {
  const star = starsData.find((star) => star.name === name);
  return star.id;
};

const listMoviesByStar = (starName) => {
  const avengerMovies = moviesList();
  return avengerMovies.reduce((acc, movie) => {
    if (movie.actors.includes(starName)) {
      acc.push(movie);
    }
    return acc;
  }, []);
};

module.exports = {
  moviesList,
  starsList,
  findMovie,
  findStar,
  getStarId,
  listMoviesByStar,
};
