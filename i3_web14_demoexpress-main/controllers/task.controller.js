// import de type Resquest et Response pour la JsDoc
const {Request, Response} = require('express');

const fakeTaskService = require("../services/fake/fakeTask.service")

//création de notre controller
const taskController = {

    getAll : (req, res) => {
        //importer notre fonction ici
        const tasks = fakeTaskService.find();

/**
 * /*Recuprer toutes les tâches 
 * @param { Request } req
 * @param { Response} res
 */

        //* v1 : Renvoyer la version tel quel
// res.status(200).json(tasks);
//équivalent de res.status(json,200)
// va transformer notre tableau d'objet en le transformant en JSON

        //* v2 : Renvoyer un objet avec le total des tâches + le tableau 
        // Utile quand on a énornement de donnée
const dataToSend = {
    count : tasks.lenght,
    tasks
    // on peut l'écrire de façon raccourcie quand la propriété a le même nom que la fonction
    // equivalent de :
    // tasks : tasks
};
res.status(200).json(dataToSend);
        },

    getById : (req, res) => {
       const id = +req.params.id;
       const task = fakeTaskService.findById(id);

       //* si pas de  tâche récupérée (donc si l'id n'existe pas)
       if (!task) {
        res.status(404).json({
            statusCode :404,
            message : 'Tâche non trouvée'})
       }
    //pas besoin de else
    // la requête s'arrête d'elle même
       //* S'il y a tâche
       res.status(200).json(task);
    },

    getByUser : (req, res) => {
        res.sendStatus(501);
    },

    insert : (req, res) => {
     const taskToAdd = req.body;
    const addedTask = fakeTaskService.create(taskToAdd);

    //! Pour respcter les principes REST
    // On doit rajouter une URL qui permt de consulter la valeur ajoutée créer une URL 
    res.location (`/api/tasks/${addedTask.id}`);
    res.status(201).json(addedTask);
    },

    update : (req, res) => {
        res.sendStatus(501);
    },

    updateStatus : (req, res) => {
        res.sendStatus(501);
    },

    delete : (req, res) => {
        res.sendStatus(501);
    }
}



//on le rend importable en l'exportant
module.exports = taskController;


// doc :
//res.send(donnée, statusCode) utilisé quand on veut envoyer une donné + statusCode
//res.sendStatus(statusCode) utilisé quand on veut renvoyer juste un statusCode
