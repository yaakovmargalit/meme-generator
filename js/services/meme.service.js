var gKeywords = {
    'happy': 12,
    'funny puk': 1
}

var gImgs = [{
        id: 1,
        url: 'img/1.jpg',
        keywords: ['happy']
    },
    {
        id: 2,
        url: 'img/2.jpg',
        keywords: ['happy']
    },
    {
        id: 3,
        url: 'img/3.jpg',
        keywords: ['happy']
    },
    {
        id: 4,
        url: 'img/4.jpg',
        keywords: ['happy']
    },
    {
        id: 5,
        url: 'img/5.jpg',
        keywords: ['happy']
    },
    {
        id: 6,
        url: 'img/6.jpg',
        keywords: ['happy']
    },
    {
        id: 7,
        url: 'img/7.jpg',
        keywords: ['happy']
    },
    {
        id: 8,
        url: 'img/8.jpg',
        keywords: ['happy']
    },
    {
        id: 9,
        url: 'img/9.jpg',
        keywords: ['happy']
    },
    {
        id: 10,
        url: 'img/10.jpg',
        keywords: ['happy']
    },
    {
        id: 11,
        url: 'img/11.jpg',
        keywords: ['happy']
    },
    {
        id: 12,
        url: 'img/12.jpg',
        keywords: ['happy']
    },
    {
        id: 13,
        url: 'img/13.jpg',
        keywords: ['happy']
    },
    {
        id: 14,
        url: 'img/14.jpg',
        keywords: ['happy']
    },
    {
        id: 15,
        url: 'img/15.jpg',
        keywords: ['happy']
    },
    {
        id: 16,
        url: 'img/16.jpg',
        keywords: ['happy']
    },
    {
        id: 17,
        url: 'img/1.jpg',
        keywords: ['happy']
    },
];

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 1,
    lines: [{
        type: 'txt',
        txt: 'Text...',
        size: 40,
        align: 'center',
        color: '#fff',
        stroke: '#000',
        pos: {
            x: 10,
            y: 1
        },
        width: 390,
        height: 50,
        isDrag: false
    }]
}



function getImgSrc(id) {
    return gImgs.find(img => img.id === +id).url
}