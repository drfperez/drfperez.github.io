
let ship;
let asteroids = [];
let lasers = [];
let score = 0;
let gameStarted = false;
let isMobile;
let gameOver = false;
let intervalId;

function setup() {
  createCanvas(windowWidth, windowHeight);
  detectDevice();
  showIntroScreen();
  ship = new Ship();
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
  intervalId = setInterval(addAsteroid, 3000); // Afegir un nou asteroide cada 3 segons
}

function draw() {
  background(0);

  if (gameOver) {
    showGameOverScreen();
    return;
  }

  if (!gameStarted) {
    showIntroScreen();
    return;
  }

  ship.update();
  ship.render();
  ship.edges();

  for (let i = lasers.length - 1; i >= 0; i--) {
    lasers[i].update();
    lasers[i].render();
    if (lasers[i].offscreen()) {
      lasers.splice(i, 1);
    } else {
      for (let j = asteroids.length - 1; j >= 0; j--) {
        if (lasers[i].hits(asteroids[j])) {
          asteroids.splice(j, 1);
          lasers.splice(i, 1);
          score++;
          break;
        }
      }
    }
  }

  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].update();
    asteroids[i].render();
    asteroids[i].edges();
    if (ship.hits(asteroids[i])) {
      console.log("Game Over");
      gameOver = true;
      clearInterval(intervalId); // Atura la creació de nous asteroides
    }
  }

  fill(255);
  textSize(24);
  textAlign(RIGHT);
  text("Puntuació: " + score, width - 20, 40);
}

function showGameOverScreen() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("Game Over", width / 2, height / 2 - 40);
  textSize(24);
  text("Puntuació final: " + score, width / 2, height / 2);
  text("Clica o toca per jugar de nou", width / 2, height / 2 + 40);
}

function detectDevice() {
  if (/Mobi|Android/i.test(navigator.userAgent)) {
    isMobile = true;
  } else {
    isMobile = false;
  }
}

function showIntroScreen() {
  background(0);
  fill(255);
  textAlign(CENTER);
  textSize(32);
  text("Joc d'Asteroides", width / 2, height / 3);
  textSize(24);
  if (isMobile) {
    text("Toca per començar", width / 2, height / 2);
    text("Toca per moure i disparar", width / 2, height / 2 + 40);
  } else {
    text("Clica per començar", width / 2, height / 2);
    text("Clica i arrossega per moure i disparar", width / 2, height / 2 + 40);
  }
}

function touchStarted() {
  if (!gameStarted) {
    gameStarted = true;
    return false;
  }
  if (gameOver) {
    restartGame();
    return false;
  }
  if (isMobile) {
    ship.setRotation(atan2(touches[0].y - ship.pos.y, touches[0].x - ship.pos.x));
    ship.boost();
    ship.fire();
    return false;
  }
}

function mousePressed() {
  if (!gameStarted) {
    gameStarted = true;
    return false;
  }
  if (gameOver) {
    restartGame();
    return false;
  }
  if (!isMobile) {
    ship.setRotation(atan2(mouseY - ship.pos.y, mouseX - ship.pos.x));
    ship.boost();
    ship.fire();
    return false;
  }
}

function restartGame() {
  gameOver = false;
  score = 0;
  ship = new Ship();
  asteroids = [];
  lasers = [];
  for (let i = 0; i < 10; i++) {
    asteroids.push(new Asteroid());
  }
  intervalId = setInterval(addAsteroid, 3000); // Reprendre la creació de nous asteroides
}

function addAsteroid() {
  asteroids.push(new Asteroid());
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
class Ship { // Declara la classe Ship
  constructor() { // Constructor de la classe
    this.pos = createVector(width / 2, height / 2); // Posició inicial de la nau al mig de la pantalla
    this.r = 20; // Radi de la nau
    this.heading = 0; // Orientació inicial de la nau
    this.vel = createVector(0, 0); // Velocitat inicial de la nau (zero)
  }

  update() { // Mètode per actualitzar la nau
    this.pos.add(this.vel); // Mou la nau basant-se en la seva velocitat
    this.vel.mult(0.99); // Aplica una fricció a la velocitat per simular resistència a l'aire o l'espai
  }

  render() { // Mètode per renderitzar la nau
    push(); // Guarda l'estat de les transformacions
    translate(this.pos.x, this.pos.y); // Situa el punt d'origen en la posició de la nau
    rotate(this.heading + PI / 2); // Rota la nau segons la seva orientació
    fill(0); // Estableix el color de l'interior de la nau a negre
    stroke(255); // Estableix el color dels contorns de la nau a blanc
    triangle(-this.r, this.r, this.r, this.r, 0, -this.r); // Dibuixa la nau com un triangle
    pop(); // Restaura l'estat de les transformacions
  }

  setRotation(angle) { // Mètode per establir la rotació de la nau
    this.heading = angle; // Actualitza l'orientació de la nau amb l'angle proporcionat
  }

  boost() { // Mètode per augmentar la velocitat de la nau
    let force = p5.Vector.fromAngle(this.heading); // Crea un vector de força a partir de l'angle d'orientació de la nau
    this.vel.add(force.mult(0.5)); // Augmenta la velocitat de la nau aplicant la força al vector de velocitat
  }

  fire() { // Mètode per disparar
    lasers.push(new Laser(this.pos, this.heading)); // Crea un nou laser i l'afegeix a l'array de lasers
  }

  edges() { // Mètode per gestionar els límits dels marges de la pantalla
    if (this.pos.x > width + this.r) { // Si la nau surt per la dreta de la pantalla
      this.pos.x = -this.r; // La fa aparèixer per l'esquerra
    } else if (this.pos.x < -this.r) { // Si la nau surt per l'esquerra de la pantalla
      this.pos.x = width + this.r; // La fa aparèixer per la dreta
    }
    if (this.pos.y > height + this.r) { // Si la nau surt per la part inferior de la pantalla
      this.pos.y = -this.r; // La fa aparèixer per la part superior
    } else if (this.pos.y < -this.r) { // Si la nau surt per la part superior de la pantalla
      this.pos.y = height + this.r; // La fa aparèixer per la part inferior
    }
  }

  hits(asteroid) { // Mètode per detectar col·lisions amb els asteroides
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y); // Calcula la distància entre el centre de la nau i el centre de l'asteroide
    return d < this.r + asteroid.r; // Retorna true si la distància és menor que la suma dels radis de la nau i de l'asteroide, indicant una col·lisió
  }
}
class Laser { // Declara la classe Laser
  constructor(pos, angle) { // Constructor de la classe
    this.pos = createVector(pos.x, pos.y); // Posició inicial del laser
    this.vel = p5.Vector.fromAngle(angle); // Vector de velocitat inicial basat en l'angle de tir
    this.vel.mult(15); // Multiplica la velocitat per 15 per establir la velocitat del laser
    this.r = 4; // Radi del laser
  }

  update() { // Mètode per actualitzar la posició del laser
    this.pos.add(this.vel); // Mou el laser segons la seva velocitat
  }

  render() { // Mètode per renderitzar el laser
    push(); // Guarda l'estat de les transformacions
    stroke(255); // Estableix el color dels contorns del laser a blanc
    strokeWeight(4); // Estableix el gruix dels contorns del laser a 4 píxels
    point(this.pos.x, this.pos.y); // Dibuixa un punt a la posició actual del laser
    pop(); // Restaura l'estat de les transformacions
  }

  offscreen() { // Mètode per comprovar si el laser surt de la pantalla
    return (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0); // Retorna true si la posició del laser està fora dels límits de la pantalla
  }

  hits(asteroid) { // Mètode per detectar col·lisions amb els asteroides
    let d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y); // Calcula la distància entre el centre del laser i el centre de l'asteroide
    return d < this.r + asteroid.r; // Retorna true si la distància és menor que la suma dels radis del laser i de l'asteroide, indicant una col·lisió
  }
}
class Asteroid { // Declara la classe Asteroid
  constructor() { // Constructor de la classe
    this.pos = createVector(random(width), random(height)); // Posició aleatòria de l'asteroide dins dels límits de la pantalla
    this.r = random(30, 50); // Radi aleatori de l'asteroide entre 30 i 50 píxels
    this.vel = p5.Vector.random2D(); // Vector de velocitat aleatori en una direcció arbitrària
    this.vel.mult(2); // Multiplica la velocitat per 2 per augmentar-la
  }

  update() { // Mètode per actualitzar la posició de l'asteroide
    this.pos.add(this.vel); // Mou l'asteroide segons la seva velocitat
  }

  render() { // Mètode per renderitzar l'asteroide
    push(); // Guarda l'estat de les transformacions
    translate(this.pos.x, this.pos.y); // Situa el punt d'origen en la posició de l'asteroide
    stroke(255); // Estableix el color dels contorns de l'asteroide a blanc
    noFill(); // No omple l'asteroide amb cap color
    ellipse(0, 0, this.r * 2); // Dibuixa un cercle a la posició actual de l'asteroide amb el radi calculat
    pop(); // Restaura l'estat de les transformacions
  }

  edges() { // Mètode per gestionar els límits dels marges de la pantalla
    if (this.pos.x > width + this.r) { // Si l'asteroide surt per la dreta de la pantalla
      this.pos.x = -this.r; // La fa aparèixer per l'esquerra
    } else if (this.pos.x < -this.r) { // Si l'asteroide surt per l'esquerra de la pantalla
      this.pos.x = width + this.r; // La fa aparèixer per la dreta
    }
    if (this.pos.y > height + this.r) { // Si l'asteroide surt per la part inferior de la pantalla
      this.pos.y = -this.r; // La fa aparèixer per la part superior
    } else if (this.pos.y < -this.r) { // Si l'asteroide surt per la part superior de la pantalla
      this.pos.y = height + this.r; // La fa aparèixer per la part inferior
    }
  }
}

