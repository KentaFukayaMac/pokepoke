const GAMEWITH_URL="https://img.gamewith.jp/article_tools/pokemon-tcg-pocket/gacha/"

// 画像表示関連
document.addEventListener('DOMContentLoaded', function() {
    fetch('card_list.csv')
        .then(response => response.text())
        .then(data => parseCSV(data));
});

function parseCSV(data) {
    const lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        const cells = lines[i].split(',');
        //＃をエスケープ
		if (!cells[0].startsWith("#"))
			showCards(cells)
    }
}

function showCards(csvLine){
	let content_area = document.getElementById("content_area");

	for (var i = 0; i < csvLine[1]; i++) {
		const card_id = csvLine

		var image = document.createElement('img');
		image.src = GAMEWITH_URL+csvLine[0]+".png"
		image.id = csvLine[0]+i
		image.width = 272; // 横サイズ（px）
		image.height = 379; // 横サイズ（px）
		image.addEventListener('click', imgClick);
		content_area.appendChild(image);
	}
}

// 画像クリック
function imgClick(e){
	const id = e.target.getAttribute("id")
	e.target.remove()
	console.log(id)
}