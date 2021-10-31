function init() {
    renderGallery()
    resizeCanvas()
}

function renderGallery() {
    var strHtml = ` <label class="upload-btn" for="upload">Upload your photo <br> <br> <img class="upload-img" src="img/img-controls/upload-img.png" />
    <input type="file" name="upload" id="upload" onchange="onImgInput(event)"></label>`
    for (let i = 1; i <= 17; i++) {
        strHtml += `<img src="img/${i}.jpg" id="${i}" onclick="createMeme(this.id)">`
    }
    document.querySelector('.gallery-imgs-grid').innerHTML = strHtml;
}

function onImgInput(ev) {
    loadImageFromInput(ev, renderImg)
}

function loadImageFromInput(ev, onImageReady) {
    // document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader()

    reader.onload = function(event) {
        var img = new Image()
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result
        gImg = img
    }
    reader.readAsDataURL(ev.target.files[0])
}


function renderImg(img) {
    gMeme = null
        // createMeme(id)
        // if (!gMeme) gMeme = getNewMeme()
        // gMeme.src = gElCanvas.toDataURL()
    gElCanvas = document.querySelector('.main-canvas');
    gCtx = gElCanvas.getContext('2d');
    gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'flex'
}


function createMeme(id) {
    // debugger
    if (!gMeme) gMeme = getNewMeme()
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.meme-editor').style.display = 'flex'
    renderEditor(id)
}



function backToGallery() {
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'flex'
    document.querySelector('.memes').style.display = 'none'
    document.querySelector('.gallery-item').classList.add('activ')
    document.querySelector('.meme-item').classList.remove('activ')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}