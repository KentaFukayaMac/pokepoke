const GAMEWITH_URL="https://img.gamewith.jp/article_tools/pokemon-tcg-pocket/gacha/"
card_nums = 20
MAX_CARDNUM = 20
csv_name = ""
// 画像表示関連
document.addEventListener('DOMContentLoaded', function() {
	const reset_button = document.getElementById('reset');
	reset_button.addEventListener('click', pushResetButton);
	const button = document.getElementsByClassName('deck');
	for(i = 0 ; i < button.length; i++)
		button[i].addEventListener('click', pushDeckButton);
});

function loadCSV(csv_name) {
	fetch(csv_name)
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
	showCards(csv_name)
}

//deckボタン
function pushDeckButton(e){
	removeAllImage()
	card_nums=MAX_CARDNUM
	showProbability(0)
	csv_name=getCSVName(e.target.getAttribute("id"))
	loadCSV(csv_name)
}


function getCSVName(name){
	csv_name　= ""
	if (name=="mewtwo")
		csv_name = "card_list.csv"
	else if (name=="pika")
		csv_name = "card_list1.csv"
	return csv_name
}