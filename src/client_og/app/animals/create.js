/*
    Name: Connor Smith
    filename: create.js
    Course: INFT 2202
    Date: January 9, 2025
    Description: This is the create script
*/

import Animal from './Animal.js';
import AnimalService from './animal.service.js';

const url = new URL(window.location);

const searchedParams = url.searchParams;
const editID = searchedParams.get('id');
const isEditMode = editID ? true : false;

if (isEditMode) {
    await setupEditForm();
}
else {

}

// Get the form
document.getElementById("animal-form")
    .addEventListener("submit", submitAnimalForm);

async function setupEditForm() {
    const eleHeading = document.querySelector('h1');
    eleHeading.textContent = "Edit Existing Animal";

    try {
        const existingAnimal = await AnimalService.findAnimal(editID);
        const animalForm = document.getElementById('animal-form');

        animalForm.name.value = existingAnimal.name;
        animalForm.name.disabled = true;
        animalForm.breed.value = existingAnimal.breed;
        animalForm.legs.value = existingAnimal.legs;
        animalForm.eyes.value = existingAnimal.eyes;
        animalForm.sound.value = existingAnimal.sound;
    } catch (error) {
        window.location = 'list.html';
        return;
    }
}

/*
 * Reveive the submit event from the form
 */

async function submitAnimalForm(event) {
    event.preventDefault();
    const animalForm = event.target;

    const eleMessageBox = document.getElementById("message-box");
    const eleNameError = animalForm.name.nextElementSibling;
    const eleCheckIcon = document.getElementById('check-icon');
    const eleSpinIcon = document.getElementById('spin-icon');

    const valid = validateAnimalForm(event.target);

    if (valid) {
        const animalParams = {
            id: editID,
            name: animalForm.name.value,
            breed: animalForm.breed.value,
            legs: animalForm.legs.value,
            eyes: animalForm.eyes.value,
            sound: animalForm.sound.value
        };

        const animalObject = new Animal(animalParams);

        console.log(animalObject.toString());
        
        try {
            if (isEditMode) {
                AnimalService.updateAnimal(animalObject);
            }
            else {
                AnimalService.createAnimal(animalObject);
            }
            eleCheckIcon.classList.add('d-none');
            eleSpinIcon.classList.remove('d-none');

            document.querySelector('button').disabled = true;
            document.getElementById('name').disabled = true;
            document.getElementById('sound').disabled = true;
            document.getElementById('legs').disabled = true;
            document.getElementById('eyes').disabled = true;
            document.getElementById('breed').disabled = true;


            await AnimalService.waitTho(3000);

            window.location.href="list.html";
        }
        catch (error) {
            eleNameError.classList.remove("d-none");
            eleNameError.textContent = error.message;
        }
    } else {
        
        eleMessageBox.classList.remove("d-none");
        eleMessageBox.textContent = "Womp womp";
    }
}

/*
 * Check whether or not the form is valid
 */

function validateAnimalForm(form) {
    console.log(form);
    let valid = true;

    // Name validation
    const name = form.name.value;
    const eleNameError = form.name.nextElementSibling;

    if (name == "") {
        valid = false;
        eleNameError.classList.remove("d-none");
        eleNameError.textContent = "You must name this animal!";
    } else {
        eleNameError.classList.add("d-none");
    }

    // Breed validation
    const breed = form.breed.value;
    const eleBreedError = form.breed.nextElementSibling;

    if (breed == "") {
        valid = false;
        eleBreedError.classList.remove("d-none");
        eleBreedError.textContent = "You must enter the breed!";
    } else {
        eleBreedError.classList.add("d-none");
    }

    // Eyes validation
    const eyes = form.eyes.value;
    const eleEyesError = form.eyes.nextElementSibling;

    if (eyes == "") {
        valid = false;
        eleEyesError.classList.remove("d-none");
        eleEyesError.textContent = "Must enter eye count!";
    } else if (isNaN(eyes)) {
        valid = false;
        eleEyesError.classList.remove("d-none");
        eleEyesError.textContent = "Must be a number";
    }
     else {
        eleEyesError.classList.add("d-none");
    }

    // Legs validation
    const legs = form.legs.value;
    const eleLegsError = form.legs.nextElementSibling;

    if (legs == "") {
        valid = false;
        eleLegsError.classList.remove("d-none");
        eleLegsError.textContent = "Must enter leg count!";
    } else if (isNaN(legs)) {
        valid = false;
        eleLegsError.classList.remove("d-none");
        eleLegsError.textContent = "Must be a number";
    }
     else {
        eleLegsError.classList.add("d-none");
    }

    // Sound validation
    const sound = form.sound.value;
    const eleSoundError = form.sound.nextElementSibling;

    if (sound == "") {
        valid = false;
        eleSoundError.classList.remove("d-none");
        eleSoundError.textContent = "You must enter a sound!";
    } else {
        eleSoundError.classList.add("d-none");
    }

    return valid;
}
