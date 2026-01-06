const trainers = [
    { id : 1, firstname : 'Aude', lastname : 'Beurivé'},
    { id : 2, firstname : 'Aurélien', lastname : 'Strimelle'},
    { id : 3, firstname : 'Quentin', lastname : 'Geerts'}
]

//#region Création du serveur
// ! 1) Création du serveur
// ? 1) Import du module http
// On créé une constante dans laquelle on va stocker notre module importé
// Pour importer le module, en commonjs, on doit écrire require('nomDuModule')
//#endregion
const http = require('http');

// ? 2) Création du serveur
// On créé une constante dans laquelle on va stocker le serveur créé

const server = http.createServer((req, res) => {
    //#region Explication req et res
    //req est un objet contenant des infos sur la requête qui arrive dans notre serveur
    //res est un objet qui représente la réponse que va renvoyer notre serveur
    //#endregion

    const URL = req.url;
    const METHOD = req.method;

    //Dans le cas où on accède à localhost:8080 en get
    if (URL === '/' && METHOD === 'GET') {
        // On va mettre en place la réponse à renvoyer
        // On va envoyer un code pour indiquer que la requête est un succès
        res.writeHead(200); //200 = Ok (tout s'est bien passé)

        // On va mettre fin à la requête et envoyer du contenu (texte, html, json, fichier, ...)
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Formation - Accueil</title>
                <style>
                    h1 {
                        color : tomato;
                    }
                </style>
            </head>
            <body>
                <h1>Bienvenue à la formation Web Dev Full Stack de I3</h1>
                <h2>Nous sommes le ${new Date().toLocaleDateString('fr-BE')} </h2>
                <a href="/trainers">Cliquez ici pour découvrir la liste des formateurs</a>
            </body>
            </html>
        `);

    }
    else if(URL === '/trainers' && METHOD === 'GET'){
        res.writeHead(200);
        res.end(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Formation - Liste Formateurs</title>
        </head>
        <body>
            <h1>Voici la liste des formateurs</h1>
            <a href="/">Cliquez ici pour revenir à la page d'accueil</a>

            <ul>
                <!-- utilisation d'un reducer pour transformer le tableau en une seule chaine de caractère contenant le html -->
                ${trainers.reduce((lesLi, trainer) => lesLi + `<li>${trainer.firstname} ${trainer.lastname}</li>` , '')}
            </ul>
        </body>
        </html>`)
    }
    else {
        res.writeHead(200);
        res.end(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Formation - Liste Formateurs</title>
            </head>
            <body>
                <h1>404 Not Found</h1>
                <h2>La page que vous recherchez n'est pas disponible</h2>
                <img src="https://static.vecteezy.com/system/resources/thumbnails/024/405/934/small/icon-tech-error-404-icon-isolated-png.png" alt="404 not found">
            </body>
            </html>
        `)
    }
});


//#region Écoute du serveur
// ! 2) Écouter le serveur -> Le rendre disponible sur un port spécifique de notre machine
// server.listen(PORT, fonction )
// PORT -> PORT en local sur votre machine sur lequel sera le serveur
// fonction -> La fonction exécutée quand le serveur démarre
//#endregion
server.listen(8080 || 3000, () => {
    console.log('Server started on Port 8080 !');
});