renderMemes()

function renderMemes() {
    console.log(gMyMemes)
    if (gMyMemes.length) {
        var memes = gMyMemes.map(meme => {
            // console.log(meme.meme)
            return `<img src="${meme.src}" onclick="editMeme('${meme.meme.id}')"/>`
        });
        console.log(document.querySelector('.memes-grid'))
        document.querySelector('.memes-grid').innerHTML = memes.join('')
    }
}

function goMemes() {
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.memes').style.display = 'flex'
    document.querySelector('.gallery-item').classList.remove('activ')
    document.querySelector('.meme-item').classList.add('activ')
}

function editMeme(id) {
    console.log(id)
    gMeme = getMeme(id)
    document.querySelector('.memes').style.display = 'none'
    createMeme(gMeme.selectedImgId)
}

function getMeme(id) {
    return gMyMemes.find(meme => meme.meme.id === id).meme
}