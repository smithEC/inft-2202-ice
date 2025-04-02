import Navigo from "navigo";
import HomePage from './app/components/home/home.js';
import AboutPage from './app/components/about/about.js';
 
import HeaderComponents from './app/components/header/header.js';
import FooterComponents from './app/components/footer/footer.js';
import ContactPage from './app/components/contact/contact.js';
import SearchPage from './app/components/search/search.js';
import CreatePage from './app/components/create/create.js';
 
 
import * as bootstrap from 'bootstrap';
window.bootstrap = bootstrap;

import './scss/styles.scss';
 
const router = new Navigo('/', { hash: true });
window.addEventListener('load', () => {
 
HeaderComponents();
FooterComponents();
 
 
router
     .on('/', HomePage)
     .on('/about', AboutPage )
     .on('/search', SearchPage )
     .on('/create', CreatePage )
     .on('/contact', ContactPage )

     .resolve();
});