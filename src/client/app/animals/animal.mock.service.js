/*
    Name: Connor Smith
    filename: animal.mock.service.js
    Course: INFT 2202
    Date: January 9, 2025
    Description: This is the animal mock service script
*/

import Animal from './Animal.js';

export default new AnimalService();

function AnimalService() {
    if (!localStorage.getItem('animals')) {
        localStorage.setItem('animals', JSON.stringify([]));
    }
}

AnimalService.prototype.listAnimals = function() {
    const animals = JSON.parse(localStorage.getItem('animals'))
        .map(animalParams => new Animal(animalParams));

    return animals;
}

AnimalService.prototype.createAnimal = function (animalObject) {
    const animals = this.listAnimals();
    if (animals.find(animal => animal.name === animalObject.name)) {
        throw new Error('That animal already exists!');
    }
    animals.push(animalObject);
    localStorage.setItem('animals', JSON.stringify(animals));
    return true;
}

AnimalService.prototype.findAnimal = function(animalID) {
    const animals = this.listAnimals();

    const animal = animals.find(a => a.id == animalID);

    if (!animal) {
        throw new Error('That animal doesn\'t exist!');
    }

    return animal;
}

AnimalService.prototype.updateAnimal = function(animal) {
    const animals = this.listAnimals();

    const idx = animals.findIndex(a => a.id === animal.id);

    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }

    animals[idx] = animal;

    localStorage.setItem('animals', JSON.stringify(animals));

    return true;
}

AnimalService.prototype.deleteAnimal = function(animal) {
    const animals = this.listAnimals();

    const idx = animals.findIndex(a => a.id === animal.id);

    if (idx === -1) {
        throw new Error('That animal does not exist!');
    }

    animals.splice(idx, 1);

    localStorage.setItem('animals', JSON.stringify(animals));

    return true;
}
