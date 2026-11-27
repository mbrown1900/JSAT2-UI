/**
 * @file app.js
 * @description This file contains the JavaScript for My Movie App.
 * @author Mathew Brown
 */

// Initial list of movies
let initMovies = [
  { movieId: 2, title: "The Matrix", year: 1999, rating: 8.7 },
  { movieId: 8, title: "Star Wars", year: 1977, rating: 8.6 },
  { movieId: 4, title: "Lord of the Rings", year: 2001, rating: 8.9 },
  { movieId: 10, title: "The Dark Knight", year: 2008, rating: 9.1 },
  { movieId: 3, title: "Avatar", year: 2009, rating: 7.9 },
  { movieId: 6, title: "Iron Man", year: 2008, rating: 7.8 },
  { movieId: 5, title: "The Avengers", year: 2012, rating: 8.0 },
  { movieId: 7, title: "Stuart Little", year: 1999, rating: 6.0 },
  { movieId: 9, title: "A Bugs Life", year: 1998, rating: 7.2 },
  { movieId: 1, title: "Inception", year: 2010, rating: 8.8 }
];

// Movielist - List of movies
let movieList = new MovieList("list", initMovies);

let mode = "add";

// Get all buttons from our application
const searchBtn = document.getElementById("searchBtn");
const searchIdBtn = document.getElementById("searchIdBtn");
const sortA2ZBtn = document.getElementById("sortA2ZBtn");
const sortZ2ABtn = document.getElementById("sortZ2ABtn");
const bestBtn = document.getElementById("bestBtn");
const refreshBtn = document.getElementById("refreshBtn");
const addMode = document.getElementById("addMode");
const updateMode = document.getElementById("updateMode");
const deleteMode = document.getElementById("deleteMode");
const enterBtn = document.getElementById("enterBtn");
const movieIdInput = document.getElementById("movieId");

// Add event handlers to call functions below
searchBtn.addEventListener("click", searchClick);
searchIdBtn.addEventListener("click", searchIdClick);
sortA2ZBtn.addEventListener("click", a2zClick);
sortZ2ABtn.addEventListener("click", z2aClick);
bestBtn.addEventListener("click", bestClick);
refreshBtn.addEventListener("click", refreshClick);
addMode.addEventListener("click", function () {
  setMode("add");
});
updateMode.addEventListener("click", function () {
  setMode("update");
});
deleteMode.addEventListener("click", function () {
  setMode("delete");
});
enterBtn.addEventListener("click", enterClick);
movieIdInput.addEventListener("change", getData);

// Searching and sorting

// Search for movies by part of the title

function searchClick() {
  // Get the text from the search box
  let text = document.getElementById("searchTitle").value;
  // Run the search method
  movieList.search(text);
  document.getElementById("searchResult").textContent = `Showing movies that contain "${text}"`;
}

// Search for a movie by its ID and show the result

function searchIdClick() {
  // Get the ID typed in
  let movieId = Number(document.getElementById("searchId").value);
  // Get the place to show the result
  let result = document.getElementById("searchResult");
  // Search the list
  let movie = movieList.findById(movieId);

  if (movie === null) {
    // No match - empty the list and say so
    movieList.render([]);
    result.textContent = "0 result";
  } else {
    // Match - show only that movie in the list
    movieList.render([movie]);
    result.textContent = `Found movie ID ${movie.movieId} - click Refresh to see all movies`;
  }
}

// Sort the movie list by title A to Z

function a2zClick() {
  movieList.sortA2Z();
}

// Sort the movie list by title Z to A
function z2aClick() {
  movieList.sortZ2A();
}

//Sort the movie list by rating
 
function bestClick() {
  movieList.sortBest();
}

// Show the whole movie list again

function refreshClick() {
  movieList.refresh();
  document.getElementById("searchResult").textContent = "Search results will show here";
}

// Add, update and delete

// Changes what the Enter button will do, and highlights the picked button
function setMode(newMode) {
  mode = newMode;

  // Highlight the picked mode button
  addMode.classList.remove("active");
  updateMode.classList.remove("active");
  deleteMode.classList.remove("active");
  document.getElementById(newMode + "Mode").classList.add("active");

  // Turn off boxes not needed for delete
  let turnOff = (newMode === "delete");
  document.getElementById("title").disabled = turnOff;
  document.getElementById("year").disabled = turnOff;
  document.getElementById("rating").disabled = turnOff;

   // Change the text on the bottom button contextually. 
  if (newMode === "add") {
    enterBtn.textContent = "Add Movie";
  } else if (newMode === "update") {
    enterBtn.textContent = "Update Movie";
  } else {
    enterBtn.textContent = "Delete Movie";
  }
  clearForm();
}

// Runs add, update, or delete when Enter is clicked, depending on the mode

function enterClick() {
  if (mode === "add") {
    addMovie();
  } else if (mode === "update") {
    updateMovie();
  } else {
    deleteMovie();
  }
}

// Reads the values typed into the form

function readForm() {
  return {
    movieId: Number(document.getElementById("movieId").value),
    title: document.getElementById("title").value.trim(),
    year: Number(document.getElementById("year").value),
    rating: Number(document.getElementById("rating").value)
  };
}

// Checks the title, year and rating

function checkMovie(data) {
  if (data.title === "") {
    return "Please enter a title";
  }
  if (!Number.isInteger(data.year) || data.year < 1888 || data.year > 2030) {
    return "Invalid year, must be a whole number between 1888 and 2030";
  }
  if (isNaN(data.rating) || data.rating < 1 || data.rating > 10) {
    return "Invalid rating, must be a number from 1 to 10";
  }
  return "";
}

// Add a new movie to the list

function addMovie() {
  let data = readForm();

  if (!Number.isInteger(data.movieId) || data.movieId <= 0) {
    showMessage("Invalid Movie ID, must be a whole number above 0", "red", "white");
    return;
  }
  if (movieList.findById(data.movieId) !== null) {
    showMessage("That Movie ID is already used", "red", "white");
    return;
  }
  let error = checkMovie(data);
  if (error !== "") {
    showMessage(error, "red", "white");
    return;
  }

  movieList.add(data.movieId, data.title, data.year, data.rating);
  clearForm();
  showMessage("Movie Added", "chartreuse", "black");
}

// Update movie details
function getData() {
  if (mode !== "update") {
    return;
  }
  let movie = movieList.findById(Number(movieIdInput.value));
  if (movie === null) {
    showMessage("No movie with that ID exists", "DarkOrange", "white");
  } else {
    document.getElementById("title").value = movie.title;
    document.getElementById("year").value = movie.year;
    document.getElementById("rating").value = movie.rating;
  }
}

// Update a movie in the list
 
function updateMovie() {
  let data = readForm();

  if (movieList.findById(data.movieId) === null) {
    showMessage("No movie with that ID exists", "DarkOrange", "white");
    return;
  }
  let error = checkMovie(data);
  if (error !== "") {
    showMessage(error, "red", "white");
    return;
  }

  movieList.update(data.movieId, data.title, data.year, data.rating);
  clearForm();
  showMessage("Movie Updated", "chartreuse", "black");
}

// Delete a movie from the list

function deleteMovie() {
  let movieId = Number(movieIdInput.value);
  let movie = movieList.findById(movieId);

  if (movie === null) {
    showMessage("No movie with that ID exists", "DarkOrange", "white");
    return;
  }

  // Confirm delete
  let confirmed = window.confirm(`Do you want to delete movie "${movie.title}"?`);
  if (confirmed) {
    movieList.delete(movieId);
    clearForm();
    showMessage("Movie Deleted", "chartreuse", "black");
  } else {
    showMessage("Delete cancelled", "DarkOrange", "white");
  }
}

//Empties all the boxes in the form


function clearForm() {
  document.getElementById("movieId").value = "";
  document.getElementById("title").value = "";
  document.getElementById("year").value = "";
  document.getElementById("rating").value = "";
}


// Shows a coloured message to the user

function showMessage(message, colour, text) {
  const msg = document.getElementById("msg");
  msg.style.display = "block";
  msg.textContent = message;
  msg.style.backgroundColor = colour;
  msg.style.color = text;
}

// Footer - put the current year into the footer
document.getElementById("date").textContent = new Date().getFullYear();
