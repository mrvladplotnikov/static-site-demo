const formatSlideNumber = (num) => num < 10 ? `0${num}` : num;

const swiper = new Swiper('.slider', {
    loop: true,
    navigation: {
        nextEl: '.next',
        prevEl: '.prev'
    },
    pagination: {
        type: 'fraction',
        el: '.slide-position',
        formatFractionCurrent: formatSlideNumber,
        formatFractionTotal: formatSlideNumber,
        renderFraction: function (currentClass, totalClass) {
            return '<span class="slide-number-current ' + currentClass + '"></span>' +
                '/' +
                '<span class="slide-number-max ' + totalClass + '"></span>';
        }
    }
});