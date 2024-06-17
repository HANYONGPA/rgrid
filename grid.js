class Grid {
  constructor(cols, rows, cellSize) {
    this.cols = cols;
    this.cellSize = width / cols;
    if (rows) {
      this.rows = rows;
    } else {
      this.rows = height / this.cellSize;
    }

    this.width = cols * this.cellSize;
    this.height = rows * this.cellSize;

    this.generateGrid();
  }

  generateGrid() {
    this.cells = [];
    for (let y = 0; y < this.rows; y++) {
      this.cells.push([]);
      for (let x = 0; x < this.cols; x++) {
        this.cells[y].push(
          new Cell(
            x * this.cellSize,
            y * this.cellSize + height / 2 - (this.rows * this.cellSize) / 2,
            this.cellSize,
            x + y * this.cols
          )
        );
      }
    }
  }

  display() {
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        this.cells[y][x].display();
      }
    }
  }
}

class Cell {
  constructor(x, y, size, id = 0) {
    this.x = x;
    this.y = y;
    this.size = size;

    this.check = false;
    this.color = color(0);

    this.id = id;
  }

  display() {
    if (this.check) {
      fill(this.color);
    } else {
      fill(0, 0);
    }
    stroke(0);
    rect(this.x, this.y, this.size, this.size);
    textSize(4);
    fill(0);
    // text(this.id, this.x, this.y);
  }
}
