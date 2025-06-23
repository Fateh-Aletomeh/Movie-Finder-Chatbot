function getUserInput() {
  const input = document.querySelector("input[type='text']");
  return input.value.trim().toLowerCase();
}


function clearUserInput() {
  const input = document.querySelector("input[type='text']");
  input.value = "";
}


function setupEventListeners(handleUserInputCallback) {
  const button = document.querySelector("button");
  const input = document.querySelector("input[type='text']");
  
  button.addEventListener("click", handleUserInputCallback);
  input.addEventListener("keypress", function(e) {
    if (e.key == "Enter") handleUserInputCallback();
  });
}


function removeInitialText() {
  const initialText = document.getElementById("initial");
  if (initialText) initialText.remove();
}


function addMsgToChatbox(msg, classes) {
  const chatbox = document.getElementById("chatbox");
  const msgElem = document.createElement("div");
  msgElem.textContent = msg;
  msgElem.className = classes;
  msgElem.style.whiteSpace = "pre-line";
  chatbox.appendChild(msgElem);
  chatbox.scrollTop = chatbox.scrollHeight;
}


function displayUserMsg(msg) {
  removeInitialText();
  const userMsgClasses = "bg-gradient-to-r from-purple-500 to-pink-500 text-white p-3 rounded-2xl rounded-br-md max-w-xs ml-auto mb-4 shadow-lg break-words";
  addMsgToChatbox(msg, userMsgClasses);
}


function displayBotMsg(msg) {
  const BotMsgClasses = "bg-white/20 backdrop-blur-sm text-gray-100 p-3 rounded-2xl rounded-bl-md max-w-xs mr-auto mb-4 border border-white/10 shadow-lg break-words";
  addMsgToChatbox(msg, BotMsgClasses);
}


function showLoadingMsg() {
  const loading = document.createElement("div");
  loading.textContent = "Bot is thinking ...";
  loading.className = "mt-auto mb-4 text-gray-300";
  loading.id = "loading";
  const chatbox = document.getElementById("chatbox");
  chatbox.appendChild(loading);
}


function removeLoadingMsg() {
  const loading = document.getElementById("loading");
  if (loading) loading.remove();
}


function displayHelpMsg(genres) {
  removeInitialText();
  displayUserMsg("/help");
  clearUserInput();
  let output = "The following genres are available:\n";
  output += genres.join(', ');
  displayBotMsg(output);
}


function displayMovieRecommendation(movie) {
  displayBotMsg(`🎬 I recommend "${movie.title}"\n\n${movie.description}`);
}


function displayErrorMsg(errorType, genre) {
  switch(errorType) {
    case "GENRE_NOT_FOUND":
      displayBotMsg("Sorry I do not recognise that genre. Type '/help' to get a list of available genres.");
      break;
    case "NO_MOVIES_FOUND":
      displayBotMsg(`Sorry, I could not find any movies with the genre ${genre}. Please try a different one.`);
      break;
    case "API_ERROR":
      displayBotMsg("Sorry, I'm having trouble connecting to the movie database right now. Please try again later.");
      break;
  }
}
