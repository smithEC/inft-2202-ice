import template from './about.ejs';

export default (route) => {

    console.log('index',route);
    const html = template();
    document.getElementById('app').innerHTML = html
}
