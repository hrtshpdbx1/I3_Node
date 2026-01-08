const { categories } = require('./fakeDB')
// Importe le tableau 'categories' depuis le fichier fakeDB

// Création d'un objet 'fakeCategoryService' qui va contenir toutes nos fonctions
// pour manipuler les catégories 
const fakeCategoryService = {

    find: () => {
        // ↑ fonction FIND qui récupère les catégories
        return categories;
        // On retourne simplement le tableau complet des catégories
    },

    findById: (id) => {
        // ↑ fonction qui prend un 'id' en paramètre
        // et retourne LA catégorie qui correspond à cet id
        const searchedCategory = categories.find(category => category.id === id)
        return searchedCategory;
        // .find() parcourt le tableau 'categories' 
        // retourne le premier élément qui satisfait la condition === id
    },

    // Bonus : Fonction pour  vérifier si une catégorie existe déjà


    categoryExists: (categoryName) => {
        // ÉTAPE 1 : On parcourt le tableau 'categories' avec .some()
        // .some() vérifie si AU MOINS UN élément satisfait une condition

        // ÉTAPE 2 : Pour chaque élément du tableau (appelé 'category')
        // on compare son nom (category.name) avec le nom recherché (categoryName)

        // ÉTAPE 3 : Si category.name === categoryName
        // → la comparaison retourne true
        // → .some() s'arrête et retourne true immédiatement

        // ÉTAPE 4 : Si aucune catégorie ne correspond
        // → toutes les comparaisons retournent false
        // → .some() retourne false à la fin

        return categories.some(category => category.name === categoryName);
        // ^^^^^^                ^^^^^^^^    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        //   |                      |                    |
        //   |                      |                    └─ Condition de comparaison
        //   |                      └────────────────────── Chaque élément du tableau
        //   └───────────────────────────────────────────── On retourne le résultat

        // Pas besoin de if/else car .some() retourne déjà true ou false automatiquement
    },

    create: (categoryToAdd) => {
        // ↑ fonction qui prend une nouvelle catégorie en paramètre
        // et l'ajoute au tableau 'categories'


        const idMax = Math.max(...categories.map(category => category.id));
        categoryToAdd.id = idMax + 1;
        categories.push(categoryToAdd);

        return categoryToAdd
    }
}

module.exports = fakeCategoryService;
