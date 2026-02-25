let images = [];
let tileSize = 150;
let slider;
let imageFiles = [
    'script2/punks-img-1.jpg',
    'script2/punks-img-14.JPG',
    'script2/punks-img-15.JPG',
    'script2/punks-img-16.JPG',
    'script2/punks-img-18.JPG',
    'script2/punks-img-19.jpg',
    'script2/punks-img-20.jpg',
    'script2/punks-img-21.jpg',
    'script2/punks-img-22.jpg',
    'script2/punks-img-23.jpg',
    'script2/punks-img-24.jpg',
    'script2/punks-img-25.jpg',
    'script2/punks-img-26.jpg'
];

function windowResized() {
    console.log("resized");
    let width = document.querySelector("#sketch-div").clientWidth;
    console.log(width);
    let height = document.querySelector("#sketch-div").clientHeight;
    console.log(height);
    resizeCanvas(width, windowHeight);
  }
  
function preload() {
    for (let file of imageFiles) {
        images.push(loadImage(file));
    }
}

function setup() {
    frameRate(3);
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.position(0, 0);
    canvas.style('z-index', '-1');
    noStroke();
    
    // Get the HTML slider
    slider = document.getElementById('tileSlider');
}

function draw() {
    tileSize = parseInt(slider.value);
    
    background(0);
    
    for (let x = 0; x < width; x += tileSize) {
        for (let y = 0; y < height; y += tileSize) {
            let img = random(images);
            let currentTileSize = tileSize + random(-100, 100);
            
            // Calculate source rectangle from the image
            let srcX = random(img.width - currentTileSize);
            let srcY = random(img.height - currentTileSize);
            
            // Draw image section instead of colored rectangle
            image(img, x, y, currentTileSize, currentTileSize,
                  srcX, srcY, currentTileSize, currentTileSize);
        }
    }
}

