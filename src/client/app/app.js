/*
    Name: Connor Smith
    filename: app.js
    Course: INFT 2202
    Date: January 9, 2025
    Description: This is my general application script.  Functions that are required on every page should live here.
*/

const yearElement = document.getElementById('copyright');
const currentYearText = document.createTextNode(new Date().getFullYear());


yearElement.appendChild(currentYearText);