// import AnimalService from "../../service/AnimalService.js";

// const handle = async (req,res,next) => {
//     try{
//         const{animalId} = req.params;
//         const animal = await AnimalService.retieveAnimal(animalId);
//         res.json(animal);

//     }catch (err){
//         next(err);
//     }
// }

// export default {handle}

import AnimalService from "../../service/AnimalService.js";
import {checkSchema} from "express-validator";

export const rules = checkSchema({
    animalId: {
        notEmpty:true,
        custom: {
            options:async (value)=>{
                if (!AnimalService.retrieveAnimal(value)){
                    throw new Error('that animal doesnt exist')
                }
            }
        }
    }
});

const handle = async (req, res, next) => {
    console.log("Retrieve Controller Hit!"); 
    try {
        const {animalId}= req.params;
        //if (animalId) {
            //retrieve a single animal
            const animal = await AnimalService.retrieveAnimal(animalId);
            return res.json(animal);
       // } else {
            //retrieve all animals
        //     const animals = await AnimalService.retrieveAnimals();
        //     return res.json(animals);
        // }
    } catch (err) {
        console.error("Error in Retrieve Controller:", err); 
        next(err);
    }

};

export default { handle, rules }