/*
    Name: Connor Smith
    filename: Animal.js
    Course: INFT 2202
    Date: January 16, 2025
    Description: This is the Animal script
*/

export default class Animal {
    constructor({ id = null, name, breed, eyes, legs, sound }) {
        this.id = id ?? crypto.randomUUID();
        // this.name = name;
        // this.breed = breed;
        // this.eyes = eyes;
        // this.legs = legs;
        // this.sound = sound;

        Object.assign(this, { name, breed, eyes, legs, sound });
    }

    toString() {
        return `<em>${this.name}</em> is a <em>${this.breed}</em> with <em>${this.eyes}</em> eyes, <em>${this.legs}</em> legs, and makes a <em>${this.sound}</em> sound.`;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name,
            breed: this.breed,
            eyes: this.eyes,
            legs: this.legs,
            sound: this.sound
        };
    }
}