/*
    Name: Connor Smith
    filename: Animal.js
    Course: INFT 2202
    Date: January 16, 2025
    Description: This is the Animal script
*/

export default class Animal {
    constructor({ name, breed, eyes, legs, sound }) {
        this.id = crypto.randomUUID();
        // this.name = name;
        // this.breed = breed;
        // this.eyes = eyes;
        // this.legs = legs;
        // this.sound = sound;

        Object.assign(this, { name, breed, eyes, legs, sound });
    }

    toString() {
        return `${this.name} is a ${this.breed} with ${this.eyes} eyes, ${this.legs} legs, and makes a ${this.sound} sound.`;
    }

    toObject() {
        return {
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound
        };
    }

    toJSON() {
        return JSON.stringify(this.toObject());
    }
}