import Grid from "./shared/grid.js";
import { throttle } from "./shared/throttle.js";

new Grid(document.querySelector('.grid'), document.querySelectorAll('.grid-item'), 2).init({
    '(min-width: 1696px)': 5,
});

const desktopMenu = document.querySelector("#horizontal-nav");
// on the home page desktopMenu hidden by default
desktopMenu.setAttribute('inert', true);

// on the home page for the first section we displaying only mobile menu
// when user scrolls to the next section moble menu should be replaced with desktopMenu
function handleHomeMenu() {
    const firstSectionHeight = window.innerHeight;
    const isSeccondSection = window.scrollY > firstSectionHeight;
    const isLargeScreen = window.innerWidth >= 1200;

    document.querySelector("#mobile-nav").classList.toggle(
        'hidden', isSeccondSection && isLargeScreen
    );

    document.querySelector("#mobile-nav").classList.toggle(
        'scrolled', isSeccondSection && !isLargeScreen
    );


    desktopMenu.classList.toggle('visible', isSeccondSection && isLargeScreen);
    desktopMenu.toggleAttribute('inert', !isSeccondSection && isLargeScreen);
};

document.addEventListener("scroll", throttle(handleHomeMenu, 500));
document.addEventListener("resize", throttle(handleHomeMenu, 500));