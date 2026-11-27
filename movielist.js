/**
 * @file movieList.js
 * @description This file contains the Movie class and the MovieList class
 * @author Mathew Brown
 */

/**
 * @class Movie
 * @description A template for making one movie object.
 */
class Movie {
  constructor(movieId, title, year, rating) {
    this.movieId = movieId;
    this.title = title;
    this.year = year;
    this.rating = rating;
  }
}

/**
 * @class MovieList
 * @description Keeps track of an array of Movie objects and shows them
 * in a table in the UI.
 */
class MovieList {
  /**
   * @param {string} elementId - the id of the table body where the list appears
   * @param {Array} initMovies - the starting array of movies
   */
  constructor(elementId, initMovies) {
    // movieList - the array of Movie objects
    this.movieList = [];
    // elementId - where in the page the list is shown
    this.elementId = elementId;

    // Turn each starting movie into a Movie object
    for (let i = 0; i < initMovies.length; i++) {
      // m - the current starting movie
      let m = initMovies[i];
      this.movieList.push(new Movie(m.movieId, m.title, m.year, m.rating));
    }
    this.render(this.movieList);
  }

  //Shows a list of movies in the table on the page (Read)
  
  render(movies) {
    // table - the table body in the page
    let table = document.getElementById(this.elementId);
    table.innerHTML = "";

    for (let i = 0; i < movies.length; i++) {
      // movie - the current movie
      let movie = movies[i];
      table.innerHTML += `<tr>
        <td>${movie.movieId}</td>
        <td>${movie.title}</td>
        <td>${movie.year}</td>
        <td>${movie.rating.toFixed(1)}</td>
      </tr>`;
    }
  }

  //Shows the whole list again (used by the Refresh button)
  
  refresh() {
    this.render(this.movieList);
  }

  /**
   * Finds a movie by its ID using a sequential search
   * @function findById
   * @param {number} movieId - the ID to look for
   * @returns {Movie/null} the movie if found, or null if not found
   */
  findById(movieId) {
    for (let i = 0; i < this.movieList.length; i++) {
      if (this.movieList[i].movieId === movieId) {
        return this.movieList[i];
      }
    }
    return null;
  }

  //Adds a new movie to the list (Create)

  add(movieId, title, year, rating) {
    this.movieList.push(new Movie(movieId, title, year, rating));
    this.render(this.movieList);
  }

  // Changes the details of a movie (Update)
 
  update(movieId, title, year, rating) {
    // movie - the movie to change
    let movie = this.findById(movieId);
    movie.title = title;
    movie.year = year;
    movie.rating = rating;
    this.render(this.movieList);
  }

  //Removes a movie from the list (Delete)
  
  delete(movieId) {
    for (let i = 0; i < this.movieList.length; i++) {
      if (this.movieList[i].movieId === movieId) {
        this.movieList.splice(i, 1);
      }
    }
    this.render(this.movieList);
  }

  //Shows only the movies whose title contains the search text
  search(text) {
    // results - the movies that match
    let results = [];
    for (let i = 0; i < this.movieList.length; i++) {
      if (this.movieList[i].title.toLowerCase().includes(text.toLowerCase())) {
        results.push(this.movieList[i]);
      }
    }
    this.render(results);
  }

  //Sorts the list by title A to Z
  sortA2Z() {
    this.movieList.sort(function (a, b) {
      return a.title.localeCompare(b.title);
    });
    this.render(this.movieList);
  }

  // Sorts the list by title Z to A
  
  sortZ2A() {
    this.movieList.sort(function (a, b) {
      return b.title.localeCompare(a.title);
    });
    this.render(this.movieList);
  }

  // Sorts the list by rating, highest first (Best Movies)
  
  sortBest() {
    this.movieList.sort(function (a, b) {
      return b.rating - a.rating;
    });
    this.render(this.movieList);
  }
}


