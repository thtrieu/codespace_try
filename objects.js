
let objects = [];


class Pair {
  constructor(x, y) {
    objects.push(this)
    name = str(objects.length)
    this.tree = new TreeAuto()
    this.cell = new Cell(name, x, y);
    this.txtbox = new textBox(name);
  }
  
  inside(x, y) {
    return this.cell.inside(x, y);
  }
  
  render(x, y) {
    this.cell.render(x, y);
    this.tree.render(x, y);
  }
  
  commit() {
    this.txtbox.commit();
  }
}


class myCircle {
  constructor(name, x, y, r) {
    this.x = x
    this.y = y
    this.r = r
    this.name = name;
  }
  
  render() {
    circle(this.x, this.y, this.r);
    text(this.name, this.x, this.y)
  }
  
  inside(x, y) {
    let dx = x - this.x;
    let dy = y - this.y;
    return dx*dx + dy*dy <= this.r*this.r/4
  }
  
  move(x, y) {
    this.x = x;
    this.y = y;
  }
}

class textBox {
  constructor(name) {
    let txtbox = createInput();
    
    let x = 40
    let y = width + objects.length * 30
    
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