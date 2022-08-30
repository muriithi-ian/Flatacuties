// Your code here
/* targets */
const charactersBar = document.querySelector("#character-bar");
const characterName = document.querySelector("#detailed-info #name");
const characterImage = document.querySelector("#image");
const characterVotes = document.querySelector("#vote-count");
const characterVotesForm = document.querySelector("#votes-form");
const characterVotesFormInput = document.querySelector("#votes");
const characterVotesReset = document.querySelector("#reset-btn");

const addCharForm = document.querySelector("#character-form");
const addCharName = document.querySelector("#character-form #name");
const addCharImage = document.querySelector("#image-url");

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
    mySpan.addEventListener("click", () => {
      fetchData(character.id).then((character) => {
        renderCharacter(character);
      });
    });
    charactersBar.appendChild(mySpan);
  });
}

function renderCharacter(character) {
  //data render
  characterName.textContent = character.name;
  characterImage.src = character.image;
  characterImage.alt = character.name;
  characterVotes.textContent = character.votes;

  //add votes
  characterVotesForm.addEventListener("submit", (e) => {
    e.preventDefault();

    characterVotes.textContent =
      parseInt(characterVotes.textContent) +
      parseInt(characterVotesFormInput.value);
    characterVotesForm.reset();
  });

  //reset votes
  characterVotesReset.addEventListener("click", (e) => {
    characterVotes.textContent = 0;
  });

  //add character
  const currentCharacters = document.querySelectorAll("#character-bar span");
  addCharForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newChar = {
      name: addCharName.value,
      image: `${addCharImage.value}`,
      votes: 0,
    };
    fetch("http://localhost:3000/characters", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newChar),
    })
      .then((res) => res.json())
      .then((newChars) => {
        fetchData().then((characters) => {
          renderCharacterBar(characters);
        });
        addCharForm.reset();
      })
      .catch((err) => console.log(newChar));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchData(1).then((character) => {
    renderCharacter(character);
  });
  fetchData().then((characters) => {
    renderCharacterBar(characters);
  });
});
