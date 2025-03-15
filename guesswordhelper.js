let language;
let french;
let english;

window.addEventListener("load", (event) => {
    setLanguage();
    fetch("french.txt")
    .then(response => response.text())
    .then(text => {
        french = new Set(removeAccents(text).toLowerCase().split(/\r?\n/));
        //console.log('french:')
        //console.log(french);
        wordsCount();
    })
    .catch(error => console.error(error));
});

function wordsCount() {
    //console.log('length: '+french.length())
    let possible = document.getElementById("words");
    let lettersInput = document.getElementById('word');
    lettersInput.removeAttribute('aria-invalid');
    let letters = lettersInput.value.toLowerCase();
    let words = [...french].filter(word => word.startsWith(letters));
    console.log("test");
    console.log(words.length);
    console.log(words);
    possible.removeAttribute('aria-busy');
    possible.innerText = new Intl
        .NumberFormat(language)
        .format(words.length);
    setState(lettersInput, letters, words.length);
};

function removeAccents(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function setState(lettersInput, letters, availableWords) {
    let win = document.getElementById('win');
    let lost = document.getElementById('lost');
    win.classList.add('hidden');
    lost.classList.add('hidden');
    if (availableWords === 0) {
        lettersInput.setAttribute('aria-invalid',"true");
        lost.classList.remove('hidden');
    } else if (availableWords === 1) {
        if (french.has(letters)) {
            lettersInput.setAttribute('aria-invalid',"false");
            win.classList.remove('hidden');
        };
    };
};

function setLanguage() {
    const key = 'language';
    language = localStorage.getItem(key) ? localStorage.getItem(key) : navigator.language;
    document.getElementsByTagName('html')[0].setAttribute('lang',language);
    if (language == 'fr') {
        document.title = 'Assistant du jeu "Devine le mot"';
        document.getElementById('win').innerText = "Tu as gagné!";
        document.getElementById('lost').innerText = "Tu as perdu!";
        document.getElementById('sentence').innerText = 'Nombre de mots possible: ';
        document.getElementById(key).innerText = "EN";
    } else {
        document.title = 'Guess Word Game Helper';
        document.getElementById('win').innerText = "You won!";
        document.getElementById('lost').innerText = "You lost!";
        document.getElementById('sentence').innerText = 'Number of words possible: ';
        document.getElementById(key).innerText = "FR";
    };
    document.getElementById('title').innerText = document.title;
    
};

function toggleLanguage() {
    console.log('toggleLanguage clicked');
    localStorage.setItem('language', language === "fr" ? "en" : "fr");
    setLanguage();
}