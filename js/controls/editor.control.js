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
    addMouseListeners()
    var img = new Image();
    img.src = getImgSrc(imgId)
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height);
        gMeme.lines.forEach((line, idx) => {
            if (line.type === 'txt') {
                drawText(line.txt, line.pos.x, line.pos.y + line.size, line.size, line.align, line.stroke, line.color)
                gMainInput.value = gMeme.lines[gMeme.selectedLineIdx - 1].txt;
            }
            if (idx + 1 === gMeme.selectedLineIdx) {
                var yHeight = gMeme.lines[gMeme.selectedLineIdx - 1].size
                drawRect(5, (gMeme.lines[gMeme.selectedLineIdx - 1].pos.y + line.size) - yHeight, 390, yHeight + 10)
            }
        })

    };

    gMeme.lines.forEach((line, idx) => {
        if (line.type === 'emoji') {
            var emoji = new Image();
            emoji.src = `img/emoji/${line.emojiNum}.png`
            emoji.onload = () => {
                gCtx.drawImage(emoji, line.pos.x, line.pos.y, 75, 75);
                if (idx + 1 === gMeme.selectedLineIdx) {
                    drawRect(line.pos.x, line.pos.y, 80, 80)
                }
            }
        }

    })

}

function inputChanged(input) {
    gMeme.lines[gMeme.selectedLineIdx - 1].txt = input.value
    renderCanvas(gMeme.selectedImgId)
}


function increaseFont() {
    gMeme.lines[gMeme.selectedLineIdx - 1].size++;
    gMeme.lines[gMeme.selectedLineIdx - 1].height++;
    renderCanvas(gMeme.selectedImgId)
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx - 1].size--;
    gMeme.lines[gMeme.selectedLineIdx - 1].height--;
    renderCanvas(gMeme.selectedImgId)
}

function upLine() {
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.y -= 3;
    renderCanvas(gMeme.selectedImgId)
}

function downLine() {
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.y += 3;
    renderCanvas(gMeme.selectedImgId)
}

function switchLine() {
    if (gMeme.selectedLineIdx < gMeme.lines.length) gMeme.selectedLineIdx++;
    else gMeme.selectedLineIdx = 1
    renderCanvas(gMeme.selectedImgId)
}


function alignText(dir) {
    gCtx.font = gMeme.lines[gMeme.selectedLineIdx - 1].size + 'px Impact';
    var textData = gCtx.measureText(gMeme.lines[gMeme.selectedLineIdx - 1].txt);
    switch (dir) {
        case 'ltr':
            gMeme.lines[gMeme.selectedLineIdx - 1].pos.x = 10
            renderCanvas(gMeme.selectedImgId)
            break;
        case 'rtl':
            gMeme.lines[gMeme.selectedLineIdx - 1].pos.x = gElCanvas.width - (textData.width + 10)
            renderCanvas(gMeme.selectedImgId)
            break;
        case 'center':
            gMeme.lines[gMeme.selectedLineIdx - 1].pos.x = (gElCanvas.width / 2) - (textData.width / 2)
            renderCanvas(gMeme.selectedImgId)
            break;
        default:
            // xStart = x
            break;
    }
}

// function lineLtr() {
//     gMeme.lines[gMeme.selectedLineIdx - 1].align = 'ltr'
//     renderCanvas(gMeme.selectedImgId)
// }

// function lineRtl() {
//     gMeme.lines[gMeme.selectedLineIdx - 1].align = 'rtl'
//     renderCanvas(gMeme.selectedImgId)
// }

// function lineCenter() {
//     gMeme.lines[gMeme.selectedLineIdx - 1].align = 'center'
//     console.log(gMeme.lines)
//     renderCanvas(gMeme.selectedImgId)
// }

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
        width: 390,
        height: 50,
        pos: {
            x: 10,
            y: gElCanvas.height / 2
        }
    })
    console.log(gMeme.lines[1])
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
            pos: {
                x: (gElCanvas.width / 2) - 32.5,
                y: (gElCanvas.height / 2) - 32.5
            },
            width: 80,
            height: 80,
            isDrag: false
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
    console.log(textData.width)
    gCtx.lineWidth = 1.5;
    gCtx.strokeStyle = stroke;
    gCtx.fillStyle = color;

    gCtx.fillText(text, xStart, y, 390);
    gCtx.strokeText(text, xStart, y, 390);
}

function drawRect(x, y, w, h) {
    gCtx.rect(x, y, w, h);
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