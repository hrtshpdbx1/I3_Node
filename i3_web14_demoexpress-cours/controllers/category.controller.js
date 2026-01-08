// import du type Request et Response pour la JsDoc
const { Request, Response } = require('express')

// import du service des categories
const fakeCategoryService = require('../services/fake/fakeCategoryService');

//création de notre controller
const categoryController = {

    /**
     * Récupérer toutes les categories
     * @param { Request } req
     * @param { Response } res
     */
    getAll: (req, res) => {
        const categories = fakeCategoryService.find();
        // on crée la constancer pour stocker les catégories; où on stocke notre tableau du servoce

        //version 1 - renvoyer le tableau tel quel
        // res.status(200).json(tasks);
        // pareil que res.send(tasks, 200);

        //version 2 - renvoyer un objet avec le total des tâches + le tableau
        const dataToSend = {
            count: categories.length,
            /*tasks : tasks */
            categories/* -> plus court */
        };
        res.status(200).json(dataToSend);

    },
    /**
         * Récupérer une categorie
         * @param { Request } req
         * @param { Response } res
         */
    getById: (req, res) => {
        //les paramètre récupérés seront toujours sous forme de chaine de caractères. Si on veut que notre id soit un nombre, il faudra le parse (soit avec parseInt, soit avec le +)
        const id = +req.params.id;
        const category = fakeCategoryService.findById(id);

        // Si pas de tâche récupérée (donc si l'id n'existe pas) l'API renvoie une erreur 404
        if (!category) {
            res.status(404).json({
                statusCode: 404,
                message: 'Category non trouvée'
            })
        }

        // Si y'a une tâche
        res.status(200).json(category);
    },

    /**
    * Ajouter une categorie
    * @param { Request } req
    * @param { Response } res
    */
    insert: (req, res) => {

        // 1 : Récupérer les données, les stocker dans une constante
        const categoryToAdd = req.body;

        // 2 :  Vérifier si la catégorie existe déjà
        // (on gère tjrs erreur first)
        if (fakeCategoryService.categoryExists(categoryToAdd.name)) {
            res.status(409).json({
                statusCode: 409,
                message: `La catégorie ${categoryToAdd} est déjà utilisé`
            })


            // 3 :   Si elle n'existe pas, la créer
            // La catégorie a été crée a potentionnellement de nouvelle valeur comme un id ou un date de création
        }
        const addedCategory = fakeCategoryService.create(categoryToAdd);
        // Pour respecter les principes REST, on doit rajouter à la réponse, une url qui permet de consulter la valeur ajoutée
        res.location(`/api/categories/${addedCategory.id}`);
        res.status(201).json(addedCategory);
    },

    update: (req, res) => {
        // en réutilisant la fonction NameAlreadyExist (ou categoryExists)
        // TODO : verifier si l'ID existe, sinon 404
        //TODO : verifier si le nouveau nom n'est pas déjà présent dans la DB, sinon 409
        //TODO : Faire la modification
        res.sendStatus(501);
    },

    delete: (req, res) => {
        res.sendStatus(501);
    }
}


//Export
module.exports = categoryController;