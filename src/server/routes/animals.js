import express from 'express';
import Animals from "../models/Animal.js";
import { CheckValidation } from '../middleware/validation.js';
import AnimalCreateController from "../controllers/animals/create.js";
import AnimalRetrieveController from "../controllers/animals/retrieve.js";
import AnimalUpdateController from "../controllers/animals/update.js";
import AnimalDeleteController from "../controllers/animals/delete.js";
import AnimalSearchController from "../controllers/animals/search.js";
const router = express.Router();

export default router;


router.get('/animals',AnimalSearchController.handle);
// retrieve animal
//router.get('/animals',AnimalRetrieveController.handle);

router.get('/animals/:animalId',AnimalRetrieveController.handle);
//import {validationResult} from 'express-validator'
//create animal
router.post('/animals',CheckValidation(AnimalCreateController.rules), AnimalCreateController.handle);

//update animal
router.put('/animals/:animalId',CheckValidation(AnimalUpdateController.rules), AnimalUpdateController.handle);

//delete animal
router.delete('/animals/:animalId',CheckValidation(AnimalDeleteController.rules), AnimalDeleteController.handle);
