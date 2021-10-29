'use strict';

function makeId(length = 9) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWYXTabcdefghijklmnopqrstuvwxyt0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}