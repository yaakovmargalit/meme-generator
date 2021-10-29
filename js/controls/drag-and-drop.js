var gStartPos


function addMouseListeners() {
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mouseup', onUp)
}


function onDown(ev) {
    const pos = getEvPos(ev)
        // console.log(pos)
    if (!isLineClicked(pos)) return
    setLineDrag(true)
    gStartPos = pos
    document.body.style.cursor = 'grabbing'
    console.log(pos)
}

function onMove(ev) {
    //  const circle = getCircle();
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
    return pos
}

function isLineClicked(clickedPos) {
    const { pos, width, height } = gMeme.lines[gMeme.selectedLineIdx - 1]
        // debugger
    console.log(pos, width, height)
    console.log(clickedPos)

    if (clickedPos.x > pos.x && clickedPos.x < clickedPos.x + width && clickedPos.y > pos.y && clickedPos.y < pos.y + height) {
        console.log(true)
        return true
    }
}


function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx - 1].isDrag = isDrag
}