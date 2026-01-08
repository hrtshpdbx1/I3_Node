// ! 1) Importer express + Créer le serveur
const express = require('express'); //import de la lib express
const server = express(); //création du serveur express

// ? Récupération des variables d'environnement :
const { PORT } = process.env;

// ? Pour paramétrer le fait que notre API doit comprendre quand du json arrive
server.use(express.json());

// ! 2) Traiter les requêtes
// indiquer à notre app que le routing se trouve dans le dossier 📁 routes
const router = require('./routes') //import de l'objet routeur présent dans index.js
server.use('/api', router); //indiquer à notre server qu'il doit utiliser le router


// ! 3) Écouter le serveur sur un port spécifique
server.listen(PORT, () => {
    console.log(`🚀 Express Server started on port ${ PORT }`);
})