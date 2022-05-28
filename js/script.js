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

movies.splice(100);

// arrayni normalize qilish
let normalizedMovies = movies.map((movie, i) => {
  return {
    id: i + 1,
    title: movie.Title.toString(),
    fulltitle: movie.fulltitle,
    year: movie.movie_year,
    categories: movie.Categories.split("|"),
    summary: movie.summary,
    rating: movie.imdb_rating,
    runtime: movie.runtime,
    youtube: movie.ytid,
  }
})
let normalizedMoviesToAz = function(array){
  return array.sort(function(a, b){
    if (a.title > b.title) {
      return 1;
    } else if (a.title < b.title) {
      return -1;
    } else {
      return 0;
    }
  })
}

normalizedMoviesToAz(normalizedMovies)

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
  newCategoryOption.value = category;
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
  $(".categories", elNewLi).textContent = `Categories: ${movie.categories.join(", ")}`;
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

// formni eshitish
let readyMovieArr = normalizedMovies;
elSearchForm.addEventListener("submit", function(e){
  e.preventDefault();
})

// title inputni eshitish
elSearchInput.addEventListener("input", function(e){
  let searchTitle = elSearchInput.value.trim();
  elRatingInput.value = "";
  elCategoriesSelect.value = "all";
  if(searchTitle !== null && searchTitle !== ""){
    const searchRegExp = new RegExp(searchTitle, 'gi');
    readyMovieArr = normalizedMovies.filter(function (movie){
      if(movie.title.toString().match(searchRegExp)){
        return(movie.title.toString().match(searchRegExp))
      }
      else{
        return false
      }
    })
  }else{
    readyMovieArr = normalizedMovies;
  }
  rendomMovies(readyMovieArr)
})

// rating inputni eshitish
let readyRatingMovie = readyMovieArr; 
elRatingInput.addEventListener("input", function(e){
  const searchRating = parseFloat(elRatingInput.value.trim());
  if(searchRating !== null && searchRating !== "" && !isNaN(searchRating)){
    readyRatingMovie = readyMovieArr.filter(function(movie){
      if(movie.rating >= searchRating){
        return (movie.rating >= searchRating)
      }else{
        elResultMoviesList.innerHTML = null;
        return readyRatingMovie = null;
      }
    })
  }
  rendomMovies(readyRatingMovie)
})

// select category ni eshitish
let readyCategoryMovie = [];
elCategoriesSelect.addEventListener("change", function(e){
  let selectCategory = elCategoriesSelect.value;
  if (selectCategory!=="all"){
    const selectCategoryRegexp = new RegExp(selectCategory, 'gi');
    readyCategoryMovie = readyRatingMovie.filter(function(movie){
      if(movie.categories.join().match(selectCategoryRegexp)){
        return movie.categories.join().match(selectCategoryRegexp);
      }else{
        elResultMoviesList.innerHTML = null;
        return readyCategoryMovie = null;
      }
    })
  }else{
    readyCategoryMovie = readyRatingMovie;
  }
  rendomMovies(readyCategoryMovie);
})

let sortObjectsHeightToLowRating = function(array) {
  return array.sort(function(a, b) {
    return b.rating - a.rating;
  })
}

let sortObjectsHeightNewToOld = function(array) {
  return array.sort(function(a, b) {
    return b.year - a.year;
  })
}

let readySortMovie = normalizedMovies || readyCategoryMovie;
elSortSelect.addEventListener("change",function(e){
  const sorting = Number(elSortSelect.value);
  if(sorting === 1){
    return normalizedMoviesToAz(readySortMovie);
  }
  if(sorting === 2){
    return normalizedMoviesToAz(readySortMovie).reverse();
  }
  if(sorting === 3){
    return sortObjectsHeightNewToOld(readySortMovie);
  }
  if(sorting === 4){
    return sortObjectsHeightNewToOld(readySortMovie).reverse();
  }
  if(sorting === 5){
    return sortObjectsHeightToLowRating(readySortMovie);
  }
  if(sorting === 6){
    return sortObjectsHeightToLowRating(readySortMovie).reverse();
  }
  rendomMovies(readySortMovie);
})