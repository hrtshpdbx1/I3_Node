<details>
<summary>Sommaire</summary>

[[_TOC_]]

</details>

# 🔌 Web API avec Express 🔌
<hr>

Une API est un serveur Web qui va recevoir une **requête**, la traiter, potentiellement se "connecter" à des données et renvoyer une **réponse** qui possèdera un statut (HttpCode) et potentiellement des données renvoyées (json ou XML).

<div align="center">
<img width="350px" src="./documentation/req_res_api.png" />
</div>

## Les API
<hr>

### ⚙️ Fonctionnement d'une API
#### Les requêtes

Les requêtes sont envoyées via HTTP et possèdent plusieurs informations qui vont permettre au serveur de comprendre la demande.

* ⚙️ **Verbe** (Verb) : Méthode de la requête. Indique l'action qu'on veut réaliser.
    * <span style="color:#33B265">**GET**</span> : Récupérer quelque chose
    * <span style="color:#33B265">**POST**</span> : Envoyer quelque chose
    * <span style="color:#33B265">**PUT**</span> : Modification totale de quelque chose
    * <span style="color:#33B265">**PATCH**</span> : Modification partielle de quelque chose
    * <span style="color:#33B265">**DELETE**</span> : Suppression de quelque chose

* 🔗 **Url** : Sur quoi et comment on veut faire notre requête. Elle peut contenir plusieurs éléments
    * Une partie **statique** - Le QUOI : \
    ex : http://localhost:3000/api/produits 
    * Des **paramètres** (partie dynamique) - Le QUOI plus précis _(optionnel)_ :\
    ex : http://localhost:3000/api/produits/42
    * Une **query** - Le COMMENT _(optionnel)_ : \
    Permet de mettre en place des filtres\
    ex : http://localhost:3000/api/produits?category=bricolage&lowPrice=0&highPrice=15

* 📦 **Body** (Corps de la requête) _(optionnel)_ : Représente ce qu'on doit envoyer avec la requête (json, formData, XML)

* 🧾 **Headers** (Entête de la requête) : On en reparlera plus tard mais pour faire court, il s'agit d'informations à propos de la requête

<br>

> [!Note]
> Certaines choses seront utilisées avec certains verbes particuliers
>
> → 🔗 GET http://localhost:3000/api/produits \
> <ins>Contient :</ins> Verb + url statique\
> <ins>Action :</ins> Récupérer tous les produits
>
> → 🔗 GET http://localhost:3000/api/produits/42 \
> <ins>Contient :</ins> Verb + url statique + params\
> <ins>Action :</ins> Récupérer le produit dont l'id est 42
> 
> → 🔗 GET http://localhost:3000/api/produits?offset=10&limit=30 \
> <ins>Contient :</ins> Verb + url statique + query\
> <ins>Action :</ins> Récupérer les produits en partant du 10ème et en sélectionnant les 30 prochains (query de pagination)
>
> → 🔗 POST http://localhost:3000/api/produits \
> → 📦 body : { "name" : "Patat", "price" : 4.23 }\
> <ins>Contient :</ins> Verb + url statique + body\
> <ins>Action :</ins> Ajouter un nouveau produit avec les infos présentent dans le body
>
> → 🔗 PUT/PATCH http://localhost:3000/api/produits/42 \
> → 📦 body : { "name" : "Patate", "price" : 4.23 }\
> <ins>Contient :</ins> Verb + url statique + params + body\
> <ins>Action :</ins> Modifier globalement ou partiellement le produit dont l'id est 42
>
> → 🔗 DELETE http://localhost:3000/api/produits/42 \
> <ins>Contient :</ins> Verb + url statique + params\
> <ins>Action :</ins> Supprimer le produit dont l'id est 42

#### Les réponses

L'API va toujours renvoyer une réponse qui sera composée de :
* 🚦 **Statut** (statusCode, HTTPCode) : un code qui permet de savoir comment s'est passé la requête
    * **2XX** : les codes de **succès** 
    * **3XX** : indiquer une redirection
    * **4XX** : indiquer qu'une **erreur** connue de l'API est survenue
    * **5XX** : indiquer une **erreur** de serveur (serveur ne répond pas, db cassée)
* 📃 **Données** _(optionnel)_ : Certaines requêtes, notamment les GET vont nous renvoyer du json (ou XML, fichiers...)

### 📏 Principes d'API REST
<hr>

Une API REST(Ful) REpresentational State Transfert doit respecter les **principes** suivants :

* 💾 **Stateless** (Sans état) : L'API ne **sauvegarde aucune** donnée/état utilisateur. Si besoin d'identifier qui fait la requête, cette information devra être transmise dans la requête (query, headers, cookies)

* 📄 **Interface Uniforme** : L'API doit utiliser des modèles de données uniformes et cohérents en entrée et en sortie et utiliser les bons Verb.

* 🔗 **Ressources** : Les données sont vues comme des ressources et les url doivent être parlantes.

* 📚 **Couche & Cache** : L'API devrait idéalement être séparée en plusieurs couches logiques (**architecture**). Les requêtes devraient idéalement être mises en cache.

## Initialiser un projet Node
<hr>

### Télécharger Node
[Télécharger la dernière version LTS de Node](https://nodejs.org/fr) (dernière version stable) pour avoir accès à Node et son gestionnaire de package npm.

### Initialiser un dossier comme étant un projet Node
```
npm init
```
Tout un tas de questions vous sont posées pour configurer le projet. Si appuyez sur Enter c'est la valeur par défaut renseignée entre () qui sera prise. Le seul truc que je modifie c'est le fichier de point d'entrée (entry point) que je renomme app.js.

> Un fichier **package.json** est alors créé, il contient les commandes pour lancer le projet, les tests... dans un objet appelé **scripts** mais aussi, les dépendances du projet qui se trouveront dans un objet appelé **dependencies**. (Les dépendances sont une liste de librairies js dont notre projet a besoin pour fonctionner)

> [!WARNING]
> ⚠️ Il faudra penser à avoir un gitignore en règle. Vous pouvez le faire à la main mais attention à ne rien oublier ou [télécharger une extension VSC](https://marketplace.visualstudio.com/items?itemName=codezombiech.gitignore) qui permet de créer un fichier .gitignore en rapport avec un type de projet. Grâce à cette extension vous pourrez :
> * Appuyez sur F1 ou CTRL + MAJ + P pour ouvrir la barre des tâches
> * Dans la barre de recherche commencez à taper gitignore
> * Selectionnez Add gitignore
> * Une nouvelle barre de recherche apparait, commencez à taper Node
> * Selectionnez Node dans la liste
>
> 🎊 Tada ! Vous avez votre .gitignore

### Créer le fichier app.js

Créer un fichier à la racine du projet appelé app.js (index.js si vous avez laissé la valeur par défaut)\

Rajouter un script pour lancer le fichier app.js :
```json
 "scripts": {
    "start" : "node app.js",
  }
```

## Express

[Express](https://expressjs.com/) est une librairie JS qui permet de créer des web app et des API plus rapidement et facilement qu'en NodeJs pur.

Pour l'installer dans le projet, tapez dans la console :
```
npm i express
```
ou
```
npm install express
```

Express est maintenant installé dans le projet et vous pouvez voir une dépendance qui s'est rajoutée dans le fichier package.json

### Bonus : Récupérer un projet Node/Express sur Git

Quand vous allez récupérer un projet Node (Express, React, Angular, etc...), il faudra refaire un node_modules avec toutes les dépendances du projet.
Pour cela, rien de plus simple :
```
npm i
```

Aussi, vous n'aurez pas le fichier _.env_ puisqu'il n'est pas présent sur git. Il faudra donc le recréer de votre côté en suivant le _.env.example_.

### Création d'un serveur Web avec Express
Nous allons utiliser la librairie Express pour créer notre serveur. Pour se faire, dans le fichier app.js, écrire :

```js
const express = require('express'); //import d'express
const server = express(); //création du serveur express

// get sur localhost:3000
server.get('/', (req, res) => {

    res.send({ message : 'C\'est good'}, 200);
})

// get sur localhost:3000/products
server.get('/products', (req, res) => {

    res.send({ message : 'Voici tous les produits'}, 200);
})


// Écouter le serveur sur un port spécifique
server.listen(3000, () => {
    console.log(`🚀 Express Server started on port ${ 3000 }`);
})
```

### Restart automatique du serveur en cas de modification

Le point un peu chiant avec notre serveur actuel c'est qu'à chaque modification du code, on doit couper notre serveur et le relancer avec npm start. Ce serait super cool que le serveur se relance tout seul, à chaque fois qu'on sauvegarde.

#### Méthode 1 : Nodemon
[Nodemon](https://www.npmjs.com/package/nodemon) est une librairie js qui nous permet de refresh et redémarrer le serveur à chaque sauvegarde.
Pour l'installer :
```
npm i -D nodemon
```
-D est présent pour l'installer dans les dépendances de dev uniquement

Il faudra ensuite rajouter dans le fichier package.json un nouveau script :
```json
"scripts": {
    "start": "node app.js",
    "dev" : "nodemon app.js"
}
```

#### Méthode 2 : Watch natif de Node depuis la version 18+

Il suffit juste de rajouter un nouveau script dans le package.json :

```json
"scripts": {
    "start": "node app.js",
    "dev" : "node --watch app.js"
}
```
Pour lancer en mode dev, il faudra taper : 
```
npm run dev
```

### Les variables d'environnement
Ce sont des variables stockées sur votre machine. On y stocke des infos de connection ou propres à la machine etc.

Elles sont accessible en js dans un object process via sa propriété process.env
```js
console.log(process.env);
```

Pour créer des nouvelles variables d'environnement, on va créer un fichier **.env** dans lequel on va mettre nos variables d'environnement. Ces infos étant très souvent confidentielles, ce type de fichier est ignoré par notre gitignore.\
Comme il ne sera jamais mis sur Git, pour que les autres personnes sachent quelles variables ils doivent mettre en place chez eux et avec quel nom, on fait souvent un fichier **.env.example**.\
exemple d'un fichier _.env_ :
```
PORT=3000
DB_HOST=http://serveurDeSoup
DB_USER=Soup
DB_PASSWORD=Miaou1234?
```

Pour mettre les variables d'environnement présentes dans notre fichier .env dans les variables de la machine, deux solutions :
* Via la librairie [dotenv](https://www.npmjs.com/package/dotenv)
* Via une "nouvelle" fonctionnalité native de Node donc directement dans notre script dans le package.json :
    ```json
     "scripts": {
        "start": "node --env-file=.env app.js",
        "dev" : "node --watch --env-file=.env app.js",
        
  }
    ```

### Architecture de base du projet

<div align="center"> 
<img width="600px" src="./documentation/architecture_base.png" />
</div> 

Les requêtes arrivent dans l'application (_app.js_) et sont dispatchées vers les fichiers de routes (_dossier routes_). En fonction de l'url, du verbe et des potentiels paramètres de routes, on déclenchera la bonne fonction du controller de la ressource  (_dossier controllers_). Ces controllers se chargent de la logique API, ils vont appeler des services (_dossier services_) qui eux se chargent d'intéragir avec les données. Le controlleur va ensuite, en fonction du résultat obtenu, répondre avec le bon code à la requête.

\> demo_express\
|- 📁 controllers\
|- 📁 middlewares\
|- 📁 routes\
|- 📁 services\
|- app.js\
|- .env\
|- package.json

> 1) 📁 routes : définition de toutes les routes de notre API (verb + url statique + params)

> 2) 📁 controllers : définition de ce que renvoie l'api

> 3) 📁 services : logique d'accès aux données

> 4) 📁 middlewares : un middleware est une fonction qui va intercepter la requête (ou une erreur) afin d'y ajouter/consulter des informations et choisir de continuer la requête ou de l'arrêter. (Il en existe 3 types : router-lvl, app-lvl, error-handler)

### Définition des routes
#### Point d'entrée
On va commencer par créer le point d'entrée de toutes nos routes en créant un fichier **index.js** dans le dossier **routes**.

Dans ce fichier index.js :
```js
const router = require('express').Router();

router.get('/', (req, res) => {
    res.send("Bienvenue sur notre API de gestion de tâches", 200)
});

module.exports = router;
```

Dans le fichier app.js, on va indiquer que notre serveur Express doit utiliser ce routeur (après création server et avant listen) :
```js
const router = require("./routes");
server.use('/api', router);
```

#### Ajouter d'autres routes

Pour bien architecturer notre application, on va essayer de gérer les routes de chaque ressource individuellement. Pour cela, on va créer un routeur pour chaque type de ressources et faire le lien entre notre routeur d'entrée (index.js) et nos sous-routeurs.

Pour créer un sous-routeur, on crée un fichier nomRessource.router.js.\
exemple avec _task.router.js_ :
```js
const taskRouter = require('express').Router(); //création du sous-routeur task

// en get sur localhost:3000/api/tasks/
taskRouter.get('/', (req, res) => {
    res.send('Voici toutes les tâches', 200)
})

// :id segment dynamique
// en get sur localhost:3000/api/tasks/XX
taskRouter.get('/:id', (req, res) => {
    const id = req.params.id;
    res.send(`Voici la tâche numero ${id}`)
})

// en post sur localhost:3000/api/tasks/
taskRouter.post('/', (req, res) => {
    res.send('Tâche ajoutée avec succès', 200)
})

//export de notre routeur pour pouvoir l'importer depuis un autre fichier
module.exports = taskRouter;
```

Pour donner accès à ce sous-routeur depuis notre fichier principal _index.js_ :
```js
// import du task routeur 
const taskRouter = require('./task.router');

// permet d'indiquer que notre router de base doit utiliser, si l'url est localhost:3000/api/tasks, le task routeur pour la suite
router.use('/tasks', taskRouter)
```

> [!TIP]
> À ce stade, nous ne pouvons tester que nos routes en GET puisque le navigateur ne nous permet que de faire du GET. Pour pouvoir tester tous les verbes, nous aurons besoin de [logiciels de test d'API](#logiciels-test-api).

#### Autre façon d'écrire les routes

Une autre façon de ranger les routes, quand on a plusieurs fois la même url mais avec différents verbes c'est de partir de l'url et indiquer toutes les méthodes possibles sur cette url.

```js
taskRouter.route('/')
    .get((req, res) => { })
    .post((req, res) => { })

taskRouter.route('/:id')
    .get((req, res) => { })
    .put((req, res) => { })
    .patch((req, res) => { })
    .delete((req, res) => { })
```

### Les controlleurs
Les contrôleurs sont les endroits où on va gérer la requête (ce qui rentre req et ce qui sort res). En général, on fait un contrôleur par type de ressource.

On va donc créer un fichier nomRessource.controller.js.

Un contrôleur est un objet qui contiendra des fonctions.

_ex : task.controller.js :_
```js
//création de notre controller
const taskController = {
}

//on le rend importable en l'exportant
module.exports = taskController;
```

Chaque fonction représentera une action qu'on peut faire sur la ressource.
```js
const taskController = {

    getAll : (req, res) => {},

    getById : (req, res) => {},

    getByUser : (req, res) => {},

    insert : (req, res) => {},

    update : (req, res) => {},

    updateStatus : (req, res) => {},

    delete : (req, res) => {}

}
```

Il ne nous reste plus qu'à relier la route avec sa fonctionnalité.

_ex : task.router.js :_
```js
// importer le controleur qu'on vient de créer
const taskController = require('../controllers/task.controller');

// On relie ensuite chaque route à sa fonctionnalité
taskRouter.route('/')
    .get(taskController.getAll)
    .post(taskController.insert)

taskRouter.route('/:id')
    .get(taskController.getById)
    .put(taskController.update)
    .delete(taskController.delete)
    .patch(taskController.updateStatus)

taskRouter.get('/user/:name', taskController.getByUser)
```

Pour ne pas que notre requête soit infinie alors que nous n'avons pas encore de code dans notre contrôleur, nous pouvons mettre fin à la requête en envoyant un code **501** - _Not Implemented_ - qui signifie que la route existe bien mais que le code derrière n'a pas été implémenté (développé) par les dev.

```js
const taskController = {
    getAll : (req, res) => {
        res.sendStatus(501);
    }
}
```

> [!NOTE]
> Les DTOs - Data Transfert Object\
> Ce sont des réprésentations des objets tels qu'ils entrent et sortent de l'API. Parfois à l'insertion, l'objet n'est pas identique à celui en db donc on aura besoin d'un DTO d'entrée. Parfois, les objets renvoyés par l'API auront besoin d'avoir des données supprimées ou ajoutées, on fera donc un DTO pour ça. La gestion de ces DTO se fait souvent dans le contrôleur.

### Les services

C'est l'endroit où on va gérer **la logique d'accès aux données** propre à la recherche / création / modification / suppression de ces données. Nos contrôleurs vont appeler les bonnes méthodes dans les services appropriés. En général, on fait un service par type de ressource.

Dans un premier temps, on va travailler avec une **simulation** de base de données (fakeDB) avec de simples tableaux d'objets js. 

> [!WARNING]
> Nos tableaux ne seront pas sauvegardés et seront remis à 0 à chaque lancement du serveur donc à chaque modification du code.

> [!IMPORTANT]
> Plus tard, nous verrons comment [se connecter à une base de données](#connecter-son-api-avec-une-db).

> [!Note] 
> Certaines données devront être cryptées dans la base de données (c'est notamment le cas des mot de passe) pour qu'elles ne soient pas lisibles à l'oeil nu. [Nous le ferons dans les services](#hasher-des-données).

### Les middlewares
En français intergiciel, un middleware est une **fonction** dans laquelle nous avons accès à la **requête** (req), la **réponse** (res) et une fonction qui permet de **continuer** le processus de la requête (next).

Un middleware va donc nous permettre d'**intercepter** n'importe quelle requête afin d'y faire des vérifications / modifications et de déterminer si la requête peut continuer ou pas.

Écriture d'un middleware :\
_ex : log.middleware.js_
```js
    const logMiddleware = () => {
        return (req, res, next) => {
            //logique du middleware
        }
    }

    module.exports = logMiddleware;
```

Il existe plusieurs types de middleware :
* **Built-in** : Les middleware présents dans express ([static](https://expressjs.com/en/5x/api.html#express.static), [json](https://expressjs.com/en/5x/api.html#express.json) et [urlencoded](https://expressjs.com/en/5x/api.html#express.urlencoded))

* **Third-Party** : Les middleware qui viennent de librairies externes (ex : [multer](https://www.npmjs.com/package/multer) un middleware de gestion de fichiers envoyés en form-data)

* **Homemade** : Les middlewares qu'on fait nous même

Qu'on peut mettre à 3 endroits : 
* **Application** (App-Lvl Middleware) : Middleware qui sera activé à chaque requête\
_(ex : un middleware qui sera activé à chaque requête pour afficher des informations concernant la requête en console ou dans un fichier → c'est ce qu'on appelle un log)_\
    Dans le app.js :
    ```js
    server.use(nomDuMiddleWare());
    ```

* **Routes** (Router-Lvl Middleware) : Middleware qu'on va mettre sur certaines routes\
_(ex : un middleware qui va vérifier si la personne qui fait la requête a l'autorisation de la faire, middleware qui ne s'activera que sur les routes qu'on veut protéger)_\
    Dans le fichier de routes de notre choix :
    ```js
    nomRouter.route('/:id')
        .get(nomDuMiddleware(), fonctionDuController);
    ```

* **Erreur** (Error-Handler Middleware) : Middleware qui va permettre d'attaper toutes les erreurs qui n'ont été gérées par notre API\
_(ex : souvent dans le but d'en faire un fichier de log pour avoir des traces du plantage sans que l'app ne plante pour autant)_\
Dans le app.js, devra être mis en tout dernier, juste avant le listen().

>[!NOTE]
> Nous verrons plus tard comment utiliser et paramétrer [Multer](#gestion-des-fichiers)

>[!NOTE]
> Nous verrons plus tard comment créer notre middleware [d'Authentification](#rajouter-lauthentification-avec-jwt)

<hr>

## Logiciels test API

### Présentation
Pour pouvoir tester toutes nos routes d'API, nous avons plusieurs outils à dispositon :
* [Postman](https://www.postman.com/)
* [Insomnia](https://insomnia.rest/)
* [Thunder Client](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) - Extension VSC

### Créer un nouveau document de test avec Insomnia
Mon préféré étant Insomnia, c'est avec celui ci que je ferai la démo.

Sur la page d'accueil, cliquez ici pour ajouter un nouveau projet :
<div align="center">
<img width="600px" src="./documentation/insomnia1.png" />
</div>

Une fois le projet créé, sur la partie droite, créez un nouveau document :
<div align="center">
<img width="600px" src="./documentation/insomnia2.png" />
</div>

Dans le document, nous allons créer nos requêtes à tester : 
<div align="center">
<img width="90%" src="./documentation/insomnia3.png" />
</div>

* 1 - Liste des requêtes à tester. Idéalement, chaque requête sera dans une dossier représentant la ressource sur laquelle on teste.
* 2 - L'endroit pour changer la méthode et tester en GET, POST, PUT, PATCH, DELETE.
* 3 - L'endroit pour setup l'url de la requête avec les éventuels paramètres
* 4 - L'endroit pour configurer le body (ce qu'on veut envoyer lors d'un POST, PATCH ou PUT par ex)
* 5 - Le bouton pour envoyer la requête
* 6 - L'affichage de la réponse (code en haut et texte, json etc en dessous)

### Exporter et Importer un document

**Exporter** : 
<div align="center">
<img width="70%" src="./documentation/insomnia4.png" />
</div>

Choisissez ensuite les requêtes à exporter puis choisssez Insomnia comme type de document puis validez.

**Importer** :
<div align="center">
<img width="70%" src="./documentation/insomnia5.png" />
</div>

Sélectionnez votre fichier insomnia (ou postman), appuyez sur Scan et tada, votre collection se remplit.

\> [Revenir à la suite du cours Express - Les controlleurs](#les-controlleurs)

<hr>

## 💾 Connecter son API avec une DB

Pour connecter notre API à une base de données, nous allons utiliser un ORM (Object-Relational Mapping) ou ODM (Object-Document Mapping). Il s'agit d'un outil (généralement une librairie) où la connection est facilitée et les requêtes aussi. Cet outil nous permettra aussi très facilement de transformer nos objets js en model de donnée et inversement.

### Sequelize (Multi - SQL)
[Sequelize](https://sequelize.org/) est l'ORM le plus utilisé quand on fait du SQL. [TypeOrm](https://typeorm.io/) est son grand frère, prévu si on fait notre API en TypeScript.

### Mongoose (MongoDB - NoSQL)
[Mongoose](https://mongoosejs.com/) est l'ODM prévu pour travailler avec MongoDB.

### Installer mongoose
Il faudra taper dans la console : 
```
npm i mongoose
```
Tada c'est installé !

### Établir une connection
Nous allons faire la connection dans notre application donc dans le fichier app.js.
```js
// import mongoose
const mongoose = require("mongoose");
// utilisation middleware
server.use( async (req, res, next) => {
    try {
        // on va essayer de se connecter
        await mongoose.connect('pouet');
        console.log("💾 Successfully connected to the DB !");

        next(); //si on a réussi à se connecter à la DB, on continue la requête

    } catch(err){
        
        // si la connexion échoue, on va écrire le message d'erreur dans la console
        console.log(`❌ Connection Failed \n[Reason]\n ${err}`);

        res.status(500).json( { statusCode : 500 , message : 'Impossible de se connecter à la base de données'  } ); // on met fin à la requête
    
    }
})
```
Nous avons besoin, dans la méthode connect, de mettre l'url nous permettant de se connecter à notre serveur mongo (cluster). 
> [!IMPORTANT]
> Nous n'allons **JAMAIS** écrire notre url directement dans le fichier app.js sinon, vos données de connexion se retrouvent en free access sur git pour tout le monde.

Nous allons donc utiliser notre fichier de variables d'environnement.

Dans le fichier .env :
```
DB_CONNECTION="mongodb+srv://<UserName>:<Password>@<NomCluster>.mongodb.net/?appName=<NomCluster>"
```

Dans le app.js :
```js
// On récupère la variable d'environnement
const { PORT, DB_CONNECTION } = process.env;
// On l'utilise dans notre connexion
/* code pour la connexion */
        await mongoose.connect(DB_CONNECTION);
/* ... */

```

### Créer les modèles de données de notre DB
Pour cela, on va créer un dossier Models. Nous allons créer un Model pour chaque ressource présente dans notre base de données. Ce modèle nous permettra d'indiquer ce qui est attendu en DB et de déjà mettre quelques règles en place.

Pour créer un model, on créé un fichier _nomRessource.model.js_ :
```js
const { Schema, model } = require('mongoose');

// On créé un schema qui va décrire à quoi ressemble une categorie
// Schema( { description objet }, { options collection } )
const nomRessourceSchema = new Schema({}, {});

// On va créer un model à partir de ce schema
// Le premier paramètre et le nom du model, le deuxième, le schéma de ce model
const NomRessource = model('NomRessource', nomRessourceSchema);

// On exporet le model créé
module.exports = NomRessource;

```

Dans le schema :
* dans le premier objet, on dessine à quoi ressemble la ressource 
    ```js
    {
        nomAttribut1 : {
            type : String,
            required : true, /*obligatoire */
            unique : true, /*unique */
            trim : true /* pour enlever les espaces inutiles s'il y en a */
        },
        nomAttribut2 : {
            type : Boolean,
            required : true,
        },
        /* ... */
    }
    ```
* dans le deuxième objet, on fourni les informations sur la collection 
    ```js
    { 
        /* Nom de la collection dans Mongo */
        collection : 'NomCollection',
        /* Pour rajouter la date de création et dernière modif de la ressource */
        timestamp : true,
        /* ... */
    }
    ```

### Utiliser ces modèles dans nos services.
Maintenant que les modèles sont faits, nous avons accès à plusieurs méthodes pour effectuer des actions dans la DB.
```js
nomModel.find(); /* permet de trouver tous les éléments correspondant au model */

nomModel.find( { /*ici, filtre*/ } ); /* permet de trouver tous les éléments correspondant au filtre */
```

```js
nomModel.findById(id); /* permet de trouver l'élément dont l'id est celui renseigné */
```

```js
nomModel.findByOne( { /* ici, filtre */ } ); /* permet de trouver le premier élément dont qui correspond à notre filtre */
```

```js
const ressourceCree = nomModel(valeursAAjouter); /* Créé un objet en respectant le schéma du model */
ressourceCree.save(); /* Sauvegarde cet objet en db */
```

```js
nomModel.deleteOne({ /* filtre */ });// Supprime le premier élément qui correspond au filtre et renvoie un objet avec une propriété deletedCount qui contient le nombre d'élément supprimés

nomModel.findByIdAndDelete(id); //Trouve l'élément grâce à l'id et le supprime. Renvoie l'élément trouvé ou null si pas trouvé

nomModel.deleteMany({ /* filtre */ });//Supprime tous les élements qui correspondent au filtre et renvoie un objet avec la prop deletedCount.
```

<hr>

## 🤫 Hasher des données

Nous allons voir comment hasher des données avec l'ajout d'un hash sur le mot de passe des utilisateurs.
Pour gérer nos utilisateurs, nous faisons souvent la partie création de compte et connexion dans une partie nommée "Auth" pour Authentication. Nous allons donc créer une route auth, un controller auth et un service auth.

Pour hasher, nous aurons besoin d'une librairie de hashage. 
Nous allons utiliser [Argon2](https://www.npmjs.com/package/argon2).

### Installer Argon2 : 
Dans votre projet :
```
npm i argon2
```

### Hasher le password
Dans le service, avant l'ajout de l'utilisateur dans la DB, on va faire :
```js
  const hashedPassword = await argon2.hash(user.password);
```

### Vérification du password 
Pour vérifier si un mot de passe correspond à la version hashée :
```js
   const checkPassword = await argon2.verify(hashedPassword, loginPassword);
   // si les deux ne correspondent pas, checkPassword sera faux
```


<hr>

## 🪙 Rajouter l'authentification avec JWT
[JWT - Json Web Token](https://en.wikipedia.org/wiki/JSON_Web_Token) est le moyen le plus connu et utilisé de créer un jeton qui permet d'identifier qui est actuellement en train de faire la requête.

Cela permettra, sur certaines routes, de mettre en place de la sécurité et de permettre l'accès aux (à la) ressource(s) uniquement à certains utilisateurs.

### Installer jsonwebtoken
Pour installer la librairie [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken), tapez dans la console du projet :
```
npm i jsonwebtoken
```

### Créer un Token
Avec la librairie jsonwebtoken nous avons accès à une méthode pour créer un token.
```js
    jwt.sign(payload, JWT_SECRET, options, (error, token) => {});
```
Cette méthode, sign, a plusieurs paramètres : 
* **payload**, le 1er paramètre, est un objet contenant les informations qu'on veut stocker dans le token.
* **JWT_SECRET**, le 2ème paramètre, est une variable d'environnement contenant le code secret qui sert à encoder et décoder le token. (⚠️ : Pensez à bien le mettre dans vos variables d'env, il ne doit jamais être divulgué)
* **options**, le 3ème paramètre, est un objet qui contient les paramètres d'encodage du token avec le type d'encodage, la date d'expiration etc
* **Un callback**, le 4ème paramètre, qui est une fonction déclenchée lors de la signature du token. Cette fonction possède 2 paramètres, le premier contient une erreur s'il y en a une, le deuxième contient le token si pas d'erreur.

### Envoyer le token avec la requête
Un token, s'envoie lors d'une requête en l'ajoutant dans les **headers**. Quand on sera en React, on ajoutera nous même aux headers de la requête, ce fameux token qu'on aura stocké au préalable dans le navigateur. Le header dans lequel il faut ajouter le token s'appelle _Authorization_.

Sur Insomnia, il y a un bouton tout prêt qui permet d'ajout le token dans les headers de la requête.

Cliquer sur le bouton Auth :
<div align="center">
<img src="./documentation/token_insomnia1.png" />
</div>

Sélectionner Bearer Token dans la liste :
<div align="center">
<img src="./documentation/token_insomnia2.png" />
</div>

On copie son token :
<div align="center">
<img src="./documentation/token_insomnia3.png" />
</div>

### Création de middlewares pour récupérer le token
On va créer un middleware pour chaque vérification qu'on veut faire. Par exemple : 
* **authentication** : Vérifier si le token est envoyé donc, vérifie si l'utilisateur est bien connecté (ex : on ne peut pas ajouter de tâches si on est pas connecté)
* **userAuthorization** : Vérifier si dans le token, l'id de l'utilisateur lui permet de faire ce qu'il demande
* **roleAuthorization** : Vérifier si l'utilisateur possède le bon rôle pour faire ce qu'il demande

_ex : Création d'un authenticationMiddleware_
```js
const authenticationMiddleware = () => {

    return (req, res, next) => {

    }
}

module.exports = authenticationMiddleware;
```

On va ensuite aller activer ces différents middleware sur les routes qui en ont besoin.
_ex : Dans le fichier de route des task_
```js
const authenticationMiddleware = require('../middlewares/auth/authentication.middleware');

taskRouter.route('/')
    .get(taskController.getAll)
    .post(authenticationMiddleware(), bodyValidatorMiddleware() , taskController.insert)
```

### Déchiffrer le Token
Pour décoder un token nous avons à notre disposition une méthode verify() :
```js
    jwt.verify(token, JWT_SECRET, options, (error, payload) => {})

```
Cette méthode a plusieurs paramètres : 
* Le premier, c'est le **token** à décoder
* Le deuxième, c'est le **secret**
* Le troisième, ce sont les **options**
* Le quatrième et dernier, c'est la **fonction (callback)** qui sera lancée à la fin de la vérification avec comme paramètre erreur et payload


<hr> 

[...incoming...] 

## Gestion des fichiers

Pour envoyer des fichiers dans notre API, il existe plusieurs librairies qui permettent de traiter le fichier reçu et l'ajouter dans un dossier sur le serveur de notre API.
Une de ces librairies s'appelle [Multer](https://www.npmjs.com/package/multer) et vous pourrez trouver une démonstration [en cliquant sur le lien suivant](https://gitlab.com/i3namurfs/demonodemulterfsi3namur).

<hr>

## Validation des données entrantes

Pour vérifier si les données qui arrivent dans notre api via le body ont le format attendu, nous pouvons utiliser une librairie de schémas de validation.
Une des plus connues s'appelle [Yup](https://github.com/jquense/yup).

Voici un [projet](https://gitlab.com/i3namurfs/expressfilrougei3) dans lequel cette validation est présente si vous souhaitez y jeter un oeil.
* dans le dossier **validators**, vous trouverez tous les schémas de validation
* dans le dossier **middlewares**, vous trouverez le body-validation, qui prend en paramètre le schema de validation à valider. Si tout est ok, on continue la requête, sinon, on enverra une 400 Bad Request.
* dans les fichiers de **routes**, vous verrez ce middleware appliqué avec le schéma approprié dans tous les post, put et patch.

<hr>

## Mise en place de Swagger
[Swagger](https://swagger.io/) est une librairie de **documentation** d'API. Elle permet d'avoir une interface graphique qui permet de tester toutes les routes avec des informations sur ce qui est attendu dans le body, en sortie, dans les paramètres, la query ainsi que les codes http possibles en retour.

<div align="center"> 
<img width="80%" src="https://imagedelivery.net/PVooPtpJE-25QaNkbEuXvw/0117d73b-b327-45ff-f333-0af511c52b00/public" />
</div>

Il existe une [librairie js Swagger](https://www.npmjs.com/package/swagger-ui-express) pour l'ajouter dans votre projet API mais attention, sa mise en place est un peu fastidieuse.
<hr>

## Bonus
### Utilitaires : 

L'extension VSC [TODO+](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-todo-plus) vous permet de faire des todo list.
Pour gérer les tâches : 
* ALT + ENTER : Créer une tâche
* ALT + D : Done (Marquer comme faite)
* ALT + S : Started (Marquer comme commencée)
* ALT + C : Cancelled (Marquer comme annulée)

### Librairies sympa pour pimper votre API

[http-status-code](https://www.npmjs.com/package/http-status-codes) est une librairie contenant une énumération des status Http pour gérer plus facilement les réponses de l'API.
Une fois que vous l'aurez installé, dans votre code, vous aurez l'auto-complétion qui proposera les codes possibles avec un nom plus clair que juste un nombre.\
_ex :_
```js
res.status(StatusCodes.OK).json(/* Ce que vous renvoyez */)
```

