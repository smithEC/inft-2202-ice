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
    },
    name: {
        optional: true,
        notEmpty: {
            errorMessage: `"name" must not be empty`
        }
    },
    breed: {
        optional: true,
        notEmpty: {
            errorMessage: `"breed" must not be empty`
        }
    },
    legs: {
        optional: true,
        isNumeric: {
            errorMessage: `"legs" must be a number`
        }
    },
    eyes: {
        optional: true,
        isNumeric: {
            errorMessage: `"eyes" must be a number`
        }
    },
    sound: {
        optional: true,
        notEmpty: {
            errorMessage: `"sound" must not be empty`
        }
    }
});

const handle = async (req, res, next) => {
    try {
        const { animalId } = req.params;
        const updateData = req.body;
        const updatedAnimal = await AnimalService.updateAnimal(animalId, updateData);
        res.json(updatedAnimal);
    } catch (err) {
        next(err);
    }
};

export default { handle, rules }
