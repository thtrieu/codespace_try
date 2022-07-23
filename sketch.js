let w, h, s, nw, nh;
let h1, s1;
let tree_mat = [];

let centerx, centery;


function preload() {
}


function setup() {
  canvas = createCanvas(500, 1000);

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
    tree_row = []
    for (i = -nw; i < nw+1; i++) { 
      tree_row.push(new Bundle(centerx, centery, w, i, j));
    }
    tree_mat.push(tree_row)
  }
  
  frameRate(15)
}




function mouseClicked() {
  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      x = centerx + i*w + j*s
      y = centery + j*h
      let bundle = tree_mat[i+nw][j+nh];
      if (bundle.cell.inside(s, h)) {
        bundle.createTextBox();
      }
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


function draw() {
  background('white');
  

  mindY = 0
  maxdY = 40
  mindX = -50
  maxdX = 50
  
  if (dragging) {
    h = hsave + (mouseY - ysave)*(maxdY-mindY)/height
    s = ssave + (mouseX - xsave)*(maxdX-mindX)/width
    h = min(max(h, mindY), maxdY)
    s = min(max(s, mindX), maxdX)
  }
  
  
  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      tree_mat[i+nw][j+nh].cell.render(s, h);
    }
  }

  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      let tree = tree_mat[i+nw][j+nh].tree;
      tree.Render(s, h);
    }
  }
}