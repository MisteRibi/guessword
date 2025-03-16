window.addEventListener("load", (event) => {
    createKeys();
});

function createKeys() {
    const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];
    console.log('alphabet: ');
    console.log(alphabet);
    let board = "";
    alphabet.forEach((letter, index) => {
        board += `<button id="${letter}" onclick="sendKey('${letter}');">${letter}</button>`;
    });
    board += `<button id="delete" onclick="sendKey('delete');"></button>`;
    document.getElementById('keys').innerHTML = board;
};

function sendKey(key) {
    let lettersInput = document.getElementById('word');
    if (key === 'delete') lettersInput.value = lettersInput.value.substring(0, lettersInput.value.length - 1);
    else lettersInput.value = lettersInput.value + key;
    lettersInput.dispatchEvent(new KeyboardEvent('keyup'));
};