const body = document.body;

var i = 0;

body.style = `opacity: ${i};`;



window.onload = () => {
    setTimeout(() => {
        i = '0.25';
        body.style = `opacity: ${i}`;
    }, 50);

    setTimeout(() => {
        i = '0.5';
        body.style = `opacity: ${i}`;
    }, 100);
    
    setTimeout(() => {
        i = '0.75';
        body.style = `opacity: ${i}`;
    }, 150);
    setTimeout(() => {
        i = '1';
        body.style = `opacity: ${i}`;
    }, 200);

};