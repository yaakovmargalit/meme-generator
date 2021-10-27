var gElCanvas;
var gCtx;
// var gCurrMeme;

function renderEditor(imgId) {
    gMeme.selectedImgId = imgId
    gElCanvas = document.querySelector('.main-canvas');
    gCtx = gElCanvas.getContext('2d');
    //put the all data on canvas
    renderCanvas(gMeme.selectedImgId)
}

function renderCanvas(imgId) {
    var img = new Image();
    img.src = `meme-imgs/${imgId}.jpg`
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gMeme.lines.forEach((line, Idx) => {
            drawText(line.txt, 100, (Idx + 1) * 100)
        })
    };
}

function inputChanged(input) {
    gMeme.lines[gMeme.selectedLineIdx].txt = input.value
    renderCanvas(gMeme.selectedImgId)
}

function drawText(text, x, y) {
    gCtx.lineWidth = 1.5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = '#fff';
    gCtx.font = '40px Impact';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}