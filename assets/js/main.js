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
 */
const dialogHandler = (target) => {
  if (!target) throw Error("Cannot find target element");

  const container = document.getElementById(target.getAttribute("aria-controls"));

  if (!container) throw Error("Cannot find  container element");

  const openDialog = () => {
    target.classList.add("open");
    target.setAttribute("aria-expanded", true);

    container.classList.add("open");
    container.removeAttribute("inert");

    const modalBoundary = container.dataset.modalTill;

    if (window.matchMedia(`(max-width: ${modalBoundary})`).matches) {
      document.querySelector("body").classList.add('modal-open');
    }
  };

  const closeDialog = () => {
    target.classList.remove("open");
    target.setAttribute("aria-expanded", false);

    container.classList.remove("open");
    container.setAttribute("inert", true);

    document.querySelector("body").classList.remove('modal-open');

    console.log('closeDialog');

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
    const isClickedOutsideContainer = clickOutside(container, ev);
    const isDialogOpen = target.classList.contains("open");

    if (isClickedOutsideContainer && isDialogOpen && ev.target !== target) {
      closeDialog();
    }
  });
};

const findMobileMenuDialog = () => {
  const button = document.getElementById("mobile-menu-button");

  if (!button) return;

  dialogHandler(button);
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

const modals = () => {
  const modalButtons = document.querySelectorAll("[data-modal-id]");
  const modalRoot = document.querySelector("[data-modal-root]");

  modalButtons.forEach(button => {
    button.addEventListener("click", () => {
      const modalID = button.dataset.modalId;
      const modalContent = document.querySelector(`[data-modal="${modalID}"]`);

      if (!modalContent || !modalRoot) {
        return;
      }

      const content = modalContent.cloneNode(true);

      content.querySelector("[data-modal-close]").addEventListener("click", () => {
        modalRoot.replaceChildren();
        document.querySelector("body").classList.remove("modal-open");
      });

      document.querySelector("body").classList.add("modal-open");
      content.classList.remove("hidden");
      modalRoot.replaceChildren(content);
    })
  })
}

modals();

const cookiesAlertHanlder = () => {
  const cookiesAlert = document.querySelector("#cookies-alert");
  const closeButton = document.querySelector("#cookies-alert-close");
  const applyButton = document.querySelector("#cookies-alert-apply");

  if (!localStorage || !cookiesAlert || !closeButton || !applyButton) return;

  const isAlertHidden = localStorage.getItem('hideCookiesAlert') == 1;

  if (!isAlertHidden) {
    cookiesAlert.classList.remove('hidden');
  }

  const hideCookiesAlert = () => {
    localStorage.setItem('hideCookiesAlert', 1);
    cookiesAlert.classList.add('hidden');
  }

  closeButton.addEventListener('click', hideCookiesAlert);
  applyButton.addEventListener('click', hideCookiesAlert);
}

cookiesAlertHanlder();