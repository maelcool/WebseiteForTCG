import { loadAllTabs } from "./card.js";
import { addCard } from "./deckBuilder.js";
import { saveDeck } from "./api.js";

async function init(){

    const cards = await loadAllTabs();

    console.log(cards);

}

init();