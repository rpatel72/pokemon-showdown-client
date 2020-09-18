var _randomStringChars = 'abcdefghijklmnopqrstuvwxyz012345';

export function number (max) {
    return Math.floor(Math.random() * max);
}

export function randomBytes(length) {
    var bytes = new Array(length);
    for (var i = 0; i < length; i++) {
      bytes[i] = Math.floor(Math.random() * 256);
    }
    return bytes;
};

export function string (length) {
    var max = _randomStringChars.length;
    var bytes = randomBytes(length);
    var ret = [];
    for (var i = 0; i < length; i++) {
      ret.push(_randomStringChars.substr(bytes[i] % max, 1));
    }
    return ret.join('');
}

export function numberString (max) {
    var t = ('' + (max - 1)).length;
    var p = new Array(t + 1).join('0');
    return (p + number(max)).slice(-t);
}

