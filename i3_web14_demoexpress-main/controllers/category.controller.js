//création de notre controller
const categoryController = {
getAll : (req, res) => {
        res.sendStatus(501);
    },

    getById : (req, res) => {
        res.sendStatus(501);
    },

    insert: (req, res) => { // pq pas CategoryCreated ?
        res.sendStatus(501); 
    },

    update : (req, res) => {
        res.sendStatus(501);
    },

    delete : (req, res) => {
        res.sendStatus(501);
    }
}


//Export
module.exports = categoryController;