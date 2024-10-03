//Navigation bar effects on scroll
window.addEventListener("scroll", function () {
    const header = document.querySelector("header");
    header.classList.toggle("stciky", window.scrollY > 0);
});


//Navigation menu items active on scroll
window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll('section');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        let sectionHeight = current.offsetHeight;
        let sectionTop = current.offsetTop - 50;
        let id = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector(".nav-items a[href*=" + id + "]").classList.add("active");
        }
        else {
            document.querySelector(".nav-items a[href*=" + id + "]").classList.remove("active");
        }
    });
});

//theme change
const themeChanger = document.querySelector(".theme-btn");
themeChanger.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    themeChanger.classList.toggle("sun");
    changeTheme();

});

const regenBackground = document.querySelector(".bg-btn");
regenBackground.addEventListener("click", () => {
    genHMap();
    draw();
});
