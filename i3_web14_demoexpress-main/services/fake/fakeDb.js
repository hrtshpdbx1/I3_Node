// notre fausse DB

const categories = [
    {
        id : 1,
        name : "Poupées Vodoux",
        icon : "📍"
    },

     {
        id : 2,
        name : "Nid de mouches",
        icon : "🪰"
    },
]

const tasks = [
    {
        id : 1,
        name : "Dressage de Gilberte",
        before :  "2026-06-01",
        by : "Marcel",
        to : "Jean",
        category : 2,
        isDone : false
    }, 
     {
        id : 2,
        name : "Vénération des esprits",
        before :  "2026-01-30",
        by : "Jeanl",
        to : "Marcel",
        category : 1,
        isDone : false
    }, 
]


// quand il y en a deux ils faut faire un objet avec ces deux choses dedans ↓
module.exports = {categories, tasks}