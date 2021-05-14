import Pendu from "./Pendu.js";

const lettersContainer = document.querySelector("#letters");
const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
const koreanAlphabet = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ", "아", "애", "야", "얘", "어", "에", "여", "예", "오", "와", "왜", "외", "요", "우", "워", "웨", "위", "유", "으", "의", "이"];
const russianAlphabet = ["a", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м", "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ", "ы", "ь", "э", "ю", "я"];
const wordContainer = document.querySelector("#word");
const words = ["Maladroit", "Canneberge", "Abeilles", "Thermostat", "Distiller", "Princesse", "Castor", "Fraise", "Cartographie", "Noël", "Garde-manger", "Arc-en-ciel", "Porte-clés", "Français", "Pastèque", "Plage", "Moustache", "Cuisine", "Citrouille", "Girafe", "Feuilles", "Hiver", "Magasin", "Spaghetti", "Autruche", "Hamster", "Zèbre", "Hippopotame", "Mandarine", "Champignons", "Taxi", "Périscope", "Singulier", "Faux", "Pain", "Jury"];
const drawElements = document.querySelectorAll("#canvas *");



document.querySelector("#categorie").addEventListener("click", function(){
    document.querySelector(".cat").classList.toggle("activef");
})

/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */

document.querySelector("#choix-categorie").addEventListener("submit", e =>{

    e.preventDefault();

    let categorie = document.querySelector("#categorie-list").value;

    fetch("words.php" ,{
        method: "POST",
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            categorie
        }),
    })

    .then((res) => res.json())

    .then(data =>{

        let wordArray = [];

        for(let i in data){
            wordArray.push(data[i].word)
        }

        document.querySelector("#modal-start").style.display="none"

        /* Countdown */
        let timer = 60;

            let countDown = setInterval(function(){
                if(pendu.gameOver === true){
                    arreteToi();
                }
                    timer--;
                    document.querySelector("#time").innerHTML = "Temps restant : " + timer + "s";
                    if(timer <= 0){
                        gameOver();
                        arreteToi();
                    }
    
                }, 1000);

        function arreteToi(){
            clearInterval(countDown);
        }

        /* Creation du pendu */
        const pendu = new Pendu(alphabet, lettersContainer, wordContainer, wordArray);
        loadWord();
        pendu.createBlocks();
        pendu.putWord();

        const lettersBlocks = lettersContainer.querySelectorAll("div");
        let lettersOfWord = wordContainer.querySelectorAll("span");
        loadState();
        newWord();

        /* Affichage */
        document.querySelector("#lives").innerHTML = "Il vous reste : " + pendu.lives + " vies";
        document.querySelector("#score").innerHTML = (localStorage.getItem("score") > 0) ? "Mots trouvés : " + localStorage.getItem("score") : "Mots trouvés : 0"



        /* Evènement au click sur les lettres */
        for (let letter of lettersBlocks) {
            letter.addEventListener("click", function () {

                if (!pendu.gameOver && this.className !== "red") {

                    /* Si on a trouvé une lettre */
                    if (pendu.putClickedLetter(this.innerHTML) === true) {
                        this.classList.add("green");
                        let missingLetter = pendu.countMissing();

                        /* S'il ne reste plus aucune lettre à trouvé, c'est gagné! */
                        if (missingLetter === 0) {
                            let score = localStorage.getItem("score");
                            localStorage.setItem("score", ++score);
                            document.querySelector("#score").innerHTML = "Mots trouvés : " + localStorage.getItem("score");
                            document.querySelector("#modal").style.display = "flex";
                            document.querySelector("#statut1").innerHTML = "Bravo, vous avez trouvé le mot!";
                            document.querySelector("#statut2").innerHTML = "Entrez un pseudo pour enregistrer votre score!";
                            pendu.gameOver = true;
                        }
                        else {
                            console.log("Il vous reste " + missingLetter + " lettres à trouver !");
                        }
                    }
                    /* Sinon (si on n'a pas trouvé de lettre), on dessine la partie du pendu correspondante */
                    else {
                        this.classList.add("red");
                        document.querySelector("#lives").innerHTML = "Il vous reste : " + pendu.lives + " vies";
                        let myStyle = document.createElement("style");
                        document.querySelector("#style").appendChild(myStyle);
                        /* Un peu de maths -> (vie de base - vie actuel - 1) nous donne l'index de l'élément du canvas à ciblé */
                        let actualDraw = drawElements[pendu.maxLives - pendu.lives - 1];
                        myStyle.innerHTML = "#" + actualDraw.id + "{animation: move 2s forwards;}";
                    }

                    /* Si le joueur n'a pas réussi à trouver le mot, on révèle les lettres manquantes en rouge */
                    if (pendu.gameOver && pendu.lives === 0 && pendu.countMissing() > 0) {
                        gameOver();
                    }
                    saveState();
                }
            })
        }

        document.querySelector("#no").addEventListener("click", function () {
            document.querySelector("#modal").style.display = "none";
            document.querySelector("#statut1").innerHTML = "";
            document.querySelector("#statut2").innerHTML = "";
            saveState();
        })

        document.querySelector("#lose-close").addEventListener("click", function () {
            document.querySelector("#modal2").style.display = "none";
            document.querySelector("#lStatut1").innerHTML = "";
            document.querySelector("#lStatut2").innerHTML = "";
            saveState();
        })

        document.querySelector("#new-word").addEventListener("click", function () {
            newWord();
        })

        function newWord(){
            timer = 60;
            pendu.newRandomWord();
            lettersOfWord = wordContainer.querySelectorAll("span");
            document.querySelector("#lives").innerHTML = "Il vous reste : " + pendu.lives + " vies";
            lettersBlocks.forEach(element => element.classList.remove("red", "green"))
            document.querySelector("#style").querySelectorAll("*").forEach(element => element.remove());
            pendu.gameOver = false;
            saveState();
        }

        function gameOver(){
            pendu.lives = 0;
            pendu.gameOver = true;
            for (let i = 0; i < pendu.word.length; i++) {
                if (lettersOfWord[i].innerHTML === "_") {
                    lettersOfWord[i].style.color = "red";
                    lettersOfWord[i].innerHTML = pendu.word[i];
                    setTimeout(() => {
                        document.querySelector("#modal2").style.display = "flex";
                        document.querySelector("#lStatut1").innerHTML = "Echec! Vous avez perdu...";
                        document.querySelector("#lStatut2").innerHTML = "Ne vous laissez pas aller et réessayez!";
                    }, 500);
                }

            }
        }






        /* ------------------------- SYSTEME DE LEADERBOARD ------------------------*/

        /* Lorsque le joueur veut enregistrer son score dans le classement */
        document.querySelector("#leaderboard").addEventListener("submit", e =>{
            e.preventDefault();

            /* On masque la modal et on appel la fonction addPlayer() */
            document.querySelector("#modal").style.display = "none";
            document.querySelector("#statut1").innerHTML = "";
            document.querySelector("#statut2").innerHTML = "";
            saveState();
            addPlayer(document.querySelector("#pseudo").value, (timer*20) + (pendu.lives * 100));

        })


        /* Fonction qui va ajouer un joueur au leaderboard */
        function addPlayer(pseudo, score){
            fetch("leaderboard.php" ,{
                method: "POST",
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    pseudo,
                    score
                }),
            })

            .then(response => response.text())
            .catch(error => console.log(error));
        }


        /* Affiche le leaderboard */
        document.querySelector("#classement").addEventListener("click", function(){
            fetch("classement.php")
            .then((res) => res.json())
            .then((response) => {
                let tableau = "";
                for(let i in response){
                    tableau += `
                    <tr>
                    <th>Pseudo</th>
                    <th>Score</th>
                    </tr>
                    <tr>
                        <td>${response[i].pseudo}</td>
                        <td>${response[i].score}</td>
                    </tr>`;
                }
                document.querySelector("table").innerHTML = tableau;
                document.querySelector("table").classList.toggle("active-t");
            }).catch(error => console.log(error));
        })

        /* ------------------------- END ------------------------*/


        /* Local Storage*/
        /* Fonction qui va sauvegarder tout l'etat du jeu */
        function saveState() {

            /* Les lettres du mot à deviner */
            let saveLetters = [];
            for (let i = 0; i < lettersOfWord.length; i++) {
                saveLetters.push(lettersOfWord[i].innerHTML);
            }

            localStorage.setItem("letters", JSON.stringify(saveLetters));

            /* Le mot */
            localStorage.setItem("word", JSON.stringify(pendu.word));

            /* Les vies */
            localStorage.setItem("lives", pendu.lives);

            /* L'état des lettres du clavier */
            let keyboardState = [];
            for (let letter of lettersBlocks) {
                keyboardState.push(letter.className);
            }

            localStorage.setItem("keyboardState", JSON.stringify(keyboardState));
        }



        /* Fonction qui va charger l'etat du jeu en recuperant les valeurs du local storage */
        function loadState() {
            /* Chargement des lettres déjà trouvées */
            if (localStorage.getItem("letters") !== null) {
                let letterState = JSON.parse(localStorage.getItem("letters"));
                letterState = String(letterState);
                letterState = letterState.split(",");
                for (let i = 0; i < lettersOfWord.length; i++) {
                    lettersOfWord[i].innerHTML = letterState[i];
                }
            }

            /* Chargement du nombre de vie */
            if (localStorage.getItem("lives") !== null) {
                pendu.lives = localStorage.getItem("lives");
            }


            /* Chargement du statut de la partie */
            pendu.gameOver = (pendu.countMissing() > 0 && pendu.lives > 0) ? false : true;

            /* Chargement de l'état des lettres déjà cliquées */
            if (localStorage.getItem("keyboardState") !== null) {
                let keyboardState = JSON.parse(localStorage.getItem("keyboardState"))
                keyboardState = String(keyboardState);
                keyboardState = keyboardState.split(",");
                for (let i = 0; i < lettersBlocks.length; i++) {
                    lettersBlocks[i].className = keyboardState[i];
                }
            }


            /* Desinner le pendu en fonction du nombre de vies */
            for (let i = 0; i < (pendu.maxLives - pendu.lives); i++) {
                let myStyle = document.createElement("style");
                document.querySelector("#style").appendChild(myStyle);
                myStyle.innerHTML = "#" + drawElements[i].id + "{animation: move 2s forwards;}";
            }
        }

        function loadWord() {
            /* Affectation du mot sauvegardé dans le storage, dans le pendu */
            if (localStorage.getItem("word") !== null) {
                pendu.word = String(localStorage.getItem("word")).replace(/[\[\]\"\,]/g, "")
            }
        }

    }).catch(error => console.log(error));
})







