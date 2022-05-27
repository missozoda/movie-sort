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





