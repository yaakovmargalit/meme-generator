var gElCanvas;
var gCtx;
var gMainInput = document.querySelector('[name=meme-text]')
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
            if (line.type === 'txt') {
                drawText(line.txt, 10, line.positionY, line.size, line.align, line.stroke, line.color)
                gMainInput.value = gMeme.lines[gMeme.selectedLineIdx - 1].txt;
            }
            if (idx + 1 === gMeme.selectedLineIdx) {
                // var textData = gCtx.measureText(line.txt);
                // line.width = textData.width
                var yHeight = gMeme.lines[gMeme.selectedLineIdx - 1].size
                drawRect(5, gMeme.lines[gMeme.selectedLineIdx - 1].positionY - yHeight, 390, yHeight + 10)
            }
        })

    };

    gMeme.lines.forEach((line, idx) => {
            if (line.type === 'emoji') {
                var emoji = new Image();
                emoji.src = `img/emoji/${line.emojiNum}.png`
                emoji.onload = () => {
                    gCtx.drawImage(emoji, line.positionX, line.positionY, 75, 75);
                    if (idx + 1 === gMeme.selectedLineIdx) {
                        // var textData = gCtx.measureText(line.txt);
                        // line.width = textData.width
                        drawRect(line.positionX, line.positionY, 80, 80)
                    }
                }
            }

        })
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

function lineLtr() {
    gMeme.lines[gMeme.selectedLineIdx - 1].align = 'ltr'
    renderCanvas(gMeme.selectedImgId)
}

function lineRtl() {
    gMeme.lines[gMeme.selectedLineIdx - 1].align = 'rtl'
    renderCanvas(gMeme.selectedImgId)
}

function lineCenter() {
    gMeme.lines[gMeme.selectedLineIdx - 1].align = 'center'
    console.log(gMeme.lines)
    renderCanvas(gMeme.selectedImgId)
}

function setStrokeColor(color) {
    gMeme.lines[gMeme.selectedLineIdx - 1].stroke = color.value
    renderCanvas(gMeme.selectedImgId)
}

function setTextColor(color) {
    gMeme.lines[gMeme.selectedLineIdx - 1].color = color.value
    renderCanvas(gMeme.selectedImgId)
}

function addLine() {
    gMeme.lines.push({
        type: 'txt',
        txt: 'Text...',
        size: 40,
        align: 'center',
        color: '#fff',
        stroke: '#000',
        width: 400,
        positionY: gElCanvas.height / 2
    })
    gMeme.selectedLineIdx = gMeme.lines.length
    renderCanvas(gMeme.selectedImgId)
}

function removeLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx - 1, 1)
    renderCanvas(gMeme.selectedImgId)
}

function addEmoji(emojiNum) {
    var img = new Image();
    img.src = `img/emoji/${emojiNum}.png`
    img.onload = () => {
        gMeme.lines.push({
            type: 'emoji',
            url: `img/emoji/${emojiNum}.png`,
            emojiNum,
            positionY: (gElCanvas.height / 2) - 32.5,
            positionX: (gElCanvas.width / 2) - 32.5,
        })
        gMeme.selectedLineIdx = gMeme.lines.length
        renderCanvas(gMeme.selectedImgId)
    }
}

function saveCanvasLocal() {
    gMyMemes.push(gElCanvas.toDataURL())
    console.log(gMyMemes)
    saveToStorage('my-memes', gMyMemes)
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function drawText(text, x, y, size, dir, stroke, color) {
    var xStart = x
    gCtx.font = size + 'px Impact';
    var textData = gCtx.measureText(text);
    gCenter =
        console.log(textData.width)
    switch (dir) {
        case 'rtl':
            xStart = gElCanvas.width - (textData.width + 10)
                // gCtx.direction = dir
            break;
        case 'center':
            xStart = (gElCanvas.width / 2) - (textData.width / 2)
            break;
        default:
            xStart = x
            break;
    }
    // var xStart = dir === 'ltr' ? x : gElCanvas.width - 10
    gCtx.lineWidth = 1.5;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = color;

    gCtx.fillText(text, xStart, y, 390);
    gCtx.strokeText(text, xStart, y, 390);
    // gCtx.direction = 'lrt'
}

function drawRect(x, y, a, b) {
    gCtx.rect(x, y, a, b);
    gCtx.strokeStyle = 'black';
    gCtx.stroke();
    gCtx.beginPath();
}

function shareOnFB() {

    const encodedUploadedImgUrl = encodeURIComponent(gElCanvas.toDataURL("image/jpeg"))

    document.querySelector('.fb-share').href = `https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}`
    document.querySelector('.fb-share').addEventListener('click', () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${gElCanvas.toDataURL("image/jpeg")}&t=${gElCanvas.toDataURL("image/jpeg")}`);
        return false

    })
}