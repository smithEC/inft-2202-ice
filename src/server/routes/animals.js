import express from 'express';

const router = express.Router();

export default router;

router.get('/animals', (req, res, next) => {
    res.send('This is the animals list');
});

router.get(
    '/animals/:animalID',
    (req, res, next) => {
        const { animalID } = req.params;
        //throw new Error("Some bad happened");
        const body = {
            animalID,
        }
        res.json(body);
    }   
);

router.post('/animals', (req, res, next) => {
    res.send("Create animal");
});

router.put('/animals/:animalID', (req, res, next) => {
    const { animalID } = req.params;
    res.send(`Updated animal with id: ${animalID}`);
});

router.delete('/animals/:animalID', (req, res, next) => {
    const { animalID } = req.params;
    res.send(`Deleted animal with id: ${animalID}`);
});