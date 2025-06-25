async function handleUserInput() {
  const genre = getUserInput();
  clearUserInput();

  if (genre.length == 0) return;

  if (genre == "/help") {
    handleHelp();
    return;
  }

  displayUserMsg(genre);

  showLoadingMsg();
  const result = await fetchMovieData(genre);
  removeLoadingMsg();
  
  if (result.success) {
    displayMovieRecommendation(result.movie);
  } else {
    displayErrorMsg(result.error, result.genre);
  }
}


function handleHelp() {
  const genres = getAvailableGenres();
  displayHelpMsg(genres);
}


document.addEventListener("DOMContentLoaded", function() {
  initGenres();
  setupEventListeners(handleUserInput);
})
