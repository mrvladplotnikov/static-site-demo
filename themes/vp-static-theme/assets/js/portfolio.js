import Grid from "./shared/grid.js";

(function () {
    /**
     * @param {NodeListOf<HTMLElement>} works 
     * @param {string} category current category value
     * @param {string} service current service value
     * @returns {NodeListOf<HTMLElement>}
     */
    function filterWorks(works = [], category, service) {
        return Array.from(works).reduce((acc, workEl) => {
            const workCategories = workEl.dataset.categories || "";
            const workServices = workEl.dataset.services || "";
            const isSelected = workCategories.includes(category || "") && workServices.includes(service || "");

            if (!isSelected) {
                return acc;
            }

            return acc.concat(workEl);
        }, []);
    }

    const urlKeys = {
        category: "category",
        service: "service",
    };

    // Intial Page Data
    const gridEl = document.querySelector('.grid');
    const gridItemsEl = document.querySelectorAll('.grid-item');
    const initialSearchParams = new URLSearchParams(window.location.search);
    const initialCategory = initialSearchParams.get(urlKeys.category) || "";
    const initialService = initialSearchParams.get(urlKeys.service) || "";

    const filteredIWorks = filterWorks(gridItemsEl, initialCategory, initialService);

    const grid = new Grid(gridEl, filteredIWorks, 2).init({
        '(min-width: 1696px)': 5,
    });

    /**
     * @param {Record<string, string>} params 
     */
    function updateSelectedWorks(params = {}) {
        const searchParams = new URLSearchParams(window.location.search);
        let url = window.location.pathname;

        Object.keys(params).forEach(key => {
            const isEmptyValue = !params[key];

            if (isEmptyValue) {
                searchParams.delete(key);
            } else {
                searchParams.set(key, params[key]);
            }
        });

        if (searchParams.size > 0) {
            url = "?" + searchParams.toString();
        }

        history.pushState(null, "", url); // changing url 

        const updatedWorks = filterWorks(
            gridItemsEl,
            searchParams.get(urlKeys.category),
            searchParams.get(urlKeys.service)
        );

        // re-generating grid of works
        grid.updateGrid(updatedWorks);
    }

    /**
     * 
     * @param {{ value: string; }[]} select
     * @returns {string}
     */
    function getSelectValue(select) {
        if (Array.isArray(select) && select.length > 0) {
            return select[0].value;
        }

        return '';
    }

    const worksCategorySelectEl = document.querySelector("#works-category-select");
    const worksServiceSelectEl = document.querySelector("#works-service-select");

    if (worksCategorySelectEl && worksServiceSelectEl) {
        const worksCategorySelect = new SlimSelect({
            select: worksCategorySelectEl,
            settings: {
                showSearch: false,
                allowDeselect: false,
                hideSelected: true,
            },
            events: {
                afterChange: (value) => {
                    const category = getSelectValue(value);
                    updateSelectedWorks({ category });
                }
            }
        });
        worksCategorySelect.setSelected(initialCategory);

        const worksServiceSelect = new SlimSelect({
            select: worksServiceSelectEl,
            settings: {
                showSearch: false,
                allowDeselect: false,
                hideSelected: true,
            },
            events: {
                afterChange: (value) => {
                    const service = getSelectValue(value);
                    updateSelectedWorks({ service });
                }
            }
        });
        worksServiceSelect.setSelected(initialService);

        document.querySelector("#works-reset").addEventListener('click', () => {
            worksCategorySelect.setSelected('');
            worksServiceSelect.setSelected('');
        });
    }
})();