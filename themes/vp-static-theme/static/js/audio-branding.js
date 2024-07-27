import Grid from "./shared/grid.js";

(function () {
    new Grid(document.querySelector('.grid'), document.querySelectorAll('.grid-item'), 2).init({
        '(max-width: 42em)': 2,
        '(min-width: 42em)': 3,
    });
})();

const reviewModal = document.querySelector("#review-modal");
const reviewOpenModal = document.querySelectorAll("#review-modal-open");
const reviewCloseModal = document.querySelectorAll("#review-modal-close");


reviewOpenModal.forEach((item) => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.appendChild(reviewModal);
        reviewModal.classList.remove('hidden');
        let modalData = e.getAttribute('data-parent');
        console.log(modalData);
        let modalEl = document.querySelector('.review-modal[data-parent="' + modalData + '"]');
    })
})

// reviewOpenModal.addEventListener('click', () => {
//     console.log(reviewModal);
//     document.body.appendChild(reviewModal);
//     reviewModal.classList.remove('hidden');
// });

// reviewCloseModal.addEventListener('click', () => {
//     reviewModal.remove();
// });


