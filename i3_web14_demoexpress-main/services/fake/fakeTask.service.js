const  { tasks } = require("./fakeDB");

// ! Notre service où on va récuperer toutes les tâches :
const fakeTaskService = {
// un objet avec plein de fonction à l'interieur


//recuperer les tâches de notre """db"""
find : () => {
    return tasks;
},

findById : (id) => {
    return tasks.find(task => task.id ===  id);
    //  tasks.find : Méthode qui parcourt le tableau tasks et retourne le premier élément qui satisfait la condition
    // task => task.id === id :Prend chaque élément du tableau (appelé task) et vérifie si l'id de cet élément est strictement égal (===) au paramètre id passé à la fonction
    // 
},

create: (taskToAdd) => {
// fonction pour ajouter une tache
// On va devoir lui calculer un ID
// on ne peut pas prendre la taille du tableau +1
//  cherche d'id Max dans le tableau et faire +1

// Quand on fait tasks.map(task => id) :
// [{ id: 1, ...}, {id :  2}]
// MAIS grace à MAP on a : 
// [1,2]

//? Pourquoi les "..." ?
// Math.max(2,18,7,1) -> trouve la valeur max parmi des nombres
// Notre map du dessus nous donne un tableau de nombre et Math.max n'est pas capable de trouver le max dans un tableau
// Math.max(task.map(task=> id)) => Math.max[(1,2)] ==> FAIL
// On doit donc donc décomposer notre tableau avec les ...
// Math.max(...tasks.map(task => id)) ==> Math.max(...[1,2])
// => Math.max(1,2)
const idMax = Math.max(...tasks.map(task => task.id));
taskToAdd.id = idMax +1;
tasks.push(taskToAdd);

//on revoit la nouvelle tâche
return taskToAdd
}
}

module.exports = fakeTaskService;

