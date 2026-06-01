let input1, input2, gate, output;
let pressedInput = null;
let pressedGate = false;

let cnv;
let canvasEl;

let pointerDown = false;
let pointerX = 0;
let pointerY = 0;

const gateTypes = ['AND', 'OR', 'XOR', 'NAND', 'NOR', 'XNOR', 'NOT'];
let currentGateIndex = 0;

const translations = {
  ca: {
    htmlLang: 'ca',
    title: 'Portes lògiques: clica la porta per canviar',
    info: '👆 Toca les entrades (gris/groc) per canviar 0/1',
    tip: '🔵 Toca la porta blava per canviar de tipus (AND → OR → XOR → NAND → NOR → XNOR → NOT)',
    inputLabel: 'ENTRADA',
    outputLabel: 'SORTIDA',
    notUsed: 'no usada'
  },
  es: {
    htmlLang: 'es',
    title: 'Puertas lógicas: haz clic en la puerta para cambiar',
    info: '👆 Toca las entradas (gris/amarillo) para cambiar 0/1',
    tip: '🔵 Toca la puerta azul para cambiar de tipo (AND → OR → XOR → NAND → NOR → XNOR → NOT)',
    inputLabel: 'ENTRADA',
    outputLabel: 'SALIDA',
    notUsed: 'no usada'
  },
  en: {
    htmlLang: 'en',
    title: 'Logic gates: click the gate to change',
    info: '👆 Tap the inputs (gray/yellow) to switch 0/1',
    tip: '🔵 Tap the blue gate to change type (AND → OR → XOR → NAND → NOR → XNOR → NOT)',
    inputLabel: 'INPUT',
    outputLabel: 'OUTPUT',
    notUsed: 'not used'
  }
};

function getInitialLang() {
  const saved = localStorage.getItem('portes_lang');
  if (saved && translations[saved]) return saved;

  const nav = (navigator.language || 'ca').toLowerCase();
  if (nav.startsWith('ca')) return 'ca';
  if (nav.startsWith('es')) return 'es';
  return 'en';
}

let currentLang = getInitialLang();

function t() {
  return translations[currentLang];
}

function applyLanguage() {
  const tr = t();
  document.documentElement.lang = tr.htmlLang;
  document.title = tr.title;
  document.getElementById('infoText').textContent = tr.info;
  document.getElementById('tipText').textContent = tr.tip;

  document.querySelectorAll('.langBtn').forEach(btn => {
    const active = btn.dataset.lang === currentLang;
    btn.classList.toggle('active', active);
    btn.setAttribute('aria-pressed', active ? 'true' : 'false');
  });
}

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('portes_lang', lang);
  applyLanguage();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.langBtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      setLanguage(btn.dataset.lang);
    });

    btn.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
    });
  });

  applyLanguage();
});

class Input {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.value = false;
    this.size = 70;
    this.id = null;
  }

  show() {
    fill(this.value ? '#f1c40f' : '#bdc3c7');

    if (pressedInput === this.id) {
      stroke('#f39c12');
      strokeWeight(6);
    } else {
      stroke(80);
      strokeWeight(2);
    }

    square(this.x, this.y, this.size, 12);

    noStroke();
    fill(30);
    textAlign(CENTER, CENTER);
    textSize(28);
    text(this.value ? '1' : '0', this.x + this.size / 2, this.y + this.size / 2);

    textSize(13);
    fill(60);
    text(t().inputLabel, this.x + this.size / 2, this.y - 12);
  }

  toggle() {
    this.value = !this.value;
  }

  clicked(mx, my) {
    return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size;
  }
}

class Gate {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 80;
    this.input1 = null;
    this.input2 = null;
    this.type = gateTypes[currentGateIndex];
  }

  get value() {
    const v1 = this.input1 ? this.input1.value : false;
    const v2 = this.input2 ? this.input2.value : false;

    switch (this.type) {
      case 'AND':  return v1 && v2;
      case 'OR':   return v1 || v2;
      case 'XOR':  return v1 !== v2;
      case 'NAND': return !(v1 && v2);
      case 'NOR':  return !(v1 || v2);
      case 'XNOR': return v1 === v2;
      case 'NOT':  return !v1;
      default:     return false;
    }
  }

  show() {
    fill(pressedGate ? '#1f618d' : '#3498db');
    stroke(30);
    strokeWeight(2);
    square(this.x, this.y, this.size, 12);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.type, this.x + this.size / 2, this.y + this.size / 2);
  }

  nextType() {
    currentGateIndex = (currentGateIndex + 1) % gateTypes.length;
    this.type = gateTypes[currentGateIndex];
  }

  clicked(mx, my) {
    return mx > this.x && mx < this.x + this.size && my > this.y && my < this.y + this.size;
  }
}

class Output {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 70;
    this.input = null;
  }

  get value() {
    return this.input ? this.input.value : false;
  }

  show() {
    fill(this.value ? '#2ecc71' : '#e74c3c');
    stroke(30);
    strokeWeight(2);
    square(this.x, this.y, this.size, 12);

    noStroke();
    fill(30);
    textAlign(CENTER, CENTER);
    textSize(28);
    text(this.value ? '1' : '0', this.x + this.size / 2, this.y + this.size / 2);

    textSize(13);
    fill(60);
    text(t().outputLabel, this.x + this.size / 2, this.y - 12);
  }
}

function getCanvasCoords(evt) {
  const rect = canvasEl.getBoundingClientRect();
  const scaleX = width / rect.width;
  const scaleY = height / rect.height;

  return {
    x: (evt.clientX - rect.left) * scaleX,
    y: (evt.clientY - rect.top) * scaleY
  };
}

function handlePointerDown(evt) {
  evt.preventDefault();

  const pos = getCanvasCoords(evt);
  pointerDown = true;
  pointerX = pos.x;
  pointerY = pos.y;

  if (input1.clicked(pos.x, pos.y)) {
    input1.toggle();
    pressedInput = 1;
    return;
  }

  if (gate.type !== 'NOT' && input2.clicked(pos.x, pos.y)) {
    input2.toggle();
    pressedInput = 2;
    return;
  }

  if (gate.clicked(pos.x, pos.y)) {
    gate.nextType();
    pressedGate = true;
    return;
  }

  pressedInput = null;
  pressedGate = false;
}

function handlePointerMove(evt) {
  if (!pointerDown) return;
  const pos = getCanvasCoords(evt);
  pointerX = pos.x;
  pointerY = pos.y;
}

function handlePointerUp() {
  pointerDown = false;
  pressedInput = null;
  pressedGate = false;
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  canvasEl = cnv.elt;

  input1 = new Input(width * 0.15, height * 0.25);
  input2 = new Input(width * 0.15, height * 0.6);
  gate = new Gate(width * 0.45, height * 0.4);
  output = new Output(width * 0.75, height * 0.4);

  input1.id = 1;
  input2.id = 2;

  gate.input1 = input1;
  gate.input2 = input2;
  output.input = gate;

  canvasEl.addEventListener('pointerdown', handlePointerDown, { passive: false });
  canvasEl.addEventListener('pointermove', handlePointerMove, { passive: false });
  canvasEl.addEventListener('pointerup', handlePointerUp, { passive: false });
  canvasEl.addEventListener('pointercancel', handlePointerUp, { passive: false });
  canvasEl.addEventListener('pointerleave', handlePointerUp, { passive: false });

  applyLanguage();
}

function draw() {
  background(235);

  input1.show();

  if (gate.type !== 'NOT') {
    input2.show();
  } else {
    fill(200, 100);
    stroke(150);
    strokeWeight(2);
    square(input2.x, input2.y, input2.size, 12);

    fill(100);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(28);
    text('✖', input2.x + input2.size / 2, input2.y + input2.size / 2);

    textSize(13);
    fill(80);
    text(t().notUsed, input2.x + input2.size / 2, input2.y - 12);
  }

  gate.show();
  output.show();

  stroke(50);
  strokeWeight(4);
  line(input1.x + input1.size, input1.y + input1.size / 2, gate.x, gate.y + gate.size / 4);

  if (gate.type !== 'NOT') {
    line(input2.x + input2.size, input2.y + input2.size / 2, gate.x, gate.y + gate.size * 3 / 4);
  }

  line(gate.x + gate.size, gate.y + gate.size / 2, output.x, output.y + output.size / 2);
  strokeWeight(1);

  if (pointerDown) {
    if (input1.clicked(pointerX, pointerY)) {
      pressedInput = 1;
    } else if (gate.type !== 'NOT' && input2.clicked(pointerX, pointerY)) {
      pressedInput = 2;
    } else if (!pressedGate) {
      pressedInput = null;
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);

  input1.x = width * 0.15;
  input1.y = height * 0.25;

  input2.x = width * 0.15;
  input2.y = height * 0.6;

  gate.x = width * 0.45;
  gate.y = height * 0.4;

  output.x = width * 0.75;
  output.y = height * 0.4;
}









