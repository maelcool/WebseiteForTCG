const urlTab1 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZx3ik0FpEurNSQieDO0e69d2dhglDVL0wg0iBdmErqTXJ7fARSmLtPhDs2KGWBg8NBCbvAIdanvZy/pub?output=csv&gid=0";
const urlTab2 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZx3ik0FpEurNSQieDO0e69d2dhglDVL0wg0iBdmErqTXJ7fARSmLtPhDs2KGWBg8NBCbvAIdanvZy/pub?output=csv&gid=1888527243";
const urlTab3 = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQZx3ik0FpEurNSQieDO0e69d2dhglDVL0wg0iBdmErqTXJ7fARSmLtPhDs2KGWBg8NBCbvAIdanvZy/pub?output=csv&gid=1035948475";
const cardDisplay = document.getElementById("CardDisplay");
const searchName = document.getElementById("searchName");
const emailInput = document.getElementById("emailInput");
const nameInput = document.getElementById("nameInput");
const form = document.getElementById("registrationForm");
const sheetCode = "1p8Q9kmKCNCVNvKaVdelb9MtS1WdwdtSGKbFHr5wvOgU"

let cardsData = []; 

async function loadCards(url) {
    try {
        const res = await fetch(url);
        const csvText = await res.text();

        // Parse CSV using PapaParse
        const result = Papa.parse(csvText, { header: true });
        cardsData = result.data;
        displayCards(cardsData);
        
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
    let html = "<div class=\"card-container\">";

    for (const card of cards) {
        if (!card.KarteGanz){
            html += `
            <div class="card">
                <h3>${card.Name}</h3>
                <p>Bild nicht verfügbar</p>
            </div>
            `;
        }
        else{
            const imageId = card.KarteGanz.split("/d/")[1].split("/")[0];
            html += `
                <div class="card">
                    <h3>${card.Name}</h3>
                    <img src="https://drive.google.com/thumbnail?id=${imageId}" alt="Bild von ${card.Name}" class="card-image">
                </div>
            `;
        }
    }
    html += "</div>";
    cardDisplay.innerHTML = html;
}

searchName.addEventListener("input", () => {
    const query = searchName.value.toLowerCase();
    if (!query) {
        displayCards(cardsData);
        return;
    }
    const filtered = cardsData.filter(card =>
        card.Name.toLowerCase().includes(query)
    );

    displayCards(filtered);
});

async function loadAllTabs() {
    const urls = [urlTab1, urlTab2, urlTab3];
    let allCards = [];

    for (const url of urls) {
        const res = await fetch(url);
        const csvText = await res.text();
        const result = Papa.parse(csvText, { header: true });
        allCards = allCards.concat(result.data);
    }

    cardsData = allCards;
    displayCards(cardsData);
    cardDisplay.innerHTML += `<p>Loaded ${cardsData.length} cards.</p>`;
}


loadAllTabs();