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

    if (animals.find(animal => animal.id === animalID)) {
        return animal;
    }
    else {
        throw new Error('That animal doesn\'t exist!');
    }
}

AnimalService.prototype.updateAnimal = function(animalObject) {
    const animals = this.listAnimals();
    if (animals.find(animal => animal.name === animalObject.name)) {
        localStorage.setItem(animal, animalObject);
        return true;
    }
    else {
        throw new Error('That animal doesn\'t exist!');
        return false;
    }
}

AnimalService.prototype.deleteAnimal = function(animalObject) {
    const animals = this.listAnimals();
    if (animals.find(animal => animal.name === animalObject.name)) {
        localStorage.removeItem(animalObject);
        return true;
    }
    else {
        throw new Error('That animal doesn\'t exist!');
        return false;
    }
}
