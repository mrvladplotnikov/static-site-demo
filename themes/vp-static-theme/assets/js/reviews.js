import Grid from "./shared/grid.js";

new Grid(
    document.querySelector('.grid'),
    document.querySelectorAll('.grid-item'),
    1).init({
        '(max-width: 450px)': 1,
        '(min-width: 451px)': 2,
        '(min-width: 501px)': 3,
        '(min-width: 701px)': 5,
    });

const handleReviewModalOpen = (event) => {
    const modalID = event.target.dataset.reviewModalId;
    const modalRoot = document.querySelector("[data-modal-root]");
    const modalContent = document.querySelector("[data-review-modal]");

    if (!modalID || !modalContent || !modalRoot) {
        return;
    }

    const content = modalContent.cloneNode(true);
    const closeButton = content.querySelector("[data-modal-close]");

    content.setAttribute("data-modal", modalID);
    closeButton.setAttribute("data-modal", modalID);

    closeButton.addEventListener("click", () => {
        modalRoot.replaceChildren()
        document.querySelector("body").classList.remove("modal-open");
    });

    const img = document.createElement("img");

    img.src = modalID;

    content.querySelector(".modal-content").appendChild(img);

    content.classList.remove("hidden");
    modalRoot.replaceChildren(content);

    document.querySelector("body").classList.add("modal-open");
}

document.querySelectorAll("[data-review-modal-id]").forEach(button => {
    button.addEventListener('click', handleReviewModalOpen);
});