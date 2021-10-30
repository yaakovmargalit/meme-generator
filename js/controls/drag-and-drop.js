var gStartPos
const gTouchEvs = ['touchstart', 'touchmove', 'touchend']

function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchend', onUp)
}



function onDown(ev) {
    const pos = getEvPos(ev)
    var stat = isLineClicked(pos)
    if (!stat) return
    gMeme.selectedLineIdx = stat;
    renderCanvas(gMeme.selectedImgId)
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    if (gMeme.lines[gMeme.selectedLineIdx - 1].isDrag) {
        const pos = getEvPos(ev)
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveLine(dx, dy)
        renderCanvas(gMeme.selectedImgId)
    }
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx - 1].pos.y += dy
}

function getEvPos(ev) {
    var pos = {
        x: ev.offsetX,
        y: ev.offsetY
    }
    if (gTouchEvs.includes(ev.type)) {
        ev.preventDefault()
        ev = ev.changedTouches[0]
        pos = {
            x: ev.pageX - ev.target.offsetLeft - ev.target.clientLeft,
            y: ev.pageY - ev.target.offsetTop - ev.target.clientTop
        }
    }
    return pos
}



function isLineClicked(clickedPos) {
    var res;
    gMeme.lines.forEach((line, idx) => {
        const { pos, width, height } = line
        if (clickedPos.x > pos.x && clickedPos.x < clickedPos.x + width && clickedPos.y > pos.y && clickedPos.y < pos.y + height) {
            res = idx + 1
        }
    });
    return res
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx - 1].isDrag = isDrag
}