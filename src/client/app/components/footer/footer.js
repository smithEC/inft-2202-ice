import template from './footer.ejs';

export default (route) => {

    console.log('index',route);
    const html = template();
    document.getElementById('app').insertAdjacentHTML('afterEnd',html);
   

}
