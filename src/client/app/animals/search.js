/*
    Name: Connor Smith
    filename: search.js
    Course: INFT 2202
    Date: January 9, 2025
    Description: This is the search script
*/

import AnimalService from './animal.mock.service.js';

const eleMessageBox = document.getElementById("message-box");
const eleTable = document.getElementById("animal-list");
const eleTbody = eleTable.querySelector("tbody");

const records = AnimalService.listAnimals();
toggleTableVisibility(records);

function toggleTableVisibility(animals) {
    if (!animals.length) {
        eleMessageBox.classList.remove('d-none');
        eleTable.classList.add('d-none');
    }
    else {
        eleMessageBox.classList.add('d-none');
        eleTable.classList.remove('d-none');
        drawAnimalTable(animals);
    }
}

function drawAnimalTable(animals) {
    for (const animal of animals) {
        const row = eleTbody.insertRow();

        const eleNameCell = row.insertCell();
        eleNameCell.textContent = "Connor";

        const eleDetailsCell = row.insertCell();
        eleDetailsCell.innerHTML = animal.toString();

        const eleButtonCell = row.insertCell();

        const eleDeleteBtn = document.createElement('button');
        eleDeleteBtn.classList.add('btn', 'btn-danger');
        const eleDeleteIcon = document.createElement('i');
        eleDeleteIcon.classList.add('fa-solid', 'fa-times');
        eleDeleteBtn.append(eleDeleteIcon);

        eleDeleteBtn.addEventListener('click', onDeleteClick(animal));

        eleButtonCell.append(eleDeleteBtn);

        const eleEditLink = document.createElement('a');
        eleEditLink.classList.add('btn', 'btn-primary', 'mx-1');
        const eleEditIcon = document.createElement('i');
        eleEditIcon.classList.add('fa-solid', 'fa-edit');
        eleEditLink.append(eleEditIcon);
        eleEditLink.setAttribute('href', `add.html?id=${animal.id}`);
        eleButtonCell.append(eleEditLink);
    }

    function onDeleteClick(animal) {
        return event => {
            console.log(`Trying to delete animal with ID: ${animal.id}`)

            try {
                if (confirm("Are you sure you want to delete?")) {
                    AnimalService.deleteAnimal(animal);
                    window.location = 'list.html';
                }
            } catch (error) {
                console.log(error);
                eleMessageBox.classList.remove('d-none');
                eleMessageBox.textContent = error.message;
            }

            
        }
    }
}
