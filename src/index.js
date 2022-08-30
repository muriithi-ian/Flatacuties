// Your code here
/* targets */
const charactersBar = document.querySelector("#character-bar");
const characterName = document.querySelector("#name")
const characterImage = document.querySelector("#image");
const characterVotes = document.querySelector("#vote-count");
const characterVotesForm = document.querySelector("#votes-form");
const characterVotesFormInput = document.querySelector("#votes");
const characterVotesReset = document.querySelector("#reset-btn");

function fetchData(id = null) {
  const url = id
    ? ` http://localhost:3000/characters/${id}`
    : "http://localhost:3000/characters";
  return fetch(url)
    .then((res) => res.json())
    .catch((err) => console.log(err));
}

function renderCharacterBar(characters) {
  //remove placeholders
  charactersBar.textContent = "";
  //render characters
  characters.forEach((character) => {
    const mySpan = document.createElement("span");
    mySpan.textContent = character.name;
    mySpan.id = character.id;
    charactersBar.appendChild(mySpan);
  });
}

function renderCharacter(character) {
  //data render
  characterName.textContent = character.name;
    characterImage.src = character.image;
    characterImage.alt = character.name;
    characterVotes.textContent = character.votes;
}

document.addEventListener('DOMContentLoaded', () => {
    fetchData(1).then(character=>{
        renderCharacter(character)
    })
    fetchData().then((characters) => {
      renderCharacterBar(characters);
    });
})