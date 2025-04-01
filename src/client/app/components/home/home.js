import template from './home.ejs';
//import '../../../img/imagename.imgextentiion'// i need to do this for every image
export default (route) => {

    console.log('index',route);
    const html = template();
    document.getElementById('app').innerHTML = html;
}
