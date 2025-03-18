let language;
let french;
let english;

window.addEventListener("load", (event) => {
    setLanguage();
    fetch("french.txt")
    .then(response => response.text())
    .then(text => {
        french = new Set(removeAccents(text).toLowerCase().split(/\r?\n/).filter(string => (string.length > 2 ? string : null)));
        //console.log('french:')
        //console.log(french);
        wordsCount();
    })
    .catch(error => console.error(error));
});

function wordsCount(checking = false) {
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
    setState(lettersInput, letters, words.length, checking);
};

function removeAccents(text) {
    return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

function setState(lettersInput, letters, availableWords, checking) {
    let win = document.getElementById('win');
    let lost = document.getElementById('lost');
    let not = document.getElementById('not');
    win.classList.add('hidden');
    lost.classList.add('hidden');
    not.classList.add('hidden');
    if (availableWords === 0) {
        lettersInput.setAttribute('aria-invalid',"true");
        lost.classList.remove('hidden');
    } else if (availableWords === 1 || checking) {
        if (french.has(letters)) {
            lettersInput.setAttribute('aria-invalid',"false");
            win.classList.remove('hidden');
        } else if (checking) {
            not.classList.remove('hidden');
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
        document.getElementById('not').innerText = "Pas un mot! Cherche encore.";
        document.getElementById('sentence').innerText = 'Nombre de mots possible: ';
        document.getElementById(key).innerText = "EN";
        document.getElementById('check').innerText = "Vérifier";
    } else {
        document.title = 'Guess Word Game Helper';
        document.getElementById('win').innerText = "You won!";
        document.getElementById('lost').innerText = "You lost!";
        document.getElementById('not').innerText = "Not a word! Keep looking";
        document.getElementById('sentence').innerText = 'Number of words possible: ';
        document.getElementById(key).innerText = "EN";
        document.getElementById('check').innerText = "Check";
    };
    document.getElementById('title').innerText = document.title;
    
};

function toggleLanguage() {
    console.log('toggleLanguage clicked');
    localStorage.setItem('language', language === "fr" ? "en" : "fr");
    setLanguage();
    wordsCount();
}
