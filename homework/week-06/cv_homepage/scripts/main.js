const threshold = 200;

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll >= threshold) {
    document.querySelector(".front").style.opacity = 0;
    document.querySelector("#backimage").style.opacity = 0.8;
  } 
});


let elementsArray = document.querySelectorAll(".fadeIn");

window.addEventListener('scroll', fadeIn ); 
function fadeIn() {
    for (var i = 0; i < elementsArray.length; i++) {
        var elem = elementsArray[i]
        var distInView = elem.getBoundingClientRect().top - window.innerHeight + 150;
        if (distInView < 0) {
            elem.classList.add("inView");
        } 
    }
}

fadeIn();