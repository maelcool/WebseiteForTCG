const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZx3ik0FpEurNSQieDO0e69d2dhglDVL0wg0iBdmErqTXJ7fARSmLtPhDs2KGWBg8NBCbvAIdanvZy/pub?output=csv"
const cardDisplay = document.getElementById("CardDisplay");
const searchName = document.getElementById("searchName");

let cardsData = []; 

async function loadCards() {
    try {
        const res = await fetch(url);
        const csvText = await res.text();

        // Parse CSV using PapaParse
        const result = Papa.parse(csvText, { header: true });
        cardsData = result.data;
        
    } catch (err) {
        cardDisplay.innerHTML = "Error loading cards: " + err;
        console.error(err);
    }
}

function displayCards(cards) {
    if (cards.length === 0) {
        cardDisplay.innerHTML = "<p>No cards found.</p>";
        return;
    }

    cardDisplay.innerHTML = cards.map(card => `
        <div class="card">
            <h3>${card.Name}</h3>
            <p>Type: ${card.Type}</p>
            <p>Attack: ${card.Attack}</p>
            <p>Defense: ${card.Defense}</p>
        </div>
    `).join('');
}

searchName.addEventListener("input", () => {
    const query = searchName.value.toLowerCase();

    const filtered = cardsData.filter(card =>
        Object.values(card).some(value =>
            value.toLowerCase().includes(query)
        )
    );

    displayCards(filtered);
});