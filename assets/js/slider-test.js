'use strict';

const slider = document.querySelector('.team-slides');
const currentPostionEl = document.querySelector('.slide-number-current');
const totalPositionEl = document.querySelector('.slide-number-max')


const prev = document.querySelector('.prev');
const next = document.querySelector('.next');

let direction;
let lastPosition = 1;


// function updateCurrentPostion(position = 0) {
//     currentPostionEl.innerHTML = position.toString().length === 2 ? position : `0${position}`;
//     lastPosition = position;
// }

// prev.addEventListener('click', function () {
// if (direction === -1) {
//     slider.append(slider.firstElementChild);
// }
// direction = 1;
// carousel.style.justifyContent = 'flex-end'
// lastPosition -= 1;

// console.log(lastPosition);

// slider.style.transform = `translateX(-${itemWidth * lastPosition}px)`;
// });

// next.addEventListener('click', function () {
//     // if (direction === 1) {
//     //     slider.prepend(slider.lastElementChild);
//     // }
//     // direction = -1;
//     // carousel.style.justifyContent = 'flex-start'


//     if (lastPosition === itemsCount) {
//         lastElementReached = true;
//         lastPosition = 1;
//     }

//     if (lastElementReached) {
//         slider.append(slider.firstElementChild);
//         updateCurrentPostion(lastPosition);
//         lastPosition += 1;
//     } else {
//         lastPosition += 1;
//         move(slider, lastPosition, false);
//         updateCurrentPostion(lastPosition);
//     }
// });


// slider.addEventListener('transitionend', function () {
//     console.log('as');
// if (direction === -1) {
//     slider.append(slider.firstElementChild);
// } else if (direction === 1) {
//     slider.prepend(slider.lastElementChild);
// }

// slider.style.transition = 'none';
// slider.style.transform = 'translate(0)';
// setTimeout(() => {
//     slider.style.transition = 'all 0.4s';
// })
// });

// Swipe

// slider.addEventListener('pointerdown', e => {
//     slider.style.transform = `translate${e.clientX * 100}%`

// });


// slider.addEventListener('pointerdown', e => {

//     slider.setPointerCapture(e.pointerId);
//     console.log('sliderRect')
//     function moveHandler(e) {
//         const sliderRect = sliderContainer.getBoundingClientRect();
//         console.log(sliderRect)
//         let newLeft = e.clientX - sliderRect.left;

//         if (newLeft < 0) {
//             newLeft = 0;
//         } else if (newLeft > sliderRect.width) {
//             newLeft = sliderRect.width;
//         }

//         slider.style.transform = `translate3d(-${newLeft}px, 0px, 0px)`;
//     };

//     function upHandler() {
//         slider.removeEventListener('pointermove', moveHandler);
//         slider.removeEventListener('pointerup', upHandler);
//         slider.removeEventListener('pointercancel', upHandler);
//     };

//     slider.removeEventListener('pointermove', moveHandler);
//     slider.removeEventListener('pointerup', upHandler);
//     slider.removeEventListener('pointercancel', upHandler);


// });

// setPointerPosition(e);
// slider.addEventListener('pointermove', setPointerPosition);
// slider.addEventListener('pointerup', () => {
//     slider.removeEventListener('pointermove', setPointerPosition);
// })


let initialPosition = null;
let isMoving = false;

slider.addEventListener('pointerdown', pointStart => {
    initialPosition = pointStart.clientX;
    isMoving = true;
    slider.setPointerCapture(pointStart.pointerId);
    console.log(initialPosition);
})

slider.addEventListener('pointermove', pointMove => {
    if (isMoving) {
        const currentPostion = pointMove.clientX;
        const diff = initialPosition - currentPostion;
        slider.style.transform = `translate3d(-${diff}px, 0px, 0px)`;
    }

});

slider.addEventListener('pointerup', () => {
    isMoving = false;
});

slider.addEventListener('pointercancel', () => {

});
// function setPointerPosition(e) {
//     slider.style.transform = `translate3d(-${e.clientX}px, 0px, 0px)`

// }

totalPositionEl.innerHTML = slider.children.length >= 10 ? slider.children.length : `0${slider.children.length}`;

/**
 * 
 * @param {HTMLElement} slideEl 
 */
function updateCurrentSlidePostion(slideEl) {
    const slideIndex = slideEl ? Number(slideEl.dataset.slideIndex) + 1 : 0;
    currentPostionEl.innerHTML = slideIndex >= 10 ? slideIndex : `0${slideIndex}`;
}

/**
 * 
 * @param {HTMLElement} sliderEl 
 * @param {HTMLElement} counterEl 
 * @param {HTMLButtonElement} prevButtonEl 
 * @param {HTMLButtonElement} nextButtonEl 
 */
function initSlider(sliderEl, counterEl, prevButtonEl, nextButtonEl) {
    let position = 0;
    let lastElementReached = false;
    let firstElementReached = false;
    let isAnimationEnded = true;
    const itemsCount = slider.childElementCount

    /**
     * 
     * @param {HTMLElement} slider 
     * @param {number} position 
     * @param {boolean} skipAnimation 
     */
    function move(slider, position = 0, skipAnimation = false) {
        const slide = position === 0 ? slider.children[0] : slider.children[position - 1];
        const itemWidth = slide.getBoundingClientRect().width + 16;

        if (!skipAnimation) {
            isAnimationEnded = false;
            slider.style.transitionDuration = '400ms';
        }
        slider.style.transform = `translate3d(-${itemWidth * position}px, 0px, 0px)`;

        updateCurrentSlidePostion(slider.children[position]);
    }

    Array.from(sliderEl.children).forEach((slide, index) => {
        slide.dataset.slideIndex = index;
    });

    sliderEl.addEventListener('transitionend', function () {
        isAnimationEnded = true;

        sliderEl.style.transitionDuration = '0ms';
        sliderEl.style.transitionDelay = '0ms';

        if (lastElementReached) {
            slider.lastElementChild.remove();
            move(sliderEl, 0, true);
            lastElementReached = false;
        }
        if (firstElementReached) {
            slider.firstElementChild.remove();
            move(sliderEl, itemsCount - 1, true);
            firstElementReached = false;
        }
    });

    prevButtonEl.addEventListener('click', function () {
        if (!isAnimationEnded) return;

        if (position === 0) {
            firstElementReached = true;
            position = itemsCount - 1;
        }

        if (firstElementReached) {
            const el = sliderEl.lastElementChild;

            slider.prepend(el.cloneNode(true));
            move(sliderEl, 1, true);
            move(sliderEl, 0);
        } else {
            position -= 1;
            move(sliderEl, position, false);
        }
    });

    nextButtonEl.addEventListener('click', function () {
        if (!isAnimationEnded) return;

        if (position + 1 === itemsCount) {
            lastElementReached = true;
            position = 0;
        }

        if (lastElementReached) {
            const el = sliderEl.firstElementChild;

            slider.append(el.cloneNode(true));
            move(sliderEl, itemsCount, false);
        } else {
            position += 1;
            move(sliderEl, position, false);
        }
    });
}

initSlider(slider, currentPostionEl, prev, next);