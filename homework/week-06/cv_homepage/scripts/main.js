//Sticky navbar on scroll
/*
window.addEventListener("scroll", function() {
  const currentScroll = window.pageYOffset;
    let navbar = document.querySelector("nav");
    navbar.classList.toggle("sticky", window.scrollY > 0);
});
*/
/*
const checkpoint = 200;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  if (currentScroll <= checkpoint) {
    opacity = 1 - currentScroll / checkpoint;
    console.log(currentScroll)
  } else {
    opacity = 0;
  }
  document.querySelector(".front").style.opacity = opacity;
});*/


const threshold = 200;
window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;
  console.log(currentScroll)
  if (currentScroll >= threshold) {
    document.querySelector(".front").style.opacity = 0;
    document.querySelector("#backimage").style.opacity = 1;
  } 
});


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