import Grid from "./shared/grid.js";

(function () {
    new Grid(document.querySelector('.grid'), document.querySelectorAll('.grid-item'), 2).init({
        '(max-width: 42em)': 2,
        '(min-width: 42em)': 3,
    });
})();