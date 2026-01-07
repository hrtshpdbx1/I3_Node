const categoryRouter = require("express").Router(); //création routeur

// importer le controleur qu'on vient de créer
const categoryController = require('../controllers/category.controller');

// ? Nouvelle façon d'écrire les routes
categoryRouter.route('/')
.get(categoryController.getAll)
.post(categoryController.insert) 
// pq pas CategoryCreated ?
// car on utilise la methode, or CategoryCreated c'est le nom de l'objet

categoryRouter.route('/:id')
.get(categoryController.getById)
.put(categoryController.update)
.delete(categoryController.delete)

// ? Précendente façon d'écrire les routes
// categoryRouter.get('/', (req, res) => {
//     res.send('Voici toutes les catégories', 200);
// })

// categoryRouter.get('/:id', (req, res) => {
//     res.send(`Voici la catégorie ${req.params.id}`, 200)
// })

// categoryRouter.post('/', (req, res) => {
//     const categoryCreated = req.body;
//     res.send(categoryCreated, 201);
// })

// categoryRouter.put('/:id', (req, res) => {
//     const categoryUpdated = req.body;
//     categoryUpdated.id = req.params.id;
//     res.send(categoryUpdated, 200);
// })

// categoryRouter.delete('/:id', (req, res) => {
//     res.sendStatus(204);
// })

module.exports = categoryRouter; //permet de rendre exportable categoryRouter

