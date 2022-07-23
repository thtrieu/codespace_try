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
      tree_row.push(new Bundle())
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
      if (tree_mat[i+nh][j+nh].inside(x, y, w, s, h)) {
        tree_mat[i+nh][j+nh].tag();
      }
    }
  }
}


let dragging = false;
let xsave, ysave;


function mousePressed() {
  xsave = mouseX;
  ysave = mouseY;
  dragging = true;
}


function mouseReleased() {
  h = h1;
  s = s1;
  dragging = false;
}


function draw() {
  background('white');
  

  mindY = 0
  maxdY = 40
  mindX = -50
  maxdX = 50
  
  if (dragging) {
    h1 = h + (mouseY - ysave)*(maxdY-mindY)/height
    s1 = s + (mouseX - xsave)*(maxdX-mindX)/width
  }
  
  h1 = min(max(h1, mindY), maxdY)
  s1 = min(max(s1, mindX), maxdX)
  
  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      x = centerx + i*w + j*s1
      y = centery + j*h1
      tree_mat[i+nw][j+nh].cell.render(x, y, w, s1, h1);
    }
  }

  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      let tree = tree_mat[i+nw][j+nh].tree;
      x = centerx + i*w + j*s1 + (w+s1)/2 + tree.fx * w
      y = centery + j*h1 + h1/2 + tree.fy * h1
      tree.Render(x, y);
    }
  }
}