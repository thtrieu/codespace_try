let w, h, s, nw, nh;
let h1, s1;
let trees = [];
let centerx, centery;

let spaces = [];


function preload() {
}


function setup() {
  canvas = createCanvas(1000, 1000);

  w = 150
  h = 30
  s = 20
  
  h1 = h
  s1 = s
  
  // nw = int(width / w / 2)
  // nh = int(height / h / 2)
  nh = 1
  nw = 1

  centerx = width/2 - w/2;
  centery = height*3/4;
  
  for (j = -nh; j < nh+1; j++) {
    for (i = -nw; i < nw+1; i++) { 
      trees.push(new Bundle(centerx, centery, w, i, j));
      spaces.push(true);
    }
  }  
  frameRate(15)
}


function mouseClicked() {

  for (let i = 0; i < trees.length; ++i) {
    let bundle = trees[i];
    if (bundle.cell.inside(s, h)) {
      bundle.createTextBox(spaces)
    } 
  }
}


let dragging = false;
let xsave, ysave;
let ssave, hsave;


function mousePressed() {
  xsave = mouseX;
  ysave = mouseY;
  ssave = s;
  hsave = h;
  dragging = true;
}


function mouseReleased() {
  dragging = false;
}


function keyPressed() {
  if (keyCode != ENTER) return;
  
  for (let i = 0; i < trees.length; ++i) {
    trees[i].commit();
  }
}


function draw() {
  background('white');

  mindY = 0
  maxdY = 40
  mindX = -100
  maxdX = 100
  
  if (dragging) {
    h = hsave + (mouseY - ysave)*(maxdY-mindY)/height
    s = ssave + (mouseX - xsave)*(maxdX-mindX)/width
    h = min(max(h, mindY), maxdY)
    s = min(max(s, mindX), maxdX)
  }
  
  
  for (let i = 0; i < trees.length; ++i) {
    trees[i].cell.render(s, h);
    trees[i].tree.showIfTag(s, h);
  }
  
  for (let i = 0; i < trees.length; ++i) {
    if (trees[i].cell.inside(s, h)) {
      trees[i].tree.showTag(s, h)
      if (trees[i].tree.position != null) {
        trees[i].txtbox.focus();
      }
    }
    if (trees[i].tree.position != null) {
      trees[i].txtbox.render();
    }
  }

  for (let i = 0; i < trees.length; ++i) {
    trees[i].tree.Render(s, h);
  }
}