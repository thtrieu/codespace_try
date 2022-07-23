
function randomUniform(min, max) {
  return Math.random() * (max - min) + min;
}


function randomChoice(objects) {
  return objects[Math.floor(Math.random()*objects.length)]
}

function randomFloat(min, max) {
  return Math.random() * (max-min) + min;
}

function randomInt(min, max) {
  return int(randomFloat(min, max+0.99));
}


const _PRESETS = [
  {
    axiom: 'F',
    rules: [
      {symbol: 'F', odds: 0.33, newSymbols: 'F[+F]F[-F][F]'},
      {symbol: 'F', odds: 0.33, newSymbols: 'F[+F][F]'},
      {symbol: 'F', odds: 0.34, newSymbols: 'F[-F][F]'},
    ]
  },
  {
    axiom: 'X',
    rules: [
      {symbol: 'F', odds: 1.0, newSymbols: 'FF'},
      {symbol: 'X', odds: 1.0, newSymbols: 'F+[-F-XF-X][+FF][--XF[+X]][++F-X]'},
    ]
  },
  {
    axiom: 'F',
    rules: [
      {symbol: 'F', odds: 1.0, newSymbols: 'FF+[+F-F-F]-[-F+F+F]'},
    ]
  },
  {
    axiom: 'X',
    rules: [
      {symbol: 'F', odds: 1.0, newSymbols: 'FX[FX[+XF]]'},
      {symbol: 'X', odds: 1.0, newSymbols: 'FF[+XZ++X-F[+ZX]][-X++F-X]'},
      {symbol: 'Z', odds: 1.0, newSymbols: '[+F-X-F][++ZX]'},
    ]
  },
  {
    axiom: 'F',
    rules: [
      {symbol: 'F', odds: 1.0, newSymbols: 'F[+F]F[-F]F'},
    ]
  },
  {
    axiom: 'X',
    rules: [
      {symbol: 'X', odds: 0.33, newSymbols: 'F[+X]F[-X]+X'},
      {symbol: 'X', odds: 0.33, newSymbols: 'F[-X]F[-X]+X'},
      {symbol: 'X', odds: 0.34, newSymbols: 'F[-X]F+X'},
      {symbol: 'F', odds: 1.0, newSymbols: 'FF'},
    ]
  },
  {
    axiom: 'X',
    rules: [
      {symbol: 'X', odds: 1.0, newSymbols: 'F[-[[X]+X]]+F[+FX]-X'},
      {symbol: 'F', odds: 1.0, newSymbols: 'FF'},
    ]
  },
];


function _RouletteSelection(rules) {
  const roll = random.Random();
  let sum = 0;
  for (let r of rules) {
    sum += r.odds;
    if (roll < sum) {
      return r;
    }
  }
  return rules[sortedParents.length - 1];
}



class TreeAuto {
  constructor(x, y, w) {
    let preset = randomChoice(_PRESETS)
    this._axiom = preset.axiom;
    this._rules = preset.rules;
    
    let d = new Date();
    this.tick = d.getTime();
    this.age = 0;
    this.upper = 1
    this.fruit = {}

    this.x = x
    this.y = y
    this.w = w
    
    this.fx = randomFloat(-0.3, 0.3)
    this.fy = randomFloat(-0.3, 0.3)
    
    // this._backgroundColor = document.getElementById('background.color').value;
    this._seed = 0;
    this._variability = 0.01;
    this._iterations = randomInt(1, 4);
    this._leafLength = randomFloat(2.5, 7.5);
    this._leafWidth = randomFloat(2.0, 8.0);
    this._leafColor = "#1c852b";
    this._leafAlpha = randomFloat(0.5, 1.0);
    this._branchLength = randomFloat(5, 25);
    this._branchWidth = randomFloat(4.0, 6.0);
    this._branchAngle = randomFloat(20, 40);
    this._branchColor = "#85521c";
    this._branchLengthFalloff = randomFloat(0.5, 1.0);
    // this._branchLengthFalloff = randomFloat(0.5, 1.0);
    this._branchWidthFalloff = randomFloat(0.5, 0.75);
    this._leafType = 0;
    this._leafRepeat = randomChoice([1, 2]);
    
    // this._iterations = 3; 
    // this._leafLength = 5.0;
    // this._leafWidth = 2.0;
    // this._leafColor = "#1c852b";
    // this._leafAlpha = 0.75;
    // this._branchLength = 30;
    // this._branchWidth = 2;
    // this._branchAngle = 22.5;
    // this._branchColor = "#85521c";
    // this._branchLengthFalloff = 0.75;
    
    this._ApplyRules();
  }
  
  log_config() {
    console.log('leaflen: '+this._leafLength+', ' +
                'leafwidth: '+this._leafWidth+', ' +
                'leaftype: '+ this._leafType + ', ' +
                'leafRepeat: ' + this._leafRepeat +
                'branchlen: '+this._branchLength+', ' +
                'branchwidth: '+this._branchWidth+', ' +
                'branchangle: '+this._branchAngle+', ' +
                'branchlenFall: '+this._branchLengthFalloff
               );
  }
  
  _ApplyRulesToSentence(sentence) {
    const newSentence = [];
    for (let i = 0; i < sentence.length; i++) {
      const [c, params] = sentence[i];

      const matchingRules = [];
      for (let rule of this._rules) {
        if (c == rule.symbol) {
          matchingRules.push(rule);
        }
      }
      if (matchingRules.length > 0) {
        const rule = randomChoice(matchingRules);
        newSentence.push(...rule.newSymbols.split('').map(
            c => [c, this._CreateParameterizedSymbol(c, params)]));
      } else {
        newSentence.push([c, params]);
      }
    }
    return newSentence;
  }

  _ApplyRules() {
    let cur = [...this._axiom.split('').map(c => [c, this._CreateParameterizedSymbol(c, {})])];
    this._sentence = cur;
    return
  }

  _CreateParameterizedSymbol(c, params) {
    if (c == 'F') {
      const branchLengthMult = 1.0;
      const randomLength = randomFloat(
          this._branchLength * (1 - this._variability),
          this._branchLength * (1 + this._variability));
      const branchLength = branchLengthMult * randomLength;
      return {
        branchLength: branchLength,
      };
    } else if (c == '+' || c == '-') {
      const baseAngle = this._branchAngle;
      const randomAngleMult = randomFloat(
          (1 - this._variability), (1 + this._variability))
      const finalAngle = baseAngle * randomAngleMult;
      return {
        angle: finalAngle,
      };
    }
  }
  
  Render(x, y) {
    const canvas = document.getElementById('defaultCanvas0');
    const ctx = canvas.getContext('2d');
    ctx.resetTransform();
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.transform(1, 0, 0, 1, x*2, y*2);

    const stateStack = [];
    let state = {width: this._branchWidth};
    
    let d = new Date();
    let timenow = d.getTime();
    if (timenow > this.tick) {
      
      this.upper = this.upper+1;
      if (this.upper > this._sentence.length && this.age <= 2) {
        this._sentence = this._ApplyRulesToSentence(this._sentence);
        this.age += 1;
      }
      this.tick = timenow;
    }
    
    for (let i = 0; i < min(this.upper, this._sentence.length); i++) {
      const [c, params] = this._sentence[i];

      if (c == 'F') {
        // ctx.fillStyle = this._branchColor;
        const w1 = state.width;
        state.width *= (1 - (1 - this._branchWidthFalloff) ** 3);
        state.width = Math.max(this._branchWidth * 0.25, state.width);
        const w2 = state.width;
        const l = params.branchLength;

        fill(this._branchColor)
        noStroke();
        quad(w1/2, 0, w2/2, -l, -w2/2, -l, -w1/2, 0)

        ctx.transform(1, 0, 0, 1, 0, -l);
      } else if (c == '+') {
        const a = params.angle;
        ctx.rotate(a * Math.PI / 180);
      } else if (c == '-') {
        const a = params.angle;
        ctx.rotate(-a * Math.PI / 180);
      } else if (c == '[') {
        ctx.save();
        stateStack.push({...state});
      } else if (c == ']') {
        ctx.fillStyle = this._leafColor;
        ctx.strokeStyle = this._leafColor;
        ctx.globalAlpha = this._leafAlpha;

        const _DrawLeaf = () => {
          ctx.save();

          const leafWidth = randomFloat(
              this._leafWidth * (1 - this._variability),
              this._leafWidth * (1 + this._variability));
          const leafLength = randomFloat(
              this._leafLength * (1 - this._variability),
              this._leafLength * (1 + this._variability));
          ctx.scale(leafWidth, leafLength);
          if (this._leafType == 0) {
            ctx.beginPath();
            quad(0, 0, 1, -1, 0, -4, -1, -1);
          } else if (this._leafType == 1) {
            ctx.beginPath();
            ctx.arc(0, -2, 2, 0, 2 * Math.PI);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
          } else if (this._leafType == 2) {
            ctx.beginPath();
            ctx.moveTo(0, 0);
            ctx.lineTo(1, -1);
            ctx.lineTo(1, -4);
            ctx.lineTo(0, -5);
            ctx.lineTo(-1, -4);
            ctx.lineTo(-1, -1);
            ctx.lineTo(0, 0);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
  
            ctx.fillRect(0, 0, 0.25, -5);
          }
          ctx.restore();
        }

        if (this.age == 3 && this.upper >= this._sentence.length && !(str(i) in this.fruit)) {
          if (randomFloat(0.0, 1.0) > 0.1) {
            this.fruit[str(i)] = undefined;  
          } else {
            this.fruit[str(i)] = {color: randomChoice(['red', 'yellow', 'orange']),
                                  size: randomFloat(10, 20)}
          }  
        }
        
        let this_fruit = this.fruit[str(i)];
        
        if (this_fruit != undefined) {
          fill(this_fruit.color);
          circle(0, 0, this_fruit.size);
        } else {
          _DrawLeaf();
        
        
          if (this._leafRepeat > 1) {
            ctx.save();
            for (let r = 0; r < this._leafRepeat; r++) {
              ctx.rotate((r + 1) * 5 * Math.PI / 180);
              _DrawLeaf();
            }
            ctx.restore();
            ctx.save();
            for (let r = 0; r < this._leafRepeat; r++) {
              ctx.rotate(-(r + 1) * 5 * Math.PI / 180);
              _DrawLeaf();
            }
            ctx.restore();
          }  
        }

        ctx.restore();
        state = stateStack.pop();
      }
    }
  }
}