import Grid from "./shared/grid.js";

(function () {
    new Grid(document.querySelector('.grid'), document.querySelectorAll('.grid-item'), 2).init({
        '(max-width: 42em)': 2,
        '(min-width: 42em)': 3,
        '(min-width: 60em)': 4,
        '(min-width: 81em)': 5,
    });


    function homePageNavMenu() {
        const mobileMenu = document.querySelector("#mobile-menu-button");
        const desktopMenu = document.querySelector("#horizontal-nav");

        // desktopMenu hidden by default
        desktopMenu.setAttribute('inert', true);

        document.addEventListener("scrollend", () => {
            const firstSectionHeight = window.innerHeight;
            const width = window.innerWidth;
            const scrolled = window.scrollY;

            const isSeccondSection = scrolled > firstSectionHeight;
            const isLargeScreen = width >= 1200;



            mobileMenu.classList.toggle('hidden', isSeccondSection && isLargeScreen);

            desktopMenu.classList.toggle('visible', isSeccondSection && isLargeScreen);
            desktopMenu.toggleAttribute('inert', !isSeccondSection && isLargeScreen);
        });
    };

    homePageNavMenu();
})();
