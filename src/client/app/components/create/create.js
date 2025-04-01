import template from './create.ejs';

export default (route) => {

    console.log('index',route);
    const html = template();
    document.getElementById('app').innerHTML = html
}
