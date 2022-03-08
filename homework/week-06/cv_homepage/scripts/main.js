//Sticky navbar on scroll
window.addEventListener("scroll", function() {
    let navbar = document.querySelector("nav");
    navbar.classList.toggle("sticky", window.scrollY > 0);
});

//Typewriter effect for element with id 'sticky'
/*
let i = 0;
let txt = document.getElementById("typewriter").innerHTML;
let speed = 60;

document.getElementById("typewriter").innerHTML = "";
function typeWriter() {
  if (i < txt.length) {
     
    document.getElementById("typewriter").innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

typeWriter();
*/

let elementsArray = document.querySelectorAll(".fadeIn");
window.addEventListener('scroll', fadeIn ); 
function fadeIn() {
    for (var i = 0; i < elementsArray.length; i++) {
        var elem = elementsArray[i]
        var distInView = elem.getBoundingClientRect().top - window.innerHeight + 20;
        if (distInView < 0) {
            elem.classList.add("inView");
        } 
    }
}
fadeIn();