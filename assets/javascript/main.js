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

// Event khi ấn vào user
var userImg = document.querySelector(".navbar__user-img");
var userMenu = document.querySelector(".header__navbar-user-list");
var menuVisible = false;

userImg.onclick = function () {
  menuVisible = !menuVisible;
  userMenu.style.display = menuVisible ? "block" : "none";
};

document.onclick = function (event) {
  // Kiểm tra nếu người dùng đã click ra khỏi header__navbar-user-list
  if (!userMenu.contains(event.target) && event.target !== userImg) {
    menuVisible = false;
    userMenu.style.display = "none";
  }
};


