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
            line.centerArc = {
                x: line.pos.x + 3 + line.width + 3,
                y: line.pos.y + 7 + line.height + 3
            }
            if (line.type === 'txt') {
                drawText(line.txt, line.pos.x, line.pos.y + line.size, line.size, line.align, line.stroke, line.color)
                gMainInput.value = gMeme.lines[gMeme.selectedLineIdx - 1].txt;
            }
            if (idx + 1 === gMeme.selectedLineIdx) {
                drawRect(line.pos.x - 5, (line.pos.y + line.size) - line.size, line.width, line.size + 10)
                gCtx.beginPath()
                drawArc(line.centerArc.x, line.centerArc.y)
            }
        })

    };

    gMeme.lines.forEach((line, idx) => {
        if (line.type === 'emoji') {
            var emoji = new Image();
            emoji.src = `img/emoji/${line.emojiNum}.png`
            emoji.onload = () => {
                gCtx.drawImage(emoji, line.pos.x, line.pos.y, line.emojiWidth, line.emojiWidth);
                if (idx + 1 === gMeme.selectedLineIdx) {
                    drawRect(line.pos.x - 5, line.pos.y, line.width + 5, line.height)
                        // drawArc(line.pos.x - 5 + line.width, line.pos.y + line.height)
                    gMainInput.value = '';
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
    if (gMeme.lines[gMeme.selectedLineIdx - 1].type === 'emoji') {
        gMeme.lines[gMeme.selectedLineIdx - 1].width++;
        gMeme.lines[gMeme.selectedLineIdx - 1].emojiWidth++;
    } else {
        gMeme.lines[gMeme.selectedLineIdx - 1].width += 3;
    }
    renderCanvas(gMeme.selectedImgId)
}

function decreaseFont() {
    gMeme.lines[gMeme.selectedLineIdx - 1].size--;
    gMeme.lines[gMeme.selectedLineIdx - 1].height--;
    if (gMeme.lines[gMeme.selectedLineIdx - 1].type === 'emoji') {
        gMeme.lines[gMeme.selectedLineIdx - 1].width--;
        gMeme.lines[gMeme.selectedLineIdx - 1].emojiWidth--;
    } else {
        gMeme.lines[gMeme.selectedLineIdx - 1].width -= 3;
    }
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
        width: 100,
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
            emojiWidth: 75,
            isDrag: false
        })
        gMeme.selectedLineIdx = gMeme.lines.length
        renderCanvas(gMeme.selectedImgId)
    }
}

function saveCanvasLocal() {
    if (gMeme.id) {
        const editedMeme = gMyMemes.find(meme => meme.meme.id === gMeme.id)
        editedMeme.meme.lines = gMeme.lines
        editedMeme.src = gElCanvas.toDataURL()
    } else {
        gMeme.id = makeId()
        gMyMemes.push({
            src: gElCanvas.toDataURL(),
            meme: gMeme
        })
    }
    console.log(gMyMemes)
    saveToStorage('my-memes', gMyMemes)
    gMeme = false
    location.reload();
}

function downloadImg(elLink) {
    var imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function drawText(text, x, y, size, dir, stroke, color) {
    var xStart = x
    gCtx.font = size + 'px Impact';
    var textData = gCtx.measureText(text);
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

function drawArc(x, y) {
    // gCtx.beginPath();
    gCtx.lineWidth = 3;
    gCtx.arc(x, y, 6, 0, 2 * Math.PI);
    gCtx.strokeStyle = 'pink';
    gCtx.stroke();
    gCtx.fillStyle = 'blue';
    gCtx.fill();
}

function shareOnFB() {

    const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds

    const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

    document.querySelector('.fb-btn').innerHTML = `
        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Share on Facebook  
        </a>`
}


function toggleShare() {
    document.body.classList.toggle('share-open')
    if (!document.querySelector('.link-for-fb')) {
        const imgDataUrl = gElCanvas.toDataURL("image/jpeg");

        // A function to be called if request succeeds
        function onSuccess(uploadedImgUrl) {
            const encodedUploadedImgUrl = encodeURIComponent(uploadedImgUrl)
                // document.querySelector('.user-msg').innerText = `Your photo is available here: ${uploadedImgUrl}`

            document.querySelector('.fb-btn').innerHTML = `
        <a class="link-for-fb" href="https://www.facebook.com/sharer/sharer.php?u=${encodedUploadedImgUrl}&t=${encodedUploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
        Share on Facebook  
        </a>`
        }
        doUploadImg(imgDataUrl, onSuccess);
    }
}

function doUploadImg(imgDataUrl, onSuccess) {

    const formData = new FormData();
    formData.append('img', imgDataUrl)

    fetch('//ca-upload.com/here/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.text())
        .then((url) => {
            console.log('Got back live url:', url);
            onSuccess(url)
        })
        .catch((err) => {
            console.error(err)
        })
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')
    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
}