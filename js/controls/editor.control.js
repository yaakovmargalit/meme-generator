var gElCanvas;
var gCtx;
// var gCurrMeme;

function renderEditor(imgId) {
    gMeme.selectedImgId = imgId
        // gElCanvas = document.querySelector('.main-canvas');
        // gCtx = gElCanvas.getContext('2d');
        //put the all data on canvas
    renderCanvas(gMeme.selectedImgId)
}

function renderCanvas(imgId) {
    gElCanvas = document.querySelector('.main-canvas');
    gCtx = gElCanvas.getContext('2d');
    var img = new Image();
    img.src = getImgSrc(imgId)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gMeme.lines.forEach((line, idx) => {
            drawText(line.txt, 30, line.positionY, line.size)
            if (idx + 1 === gMeme.selectedLineIdx) {
                var yHeight = gMeme.lines[gMeme.selectedLineIdx - 1].size
                drawRect(20, gMeme.lines[gMeme.selectedLineIdx - 1].positionY - yHeight, 350, yHeight + 10)
                    // gCtx.rect(20, gMeme.lines[gMeme.selectedLineIdx - 1].positionY - yHeight, 350, yHeight + 10);
                    // gCtx.stroke();
            }
        })


    };
    // gCtx.clearRect(100, 100, gElCanvas.width, gElCanvas.height);

}

function inputChanged(input) {
    gMeme.lines[gMeme.selectedLineIdx - 1].txt = input.value
    renderCanvas(gMeme.selectedImgId)
}


function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx - 1].size++;
    renderCanvas(gMeme.selectedImgId)
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx - 1].size--;
    renderCanvas(gMeme.selectedImgId)
}

function upLine() {
    gMeme.lines[gMeme.selectedLineIdx - 1].positionY -= 3;
    renderCanvas(gMeme.selectedImgId)
}

function downLine() {
    gMeme.lines[gMeme.selectedLineIdx - 1].positionY += 3;
    renderCanvas(gMeme.selectedImgId)
}

function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length) gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx = 1
    renderCanvas(gMeme.selectedImgId)
}

function drawText(text, x, y, size) {
    gCtx.lineWidth = 1.5;
    gCtx.strokeStyle = 'black';
    gCtx.fillStyle = '#fff';
    gCtx.font = size + 'px Impact';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}

function drawRect(x, y, a, b) {
    gCtx.rect(x, y, a, b);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.beginPath();
}