/* Pour être créé, le pendu a besoin: 
_ d'un alphabet,
_ d'un conteneur pour y mettre un nombre de lettres dépendant de l'alphabet,
_ d'un autre conteneur pour y placer un nombre de trou ("_") en fonction de la longueur du mot selectionné , 
_ et enfin une liste de mots */


export default class Pendu {
    constructor(alphabet, lettersBlocks, wordContainer, words) {
        this.alphabet = alphabet;
        this.lettersBlocks = lettersBlocks;
        this.wordContainer = wordContainer;
        this.words = words;
        this.word = this.words[Math.floor(Math.random() * words.length)];
        this.maxLives = 10;
        this.lives = 10;
        this.gameOver = false;
    }

    /* Creation des lettres au sein du document */
    createBlocks(){
        /* les blocs -> */
        for (let i = 0; i < this.alphabet.length; i++){
            let block = document.createElement("div");
            this.lettersBlocks.appendChild(block);
        }
        /* les lettres au sein des blocs -> */
        for (let i = 0; i < this.alphabet.length; i++) {
            document.querySelectorAll("#letters div")[i].innerHTML = this.alphabet[i];
        }
    }

    /*  */
    putWord(){
        for(let letter of this.word){
            let letterOfWord = document.createElement("span");
            letterOfWord.innerHTML = (letter === "-") ? "-" : "_";
            document.querySelector("#word").appendChild(letterOfWord);
            letterOfWord.classList.add("letter");
        }
    }

    putClickedLetter(clickedLetter){
        let lettersOfWord = document.querySelectorAll(".letter");
        let letterFound;
        for(let i = 0; i < this.word.length; i++){
            /* Pour les accents, on converti la lettre en format neutre grâce au combo normalize() + regex :
            -> normalize() sépare les signes diacritique des caractères et replace u0300 u036f va remplacer tous les signes diacritique par du vide.
            -> On peut ensuite effectuer une comparaison */
            let char = this.word[i].normalize("NFD").replace(/[\u0300-\u036f]/g, "");
            if(clickedLetter.toLowerCase() === char.toLowerCase()){
                lettersOfWord[i].innerHTML = this.word[i];
                letterFound = true;
            }
        }
        if(letterFound){
            return true;
        }
        else{
            this.lives--
            this.gameOver = (this.lives === 0) ? true : false;
            return false;
        }
    }

    countMissing(){
        let lettersOfWord = document.querySelectorAll(".letter");
        let missingLetter = 0;
        for(let letter of lettersOfWord){
            if(letter.innerHTML === "_"){
                missingLetter++;
            }
        }
        return missingLetter;
    }

    newRandomWord(){
        this.lives = this.maxLives
        this.word = this.words[Math.floor(Math.random() * this.words.length)].split("");
        this.wordContainer.querySelectorAll("*").forEach(element => element.remove());
        this.putWord();
    }
}


