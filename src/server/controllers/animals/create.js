
import {checkSchema} from "express-validator";
import AnimalService from "../../service/AnimalService.js";

//something geos here ????
const rules = checkSchema({
    name:{
        notEmpty: true,
        errorMessage:`"name" is required`,
        in: 'body',
        customSanitizer: {
            options:async (value)=>{
                if(value =='Connor'){
                    return value += 'is the best'
                }
            }
        }
    },
    breed:{
        notEmpty: true,
        errorMessage:`"breed" is required`,
        in: 'body'
    },
    eyes:{
        notEmpty: {
            errorMessage: `"eyes" must not be empty`
        },
        isNumeric:{
            errorMessage: `"eyes" must be a number`
        },
        in: 'body'
    },
    legs:{
        notEmpty: {
            errorMessage: `"legs" must not be empty`
        },
        isNumeric:{
            errorMessage: `"legs" must be a number`
        },
        in: 'body'
    },
    sound:{
        notEmpty: true,
        errorMessage:`"sound" is required`,
        in: 'body'
    }
});



const handle = async (req, res, next) => {
    console.log('Incoming POST Request:', req.body); 
    try{
    const {name,breed,legs,eyes,sound} = req.body;
    const animal = await AnimalService.createAnimal({name,breed,legs,eyes,sound });
    res.json(animal);
    }catch (err) {
        console.error('Error in Create Controller:', err);
        next(err)
    }
}
export default { handle, rules}

