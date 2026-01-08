// import de type Resquest et Response pour la JsDoc
const { Request, Response } = require('express');

// import du service des tâches
const fakeTaskService = require("../services/fake/fakeTask.service")

//création de notre controller
const taskController = {

    getAll: (req, res) => {
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
            count: tasks.lenght,
            tasks
            // on peut l'écrire de façon raccourcie quand la propriété a le même nom que la fonction
            // equivalent de :
            // tasks : tasks
        };
        res.status(200).json(dataToSend);
    },

    getById: (req, res) => {
        // le "+" est une astuce JavaScript pour convertir une chaîne de caractères en nombre
        // equivalent de  parseInt()
        const id = +req.params.id;
        const task = fakeTaskService.findById(id);

        //* si pas de tâche récupérée (donc si l'id n'existe pas)
        if (!task) {
            res.status(404).json({
                statusCode: 404,
                message: 'Tâche non trouvée'
            })
        }
        //pas besoin de else
        // la requête s'arrête d'elle même
        //* S'il y a tâche
        res.status(200).json(task);
    },

    getByUser: (req, res) => {
        // **  Challenge : Finir la fonctionnalité du getByUser. Il vous faudra, dans le service, une fonction qui recherche toutes les tâches de l’utilisateur.
      
        
        // 1 : Récupérer l'userId depuis les paramètres de l'URL
        // Indice :  D'où vient l'information de l'utilisateur ? des paramètres (partie dynamique, qui peut changer)
        const userId = req.params.name;
    // name => doit être le même nom que dans le router (taskRouter.get('/user/:name', taskController.getByUser))

        //2 : Appeler la fonction du service
        const userTasks = fakeTaskService.findByUser(userId);

        //3 : Renvoyer les tâches trouvées
        //* si pas de user récupéré (si l'userId n'existe pas ds la Db)
        if (!userId) {
            res.status(404).json({
                statusCode: 404,
                message: 'L\'utilisateur·ice n\'existe pas 🫥'
            })
        }
        //* si il existe
        res.status(200).json(`${userTasks
        }`);
    },


    insert: (req, res) => {
        const taskToAdd = req.body;
        const addedTask = fakeTaskService.create(taskToAdd);

        // Pour respcter les principes REST
        // On doit rajouter une URL qui permet de consulter la valeur ajoutée créer une URL 
        res.location(`/api/tasks/${addedTask.id}`);
        res.status(201).json(addedTask);
    },

    update: (req, res) => {
        res.sendStatus(501);
    },

    updateStatus: (req, res) => {
        // ** finir la fonctionnalité updateStatus. 
     
        // ** Votre contrôleur devra renvoyer 404 si la tâche que vous essayez de modifier n’existe pas. Sinon, renvoie la tâche avec les nouvelles modifications. 

    },

    delete: (req, res) => {
        res.sendStatus(501);
    }
}



//on le rend importable en l'exportant
module.exports = taskController;


// doc :
//res.send(donnée, statusCode) utilisé quand on veut envoyer une donné + statusCode
//res.sendStatus(statusCode) utilisé quand on veut renvoyer juste un statusCode
