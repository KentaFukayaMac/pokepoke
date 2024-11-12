const GAMEWITH_URL="https://img.gamewith.jp/article_tools/pokemon-tcg-pocket/gacha/"
card_nums = 20
MAX_CARDNUM = 20

// 画像表示関連
document.addEventListener('DOMContentLoaded', function() {
	showProbability(0)

	const button = document.getElementById('button');
	button.addEventListener('click', pushResetButton);
	loadCSV()
});

function loadCSV() {
	fetch('card_list.csv')
	    .then(response => response.text())
        .then(data => parseCSV(data));
}

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

function removeAllImage(){
	var images = document.getElementsByTagName('img');
	while(images.length > 0) {
    	images[0].parentNode.removeChild(images[0]);
	}
}

// 画像クリック
function imgClick(e){
	const id = e.target.getAttribute("id")
	e.target.remove()
	showProbability(-1)
	console.log(id)
}

//確率表示
function showProbability(num){
	card_nums = card_nums + num
	probability = (1/card_nums*100).toFixed(1) 
	document.getElementById('probability').textContent = probability+"% "+probability*2+"% "
}

//restボタン
function pushResetButton(){
	removeAllImage()
	card_nums=MAX_CARDNUM
	showProbability(0)
	loadCSV()
}