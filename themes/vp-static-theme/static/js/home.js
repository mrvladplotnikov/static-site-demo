import Grid from "./shared/grid.js";

new Grid(document.querySelector('.grid'), document.querySelectorAll('.grid-item'), 2).init({
    '(max-width: 42em)': 2,
    '(min-width: 42em)': 3,
    '(min-width: 60em)': 4,
    '(min-width: 81em)': 5,
});
