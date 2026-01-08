const taskRouter = require('./task.router');
const categoryRouter = require('./category.router');


// ! 1) Créer un objet "routeur" (router)


const router = require('express').Router();

//TODO les fonctions (req, res) => {} dégageront plus tard pour aller dans les controllers, les fichiers de route ne doivent contenir que les méthodes des controllers à exécuter quand on rencontre telle ou telle route

// ! 2) Configurer les routes
router.get('/', (req, res) => {
    res.send("Bienvenue sur notre API de gestion de tâches", 200)
});

router.use('/tasks', taskRouter);

router.use('/categories', categoryRouter);

// ! 3) Rendre exportable notre objet router
module.exports = router;