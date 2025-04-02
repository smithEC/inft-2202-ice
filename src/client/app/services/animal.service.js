/*
    Name: Connor Smith
    filename: aniaml.service.js
    Course: INFT 2202
    Date: February 12, 2025
    Description: This is the animal service script
*/

import Animal from "../models/Animal.js";

export default new AnimalService();

function AnimalService() {
    this.host = 'http://localhost:3000';
    //this.apikey = '4f3937b2-5cea-45ac-bac8-d0509585c07c';
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

AnimalService.prototype.getAllAnimals = async function() {
    const url = new URL('/api/animals', this.host);
    const page = 1;
    const perPage = await this.getAnimalCount();
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
        console.log("Ahhh", error);
        throw error;
    }
}

AnimalService.prototype.createAnimal = async function (animalObject) {
    const url = new URL('/api/animals', this.host);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': this.apikey
    });

    const options = {
        headers,
        method: 'POST',
        body: JSON.stringify(animalObject)
    };

    try {
        const response = await fetch(url, options);

        const createdAnimal = await response.json();
        return new Animal(createdAnimal);
    } catch (error) {
        console.error("Ahhh", error);
        throw error;
    }
}

AnimalService.prototype.findAnimal = async function(animalID) {
    if (!animalID) {
        throw new Error("Animal ID is required");
    }

    const url = new URL(`/api/animals/${animalID}`, this.host);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': this.apikey
    });

    const options = {
        headers,
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);

        const newAnimal = await response.json();
        return new Animal(newAnimal);
    } catch (error) {
        console.error("Ahhh", error);
        throw error;
    }
};


AnimalService.prototype.updateAnimal = async function(animal) {
    const url = new URL(`/api/animals/${animal.id}`, this.host);

    const headers = new Headers({
        'Content-Type': 'application/json',
        'apikey': this.apikey
    });

    const options = {
        headers,
        method: 'PUT',
        body: JSON.stringify(animal)
    };

    try {
        const response = await fetch(url, options);

        const updatedAnimal = await response.json();
        return new Animal(updatedAnimal);
    } catch (error) {
        console.error("Ahhh", error);
        throw error;
    }
}

AnimalService.prototype.deleteAnimal = async function(animalId) {
    console.log(animalId);
    const url = new URL(`/api/animals/${animalId}`, this.host);

    const headers = new Headers({
        'Content-Type': 'application/json'
    });

    const options = {
        headers,
        method: 'DELETE'
    };

    try {
        const response = await fetch(url, options);

        return response;
    } catch (error) {
        console.error("Ahhh", error);
        throw error;
    }
};

AnimalService.prototype.getAnimalCount = async function() {
    const url = new URL('/api/animals', this.host);
    const page = 1;
    const perPage = Infinity;
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

        return pagination.count;
    }
    catch (error) {
        console.log("Ahhh", error);
        throw error;
    }
};

AnimalService.prototype.waitTho = function(timeout) {
    return new Promise((resolve, reject) => setTimeout(resolve, timeout));
}