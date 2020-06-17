const router = require('express').Router();
let Exercise = require('../models/exercise.model');

//GET request. Exercise.find is a mongoose method that gets a list of exercises from the mongodb atlas database
router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST request. 
router.route('/add').post((req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = Number(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({ username, description, duration, date, });

    //newExercise is saved to the database
    newExercise.save()
    .then(() => res.json('Exercise added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//:id is an object id created automatically by mongodb. 
// so if we got to exercises/<the id> with this get request, it will return info of that one exercise.
router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE request.
router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

//POST/update request. Finds that exercise, then updates it.
router.route('/update/:id').post((req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated.'))
                .catch(err => res.status(400).json('Error: aaa' + err));
        })
        .catch(err => res.status(400).json('Error:' + err));
});

module.exports = router;

