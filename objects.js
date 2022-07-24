
let objects = [];


class Bundle {
  constructor(x, y, w, i, j) {
    objects.push(this)
    name = str(objects.length)
    this.tree = new TreeAuto(x, y, w, i, j)
    this.cell = new Cell(x, y, w, i, j);
    this.txtbox = null;
  }

  inside(s, h) {
    return this.cell.inside(s, h);
  }
  
  commit() {
    if (!this.txtbox) {
      return;
    }
    this.txtbox.commit();
  }

  createTextBox(spaces) {
    if (!this.txtbox) {
      let position = spaces.indexOf(true);
      this.txtbox = new textBox(position+1);
      spaces[position] = false;
      this.tree.tag(position+1)

    } else {
      this.txtbox.txtbox.remove()
      spaces[this.txtbox.position-1] = true;
      this.txtbox = null
      this.tree.removeTag()
    }
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
    // if (this.inside(s, h)) {
    //   fill('yellow');
    // } else {
    fill('lightgrey');
    // }

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
  constructor(position) {
    let txtbox = createInput();
    let x = 40
    let y = (9-position) * 50

    
    txtbox.position(x+150, y);
    txtbox.size(width-x-300, 30);

    txtbox.elt.onfocus = () => {
      this.focused = true
    }
    txtbox.elt.onblur = () => {
      this.focused = false
    }
    
    this.txtbox = txtbox;
    this.position = position;
    this.x = x
    this.y = y
    this.w = 80
    this.h = 30
    this.name = str(position)
  }

  focus() {
    this.txtbox.elt.focus()
  }

  render() {
    fill('black')
    text(this.name, 100, this.y+25)
  }
  
  commit() {
    console.log(this.name, this.txtbox.value())
  }
}