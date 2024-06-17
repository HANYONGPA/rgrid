// function preload() {
//   supernomaleRg = loadFont("/fonts/rgFt.ttf");
//   supernomaleBd = loadFont("/fonts/bdFt.ttf");
//   aktivBd = loadFont("/fonts/AktivGrotesk_KR_Bd.ttf");
//   textImg = loadImage("/images/textImg.png");
// }
let supernomaleRg;
let supernomaleBd;
let aktivBd;
let textImg;

let radialGrid;
let grid;
let col = 40;
let row = 40;
let cg;
let txt = "안녕";
let debugMode = false;
let colorMode = true;
let gridDisplay = false;

let barTheta = 0;
let barTheta2 = 0;

function setup() {
  supernomaleRg = loadFont("/fonts/rgFt.ttf");
  supernomaleBd = loadFont("/fonts/bdFt.ttf");
  aktivBd = loadFont("/fonts/AktivGrotesk_KR_Bd.ttf");
  textImg = loadImage("/images/textImg.png");
  createCanvas(windowWidth, windowHeight);
  cg = createGraphics(width, height);
  textFont(supernomaleRg);
  textSize(8);
  textAlign(CENTER, CENTER);
  cg.textFont(aktivBd);
  cg.textSize(height);
  cg.textAlign(CENTER, CENTER);
  cg.background(255);
  cg.text(txt, width / 2, height / 4);
  // cg.imageMode(CENTER);
  // cg.image(textImg, width / 2, height / 2, width / 2, height / 2);

  radialGrid = new RadialGrid(width / 2, height / 2);
  grid = new Grid(col, row);

  // for (let y = 0; y < cg.height; y += row / 2) {
  //   for (let x = 0; x < cg.width; x += col / 2) {
  //     let c = cg.get(x, y);
  //     if (c[0] < 255) {
  //       grid.cells[int(y / grid.cellSize)][int(x / grid.cellSize)].check = true;
  //     }
  //   }
  // }
  // updateAnnularSectorsColor();
}

function draw() {
  background(255);
  cg.background(255);
  cg.text(txt, width / 2, height / 3.5);
  radialGrid.display();
  // grid.display();

  // cg.text(txt, width / 2, height / 2);
  // image(cg, 0, 0);
}

function updateAnnularSectorsColor() {
  for (let row of grid.cells) {
    for (let cell of row) {
      if (cell.check) {
        radialGrid.radialBars.forEach((radialBar) => {
          radialBar.annularSectors.forEach((sector) => {
            if (sector.id === cell.id) {
              sector.check = true;
            }
          });
        });
      }
    }
  }
}

function keyPressed() {
  if (keyCode == 57) {
    for (let rBar of radialGrid.radialBars) {
      for (let rSec of rBar.annularSectors) {
        rSec.targetRatio = pow(random(), rBar.annularSectors.length / 20);
        rSec.ease.update_f(rSec.targetRatio);
      }
    }
  }
  if (keyCode == 48) {
    for (let rBar of radialGrid.radialBars) {
      rBar.targetAngle = 0;
      rBar.ease.update_f(rBar.targetAngle);
      rBar.targetRratio = 1;
      rBar.ease2.update_f(rBar.targetRratio);
      for (let rSec of rBar.annularSectors) {
        rSec.targetRatio = 1;
        rSec.ease.update_f(rSec.targetRatio);
      }
    }

    radialGrid.radialBars.forEach((rBar) => {
      const halfLength = Math.floor(rBar.annularSectors.length / 2);

      for (let i = 0; i < rBar.annularSectors.length; i++) {
        const randomValue = 0.5;
        if (i < halfLength) {
          rBar.annularSectors[i].targetVratio = randomValue;
          rBar.annularSectors[i].ease2.update_f(
            rBar.annularSectors[i].targetVratio
          );
        } else {
          rBar.annularSectors[i].targetVratio =
            1 - rBar.annularSectors[i - halfLength].targetVratio;
          rBar.annularSectors[i].ease2.update_f(
            rBar.annularSectors[i].targetVratio
          );
        }
      }
    });
  }
  if (keyCode == 49 || keyCode == 32) {
    radialGrid.radialBars.forEach((rBar) => {
      for (let i = 0; i < rBar.annularSectors.length / 2; i++) {
        let newRatio = pow(random(), rBar.annularSectors.length / 60);

        rBar.annularSectors[i].targetRatio = newRatio;
        rBar.annularSectors[i].ease.update_f(newRatio);

        let outerIndex = i + rBar.annularSectors.length / 2;
        rBar.annularSectors[outerIndex].targetRatio = newRatio;
        rBar.annularSectors[outerIndex].ease.update_f(newRatio);
      }
    });
  }
  if (keyCode == 50 || keyCode == 32) {
    for (let rBar of radialGrid.radialBars) {
      barTheta += 0.05;
      rBar.targetAngle = map(noise(barTheta), 0, 1, -PI, PI);
      rBar.ease.update_f(rBar.targetAngle);
    }
  }

  if (keyCode == 51 || keyCode == 32) {
    radialGrid.radialBars.forEach((rBar) => {
      const halfLength = Math.floor(rBar.annularSectors.length / 2);

      for (let i = 0; i < rBar.annularSectors.length; i++) {
        const randomValue = random(0, 1);
        if (i < halfLength) {
          rBar.annularSectors[i].targetVratio = randomValue;
          rBar.annularSectors[i].ease2.update_f(
            rBar.annularSectors[i].targetVratio
          );
        } else {
          rBar.annularSectors[i].targetVratio =
            1 - rBar.annularSectors[i - halfLength].targetVratio;
          rBar.annularSectors[i].ease2.update_f(
            rBar.annularSectors[i].targetVratio
          );
        }
      }
    });
  }

  if (keyCode == 52 || keyCode == 32) {
    for (let i = 0; i < radialGrid.radialBars.length; i++) {
      barTheta2 += 0.5;
      // let vTheta = pow(random(), noise(i / 100) * 10);
      let vTheta = noise(barTheta2 * 20) * pow(random(), 1.5);
      radialGrid.radialBars[i].targetRratio = vTheta;
      radialGrid.radialBars[i].ease2.update_f(
        radialGrid.radialBars[i].targetRratio
      );
    }
  }

  if (keyCode == 67) {
    colorMode = !colorMode;
    for (let y = 0; y < cg.height; y += row / 2) {
      for (let x = 0; x < cg.width; x += col / 2) {
        let c = cg.get(x, y);
        if (c[0] < 255) {
          grid.cells[int(y / grid.cellSize)][
            int(x / grid.cellSize)
          ].check = true;
        }
      }
    }
    updateAnnularSectorsColor();
  }
  if (keyCode == 71) {
    gridDisplay = !gridDisplay;
  }

  if (keyCode == 68) {
    debugMode = !debugMode;
  }
}

class RadialGrid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.radialBars = [];
    this.radius = 240;
    this.barWeight = 10;
    this.radialBarNum = this.radius / this.barWeight;

    this.angle = 0;
    this.targetAngle = 0;

    this.generateRadialBar();
  }

  generateRadialBar() {
    for (let i = 0; i < this.radialBarNum; i++) {
      this.radialBars.push(
        new RadialBar(this.pos.x, this.pos.y, this.radius, this.barWeight, i)
      );
      if (this.radius > 0) {
        this.radius -= this.barWeight;
      }
    }
  }

  display() {
    let totalRratio = 0;
    for (let rBar of this.radialBars) {
      totalRratio += rBar.rRatio;
    }
    let currentRadius = 400;
    for (let rBar of this.radialBars) {
      rBar.rRatio = (rBar.rRatio / totalRratio) * 400;
      rBar.radius = currentRadius;
      rBar.barWeight = rBar.rRatio;
      currentRadius -= rBar.rRatio;

      rBar.display();
    }
    this.radialBars[this.radialBars.length - 1].lastOne = true;
  }
}

class RadialBar {
  constructor(x, y, radius, barWeight, id = 0) {
    this.x = x;
    this.y = y;
    this.annularSectors = [];
    this.sectorNum = 40;
    this.radius = radius;
    this.barWeight = barWeight;
    this.halfBarWeight = this.barWeight / 2;
    this.outerRadius = this.radius + this.totalWeight;
    this.ratios = [];
    this.targetRatios = [];
    this.totalRatio = 0;
    this.vRatio = [];
    this.rRatio = 1;
    this.targetRratio = 1;
    for (let i = 0; i < this.sectorNum; i++) {
      this.vRatio.push(0.5);
    }

    this.ease = new EaseFloat(0, 0);
    this.ease2 = new EaseFloat(0, 0);
    this.angle = 0;
    this.targetAngle = 0;

    this.id = id;
    this.lastOne = false;

    this.generateSector(this.radius, this.halfBarWeight, "inner");
    this.generateSector(
      this.radius - this.halfBarWeight,
      this.halfBarWeight,
      "outer"
    );
  }

  generateSector(radius, barWeight, sectorType) {
    const baseId = this.id * this.sectorNum * 2;
    for (let i = 0; i < this.sectorNum; i++) {
      let sectorId;
      if (sectorType === "inner") {
        sectorId = baseId + i;
      } else {
        sectorId = baseId + i + this.sectorNum;
      }
      let startAngle = (i * TWO_PI) / this.sectorNum;
      let endAngle = ((i + 1) * TWO_PI) / this.sectorNum;
      this.annularSectors.push(
        new AnnularSector(
          0,
          0,
          radius,
          barWeight,
          startAngle,
          endAngle,
          sectorId
        )
      );
    }
  }

  display() {
    this.angle = this.ease.easeFloat(1, this.targetAngle);
    this.rRatio = this.ease2.easeFloat(1, this.targetRratio);

    let totalRatioInner = 0;
    let totalRatioOuter = 0;

    for (let i = 0; i < this.annularSectors.length; i++) {
      let sector = this.annularSectors[i];
      let len = this.annularSectors.length / 2;
      if (i < len) {
        totalRatioInner += sector.ratio / 2;
        if (this.lastOne) {
          this.annularSectors[i].barWeight =
            this.annularSectors[i].vRatio * this.radius;
        } else {
          this.annularSectors[i].barWeight =
            this.annularSectors[i].vRatio * this.barWeight;
        }
        this.annularSectors[i].radius = this.radius;
      } else {
        totalRatioOuter += sector.ratio / 2;
        this.annularSectors[i].radius =
          this.annularSectors[i - len].radius -
          this.annularSectors[i - len].barWeight;

        if (this.lastOne) {
          this.annularSectors[i].barWeight =
            this.annularSectors[i].vRatio * this.radius;
        } else {
          this.annularSectors[i].barWeight =
            this.annularSectors[i].vRatio * this.barWeight;
        }
      }
    }

    this.currentAngle = 0;
    push();
    translate(this.x, this.y);
    rotate(this.angle + PI / 2);

    for (let i = 0; i < this.annularSectors.length; i++) {
      let sector = this.annularSectors[i];
      if (i < this.annularSectors.length / 2) {
        sector.ratio = ((sector.ratio / totalRatioInner) * TWO_PI) / 2;
      } else {
        sector.ratio = ((sector.ratio / totalRatioOuter) * TWO_PI) / 2;
      }

      sector.startAngle = this.currentAngle;
      this.currentAngle += sector.ratio;
      sector.endAngle = this.currentAngle;

      sector.display();
    }
    pop();
  }
}

class AnnularSector {
  constructor(x, y, radius, barWeight, startAngle, endAngle, id = 0) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.barWeight = barWeight;
    this.outerRadius = this.radius - this.barWeight;
    this.startAngle = startAngle;
    this.endAngle = endAngle;

    this.step = this.endAngle / ((this.radius + this.barWeight) * 10);

    this.check = false;
    this.color = color(255, 0);
    this.strokeColor = color(0, 0);
    this.colGray = random(255);
    this.colRGBCMYK = [
      color(255, 0, 0),
      color(0, 255, 0),
      color(0, 0, 255),
      color(0),
      color(0, 255, 255),
      color(255, 0, 255),
      color(255, 255, 0),
    ];
    this.col = random(this.colRGBCMYK);

    this.ease = new EaseFloat(0, 0);
    this.ease2 = new EaseFloat(0, 0);
    this.ratio = 1;
    this.targetRatio = 1;
    this.vRatio = 0.5;
    this.targetVratio = 0.5;

    this.id = id;
  }

  display() {
    // this.update();
    this.innerRadius = this.radius - this.barWeight;

    this.ratio = this.ease.easeFloat(1, this.targetRatio);
    this.vRatio = this.ease2.easeFloat(1, this.targetVratio);

    if (!debugMode) {
      if (this.check) {
        strokeWeight(2);
        if (colorMode) {
          fill(this.colRGBCMYK[this.id % 7]);
          stroke(this.colRGBCMYK[this.id % 7]);
        } else {
          fill(0);
          stroke(0);
        }
      } else {
        fill(0, 0);
        strokeWeight(1);
        if (colorMode) {
          fill(this.colRGBCMYK[this.id % 7]);
          strokeWeight(2);
          stroke(this.colRGBCMYK[this.id % 7]);
        }
        if (gridDisplay) {
          stroke(0);
        } else {
          stroke(0, 0);
        }
      }
    } else {
      noFill();
      stroke(0);
    }
    beginShape();
    for (
      let angle = this.startAngle;
      angle <= this.endAngle;
      angle += this.step
    ) {
      let cosAngle = cos(angle);
      let sinAngle = sin(angle);
      vertex(
        this.x + cosAngle * this.innerRadius,
        this.y + sinAngle * this.innerRadius
      );
    }
    for (
      let angle = this.endAngle;
      angle >= this.startAngle;
      angle -= this.step
    ) {
      let cosAngle = cos(angle);
      let sinAngle = sin(angle);
      vertex(this.x + cosAngle * this.radius, this.y + sinAngle * this.radius);
    }
    endShape(CLOSE);

    // 각 섹터 중앙에 정보 표시
    if (debugMode) {
      fill(0);
      let ratio = map((this.endAngle - this.startAngle) / TWO_PI, 0, 1, 0, 100);
      if (ratio.toFixed(0) > 2) {
        push();
        textSize(5);
        translate(
          this.x + cos((this.startAngle + this.endAngle) / 2) * this.radius,
          this.y + sin((this.startAngle + this.endAngle) / 2) * this.radius
        );
        rotate((this.startAngle + this.endAngle) / 2 + HALF_PI);
        // rect(-10, -6, 20, 12);
        // fill(255);
        // text(this.id, 0, -2);
        // text(ratio.toFixed(0), 0, -2);
        // text(this.vRatio.toFixed(2), 0, -2);
        // text(this.check, 0, -2);
        pop();
      }
    }
  }
}
