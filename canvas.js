let x = [];
let y = [];
let fourierVectors=[]
let time = 0;
let path = [];

function setup() {
  createCanvas(700, 500);
  background('white');
  const skip = 2;
  for (let i = 0; i < drawing.length; i += skip) {
    x.push(drawing[i].x/3);
    y.push(drawing[i].y/3);
  }
  fourierVectors = dft(x,y);
  fourierVectors.sort((a, b) => b.amp - a.amp);
}

function epiCycles(x, y, rotation, fourier) {
  for (let i = 0; i < fourier.length; i++) {
    let prevx = x;
    let prevy = y;
    let freq = fourier[i].freq;
    let radius = fourier[i].amp;
    let phase = fourier[i].phase;
    x += radius * cos(freq * time + phase + rotation);
    y += radius * sin(freq * time + phase + rotation);

    stroke(255, 100);
    noFill();
    // ellipse(x,y, radius * 2);
    stroke(255);
    line(prevx, prevy, x, y);
  }
  return createVector(x, y);
}

function draw() {
  background(0);

  let currentPoint = epiCycles(0, 0, 0, fourierVectors);
  path.unshift(currentPoint);

  beginShape();
  noFill();
  for (let i = 0; i < path.length; i++) {
    vertex(path[i].x, path[i].y);
  }
  endShape();

  const dt = TWO_PI / fourierVectors.length;
  time += dt;
  if (time > TWO_PI) {
    time = 0;
    path = [];
  }

}