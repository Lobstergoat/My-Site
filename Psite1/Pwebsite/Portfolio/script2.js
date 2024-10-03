//Navigation bar for responsive view
const menuBtn = document.querySelector(".nav-menu-btn");
const closeBtn = document.querySelector(".nav-close-btn");
const navigation = document.querySelector(".navigation");
const navItems = document.querySelectorAll(".nav-items a");

menuBtn.addEventListener("click", () => {
    navigation.classList.add("active");
});

closeBtn.addEventListener("click", () => {
    navigation.classList.remove("active");
});

navItems.forEach((navItems) => {
    navigation.classList.remove("active");
});

//scroll reveal

ScrollReveal({
    distance: '60px',
    duration: 1000,
    delay: 100
});

ScrollReveal().reveal('.home .info h2, .section-title-02', { delay: 100, origin: 'left' });
ScrollReveal().reveal('.home .info h3, .home .info p, .about-info, .btn', { delay: 100, origin: 'right' });
ScrollReveal().reveal('.media-icons i, .contact-left li', { delay: 100, origin: 'left', interval: 200 });
ScrollReveal().reveal('.about, .text-container .description, .contact-right', { delay: 200, origin: 'right' });
ScrollReveal().reveal('#about-title', { delay: 200, origin: 'left', interval: 200 });
ScrollReveal().reveal('.footer, .group', { delay: 100, origin: 'top', interval: 200 });
ScrollReveal().reveal('.contact-left h2', { delay: 400, origin: 'left' });
ScrollReveal().reveal('.service-container, .skills-container', { delay: 100, origin: 'bottom', interval: 200 });


//Hide navbar on scroll
let lastScrollTop;
navbar = document.getElementById('nav-bar');
window.addEventListener('scroll', function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        navbar.style.top = '-80px';
    }
    else {
        navbar.style.top = '0';
    }
    lastScrollTop = scrollTop;
});
