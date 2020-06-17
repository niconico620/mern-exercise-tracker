const router = require('express').Router();
let User = require('../models/user.model');

//GET request. User.find is a mongoose method that gets a list of users from the mongodb atlas database
router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST request. req.body.user name is assigned to username variable.
router.route('/add').post((req, res) => {
    const username = req.body.username;

    const newUser = new User({ username });

    //newUser is saved to the database
    newUser.save()
    .then(() => res.json('User added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;

