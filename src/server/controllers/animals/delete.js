import AnimalService from "../../service/AnimalService.js";
import {checkSchema} from "express-validator";

export const rules = checkSchema({
    animalId: {
        in: ['params'],
        isMongoId: {
            errorMessage: `"animalId" must be a valid MongoDB ObjectId`
        },
        notEmpty: {
            errorMessage: `"animalId" is required`
        }
    }
});



const handle = async (req, res, next) => {
    try {
        const {animalId} = req.params;
        const deletedAnimal = await AnimalService.deleteAnimal(animalId);
        res.json(deletedAnimal);
    } catch (err) {
        next(err);
    }
};

export default { handle, rules }