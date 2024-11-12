const GAMEWITH_URL="https://img.gamewith.jp/article_tools/pokemon-tcg-pocket/gacha/"

document.addEventListener('DOMContentLoaded', function() {
    fetch('card_list.csv')
        .then(response => response.text())
        .then(data => parseCSV(data));
});

function parseCSV(data) {
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const cells = lines[i].split(',');
		if (!cells[0].startsWith("#"))
			showCards(cells)
    }
}

function showCards(csvLine){
	for (var i = 0; i < csvLine[1]; i++) {
		const card_url = GAMEWITH_URL+csvLine[0]+".png"
		document.write("<img src="+card_url+">")
	}
}