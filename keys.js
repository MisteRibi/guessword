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
    board += `<button id="deleteall" onclick="sendKey('deleteall');"></button>`;
    document.getElementById('keys').innerHTML = board;
};

function sendKey(key) {
    let lettersInput = document.getElementById('word');
    if (key === 'delete') lettersInput.value = lettersInput.value.substring(0, lettersInput.value.length - 1);
    else if (key === 'deleteall') lettersInput.value = "";
    else lettersInput.value = lettersInput.value + key;
    lettersInput.dispatchEvent(new KeyboardEvent('keyup'));
};

