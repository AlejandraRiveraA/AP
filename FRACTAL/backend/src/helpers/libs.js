const helpers = {};

helpers.randomNumber = () => {
    const possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var random = 0;
    for (let i = 0; i < 7; i++) {
        random += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return random;
};

module.exports = helpers;