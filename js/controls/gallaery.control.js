function init() {
    renderGallery()
}

function renderGallery() {
    var strHtml = ''
    for (let i = 1; i <= 17; i++) {
        strHtml += `<img src="img/${i}.jpg" id="${i}" onclick="createMeme(this)">`
    }
    document.querySelector('.gallery-imgs-grid').innerHTML = strHtml;
}

function createMeme(img) {
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'flex'
    renderEditor(img.id)
}

function backToGallery() {
    document.querySelector('.gallery').style.display = 'flex'
    document.querySelector('.meme-editor').style.display = 'none'
}