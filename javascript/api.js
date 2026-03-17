export async function saveDeck(data){

    await fetch("YOUR_WEB_APP_URL", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });

}