
let burderBtn = document.getElementById('burgerBtn');
let burgerMenu = document.getElementById('burgerMenu');
let blackout = document.getElementById('blackout');
let closeMenu = document.getElementById('closeMenu');

burderBtn.addEventListener('click', () => {
  blackout.classList.add('open');
  burgerMenu.classList.add('active')
})

blackout.addEventListener('click', () => {
  blackout.classList.remove('open');
  burgerMenu.classList.remove('active')
})

closeMenu.addEventListener('click', () => {
  blackout.classList.remove('open');
  burgerMenu.classList.remove('active')
})




// ACCORDION
let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    let panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
    } 
  });
}


