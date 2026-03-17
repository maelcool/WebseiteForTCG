let currentDeck = [];

export function addCard(cardName){
    if(currentDeck.length >= 10){
        alert("Deck full");
        return;
    }

    currentDeck.push(cardName);
}

export function getDeck(){
    return currentDeck;
}