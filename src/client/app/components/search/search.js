import template from "./search.ejs";
import AnimalService from "../../services/animal.service.js";

export default async (route) => {
    const { pagination, records } = await initialize(route);
    render(records, pagination);
};

async function initialize(route) {
    const { page = 1, perPage = 5 } = route.params ?? {};
    const response = await AnimalService.getAnimals(page, perPage);
    return response;
}

function render(records, pagination) {
    console.log("Animal IDs on this page:", records.map(a => a._id));
    const container = document.querySelector("#app");
    container.innerHTML = template({ records, pagination });

    // Hook up delete buttons
    document.querySelectorAll(".btn-danger[data-id]").forEach(button => {
        button.addEventListener("click", (event) => {
            const id = button.getAttribute("data-id");
            onDeleteClick(id)(event);
        });
    });
}

function onDeleteClick(animalID) {
    return event => {
        const modalEl = document.getElementById('confirmationModal');
        const modal = new bootstrap.Modal(modalEl);

        const confirmBtn = modalEl.querySelector('#delete-button');
        const xIcon = modalEl.querySelector('#x-icon');
        const spinIcon = modalEl.querySelector('#spin-delete-icon');

        // Reset icons
        xIcon.classList.remove('d-none');
        spinIcon.classList.add('d-none');
        confirmBtn.disabled = false;

        // Remove previous listeners to avoid stacking
        const newConfirm = async () => {
            try {
                xIcon.classList.add('d-none');
                spinIcon.classList.remove('d-none');
                confirmBtn.disabled = true;

                await AnimalService.waitTho(500); // optional delay
                await AnimalService.deleteAnimal(animalID);

                window.location.reload();
            } catch (error) {
                alert("Error deleting animal: " + error.message);
            }
        };
        confirmBtn.replaceWith(confirmBtn.cloneNode(true)); // remove old listener
        modalEl.querySelector('#delete-button').addEventListener('click', newConfirm);

        modal.show();
    };
}
