export default async (route) => {
    const { pagination, records } = await initialize(route);
    render();
}

async function initialize(route) {
    const { page = 1, perPage = 5 } = route.params ?? {};
    const response = await AnimalService.getAnimals(page, perPage);
    console.log(response);
    return response;
}

function render() {
    const container = document.querySelector('#app');
    container.innerHTML = template({});
}