let trees;
let tree1;
let tree2;
let w, h, s, nw, nh;
let h1, w1, s1;

let tree_mat = [];
let ltree;
let canvas;



function preload() {
  trees = [
      loadImage('tree1.png'),
      loadImage('tree2.png'),
      loadImage('tree3.png'),
      loadImage('tree4.png'),
      loadImage('tree5.png'),
      // loadImage('tree6.png'),
      loadImage('tree7.png'),
      loadImage('tree8.png'),
  ];
}

function selectRandomTree() {
  return randomChoice(trees);
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
  // nh = min(nh, nw)
  nh = 1
  nw = 1
  
  for (j = -nh; j < nh+1; j++) {
    tree_row = []
    for (i = -nw; i < nw+1; i++) { 
      tree = new TreeAuto()
      tree_row.push(tree)
    }
    tree_mat.push(tree_row)
  }
  
  frameRate(15)
  // ltree = new TreeAuto();
  
}


function mouseInside(x, y, w, h, s) {
  return (mouseX > x && mouseX < x+w+s && mouseY > y && mouseY < y+h &&
          (mouseY-y)/h*s < mouseX-x)
}

function drawCell(x, y, w, h, s) {
  // x = x - (w+s)/2
  // y = y - h/2
  
  if (mouseInside(x, y, w, h, s)) {
    fill('yellow')
  } else {
    fill('lightgrey')
  }
  
  quad(x, y,
       x+w, y,
       x+w+s, y+h,
       x+s, y+h) ;
}


function mouseClicked() {
  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      x0 = width/2-w/2 +i*w+j*s
      y0 = height*3/4 +j*h
      if (mouseInside(x0, y0, w, h, s) && objects.length < 5) {
        new Pair(mouseX, mouseY);
        // tree_mat[i+nw][j+nh].log_config();
      }
      
    }
  }
}


function drawCells(x, y, w, h, s) {
  
  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      x0 = x +i*w+j*s
      y0 = y +j*h
      drawCell(x0, y0, w, h, s)
    }
  }
  
  for (j = -nh; j < nh+1; j++) {   
    for (i = -nw; i < nw+1; i++) {
      let tree = tree_mat[i+nw][j+nh]
      x0 = x + i*w + j*s + (w+s)/2 + tree.fx * w
      y0 = y + j*h + h/2 + tree.fy * h
      tree.Render(x0*2, y0*2);
      // drawRandomTree(tree.img, x0, y0)
      
    }
  }
}

let started = false
let dragging = false;
let x0, y0;
let x1, y1;


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
  
//   if (started && !dragging) {
//     return
//   }

//   started = true;
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
  
  drawCells(width/2-w/2, height/2, w, h1, s1)
}