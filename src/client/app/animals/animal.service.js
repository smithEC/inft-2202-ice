/*
    Name: Connor Smith
    filename: aniaml.service.js
    Course: INFT 2202
    Date: February 12, 2025
    Description: This is the animal service script
*/

import Animal from './Animal.js';

export default new AnimalService();

function AnimalService() {
    this.host = 'https://inft2202.opentech.durhamcollege.org';
    this.apikey = '4f3937b2-5cea-45ac-bac8-d0509585c07c';
}

AnimalService.prototype.getAnimals = async function(page = 1, perPage = 10) {
    const url = new URL('/api/animals', this.host);
    url.search = new URLSearchParams({ page, perPage });
    
    const headers = new Headers({
        'content-type': 'application/json',
        'apikey': this.apikey
    });

    const options = {
        headers,
        method: 'GET'
    };
    const request = new Request(url, options);

    try {
        const response = await fetch(request);
        const { pagination, records } = await response.json();

        return {
            pagination,
            records: records.map(animal => new Animal(animal))
        }
    }
    catch (error) {
        console.log("Error: ", error);
        throw error;
    }

}

AnimalService.prototype.getAllAnimals = function() {
    
}

AnimalService.prototype.createAnimal = function (animalObject) {
    
}

AnimalService.prototype.findAnimal = function(animalID) {
    
}

AnimalService.prototype.updateAnimal = function(animal) {
    
}

AnimalService.prototype.deleteAnimal = function(animal) {
    
}


AnimalService.prototype.getAnimalCount = function() {
    
}

AnimalService.prototype.waitTho = function(timeout) {
    return new Promise((resolve, reject) => setTimeout(resolve, timeout));
}