
let objects = [];


class Bundle {
  constructor(x, y, w, i, j) {
    objects.push(this)
    name = str(objects.length)
    this.tree = new TreeAuto(x, y, w, i, j)
    this.cell = new Cell(x, y, w, i, j);
    // this.txtbox = new textBox();
  }

  inside(s, h) {
    return this.cell.inside(s, h);
  }
  
  commit() {
    this.txtbox.commit();
  }

  createTextBox() {
    this.txtbox = new textBox();
  }
}


class Cell {
  constructor(x, y, w, i, j) {
    this.x = x + i * w
    this.y = y
    this.w = w
    this.j = j
  }
  
  render(s, h) {
    let x = this.x + this.j*s
    let y = this.y + this.j*h
    if (this.inside(s, h)) {
      fill('yellow');
    } else {
      fill('lightgrey');
    }

    quad(x, y,
         x+w, y,
         x+w+s, y+h,
         x+s, y+h) ;
  }
  
  inside(s, h) {
    let x = this.x + this.j*s
    let y = this.y + this.j*h
    return (mouseX > x && mouseX < x+this.w+s && 
            mouseY > y && mouseY < y+h &&
            (mouseY-y)/h*s < mouseX-x)
  }
}

class textBox {
  constructor(name) {
    let txtbox = createInput();
    
    let x = 40
    let y = objects.length * 30

    
    txtbox.position(x, y);
    txtbox.size(width-x-20, 30);
    
    this.txtbox = txtbox;
    this.x = x
    this.y = y
    this.w = 80
    this.h = 30
    this.name = name
  }

  render() {
    text(this.name, 15, this.y+15)
  }
  
  commit() {
    console.log(this.name, this.txtbox.value())
  }
}