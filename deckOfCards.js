"use strict";

const BASE_URL = "https://deckofcardsapi.com/api/deck";

const getShuffledCards = () =>
  new Promise((resolve, reject) => {
    try {
      resolve(
        axios.get(`${BASE_URL}/new/shuffle/`, {
          params: {
            deck_count: 1,
          },
        })
      );
    } catch (err) {
      reject(err);
    }
  });

const drawCard = (deckId, count) =>
  new Promise((resolve, reject) => {
    try {
      resolve(
        axios.get(`${BASE_URL}/${deckId}/draw/`, {
          params: {
            count: count,
          },
        })
      );
    } catch (err) {
      reject(err);
    }
  });

// 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck.
// Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
getShuffledCards()
  .then((res) => drawCard(res.data.deck_id, 1))
  .then((res) =>
    console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`)
  )
  .catch((err) => console.error(err));

// 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck.
// Once you have the card, make a request to the same API to get one more card from the same deck.
// Once you have both cards, console.log the values and suits of both cards.
let prevCard = null;

getShuffledCards()
  .then((res) => drawCard(res.data.deck_id, 1))
  .then((res) => {
    prevCard = res.data.cards[0];
    return drawCard(res.data.deck_id, 1);
  })
  .then((res) =>
    console.log(
      `${prevCard.value} of ${prevCard.suit}, ${res.data.cards[0].value} of ${res.data.cards[0].suit}`
    )
  )
  .catch((err) => console.error(err));

// 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.
// Every time you click the button, display a new card, until there are no cards left in the deck.

let isEmpty = false;
let deck_id = null;
let card = null;
const drawCardBtn = document.querySelector(".draw-card-btn");
const cardStack = document.querySelector(".card-stack");

window.addEventListener("load", () => {
  getShuffledCards()
    .then((res) => {
      if (!deck_id) {
        deck_id = res.data.deck_id;
      }
      if (!isEmpty) {
        return drawCard(deck_id, 1);
      }
    })
    .then((res) => {
      card = res.data.cards[0];
      const img = document.createElement("img");
      img.src = card.image;
      img.alt = `${card.value} of ${card.suit}`;
      cardStack.appendChild(img);

      if (res.data.remaining === 0) {
        deck_id = null;
        isEmpty = true;
        drawCardBtn.style.display = "none";
      }
    })
    .catch((err) => console.error(err));
});

drawCardBtn.addEventListener("click", () => {
  if (!deck_id) {
    deck_id = res.data.deck_id;
  }
  if (!isEmpty) {
    drawCard(deck_id, 1)
      .then((res) => {
        card = res.data.cards[0];
        const img = document.createElement("img");
        img.src = card.image;
        img.alt = `${card.value} of ${card.suit}`;
        cardStack.appendChild(img);

        if (res.data.remaining === 0) {
          deck_id = null;
          isEmpty = true;
          drawCardBtn.style.display = "none";
        }
      })
      .catch((err) => console.error(err));
  }
});
