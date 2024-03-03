import './../styles/style.css'
import p5 from 'p5';

let img;
let cols = 4;
let rows = 4;
let cellWidth, cellHeight;
let hoveredCell = null;
let initialYOffsets = []; // Store initial y offsets for each cell
let slideSpeed = 2; // Speed of the slide animation

async function initializeSketch() {
  // Load the image for calculation first
  img = await loadImageForCalculation("/assets/cj-botha-ONPCT9vwKvo-unsplash.jpg");

  // Calculate the width and height of each cell
  cellWidth = img.width / cols;
  cellHeight = img.height / rows;

  // Initialize the initial y offsets for each cell
  for (let i = 0; i < cols; i++) {
    initialYOffsets[i] = Math.random() > 0.5 ? cellHeight : -cellHeight;
  }

  // Initialize the p5 sketch
  new p5(sketch);
}

function loadImageForCalculation(path) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = path;
  });
}

function sketch(p) {
  p.setup = () => {
    const canvas = p.createCanvas(img.width, img.height);
    canvas.parent('canvas-container'); // Set the parent of the canvas to the container div
  };

  p.preload = () => {
    // Load the image for rendering
    img = p.loadImage('/assets/cj-botha-ONPCT9vwKvo-unsplash.jpg');
  }

  p.draw = () => {
    p.background(255); // Clear the background to white

    if (img) {
      // Loop through each cell in the grid
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Calculate the x and y coordinates of the top-left corner of the cell
          let x = i * cellWidth;
          let y = j * cellHeight;

          // Add padding around the cell
          let padding = 10;
          x += padding;
          y += padding;
          let cellWidthWithPadding = cellWidth - padding * 2;
          let cellHeightWithPadding = cellHeight - padding * 2;

          // Calculate the current y position of the cell
          let currentY = y + initialYOffsets[i] * (1 - p.frameCount / 200); // Slide animation

          // Check if the mouse is hovering over this cell
          if (hoveredCell !== null && hoveredCell.i === i && hoveredCell.j === j) {
            // Return the cell to its correct position
            initialYOffsets[i] += (cellHeight - initialYOffsets[i]) / slideSpeed;
          }

          // Draw the cell
          let cellImage = img.get(x, currentY, cellWidthWithPadding, cellHeightWithPadding);
          p.image(cellImage, x, currentY);
        }
      }
    }
  };

  p.mouseMoved = () => {
    // Calculate the index of the cell under the mouse
    let i = Math.floor(p.mouseX / cellWidth);
    let j = Math.floor(p.mouseY / cellHeight);

    // Check if the mouse is within the grid bounds
    if (i >= 0 && i < cols && j >= 0 && j < rows) {
      hoveredCell = { i, j };
    } else {
      hoveredCell = null;
    }
  };
}

// Initialize the sketch
initializeSketch();