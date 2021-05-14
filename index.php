<?php

?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link href="https://fonts.googleapis.com/css2?family=Bungee+Inrect&family=Poppins&family=Roboto+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>


<body>

    <div id="modal-start" class="flex column acenter jcenter">
        <div id="modal-start-content" class="flex column acenter jcenter">

            <form action="words.php" method="POST" class="flex column acenter jcenter" id="choix-categorie">
                <h3>Choisissez une catégorie</h3>
                <select name="categorie" id="categorie-list">
                    <option value="informatique">Informatique</option>
                    <option value="nourriture">Nourriture</option>
                </select>
                <input type="submit" value="Jouer" id="jouer">
            </form>

        </div>
    </div>

    <section class="column">
        <h1 class="center">JEU DU PENDU</h1>

        <h2 id="lives" class="center"></h2>

        <div id="word"></div>

        <svg id="canvas">
            <line id="xBase" x1="47" y1="330" x2="222" y2="330"></line>
            <line id="yBase" x1="75" y1="25" x2="75" y2="320"></line>
            <line id="top-rect" x1="25" y1="49" x2="252" y2="49"></line>
            <line id="rope" x1="238" y1="57" x2="238" y2="97"></line>
            <ellipse id="head" cx="238" cy="115" rx="20" ry="19"></ellipse>
            <line id="upper-body" x1="233" y1="133" x2="231" y2="196"></line>
            <line id="left-arm" x1="230" y1="133" x2="212" y2="197"></line>
            <line id="right-arm" x1="236" y1="134" x2="247" y2="196"></line>
            <line id="left-leg" x1="229" y1="194" x2="221" y2="291"></line>
            <line id="right-leg" x1="233" y1="195" x2="242" y2="280"></line>
        </svg>

        <div>
            <label id="time"> Temps restant : 60s</label>
            <a id="categorie" class="btn">Catégorie</a>
            <a id="new-word" class="btn">Nouveau mot</a>
            <a id="classement" class="btn">Classement</a>
            <div class="flex column cat">
                <a id="informatique">Informatique</a>
                <a id="Nourriture">Nourriture</a>
            </div>
        </div>


        <div id="letters" class="flex"></div>

        <span id="score"></span>

        <div id="modal" class="flex">
            <div class="column">
                <p id="statut1"></p>
                <p id="statut2"></p>
                <form action="leaderboard.php" method="POST" id="leaderboard">
                    <input type="text" name="pseudo" id="pseudo">
                    <input type="submit" value="Sauvegarder" class="btn ok"> 
                    <a class="btn no" id="no">Non merci</a>
                </form>

            </div>
        </div>

        <div id="modal2" class="flex">
            <div class="column">
                <p id="lStatut1"></p>
                <p id="lStatut2"></p>
            <a class="btn ok" id="lose-close">OK</a>

            </div>
        </div>

        <div id="style"></div>

    </section>

    <table>

    </table>
    <script src="js/main.js" type="module"></script>
</body>

</html>