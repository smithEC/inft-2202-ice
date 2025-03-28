import AnimalService from "../../service/AnimalService.js";

const handle = async (req,res,next) => {
   try{
    const {page , perPage}= req.query
    const body = await AnimalService.searchAnimals(page,perPage)
    res.json(body);
    }catch(error){
        next(error);
    }

}

export default {handle};