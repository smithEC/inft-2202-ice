
import Animal from "../models/Animal.js";

class AnimalService{
    // async retrieveAnimals() {
    //     const animals = await Animal.find();  // Find all animals
    //     return animals;
    // }

    
    async retrieveAnimal(animalId) {
        const animal = await Animal.findById(animalId); // Find animal by ID
        if (!animal) {
            throw new Error('Animal not found');
        }
        return animal;
    }
    
    async createAnimal({name,breed,legs,eyes,sound }) {
        return await Animal.create({name,breed,legs,eyes,sound });
    }
    async updateAnimal(animalId, updateData) {
        const updatedAnimal = await Animal.findOneAndUpdate(
            { _id: animalId },
            updateData,
            { new: true }
        );
        return updatedAnimal;
    }

    async deleteAnimal(animalId) {
        const deletedAnimal = await Animal.findOneAndDelete(animalId);
        return deletedAnimal;
    }
    async searchAnimals(page = 1, perPage = 3){

        const filters = {};
        const count = await Animal.countDocuments(filters);//const filters should be above this 
        const pages = Math.ceil(count / perPage);// if you just add + in front of count and perPage it does math ok

        const  pagination = {
            perPage: parseInt(perPage),
            page:parseInt(page),
            count,
            pages
        };

        const fields = {
            __v: 0
        };
        const options = {
            skip: (page - 1) * perPage,
            limit: perPage,
            sort: { _id: 1 }
          };
          
        const records = await Animal.find(filters, fields,options);
        return{pagination, records}
    }
}
export default new AnimalService();