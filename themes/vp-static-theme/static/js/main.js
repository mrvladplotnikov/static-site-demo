'use strict';
/**
 * Returns true when click outside of element
 * @param {Element} element 
 * @param {MouseEvent} event
 * @returns {boolean}
 */
const clickOutside = (element, event) => {
  if (!element.contains(event.target)) {
    return true;
  }

  return false;
}

/**
 * @param {Element | null} target - button element should have "aria-expanded" attribute
 * @param {[string, string]} targetLabel - target aria-label values [0] for open state [1] for closed state
 */
const dialogHandler = (target, targetLabel) => {
  if (!target) throw Error("Cannot find target element");

  const container = document.getElementById(target.getAttribute("aria-controls"));

  if (!container) throw Error("Cannot find  container element");

  const openDialog = () => {
    target.classList.add("open");
    target.setAttribute("aria-expanded", true);
    target.setAttribute("aria-label", targetLabel[1]);

    container.classList.add("open");
    container.removeAttribute("inert");
  };

  const closeDialog = () => {
    target.classList.remove("open");
    target.setAttribute("aria-expanded", false);
    target.setAttribute("aria-label", targetLabel[0]);

    container.classList.remove("open");
    container.setAttribute("inert", true);
  };

  target.addEventListener("click", function (ev) {
    ev.stopPropagation();

    const isContainerOpen = this.getAttribute("aria-expanded") === "true" ? true : false;

    if (isContainerOpen) {
      closeDialog();
    } else {
      openDialog();
    }
  });


  // Adding click outside event listener
  document.body.addEventListener('click', ev => {
    ev.stopPropagation();
    const isClickedOutsideContainer = clickOutside(container, ev);

    if (isClickedOutsideContainer && ev.target !== target) {
      closeDialog();
    }
  });
};

const findMobileMenuDialog = () => {
  const button = document.getElementById("mobile-menu-button");

  if (!button) return;

  dialogHandler(button, ["Відкрити навігаційне меню сайту", "Закрити навігаційне меню сайту"]);
}

/**
 * @param {HTMLElement} media 
 * @returns {string} media url
 */
const parseMediaURL = (media) => {
  return media.dataset.mediaId;
};

/**
 * @param {string} id 
 * @returns {string} youtube embed url
 */
function generateYoutubeURL(id) {
  let query = '?rel=0&showinfo=0&autoplay=1';

  return 'https://www.youtube.com/embed/' + id + query;
}

/**
 * @param {string} id video id
 * @returns {HTMLIFrameElement} iframe element
 */
const createIframe = (id) => {
  let iframe = document.createElement('iframe');

  iframe.setAttribute('allowfullscreen', '');
  iframe.setAttribute('allow', 'autoplay');
  iframe.setAttribute('src', generateYoutubeURL(id));

  return iframe;
}

/**
 * @param {HTMLElement} video parent element
 */
const setupVideo = (video) => {
  const link = video.querySelector('[data-media-link]');
  const button = video.querySelector('[data-media-button]');
  const id = parseMediaURL(video);

  video.addEventListener('click', () => {
      let iframe = createIframe(id);

      link.remove();
      button.remove();
      video.appendChild(iframe);
  });

  link.removeAttribute('href');
  video.dataset.mediaEnabled = true;
};


const findVideos = () => {
  const videos = document.querySelectorAll('[data-media-id]');
  videos.forEach((video) => setupVideo(video));
}


// Entry point
(() => {
  findMobileMenuDialog();
  findVideos();
})();


window.addEventListener("load", () => {
  document.querySelector("body").classList.add("loaded");
});