let images = [];
let imageFiles = [ 'script/htp-img-1.jpg', 
    'script/htp-img-2.jpg',
    'script/htp-img-3.jpg', 
    'script/htp-img-4.jpg', 
    'script/htp-img-5.jpg',
    'script/htp-img-6.jpg',
    'script/htp-img-7.jpg',
    'script/htp-img-8.png', 
    'script/htp-img-9.png',
    'script/htp-img-10.png',
    'script/htp-img-11.png',
    'script/htp-img-12.jpg',
    'script/htp-img-13.jpg', 
    'script/htp-img-14.jpg', 
    'script/htp-img-15.jpg',
    'script/htp-img-16.jpg', 
    'script/htp-img-17.jpg'];


function windowResized() {
  console.log("resized");
  let width = document.querySelector("#sketch-div").clientWidth;
  console.log(width);
  let height = document.querySelector("#sketch-div").clientHeight;
  console.log(height);
  resizeCanvas(width, windowHeight);
}

class FloatingImage {
  constructor(img) {
    this.img = img;
    this.x = random(width);
    this.y = random(height);
    this.speedX = random(-2, 2);  // Increased speed range
    this.speedY = random(-2, 2);  // Increased speed range
    this.size = 150;
    this.isEnlarged = false;
    this.originalSize = 150;
    this.enlargedSize = 300;
    this.minSpeed = 0.5; // Minimum speed threshold
  }

  move() {
    if (!this.isEnlarged) {
      // Ensure minimum speed
      if (Math.abs(this.speedX) < this.minSpeed) {
        this.speedX = this.speedX > 0 ? this.minSpeed : -this.minSpeed;
      }
      if (Math.abs(this.speedY) < this.minSpeed) {
        this.speedY = this.speedY > 0 ? this.minSpeed : -this.minSpeed;
      }

      this.x += this.speedX;
      this.y += this.speedY;
      
      // Improved boundary checking
      if (this.x <= 0) {
        this.x = 0;
        this.speedX = Math.abs(this.speedX);
      } else if (this.x >= width - this.size) {
        this.x = width - this.size;
        this.speedX = -Math.abs(this.speedX);
      }
      
      if (this.y <= 0) {
        this.y = 0;
        this.speedY = Math.abs(this.speedY);
      } else if (this.y >= height - this.size) {
        this.y = height - this.size;
        this.speedY = -Math.abs(this.speedY);
      }
    }
  }

  display() {
    image(this.img, this.x, this.y, this.size, this.size);
  }

  clicked(px, py) {
    if (px > this.x && px < this.x + this.size &&
        py > this.y && py < this.y + this.size) {
      this.isEnlarged = !this.isEnlarged;
      this.size = this.isEnlarged ? this.enlargedSize : this.originalSize;
      return true;
    }
    return false;
  }
}

// Add this mousePressed function after your draw function
function mousePressed() {
  for (let floatingImg of images) {
    if (floatingImg.clicked(mouseX, mouseY)) {
      // Reset other images to original size
      images.forEach(img => {
        if (img !== floatingImg) {
          img.isEnlarged = false;
          img.size = img.originalSize;
        }
      });
      break;
    }
  }
}

function preload() {
  // Load all images
  for (let file of imageFiles) {
    images.push(loadImage(file));
  }
}

function setup() {
 
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-div');
  canvas.position(0, 0);
  canvas.style('z-index', '-1');

  // Create floating image objects
  images = images.map(img => new FloatingImage(img));
}

function draw() {
  background(0,0,255);
  
  // Update and display all images
  for (let floatingImg of images) {
    floatingImg.move();
    floatingImg.display();
  }
}

