/*
    Name: Connor Smith
    filename: search.js
    Course: INFT 2202
    Date: January 9, 2025
    Description: This is the search script
*/

// import AnimalService from './animal.mock.service.js';
import AnimalService from './animal.service.js';


const eleMessageBox = document.getElementById("message-box");
const eleTable = document.getElementById("animal-list");
const eleTbody = eleTable.querySelector("tbody");

const url = new URL(window.location);
const searchedParams = url.searchParams;
const page = parseInt(searchedParams.get('page')?? 1);
const perPage = parseInt(searchedParams.get('perPage') ?? 10);

const response = await AnimalService.getAnimals(page, perPage);
const myID = 100931463;

toggleTableVisibility(response);

function drawPaginationLinks(elePaginationContainer, currentPage, totalPages) {
    const elePaginationItems = elePaginationContainer.querySelector('ul.pagination');
    elePaginationItems.replaceChildren();

    console.log(currentPage, totalPages);
    if (totalPages > 1) {
        elePaginationContainer.classList.remove('d-none');
    }
    else {
        elePaginationContainer.classList.add('d-none');
    }

    // Previous button
    const elePrevItem = document.createElement('li');
    elePrevItem.classList.add('page-item');
    const elePrevLink = document.createElement('a');
    elePrevLink.textContent = 'Previous';   
    elePrevLink.setAttribute('href', `list.html?page=${currentPage-1}&perPage=${perPage}`);
    elePrevLink.classList.add('page-link');

    if (currentPage === 1) {
        elePrevLink.setAttribute('disabled', true);
        elePrevLink.classList.add('disabled');
    }

    elePrevItem.append(elePrevLink);
    elePaginationItems.append(elePrevItem);     

    // Numbered Buttons
    for(let i = 1; i <= totalPages; i++) {
        const elePageItem = document.createElement('li');

        elePageItem.classList.add('page-item');
        const elePageLink = document.createElement('a');
        elePageLink.classList.add('page-link');

        
        if (currentPage === i) {
            elePageLink.classList.add('active');
        }

        elePageLink.setAttribute('href', `list.html?page=${i}&perPage=${perPage}`);
        elePageLink.textContent = i;

        elePageItem.append(elePageLink);
        elePaginationItems.append(elePageItem);
    }

    // Next button
    const eleNextItem = document.createElement('li');
    eleNextItem.classList.add('page-item');
    const eleNextLink = document.createElement('a');
    eleNextLink.textContent = 'Next';   
    eleNextLink.setAttribute('href', `list.html?page=${currentPage+1}&perPage=${perPage}`);
    eleNextLink.classList.add('page-link');

    if (currentPage === totalPages) {
        eleNextLink.setAttribute('disabled', true);
        eleNextLink.classList.add('disabled');
    }

    eleNextItem.append(eleNextLink);
    elePaginationItems.append(eleNextItem);  
}

async function toggleTableVisibility(response) {
    const eleSpinIcon = document.getElementById('spin-icon');
    await AnimalService.waitTho(500);
    eleSpinIcon.classList.add('d-none');

    const { pagination, records } = response;

    if (!records.length) {
        eleMessageBox.classList.remove('d-none');
        eleTable.classList.add('d-none');
    }
    else {
        eleMessageBox.classList.add('d-none');
        eleTable.classList.remove('d-none');
        drawAnimalTable(records);

        const elePaginationContainer = document.getElementById('pagination');
        drawPaginationLinks(elePaginationContainer, pagination.page, pagination.pages);
    }
}

function drawAnimalTable(animals) {
    for (const animal of animals) {
        const row = eleTbody.insertRow();

        const eleNameCell = row.insertCell();
        eleNameCell.textContent = animal.owner.name;

        const eleDetailsCell = row.insertCell();
        eleDetailsCell.innerHTML = animal.toString();

        const eleButtonCell = row.insertCell();

        const eleDeleteBtn = document.createElement('button');
        eleDeleteBtn.classList.add('btn', 'btn-danger');
        const eleDeleteIcon = document.createElement('i');
        eleDeleteIcon.classList.add('fa-solid', 'fa-times');
        eleDeleteBtn.append(eleDeleteIcon);

        eleDeleteBtn.addEventListener('click', onDeleteClick(animal));

        const eleEditLink = document.createElement('a');
        eleEditLink.classList.add('btn', 'btn-primary', 'mx-1');
        const eleEditIcon = document.createElement('i');
        eleEditIcon.classList.add('fa-solid', 'fa-edit');
        eleEditLink.append(eleEditIcon);
        eleEditLink.setAttribute('href', `add.html?id=${animal.id}`);
       
       if (animal.owner.bannerId === myID) {
            eleButtonCell.append(eleDeleteBtn);
            eleButtonCell.append(eleEditLink);
       }
    }
}

function onConfirm(animal) {
    return async event => {
        try {
            document.getElementById('x-icon').classList.add('d-none');
            document.getElementById('spin-delete-icon').classList.remove('d-none');
            document.getElementById('delete-button').disabled = true;
            
            await AnimalService.waitTho(3000);
            await AnimalService.deleteAnimal(animal);
            
            window.location = 'list.html';
        } catch (error) {
            console.log(error);
            eleMessageBox.classList.remove('d-none');
            eleMessageBox.textContent = error.message;
        }
    }
}

function onShow(animal) {
    return event => {
        document.querySelector("#confirmation .btn-danger")
            .addEventListener('click', onConfirm(animal));
    }
}

function onDeleteClick(animal) {
    return event => {
        const eleModalWindow = document.getElementById('confirmationModal');
        const modal = new bootstrap.Modal('#confirmationModal');
        eleModalWindow.addEventListener('show.bs.modal', onShow(animal));
        modal.show();
    }
}
