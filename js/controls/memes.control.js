renderMemes()

function renderMemes() {
    var memes = gMyMemes.map(meme => {
        return `<img src="${meme}"/>`
    });
    console.log(document.querySelector('.memes-grid'))
    document.querySelector('.memes-grid').innerHTML = memes.join('')
}

function goMemes() {
    document.querySelector('.meme-editor').style.display = 'none'
    document.querySelector('.gallery').style.display = 'none'
    document.querySelector('.memes').style.display = 'flex'
    document.querySelector('.gallery-item').classList.remove('activ')
    document.querySelector('.meme-item').classList.add('activ')
}