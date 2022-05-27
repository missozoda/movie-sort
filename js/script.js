// elementlarni chaqirib olish
let elSearchForm = $(".search-form");
let elSearchBtn = $(".search-btn");
let elSearchInput = $(".search-input", elSearchForm);
let elResultMoviesList = $(".movies-list");
let elTemplate = $("#template").content;
let elModalTemplate = $("#modal-template").content;
let elRatingInput = $(".rating-input", elSearchForm);
let elCategoriesSelect = $(".categories", elSearchForm);
let elSortSelect = $(".sort", elSearchForm);
let categoriesArray = [];

movies.splice(25);

// arrayni normalize qilish
let normalizedMovies = movies.map((movie, i) => {
  return {
    id: i + 1,
    title: movie.Title,
    fulltitle: movie.fulltitle,
    year: movie.movie_year,
    categories: movie.Categories.split("|"),
    summary: movie.summary,
    rating: movie.imdb_rating,
    runtime: movie.runtime,
    youtube: movie.ytid,
  }
})

// categoriesArray yaratish va optionni selectga append qilish
normalizedMovies.forEach((movie, i) => {
  movie.categories.forEach((category) => {
    if (!categoriesArray.includes(category)){
      categoriesArray.push(category);
    }
  })
})
categoriesArray.sort();

categoriesArray.forEach((category) => {
  let newCategoryOption = createElement("option", category, category);
  newCategoryOption.value = category.toLowerCase();
  elCategoriesSelect.appendChild(newCategoryOption);
})

//templatedan clon olib li va modal yaratish
let createMovieItem = (movie, i) => {
  elResultMoviesList.innerHTML = "";

  let elNewLi = elTemplate.cloneNode(true);
  let elNewModal = elModalTemplate.cloneNode(true);
  $(".youtube-link", elNewLi).href = `https://www.youtube.com/watch?v=${movie.youtube}`;
  $("img", elNewLi).src = `https://i3.ytimg.com/vi/${movie.youtube}/maxresdefault.jpg`
  $(".title", elNewLi).textContent = `Title: ${movie.title}`;
  $(".fulltitle", elNewLi).textContent = `Fulltitle: ${movie.fulltitle}`;
  $(".year", elNewLi).textContent = `Year: ${movie.year}`;
  $(".categories", elNewLi).textContent = `Categories: ${movie.categories}`;
  $(".rating",elNewLi).textContent = `Rating: ${movie.rating}`
  $(".runtime", elNewLi).textContent = `Runtime: ${movie.runtime}`;
  $(".more-btn", elNewLi).setAttribute('data-bs-target', `#more-${movie.id}`);
  $(".bookmark-btn", elNewLi).value = movie.id;
  $(".js-modal", elNewModal).id = `more-${movie.id}`;
  $(".modal-title", elNewModal).textContent = `Title: ${movie.title}`;
  $(".summary", elNewModal).textContent =  `Summary: ${movie.summary}`;
  elNewLi.appendChild(elNewModal);
  return elNewLi;
}

// item movielarni rendom qilish
let rendomMovies = (movies) => {
  let elResultFragment = document.createDocumentFragment();

  movies.forEach ((movie, i) => {
    elResultFragment.appendChild(createMovieItem(movie));
  })

  elResultMoviesList.appendChild(elResultFragment);
}
rendomMovies(normalizedMovies);


let sortObjectsAZ = function(array) {
  return array.sort(function(a, b) {
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  })
}

let sortSearchResults = function(results, sortType) {
  if (sortType === "az") {
    sortObjectsAZ(results);
  } else if (sortType === "za") {
    sortObjectsAZ(results).reverse();
  }
}

let findMovies = function(title, rating) {
  return normalizedMovies.filter(function (movie) {
    return movie.title.match(title) && movie.imdbRating >= rating; 
  });
}

elSearchForm.addEventListener("submit", function(evt) {
  evt.preventDefault();

  let searchTitle = elSearchInput.value.trim();
  let movieTitleRegex = new RegExp(searchTitle, "gi");

  let minimumRating = Number(elRatingInput.value);
  // let genre = elSearchGenreSelect.value;
  // let sorting = elSearchSortSelect.value;
  // console.log(sorting);

  let searchResults = findMovies(movieTitleRegex, minimumRating);
  // sortSearchResults(searchResults, sorting);

  rendomMovies(searchResults);
})

// let readyMovieArr = [];
// elSearchForm.addEventListener("submit", function(e){
//   e.preventDefault();

//   let searchTitle = elSearchInput.value.trim();
//   if(searchTitle !== null && searchTitle !== ""){
//     let searchRegExp = new RegExp(searchTitle, 'gi');
//     console.log(searchRegExp);
//     readyMovieArr.push(normalizedMovies.filter(function (movie){
//       console.log(movie.title.match(searchRegExp));
//       // return(movie.title.match(searchRegExp))
//     }))
//   }
//   rendomMovies(readyMovieArr)
// })

// elSearchInput.addEventListener("input", function(e){
//   let searchTitle = elSearchInput.value.trim();
//   if(searchTitle !== null && searchTitle !== ""){
//     let searchRegExp = new RegExp(searchTitle, 'gi');
//     readyMovieArr = normalizedMovies.filter(function (movie){
//       return(movie.title.match(searchRegExp))
//     })
//   }
// })


