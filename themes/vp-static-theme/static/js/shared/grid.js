class Grid {
  grid = {};

  breakPoints = {};

  columnsCount = 1;

  static columnNameTemplate = 'column-';

  constructor(gridEl, dataNodes = [], count = 1) {
    this.gridEl = gridEl;
    this.dataNodes = dataNodes;
    this.columnsCount = count;
  }

  init(breakPoints = {}) {
    if (Object.keys(breakPoints).length > 0) {
      const mediaQueryList = Object.keys(breakPoints).map((media) => window.matchMedia(media));

      mediaQueryList.forEach((mediaQuery) => {
        if (mediaQuery.matches) {
          this.columnsCount = breakPoints[mediaQuery.media];

          this.generateColumns();
        }

        mediaQuery.addEventListener('change', (e) => {
          this.columnsCount = e.matches ? breakPoints[e.media] : this.columnsCount;

          this.generateColumns();
        });
      });
    } else {
      this.generateColumns();
    }
  }

  clearGrid() {
    this.gridEl.innerHTML = '';
  }

  sortDataPerColumn() {
    const tempGrid = {};

    for (let i = 0; i < this.columnsCount; i++) {
      tempGrid[`${this.columnNameTemplate}${i}`] = [];
    }

    for (let i = 0; i < this.dataNodes.length; i++) {
      const columnIndex = i % this.columnsCount;
      tempGrid[`${this.columnNameTemplate}${columnIndex}`].push(this.dataNodes[i]);
    }

    this.grid = tempGrid;
  }

  generateColumns() {
    this.clearGrid();
    this.sortDataPerColumn();

    const columnsCount = Object.keys(this.grid).length;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < columnsCount; i++) {
      const columnData = this.grid[`${this.columnNameTemplate}${i}`];
      const columnEl = document.createElement('div');
      columnEl.classList.add('column');

      columnData.forEach((item) => {
        columnEl.appendChild(item);
      });

      fragment.appendChild(columnEl);
    }

    this.gridEl.appendChild(fragment);
  }
}

export default Grid;
