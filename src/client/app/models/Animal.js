/*
    Name: Connor Smith
    filename: Animal.js
    Course: INFT 2202
    Date: January 16, 2025
    Description: This is the Animal script
*/

export default class Animal {
    constructor({ id = null, name, breed, eyes, legs, sound, owner = null }) {
        this.id = id ?? crypto.randomUUID();

        Object.assign(this, { name, breed, eyes, legs, sound, owner });
    }

    toString() {
        return `${this.name} is a ${this.breed} with ${this.eyes} eyes, ${this.legs} legs, and makes a ${this.sound} sound.`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound,
            owner: this.owner
        };
    }
}