import Grid from "./shared/grid.js";

/**
 * 
 * @param {Function} callee 
 * @param {number} timeout 
 */
function throttle(callee, timeout) {
    let timer = null

    return function perform(...args) {
        if (timer) return

        timer = setTimeout(() => {
            callee(...args)

            clearTimeout(timer)
            timer = null
        }, timeout)
    }
}


(function () {
    new Grid(document.querySelector('.grid'), document.querySelectorAll('.grid-item'), 2).init({
        '(max-width: 42em)': 2,
        '(min-width: 42em)': 3,
        '(min-width: 60em)': 4,
        '(min-width: 81em)': 5,
    });


    function homePageNavMenu() {
        const mobileMenu = document.querySelector("#mobile-nav");
        const mobileMenuButton = document.querySelector("#mobile-menu-button");
        const desktopMenu = document.querySelector("#horizontal-nav");

        // desktopMenu hidden by default
        desktopMenu.setAttribute('inert', true);

        const handleHomeMenu = () => {
            const firstSectionHeight = window.innerHeight;
            const width = window.innerWidth;
            const scrolled = window.scrollY;

            const isSeccondSection = scrolled > firstSectionHeight;
            const isLargeScreen = width >= 1200;



            mobileMenuButton.classList.toggle('hidden', isSeccondSection && isLargeScreen);
            mobileMenu.classList.toggle('scrolled', isSeccondSection && !isLargeScreen);

            desktopMenu.classList.toggle('visible', isSeccondSection && isLargeScreen);
            desktopMenu.toggleAttribute('inert', !isSeccondSection && isLargeScreen);
        };

        document.addEventListener("scroll", throttle(handleHomeMenu, 500));
        document.addEventListener("resize", throttle(handleHomeMenu, 500));
    };

    homePageNavMenu();
})();
