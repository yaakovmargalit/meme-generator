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
    var idxLineClicked = isLineClicked(pos)
    if (idxLineClicked) {
        gMeme.selectedLineIdx = idxLineClicked;
        renderCanvas(gMeme.selectedImgId)
        setLineDrag(true)
        gStartPos = pos
        document.body.style.cursor = 'grabbing'
    } else if (isCircleClicked(pos)) {
        document.body.style.cursor = 'nw-resize'
        setLineResize(true)
        gStartPos = pos
    } else return

}

function onMove(ev) {
    const pos = getEvPos(ev)
    if (gMeme.lines[gMeme.selectedLineIdx - 1].isDrag) {
        const dx = pos.x - gStartPos.x
        const dy = pos.y - gStartPos.y
        gStartPos = pos
        moveLine(dx, dy)
        renderCanvas(gMeme.selectedImgId)
    } else if (gMeme.lines[gMeme.selectedLineIdx - 1].isResize) {
        if (pos.y > gStartPos.y) increaseFont()
        else decreaseFont()
        gStartPos = pos
    }
}

function onUp() {
    setLineDrag(false)
    setLineResize(false)
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
        console.log(clickedPos.x + width)
        if (clickedPos.x > pos.x && clickedPos.x < pos.x + width && clickedPos.y > pos.y && clickedPos.y < pos.y + height) {
            res = idx + 1
        }
    });
    return res
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx - 1].isDrag = isDrag
}

function setLineResize(isResize) {
    gMeme.lines[gMeme.selectedLineIdx - 1].isResize = isResize
}

function isCircleClicked(clickedPos) {
    const { x, y } = gMeme.lines[gMeme.selectedLineIdx - 1].centerArc
    const distance = Math.sqrt((x - clickedPos.x) ** 2 + (y - clickedPos.y) ** 2)
    return distance <= 10
}