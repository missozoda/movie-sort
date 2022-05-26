// elementlarni chaqirib olish
let elSearchForm = $(".search-form");
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
normalizedMovies.forEach((movie) => {
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

//templatedan clon olib li yaratish
let createMovieItem = (movie) => {
  elResultMoviesList.innerHTML = "";

  let elNewLi = elTemplate.cloneNode(true);
  $(".youtube-link", elNewLi).href = `https://www.youtube.com/watch?v=${movie.youtube}`;
  $("img", elNewLi).src = `https://i3.ytimg.com/vi/${movie.youtube}/maxresdefault.jpg`
  $(".title", elNewLi).textContent = `Title: ${movie.title}`;
  $(".fulltitle", elNewLi).textContent = `Fulltitle: ${movie.fulltitle}`;
  $(".year", elNewLi).textContent = `Year: ${movie.year}`;
  $(".categories", elNewLi).textContent = `Categories: ${movie.categories}`;
  // $(".summary", elNewLi).textContent = `Summary: ${movie.summary}`;
  $(".rating",elNewLi).textContent = `Rating: ${movie.rating}`
  $(".runtime", elNewLi).textContent = `Runtime: ${movie.runtime}`;

  return elNewLi;
}

// item movielarni rendom qilish
let rendomMovies = (movies) => {
  let elResultFragment = document.createDocumentFragment();

  movies.forEach ((movie) => {
    elResultFragment.appendChild(createMovieItem(movie));
  })

  elResultMoviesList.appendChild(elResultFragment);
}
rendomMovies(normalizedMovies);

// formni eshitish
elSearchForm.addEventListener("search", (evt) => {
  evt.preventDefault();
  
  let searchMovie = new RegExp(elSearchInput.value.trim(), "gi");
  
  let searchResult = normalizedMovies.filter((movie) => {
    if (movie.title.match(searchMovie)){
      return (movie.title.match(searchMovie));
    }
  })
  rendomMovies(searchResult);
})


