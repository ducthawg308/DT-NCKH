// Chức năng cho navbar khi cuộn
window.addEventListener('scroll', function() {
    var header = document.querySelector('.header');
  
    var scrollPosition = window.scrollY;
  
    if (scrollPosition > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
});


