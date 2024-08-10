const summary = document.querySelectorAll('summary');

summary.forEach((summaryEl) => {
    summaryEl.addEventListener('click', closeOpenedDetails);

});

function closeOpenedDetails() {
    summary.forEach((summaryEl) => {
        let detail = summaryEl.parentNode;
        if (detail != this.parentNode) {
            detail.removeAttribute('open');
        }
    });
}