
let objects = [];


class Bundle {
  constructor() {
    objects.push(this)
    name = str(objects.length)
    this.tree = new TreeAuto()
    this.cell = new Cell();
    // this.txtbox = new textBox();
  }
  
  inside(s, h) {
    return this.cell.inside(s, h);
  }
  
  commit() {
    this.txtbox.commit();
  }
}


class Cell {
  constructor() {
  }
  
  render(x, y, w, s, h) {
    if (this.inside(x, y, w, s, h)) {
      fill('yellow');
    } else {
      fill('lightgrey');
    }
    // console.log(x, y, w, s, h)
    stroke('black')

    quad(x, y,
         x+w, y,
         x+w+s, y+h,
         x+s, y+h) ;
  }
  
  inside(x, y, w, s, h) {
    return (mouseX > x && mouseX < x+w+s && 
            mouseY > y && mouseY < y+h &&
            (mouseY-y)/h*s < mouseX-x)
  }
}

class textBox {
  constructor(name) {
    let txtbox = createInput();
    
    let x = 40
    let y = 40 + objects.length * 30

    
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