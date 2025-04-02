/*
    Name: Connor Smith
    filename: Animal.js
    Course: INFT 2202
    Date: January 16, 2025
    Description: This is the Animal script
*/

export default class Animal {
    constructor({ _id = null, id = null, name, breed, eyes, legs, sound, owner = null }) {
        this._id = _id ?? id ?? crypto.randomUUID();
        this.name = name;
        this.breed = breed;
        this.eyes = eyes;
        this.legs = legs;
        this.sound = sound;
        this.owner = owner;
    }

    toString() {
        return `${this.name} is a ${this.breed} with ${this.eyes} eyes, ${this.legs} legs, and makes a ${this.sound} sound.`;
    }

    toJSON() {
        return {
            _id: this._id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound,
            owner: this.owner
        };
    }
}
