import Grid from "./shared/grid.js";

const gridEl = document.querySelector('.grid');
const gridItemEl = document.querySelectorAll('.grid-item');

if (gridEl && gridItemEl) {
    new Grid(gridEl, gridItemEl, 2).init({
        '(min-width: 1696px)': 3,
    });
}