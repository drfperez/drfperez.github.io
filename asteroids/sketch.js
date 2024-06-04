let ship; // Declara la variable per a la nau
let asteroids = []; // Declara un array per als asteroides
let lasers = []; // Declara un array per als lasers
let score = 0; // Declara la puntuació inicial com a 0
let gameStarted = false; // Declara si el joc ha començat com a fals
let isMobile; // Declara una variable per detectar si l'usuari està en un dispositiu mòbil

function setup() { // Funció de configuració
  createCanvas(windowWidth, windowHeight); // Crea un canvas que ocupa tota la finestra del navegador
  detectDevice(); // Detecta si l'usuari està en un dispositiu mòbil
  showIntroScreen(); // Mostra la pantalla d'introducció al joc
  ship = new Ship(); // Crea una nova nau
  for (let i = 0; i < 10; i++) { // Bucle per a crear 10 asteroides
    asteroids.push(new Asteroid());
  }
}

function draw() { // Funció de dibuix
  background(0); // Estableix el color de fons a negre

  if (!gameStarted) { // Si el joc no ha començat encara
    showIntroScreen(); // Mostra la pantalla d'introducció
    return;
  }

  ship.update(); // Actualitza la nau
  ship.render(); // Dibuixa la nau
  ship.edges(); // Controla els límits de la nau

  for (let i = lasers.length - 1; i >= 0; i--) { // Bucle per a actualitzar i dibuixar els lasers
    lasers[i].update(); // Actualitza el laser
    lasers[i].render(); // Dibuixa el laser
    if (lasers[i].offscreen()) { // Si el laser surt de la pantalla
      lasers.splice(i, 1); // Elimina el laser de l'array
    } else { // Si el laser no surt de la pantalla
      for (let j = asteroids.length - 1; j >= 0; j--) { // Bucle per a comprovar si el laser impacta amb un asteroide
        if (lasers[i].hits(asteroids[j])) { // Si el laser impacta amb un asteroide
          asteroids.splice(j, 1); // Elimina l'asteroide de l'array
          lasers.splice(i, 1); // Elimina el laser de l'array
          score++; // Incrementa la puntuació
          break; // Sortir del bucle interior
        }
      }
    }
  }

  for (let i = asteroids.length - 1; i >= 0; i--) { // Bucle per a actualitzar i dibuixar els asteroides
    asteroids[i].update(); // Actualitza l'asteroide
    asteroids[i].render(); // Dibuixa l'asteroide
    asteroids[i].edges(); // Controla els límits de l'asteroide
    if (ship.hits(asteroids[i])) { // Si la nau impacta amb un asteroide
      console.log("Game Over"); // Mostra "Game Over" a la consola
      noLoop(); // Atura el joc
    }
  }

  // Mostra la puntuació
  fill(255); // Estableix el color del text a blanc
  textSize(24); // Estableix la mida del text a 24
  textAlign(RIGHT); // Alinea el text a la dreta
  text("Puntuació: " + score, width - 20, 40); // Mostra la puntuació a la part superior dreta de la pantalla
}

function detectDevice() { // Funció per detectar el tipus de dispositiu
  if (/Mobi|Android/i.test(navigator.userAgent)) { // Si l'usuari està en un dispositiu mòbil
    isMobile = true; // Estableix isMobile a true
  } else { // Si l'usuari no està en un dispositiu mòbil
    isMobile = false; // Estableix isMobile a false
  }
}

function showIntroScreen() { // Funció per mostrar la pantalla d'introducció
  background(0); // Estableix el color de fons a negre
  fill(255); // Estableix el color del text a blanc
  textAlign(CENTER); // Alinea el text al centre
  textSize(32); // Estableix la mida del text a 32
  text("Joc d'Asteroides", width / 2, height / 3); // Mostra el títol del joc al centre de la pantalla
  textSize(24); // Estableix la mida del text a 24

  if (isMobile) { // Si l'usuari està en un dispositiu mòbil
    text("Toca per començar", width / 2, height / 2); // Mostra "Toca per començar" al centre de la pantalla
    text("Toca per moure i disparar", width / 2, height / 2 + 40); // Mostra "Toca per moure i disparar" sota del text anterior
  } else { // Si l'usuari no està en un dispositiu mòbil
    text("Clica per començar", width / 2, height / 2); // Mostra "Clica per començar" al centre de la pantalla
    text("Clica i arrossega per moure i disparar", width / 2, height / 2 + 40); // Mostra "Clica i arrossega per moure i disparar" sota del text anterior
  }
}

function touchStarted() { // Funció que s'executa quan es toca la pantalla
  if (!gameStarted) { // Si el joc no ha començat encara
    gameStarted = true; // Estableix gameStarted a true
    return false; // Impedeix el comportament per defecte del navegador
  }
  if (isMobile) { // Si l'usuari està en un dispositiu mòbil
    ship.setRotation(atan2(touches[0].y - ship.pos.y, touches[0].x - ship.pos.x)); // Estableix la rotació de la nau basant-se en la posició del toc
    ship.boost(); // Augmenta la velocitat de la nau
    ship.fire(); // Dispara un laser
    return false; // Impedeix el comportament per defecte del navegador
  }
}

function touchMoved() { // Funció que s'executa quan es mou el dit per la pantalla
  if (isMobile) { // Si l'usuari està en un dispositiu mòbil
    ship.setRotation(atan2(touches[0].y - ship.pos.y, touches[0].x - ship.pos.x)); // Calcula l'angle de rotació de la nau basant-se en la posició del toc
    ship.boost(); // Augmenta la velocitat de la nau
    return false; // Impedeix el comportament per defecte del navegador
  }
}

function mousePressed() { // Funció que s'executa quan es prem el botó del ratolí
  if (!gameStarted) { // Si el joc no ha començat encara
    gameStarted = true; // Estableix gameStarted a true
    return false; // Impedeix el comportament per defecte del navegador
  }
  if (!isMobile) { // Si l'usuari no està en un dispositiu mòbil
    ship.setRotation(atan2(mouseY - ship.pos.y, mouseX - ship.pos.x)); // Calcula l'angle de rotació de la nau basant-se en la posició del ratolí
    ship.boost(); // Augmenta la velocitat de la nau
    ship.fire(); // Dispara un laser
    return false; // Impedeix el comportament per defecte del navegador
  }
}

function mouseDragged() { // Funció que s'executa quan es mou el ratolí mentre es manté premut el botó
  if (!isMobile) { // Si l'usuari no està en un dispositiu mòbil
    ship.setRotation(atan2(mouseY - ship.pos.y, mouseX - ship.pos.x)); // Calcula l'angle de rotació de la nau basant-se en la posició del ratolí
    ship.boost(); // Augmenta la velocitat de la nau
    return false; // Impedeix el comportament per defecte del navegador
  }
}

function windowResized() { // Funció que s'executa quan es redimensiona la finestra del navegador
  resizeCanvas(windowWidth, windowHeight); // Redimensiona el canvas perquè coincideixi amb les noves dimensions de la finestra
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

