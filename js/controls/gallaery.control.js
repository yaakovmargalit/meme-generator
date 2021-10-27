function init() {
    renderGallery()
}

function renderGallery() {
    var strHtml = ''
    for (let i = 1; i <= 17; i++) {
        strHtml += `<img src="meme-imgs/${i}.jpg" onclick="createMeme()">`
    }
    document.querySelector('.gallery-imgs-grid').innerHTML = strHtml;
}

function createMeme() {
    document.querySelector('.main-gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'block'
}