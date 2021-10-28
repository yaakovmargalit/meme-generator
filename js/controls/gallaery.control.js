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
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'flex'
    document.querySelector('.memes').style.display = 'none'
    document.querySelector('.gallery-item').classList.add('activ')
    document.querySelector('.meme-item').classList.remove('activ')
}