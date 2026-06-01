
const $ = (id) => document.getElementById(id);

const i18n = {
  ca: {
    pageTitle: "GearLab · Simulador didàctic d'engranatges",
    pageSubtitle: "Visualitza de manera clara com canvien la velocitat, el parell i el sentit de gir. Ideal per a alumnat i explicacions a classe.",

    controlsTitle: "Controls",
    moduleLabel: "Mòdul comú (m)",
    moduleHelp: "Els dos engranatges comparteixen mòdul perquè l'engranament sigui correcte.",
    driverLabel: "Engranatge conductor",
    driver1Text: "Engranatge 1",
    driver2Text: "Engranatge 2",
    driverHelp: "L'engranatge conductor fixa la velocitat d'entrada.",
    rpmInputLabel: "Velocitat de l'engranatge conductor (RPM)",
    rpmInputHelp: "Aquest valor és la velocitat d'entrada del sistema.",
    animLabel: "Velocitat de l'animació",
    animHelp: "Només afecta l'animació visual, no els càlculs.",

    gear1Title: "Engranatge 1",
    gear2Title: "Engranatge 2",
    teeth1Label: "Nombre de dents (z₁)",
    teeth2Label: "Nombre de dents (z₂)",
    teeth1Help: "Més dents ⇒ diàmetre primitiu més gran.",
    teeth2Help: "Si té més dents i és de sortida, gira més lent.",
    diameter1Label: "Diàmetre primitiu (d₁)",
    diameter2Label: "Diàmetre primitiu (d₂)",
    diameter1Help: "Es calcula amb d = m · z.",
    diameter2Help: "Es calcula amb d = m · z.",

    presetsTitle: "Exemples ràpids",
    presetBtn1: "Reducció 2:1",
    presetBtn2: "Multiplicació 1:2",
    presetBtn3: "Relació 1:1",
    presetBtn4: "Reducció 3:1",

    formulaTitle: "Fórmules clau",
    formulaLine1: "d = m · z",
    formulaLine2: "i = z₂ / z₁",
    formulaLine3: "n₂ = n₁ · z₁ / z₂",
    formulaLine4: "ω = 2πn / 60",

    visualTitle: "Visualització",
    rotationBadge: "Giren en sentits oposats",
    meshBadge: "Mòdul comú correcte",
    legendGear1: "Engranatge 1",
    legendGear2: "Engranatge 2",
    legendPitch: "Cercle primitiu",
    legendCenter: "Centre de l'eix",
    visualFootnote: "Els engranatges en contacte giren en sentits oposats i la relació de dents determina la velocitat de sortida.",

    resultsTitle: "Resultats",
    ratioLabel: "Relació de transmissió",
    rpm1Label: "Velocitat de l'engranatge 1",
    rpm2Label: "Velocitat de l'engranatge 2",
    omegaOutLabel: "Velocitat angular de sortida",
    torqueLabel: "Parell de sortida (si entren 1 N·m)",
    centerDistanceLabel: "Distància entre centres",
    stepsTitle: "Explicació pas a pas",
    interpretationMore: "Si l'engranatge de sortida té més dents, gira més lent però transmet més parell.",
    interpretationLess: "Si l'engranatge de sortida té menys dents, gira més ràpid però transmet menys parell.",
    interpretationEqual: "Si tots dos engranatges tenen les mateixes dents, giren amb la mateixa velocitat però en sentit contrari.",
    teacherTipBox: "Suggeriment didàctic: canvia només el nombre de dents i demana a l'alumnat que predigui què passarà abans de mirar els resultats.",
    powerNote: "Model ideal: se suposa transmissió sense pèrdues per facilitar la comprensió.",

    resetBtn: "Restableix",
    play: "Reprodueix",
    pause: "Pausa",
    input: "Entrada",
    output: "Sortida",
    rpm: "RPM",
    rads: "rad/s",
    torqueUnit: "N·m",
    invalid: "Introdueix valors vàlids: m > 0 i nombre de dents ≥ 6.",
    step1: "Calcula els diàmetres primitius: d₁ = m·z₁ = {d1} mm i d₂ = m·z₂ = {d2} mm.",
    step2: "Calcula la relació de transmissió: i = z₂ / z₁ = {ratio}.",
    step3_driver_g1: "Com que l'engranatge 1 és el conductor: n₂ = n₁·z₁/z₂ = {rpmOut} RPM.",
    step3_driver_g2: "Com que l'engranatge 2 és el conductor: n₁ = n₂·z₂/z₁ = {rpmOut} RPM.",
    step4_g1: "En un model ideal, si entren 1 N·m, el parell de sortida és T₂ ≈ {torque} N·m.",
    step4_g2: "En un model ideal, si entren 1 N·m, el parell de sortida és T₁ ≈ {torque} N·m.",
    step5: "Els engranatges en contacte sempre giren en sentits oposats.",
    step6: "La distància entre centres és (d₁ + d₂)/2 = {center} mm.",
    driverText1: "L'engranatge 1 és el conductor",
    driverText2: "L'engranatge 2 és el conductor",
    centerDistanceText: "Distància entre centres",

    teacherTitle: "Mode professor",
    activityLabel: "Activitat guiada",
    activity_z2_speed: "Si z₂ augmenta, què passa amb la velocitat?",
    activity_predict_current: "Prediu abans de calcular",
    activity_equal_teeth: "Si z₁ = z₂, què passa?",
    newQuestionBtn: "Nova pregunta",
    showSolutionBtn: "Mostra solució",
    hideSolutionBtn: "Amaga solució",
    checkAnswerBtn: "Comprova resposta",
    predictionLabel: "Escriu la teva predicció",
    predictionPlaceholder: "Explica què creus que passarà i per què...",
    teacherHint: "Primer respon sense mirar els resultats. Després comprova la teva idea.",
    noAnswer: "Selecciona una resposta abans de comprovar-la.",
    correctMsg: "Correcte! Bona predicció.",
    incorrectMsg: "Encara no. Revisa la relació entre dents, velocitat i parell.",
    solutionTitle: "Solució raonada",
    option_increases: "Augmenta",
    option_decreases: "Disminueix",
    option_same: "Es manté igual",
    option_slower_more_torque: "La sortida gira més lent i amb més parell",
    option_faster_less_torque: "La sortida gira més ràpid i amb menys parell",
    option_same_speed_same_torque: "La sortida manté la mateixa velocitat i el mateix parell ideal",
    option_same_speed_opposite: "Mateixa velocitat, però en sentit contrari",
    option_half_speed_same: "La meitat de velocitat i en el mateix sentit",
    option_double_speed_opposite: "Doble velocitat i en sentit contrari",
    teacher_solution_z2_speed: "Si augmenta z₂ i la resta es manté constant, la velocitat de sortida disminueix, perquè n₂ = n₁·z₁/z₂. Si el denominador és més gran, el resultat és més petit.",
    teacher_solution_predict_current: "Amb els valors actuals, la sortida és de {rpmOut} RPM i el parell ideal és d'aproximadament {torque} N·m.",
    teacher_solution_equal_teeth: "Si z₁ = z₂, la relació és 1. Això vol dir mateixa velocitat angular en valor absolut, però amb sentit contrari.",

    hideResults: "Amaga resultats",
    showResults: "Mostra resultats"
  },

  es: {
    pageTitle: "GearLab · Simulador didáctico de engranajes",
    pageSubtitle: "Visualiza de forma clara cómo cambian la velocidad, el par y el sentido de giro. Ideal para alumnado y explicaciones en clase.",

    controlsTitle: "Controles",
    moduleLabel: "Módulo común (m)",
    moduleHelp: "Los dos engranajes comparten módulo para que el engrane sea correcto.",
    driverLabel: "Engranaje conductor",
    driver1Text: "Engranaje 1",
    driver2Text: "Engranaje 2",
    driverHelp: "El engranaje conductor fija la velocidad de entrada.",
    rpmInputLabel: "Velocidad del engranaje conductor (RPM)",
    rpmInputHelp: "Este valor es la velocidad de entrada del sistema.",
    animLabel: "Velocidad de animación",
    animHelp: "Solo afecta a la animación visual, no a los cálculos.",

    gear1Title: "Engranaje 1",
    gear2Title: "Engranaje 2",
    teeth1Label: "Número de dientes (z₁)",
    teeth2Label: "Número de dientes (z₂)",
    teeth1Help: "Más dientes ⇒ diámetro primitivo mayor.",
    teeth2Help: "Si tiene más dientes y es de salida, gira más despacio.",
    diameter1Label: "Diámetro primitivo (d₁)",
    diameter2Label: "Diámetro primitivo (d₂)",
    diameter1Help: "Se calcula con d = m · z.",
    diameter2Help: "Se calcula con d = m · z.",

    presetsTitle: "Ejemplos rápidos",
    presetBtn1: "Reducción 2:1",
    presetBtn2: "Multiplicación 1:2",
    presetBtn3: "Relación 1:1",
    presetBtn4: "Reducción 3:1",

    formulaTitle: "Fórmulas clave",
    formulaLine1: "d = m · z",
    formulaLine2: "i = z₂ / z₁",
    formulaLine3: "n₂ = n₁ · z₁ / z₂",
    formulaLine4: "ω = 2πn / 60",

    visualTitle: "Visualización",
    rotationBadge: "Giran en sentidos opuestos",
    meshBadge: "Módulo común correcto",
    legendGear1: "Engranaje 1",
    legendGear2: "Engranaje 2",
    legendPitch: "Círculo primitivo",
    legendCenter: "Centro del eje",
    visualFootnote: "Los engranajes en contacto giran en sentidos opuestos y la relación de dientes determina la velocidad de salida.",

    resultsTitle: "Resultados",
    ratioLabel: "Relación de transmisión",
    rpm1Label: "Velocidad del engranaje 1",
    rpm2Label: "Velocidad del engranaje 2",
    omegaOutLabel: "Velocidad angular de salida",
    torqueLabel: "Par de salida (si entran 1 N·m)",
    centerDistanceLabel: "Distancia entre centros",
    stepsTitle: "Explicación paso a paso",
    interpretationMore: "Si el engranaje de salida tiene más dientes, gira más despacio pero transmite más par.",
    interpretationLess: "Si el engranaje de salida tiene menos dientes, gira más rápido pero transmite menos par.",
    interpretationEqual: "Si ambos engranajes tienen el mismo número de dientes, giran con la misma velocidad pero en sentido contrario.",
    teacherTipBox: "Sugerencia didáctica: cambia solo el número de dientes y pide al alumnado que prediga qué ocurrirá antes de mirar los resultados.",
    powerNote: "Modelo ideal: se supone transmisión sin pérdidas para facilitar la comprensión.",

    resetBtn: "Restablecer",
    play: "Reproducir",
    pause: "Pausar",
    input: "Entrada",
    output: "Salida",
    rpm: "RPM",
    rads: "rad/s",
    torqueUnit: "N·m",
    invalid: "Introduce valores válidos: m > 0 y número de dientes ≥ 6.",
    step1: "Calcula los diámetros primitivos: d₁ = m·z₁ = {d1} mm y d₂ = m·z₂ = {d2} mm.",
    step2: "Calcula la relación de transmisión: i = z₂ / z₁ = {ratio}.",
    step3_driver_g1: "Como el engranaje 1 es el conductor: n₂ = n₁·z₁/z₂ = {rpmOut} RPM.",
    step3_driver_g2: "Como el engranaje 2 es el conductor: n₁ = n₂·z₂/z₁ = {rpmOut} RPM.",
    step4_g1: "En un modelo ideal, si entran 1 N·m, el par de salida es T₂ ≈ {torque} N·m.",
    step4_g2: "En un modelo ideal, si entran 1 N·m, el par de salida es T₁ ≈ {torque} N·m.",
    step5: "Los engranajes en contacto siempre giran en sentidos opuestos.",
    step6: "La distancia entre centros es (d₁ + d₂)/2 = {center} mm.",
    driverText1: "El engranaje 1 es el conductor",
    driverText2: "El engranaje 2 es el conductor",
    centerDistanceText: "Distancia entre centros",

    teacherTitle: "Modo profesor",
    activityLabel: "Actividad guiada",
    activity_z2_speed: "Si z₂ aumenta, ¿qué pasa con la velocidad?",
    activity_predict_current: "Predice antes de calcular",
    activity_equal_teeth: "Si z₁ = z₂, ¿qué ocurre?",
    newQuestionBtn: "Nueva pregunta",
    showSolutionBtn: "Mostrar solución",
    hideSolutionBtn: "Ocultar solución",
    checkAnswerBtn: "Comprobar respuesta",
    predictionLabel: "Escribe tu predicción",
    predictionPlaceholder: "Explica qué crees que ocurrirá y por qué...",
    teacherHint: "Primero responde sin mirar los resultados. Después comprueba tu idea.",
    noAnswer: "Selecciona una respuesta antes de comprobarla.",
    correctMsg: "¡Correcto! Buena predicción.",
    incorrectMsg: "Todavía no. Revisa la relación entre dientes, velocidad y par.",
    solutionTitle: "Solución razonada",
    option_increases: "Aumenta",
    option_decreases: "Disminuye",
    option_same: "Se mantiene igual",
    option_slower_more_torque: "La salida gira más despacio y con más par",
    option_faster_less_torque: "La salida gira más rápido y con menos par",
    option_same_speed_same_torque: "La salida mantiene la misma velocidad y el mismo par ideal",
    option_same_speed_opposite: "Misma velocidad, pero en sentido contrario",
    option_half_speed_same: "La mitad de velocidad y en el mismo sentido",
    option_double_speed_opposite: "Doble velocidad y en sentido contrario",
    teacher_solution_z2_speed: "Si aumenta z₂ y el resto se mantiene constante, la velocidad de salida disminuye, porque n₂ = n₁·z₁/z₂. Si el denominador es mayor, el resultado es menor.",
    teacher_solution_predict_current: "Con los valores actuales, la salida es de {rpmOut} RPM y el par ideal es de aproximadamente {torque} N·m.",
    teacher_solution_equal_teeth: "Si z₁ = z₂, la relación es 1. Eso significa misma velocidad angular en valor absoluto, pero en sentido contrario.",

    hideResults: "Ocultar resultados",
    showResults: "Mostrar resultados"
  },

  en: {
    pageTitle: "GearLab · Didactic gear simulator",
    pageSubtitle: "Clearly visualize how speed, torque and rotation direction change. Ideal for students and classroom explanations.",

    controlsTitle: "Controls",
    moduleLabel: "Common module (m)",
    moduleHelp: "Both gears share the same module so the meshing is correct.",
    driverLabel: "Driving gear",
    driver1Text: "Gear 1",
    driver2Text: "Gear 2",
    driverHelp: "The driving gear sets the input speed.",
    rpmInputLabel: "Speed of the driving gear (RPM)",
    rpmInputHelp: "This value is the system input speed.",
    animLabel: "Animation speed",
    animHelp: "It only affects the visual animation, not the calculations.",

    gear1Title: "Gear 1",
    gear2Title: "Gear 2",
    teeth1Label: "Number of teeth (z₁)",
    teeth2Label: "Number of teeth (z₂)",
    teeth1Help: "More teeth ⇒ larger pitch diameter.",
    teeth2Help: "If it has more teeth and is the output gear, it rotates more slowly.",
    diameter1Label: "Pitch diameter (d₁)",
    diameter2Label: "Pitch diameter (d₂)",
    diameter1Help: "It is calculated with d = m · z.",
    diameter2Help: "It is calculated with d = m · z.",

    presetsTitle: "Quick examples",
    presetBtn1: "Reduction 2:1",
    presetBtn2: "Increase 1:2",
    presetBtn3: "Ratio 1:1",
    presetBtn4: "Reduction 3:1",

    formulaTitle: "Key formulas",
    formulaLine1: "d = m · z",
    formulaLine2: "i = z₂ / z₁",
    formulaLine3: "n₂ = n₁ · z₁ / z₂",
    formulaLine4: "ω = 2πn / 60",

    visualTitle: "Visualization",
    rotationBadge: "They rotate in opposite directions",
    meshBadge: "Correct common module",
    legendGear1: "Gear 1",
    legendGear2: "Gear 2",
    legendPitch: "Pitch circle",
    legendCenter: "Shaft center",
    visualFootnote: "Gears in contact rotate in opposite directions and the tooth ratio determines the output speed.",

    resultsTitle: "Results",
    ratioLabel: "Transmission ratio",
    rpm1Label: "Speed of gear 1",
    rpm2Label: "Speed of gear 2",
    omegaOutLabel: "Output angular speed",
    torqueLabel: "Output torque (if input is 1 N·m)",
    centerDistanceLabel: "Center distance",
    stepsTitle: "Step-by-step explanation",
    interpretationMore: "If the output gear has more teeth, it rotates more slowly but transmits more torque.",
    interpretationLess: "If the output gear has fewer teeth, it rotates faster but transmits less torque.",
    interpretationEqual: "If both gears have the same number of teeth, they rotate at the same speed but in opposite directions.",
    teacherTipBox: "Teaching suggestion: change only the number of teeth and ask students to predict what will happen before looking at the results.",
    powerNote: "Ideal model: transmission without losses is assumed to make the concept easier to understand.",

    resetBtn: "Reset",
    play: "Play",
    pause: "Pause",
    input: "Input",
    output: "Output",
    rpm: "RPM",
    rads: "rad/s",
    torqueUnit: "N·m",
    invalid: "Enter valid values: m > 0 and number of teeth ≥ 6.",
    step1: "Calculate the pitch diameters: d₁ = m·z₁ = {d1} mm and d₂ = m·z₂ = {d2} mm.",
    step2: "Calculate the transmission ratio: i = z₂ / z₁ = {ratio}.",
    step3_driver_g1: "Since gear 1 is the driver: n₂ = n₁·z₁/z₂ = {rpmOut} RPM.",
    step3_driver_g2: "Since gear 2 is the driver: n₁ = n₂·z₂/z₁ = {rpmOut} RPM.",
    step4_g1: "In an ideal model, if 1 N·m enters, the output torque is T₂ ≈ {torque} N·m.",
    step4_g2: "In an ideal model, if 1 N·m enters, the output torque is T₁ ≈ {torque} N·m.",
    step5: "Gears in contact always rotate in opposite directions.",
    step6: "The center distance is (d₁ + d₂)/2 = {center} mm.",
    driverText1: "Gear 1 is the driver",
    driverText2: "Gear 2 is the driver",
    centerDistanceText: "Center distance",

    teacherTitle: "Teacher mode",
    activityLabel: "Guided activity",
    activity_z2_speed: "If z₂ increases, what happens to speed?",
    activity_predict_current: "Predict before calculating",
    activity_equal_teeth: "If z₁ = z₂, what happens?",
    newQuestionBtn: "New question",
    showSolutionBtn: "Show solution",
    hideSolutionBtn: "Hide solution",
    checkAnswerBtn: "Check answer",
    predictionLabel: "Write your prediction",
    predictionPlaceholder: "Explain what you think will happen and why...",
    teacherHint: "Answer first without looking at the results. Then check your idea.",
    noAnswer: "Select an answer before checking it.",
    correctMsg: "Correct! Good prediction.",
    incorrectMsg: "Not yet. Review the relationship between teeth, speed and torque.",
    solutionTitle: "Worked solution",
    option_increases: "Increases",
    option_decreases: "Decreases",
    option_same: "Stays the same",
    option_slower_more_torque: "The output rotates slower and with more torque",
    option_faster_less_torque: "The output rotates faster and with less torque",
    option_same_speed_same_torque: "The output keeps the same speed and the same ideal torque",
    option_same_speed_opposite: "Same speed, but opposite direction",
    option_half_speed_same: "Half speed and same direction",
    option_double_speed_opposite: "Double speed and opposite direction",
    teacher_solution_z2_speed: "If z₂ increases and everything else stays constant, the output speed decreases, because n₂ = n₁·z₁/z₂. If the denominator is larger, the result is smaller.",
    teacher_solution_predict_current: "With the current values, the output is {rpmOut} RPM and the ideal torque is approximately {torque} N·m.",
    teacher_solution_equal_teeth: "If z₁ = z₂, the ratio is 1. That means the same angular speed in absolute value, but opposite direction.",

    hideResults: "Hide results",
    showResults: "Show results"
  }
};

const state = {
  lang: "ca",
  module: 2,
  z1: 20,
  z2: 40,
  rpmInput: 60,
  driver: "g1",
  animScale: 0.35,
  playing: true,
  angle1: 0,
  angle2: 0,
  hideResults: false,
  teacher: {
    activity: "z2_speed",
    selectedAnswer: "",
    predictionText: "",
    showSolution: false,
    feedbackType: "",
    feedbackText: ""
  }
};

const els = {
  module: $("module"),
  teeth1: $("teeth1"),
  teeth2: $("teeth2"),
  diameter1: $("diameter1"),
  diameter2: $("diameter2"),
  rpmInput: $("rpmInput"),
  animScale: $("animScale"),
  playPauseBtn: $("playPauseBtn"),
  resetBtn: $("resetBtn"),
  toggleResultsBtn: $("toggleResultsBtn"),
  resultsGrid: $("resultsGrid"),

  stepsList: $("stepsList"),
  ratioValue: $("ratioValue"),
  rpm1Value: $("rpm1Value"),
  rpm2Value: $("rpm2Value"),
  omegaOutValue: $("omegaOutValue"),
  torqueValue: $("torqueValue"),
  centerDistanceValue: $("centerDistanceValue"),
  interpretationBox: $("interpretationBox"),
  teacherTipBox: $("teacherTipBox"),
  powerNote: $("powerNote"),

  teacherTitle: $("teacherTitle"),
  activityLabel: $("activityLabel"),
  activitySelect: $("activitySelect"),
  newQuestionBtn: $("newQuestionBtn"),
  showSolutionBtn: $("showSolutionBtn"),
  teacherActivityCard: $("teacherActivityCard")
};

function t(key){
  return i18n[state.lang][key] ?? key;
}

function setText(id, key){
  const el = $(id);
  if(el) el.textContent = t(key);
}

function replaceVars(text, vars = {}){
  let out = text;
  Object.keys(vars).forEach(key => {
    out = out.replaceAll(`{${key}}`, vars[key]);
  });
  return out;
}

function syncInputs(){
  els.module.value = state.module;
  els.teeth1.value = state.z1;
  els.teeth2.value = state.z2;
  els.rpmInput.value = state.rpmInput;
  els.animScale.value = state.animScale;
  const radio = document.querySelector(`input[name="driver"][value="${state.driver}"]`);
  if (radio) radio.checked = true;
}

function readInputs(){
  state.module = parseFloat(els.module.value) || 0;
  state.z1 = parseInt(els.teeth1.value) || 0;
  state.z2 = parseInt(els.teeth2.value) || 0;
  state.rpmInput = parseFloat(els.rpmInput.value) || 0;
  state.animScale = parseFloat(els.animScale.value) || 0.35;
  const checked = document.querySelector('input[name="driver"]:checked');
  state.driver = checked ? checked.value : "g1";
}

function applyPreset(preset){
  switch(preset){
    case "2to1":
      state.module = 2;
      state.z1 = 20;
      state.z2 = 40;
      state.rpmInput = 60;
      state.driver = "g1";
      break;
    case "1to2":
      state.module = 2;
      state.z1 = 40;
      state.z2 = 20;
      state.rpmInput = 60;
      state.driver = "g1";
      break;
    case "1to1":
      state.module = 2;
      state.z1 = 30;
      state.z2 = 30;
      state.rpmInput = 60;
      state.driver = "g1";
      break;
    case "3to1":
      state.module = 2;
      state.z1 = 15;
      state.z2 = 45;
      state.rpmInput = 60;
      state.driver = "g1";
      break;
  }

  resetTeacherQuestion();
  syncInputs();
  updateAll();
}

function updatePlayPauseButton(){
  els.playPauseBtn.textContent = state.playing ? t("pause") : t("play");
}

function updateToggleResultsButton(){
  els.toggleResultsBtn.textContent = state.hideResults ? t("showResults") : t("hideResults");
}

function applyLanguage(lang){
  state.lang = lang;
  document.documentElement.lang = lang;

  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  [
    ["pageTitle","pageTitle"],
    ["pageSubtitle","pageSubtitle"],
    ["controlsTitle","controlsTitle"],
    ["moduleLabel","moduleLabel"],
    ["moduleHelp","moduleHelp"],
    ["driverLabel","driverLabel"],
    ["driver1Text","driver1Text"],
    ["driver2Text","driver2Text"],
    ["driverHelp","driverHelp"],
    ["rpmInputLabel","rpmInputLabel"],
    ["rpmInputHelp","rpmInputHelp"],
    ["animLabel","animLabel"],
    ["animHelp","animHelp"],
    ["gear1Title","gear1Title"],
    ["gear2Title","gear2Title"],
    ["teeth1Label","teeth1Label"],
    ["teeth2Label","teeth2Label"],
    ["teeth1Help","teeth1Help"],
    ["teeth2Help","teeth2Help"],
    ["diameter1Label","diameter1Label"],
    ["diameter2Label","diameter2Label"],
    ["diameter1Help","diameter1Help"],
    ["diameter2Help","diameter2Help"],
    ["presetsTitle","presetsTitle"],
    ["presetBtn1","presetBtn1"],
    ["presetBtn2","presetBtn2"],
    ["presetBtn3","presetBtn3"],
    ["presetBtn4","presetBtn4"],
    ["formulaTitle","formulaTitle"],
    ["formulaLine1","formulaLine1"],
    ["formulaLine2","formulaLine2"],
    ["formulaLine3","formulaLine3"],
    ["formulaLine4","formulaLine4"],
    ["visualTitle","visualTitle"],
    ["rotationBadge","rotationBadge"],
    ["meshBadge","meshBadge"],
    ["legendGear1","legendGear1"],
    ["legendGear2","legendGear2"],
    ["legendPitch","legendPitch"],
    ["legendCenter","legendCenter"],
    ["visualFootnote","visualFootnote"],
    ["resultsTitle","resultsTitle"],
    ["ratioLabel","ratioLabel"],
    ["rpm1Label","rpm1Label"],
    ["rpm2Label","rpm2Label"],
    ["omegaOutLabel","omegaOutLabel"],
    ["torqueLabel","torqueLabel"],
    ["centerDistanceLabel","centerDistanceLabel"],
    ["stepsTitle","stepsTitle"],
    ["teacherTipBox","teacherTipBox"],
    ["powerNote","powerNote"],
    ["resetBtn","resetBtn"],
    ["teacherTitle","teacherTitle"],
    ["activityLabel","activityLabel"]
  ].forEach(([id, key]) => setText(id, key));

  updatePlayPauseButton();
  updateToggleResultsButton();
  updateAll();
}

function resetAll(){
  state.module = 2;
  state.z1 = 20;
  state.z2 = 40;
  state.rpmInput = 60;
  state.driver = "g1";
  state.animScale = 0.35;
  state.playing = true;
  state.angle1 = 0;
  state.angle2 = 0;
  state.hideResults = false;

  resetTeacherQuestion();
  syncInputs();
  updatePlayPauseButton();
  updateToggleResultsButton();
  updateAll();
}

function calc(){
  const m = state.module;
  const z1 = state.z1;
  const z2 = state.z2;

  if(!(m > 0) || z1 < 6 || z2 < 6){
    return { valid:false };
  }

  const d1 = m * z1;
  const d2 = m * z2;
  const r1 = d1 / 2;
  const r2 = d2 / 2;
  const ratio = z2 / z1;
  const centerDistance = (d1 + d2) / 2;

  let rpm1, rpm2, outputRpm, torqueOut;
  if(state.driver === "g1"){
    rpm1 = state.rpmInput;
    rpm2 = -(rpm1 * z1 / z2);
    outputRpm = Math.abs(rpm2);
    torqueOut = ratio;
  } else {
    rpm2 = state.rpmInput;
    rpm1 = -(rpm2 * z2 / z1);
    outputRpm = Math.abs(rpm1);
    torqueOut = 1 / ratio;
  }

  const outputOmega = outputRpm * 2 * Math.PI / 60;

  return {
    valid:true,
    m, z1, z2, d1, d2, r1, r2, ratio, centerDistance,
    rpm1, rpm2, outputRpm, outputOmega, torqueOut
  };
}

function updateResults(data){
  els.resultsGrid.classList.toggle("hidden", state.hideResults);

  if(!data.valid){
    els.diameter1.value = "";
    els.diameter2.value = "";
    els.ratioValue.textContent = "—";
    els.rpm1Value.textContent = "—";
    els.rpm2Value.textContent = "—";
    els.omegaOutValue.textContent = "—";
    els.torqueValue.textContent = "—";
    els.centerDistanceValue.textContent = "—";
    els.stepsList.innerHTML = `<li>${t("invalid")}</li>`;
    els.interpretationBox.textContent = t("invalid");
    return;
  }

  els.diameter1.value = data.d1.toFixed(2);
  els.diameter2.value = data.d2.toFixed(2);

  els.ratioValue.textContent = data.ratio.toFixed(2);
  els.rpm1Value.textContent = `${Math.abs(data.rpm1).toFixed(2)} ${t("rpm")}`;
  els.rpm2Value.textContent = `${Math.abs(data.rpm2).toFixed(2)} ${t("rpm")}`;
  els.omegaOutValue.textContent = `${data.outputOmega.toFixed(2)} ${t("rads")}`;
  els.torqueValue.textContent = `${data.torqueOut.toFixed(2)} ${t("torqueUnit")}`;
  els.centerDistanceValue.textContent = `${data.centerDistance.toFixed(2)} mm`;

  const steps = [
    replaceVars(t("step1"), {
      d1: data.d1.toFixed(2),
      d2: data.d2.toFixed(2)
    }),
    replaceVars(t("step2"), {
      ratio: data.ratio.toFixed(2)
    }),
    replaceVars(state.driver === "g1" ? t("step3_driver_g1") : t("step3_driver_g2"), {
      rpmOut: data.outputRpm.toFixed(2)
    }),
    replaceVars(state.driver === "g1" ? t("step4_g1") : t("step4_g2"), {
      torque: data.torqueOut.toFixed(2)
    }),
    t("step5"),
    replaceVars(t("step6"), {
      center: data.centerDistance.toFixed(2)
    })
  ];

  els.stepsList.innerHTML = steps.map(s => `<li>${s}</li>`).join("");

  const outputHasMoreTeeth = state.driver === "g1"
    ? data.z2 > data.z1
    : data.z1 > data.z2;

  if(data.z1 === data.z2){
    els.interpretationBox.textContent = t("interpretationEqual");
  } else {
    els.interpretationBox.textContent = outputHasMoreTeeth
      ? t("interpretationMore")
      : t("interpretationLess");
  }

  els.teacherTipBox.textContent = t("teacherTipBox");
  els.powerNote.textContent = t("powerNote");
}

/* =========================
   MODE PROFESSOR
========================= */
function resetTeacherQuestion(){
  state.teacher.selectedAnswer = "";
  state.teacher.predictionText = "";
  state.teacher.showSolution = false;
  state.teacher.feedbackType = "";
  state.teacher.feedbackText = "";
}

function getTeacherActivity(data){
  const activity = state.teacher.activity;

  if(!data.valid){
    return {
      prompt: t("invalid"),
      subtext: "",
      options: [],
      correct: "",
      solution: t("invalid")
    };
  }

  if(activity === "z2_speed"){
    return {
      prompt: t("activity_z2_speed"),
      subtext: t("teacherHint"),
      options: [
        { value: "increase", label: t("option_increases") },
        { value: "decrease", label: t("option_decreases") },
        { value: "same", label: t("option_same") }
      ],
      correct: "decrease",
      solution: t("teacher_solution_z2_speed")
    };
  }

  if(activity === "predict_current"){
    const outputHasMoreTeeth = state.driver === "g1"
      ? data.z2 > data.z1
      : data.z1 > data.z2;

    let correct;
    if(data.z1 === data.z2){
      correct = "same_speed_same_torque";
    } else {
      correct = outputHasMoreTeeth
        ? "slower_more_torque"
        : "faster_less_torque";
    }

    return {
      prompt: `${t("activity_predict_current")} · z₁=${data.z1}, z₂=${data.z2}, ${state.driver === "g1" ? t("driverText1") : t("driverText2")}`,
      subtext: t("teacherHint"),
      options: [
        { value: "slower_more_torque", label: t("option_slower_more_torque") },
        { value: "faster_less_torque", label: t("option_faster_less_torque") },
        { value: "same_speed_same_torque", label: t("option_same_speed_same_torque") }
      ],
      correct,
      solution: replaceVars(t("teacher_solution_predict_current"), {
        rpmOut: data.outputRpm.toFixed(2),
        torque: data.torqueOut.toFixed(2)
      })
    };
  }

  if(activity === "equal_teeth"){
    return {
      prompt: t("activity_equal_teeth"),
      subtext: t("teacherHint"),
      options: [
        { value: "same_speed_opposite", label: t("option_same_speed_opposite") },
        { value: "half_speed_same", label: t("option_half_speed_same") },
        { value: "double_speed_opposite", label: t("option_double_speed_opposite") }
      ],
      correct: "same_speed_opposite",
      solution: t("teacher_solution_equal_teeth")
    };
  }

  return {
    prompt: t("invalid"),
    subtext: "",
    options: [],
    correct: "",
    solution: t("invalid")
  };
}

function renderTeacherMode(){
  const data = calc();
  const activity = getTeacherActivity(data);

  if(els.teacherTitle) els.teacherTitle.textContent = t("teacherTitle");
  if(els.activityLabel) els.activityLabel.textContent = t("activityLabel");
  if(els.newQuestionBtn) els.newQuestionBtn.textContent = t("newQuestionBtn");
  if(els.showSolutionBtn){
    els.showSolutionBtn.textContent = state.teacher.showSolution
      ? t("hideSolutionBtn")
      : t("showSolutionBtn");
  }

  if(els.activitySelect){
    const current = state.teacher.activity;
    els.activitySelect.innerHTML = `
      <option value="z2_speed">${t("activity_z2_speed")}</option>
      <option value="predict_current">${t("activity_predict_current")}</option>
      <option value="equal_teeth">${t("activity_equal_teeth")}</option>
    `;
    els.activitySelect.value = current;
  }

  const optionsHTML = activity.options.map(option => `
    <label class="answer-option">
      <input
        type="radio"
        name="teacherAnswer"
        value="${option.value}"
        ${state.teacher.selectedAnswer === option.value ? "checked" : ""}
      >
      <span>${option.label}</span>
    </label>
  `).join("");

  const feedbackHTML = state.teacher.feedbackText
    ? `<div class="feedback-box ${state.teacher.feedbackType}">${state.teacher.feedbackText}</div>`
    : "";

  const solutionHTML = state.teacher.showSolution
    ? `
      <div class="solution-box">
        <strong>${t("solutionTitle")}</strong>
        ${activity.solution}
      </div>
    `
    : "";

  els.teacherActivityCard.innerHTML = `
    <div class="teacher-prompt">${activity.prompt}</div>
    <div class="teacher-subtext">${activity.subtext || ""}</div>

    <div class="answer-list">
      ${optionsHTML}
    </div>

    <label for="predictionText" style="display:block; margin-bottom:6px; font-weight:700;">
      ${t("predictionLabel")}
    </label>
    <textarea
      id="predictionText"
      class="teacher-textarea"
      placeholder="${t("predictionPlaceholder")}"
    >${state.teacher.predictionText}</textarea>

    <div class="teacher-actions">
      <button class="teacher-btn primary" id="checkAnswerBtn">${t("checkAnswerBtn")}</button>
    </div>

    ${feedbackHTML}
    ${solutionHTML}

    <div class="teacher-small">${t("teacherHint")}</div>
  `;

  const predictionTextEl = document.getElementById("predictionText");
  if(predictionTextEl){
    predictionTextEl.addEventListener("input", (e) => {
      state.teacher.predictionText = e.target.value;
    });
  }

  document.querySelectorAll('input[name="teacherAnswer"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      state.teacher.selectedAnswer = e.target.value;
    });
  });

  const checkBtn = document.getElementById("checkAnswerBtn");
  if(checkBtn){
    checkBtn.addEventListener("click", () => {
      checkTeacherAnswer();
    });
  }
}

function checkTeacherAnswer(){
  const data = calc();
  const activity = getTeacherActivity(data);

  if(!state.teacher.selectedAnswer){
    state.teacher.feedbackType = "error";
    state.teacher.feedbackText = t("noAnswer");
    renderTeacherMode();
    return;
  }

  if(state.teacher.selectedAnswer === activity.correct){
    state.teacher.feedbackType = "success";
    state.teacher.feedbackText = t("correctMsg");
  } else {
    state.teacher.feedbackType = "error";
    state.teacher.feedbackText = t("incorrectMsg");
  }

  renderTeacherMode();
}

/* =========================
   ACTUALITZACIÓ GENERAL
========================= */
function updateAll(){
  readInputs();
  const data = calc();
  updateResults(data);
  renderTeacherMode();

  if(window.__gearP5){
    window.__gearP5.redraw();
  }
}

/* =========================
   p5.js
========================= */
const sketch = (p) => {
  let canvas;

  function drawGrid(w, h){
    p.push();
    p.stroke(255,255,255,18);
    p.strokeWeight(1);
    for(let x=0; x<w; x+=40) p.line(x,0,x,h);
    for(let y=0; y<h; y+=40) p.line(0,y,w,y);
    p.pop();
  }

  function drawArrowHead(x, y, angle, size, color){
    p.push();
    p.translate(x,y);
    p.rotate(angle);
    p.noStroke();
    p.fill(color);
    p.beginShape();
    p.vertex(0,0);
    p.vertex(-size, size*0.58);
    p.vertex(-size, -size*0.58);
    p.endShape(p.CLOSE);
    p.pop();
  }

  function drawCurvedArrow(cx, cy, radius, start, end, color){
    p.push();
    p.noFill();
    p.stroke(color);
    p.strokeWeight(3);
    p.arc(cx, cy, radius*2, radius*2, start, end);
    const x = cx + radius * Math.cos(end);
    const y = cy + radius * Math.sin(end);
    drawArrowHead(x, y, end + Math.PI / 2, 11, color);
    p.pop();
  }

  function drawGear(cx, cy, pitchR, outerR, rootR, teeth, angle, color1, color2){
    const ctx = p.drawingContext;

    const grad = ctx.createRadialGradient(
      cx - outerR * 0.25, cy - outerR * 0.25, outerR * 0.12,
      cx, cy, outerR
    );
    grad.addColorStop(0, color1);
    grad.addColorStop(1, color2);

    ctx.beginPath();

    for(let i=0; i<teeth; i++){
      const toothAngle = (Math.PI * 2) / teeth;
      const a0 = angle + i * toothAngle;

      const pts = [
        { r: rootR,  a: a0 + toothAngle * 0.00 },
        { r: pitchR, a: a0 + toothAngle * 0.10 },
        { r: outerR, a: a0 + toothAngle * 0.22 },
        { r: outerR, a: a0 + toothAngle * 0.42 },
        { r: pitchR, a: a0 + toothAngle * 0.56 },
        { r: rootR,  a: a0 + toothAngle * 0.72 },
        { r: rootR,  a: a0 + toothAngle * 1.00 }
      ];

      pts.forEach((pt, idx) => {
        const x = cx + pt.r * Math.cos(pt.a);
        const y = cy + pt.r * Math.sin(pt.a);
        if(i === 0 && idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
    }

    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "rgba(255,255,255,.18)";
    ctx.stroke();

    p.push();
    p.translate(cx, cy);
    p.stroke(255,255,255,55);
    p.strokeWeight(8);
    p.strokeCap(p.ROUND);
    const hub = Math.max(14, pitchR * 0.18);
    for(let i=0; i<4; i++){
      p.push();
      p.rotate((Math.PI * 2 * i) / 4 + Math.PI / 4);
      p.line(hub + 4, 0, rootR * 0.72, 0);
      p.pop();
    }
    p.pop();

    p.push();
    p.noFill();
    p.stroke(230,240,255,190);
    p.strokeWeight(2);
    p.drawingContext.setLineDash([8,5]);
    p.circle(cx, cy, pitchR * 2);
    p.drawingContext.setLineDash([]);
    p.pop();

    p.push();
    p.fill(13,20,40,235);
    p.stroke(255,255,255,70);
    p.strokeWeight(2);
    p.circle(cx, cy, Math.max(14, pitchR * 0.18) * 2);
    p.pop();

    p.push();
    p.noStroke();
    p.fill(255);
    p.circle(cx, cy, 10);
    p.pop();
  }

  function drawDimensionLine(x1, y, x2, text){
    p.push();
    p.stroke(220,235,255,150);
    p.strokeWeight(1.5);
    p.drawingContext.setLineDash([6,4]);
    p.line(x1, y, x2, y);
    p.drawingContext.setLineDash([]);

    p.line(x1, y-8, x1, y+8);
    p.line(x2, y-8, x2, y+8);

    p.noStroke();
    p.fill(235,243,255);
    p.textAlign(p.CENTER, p.BOTTOM);
    p.textSize(14);
    p.text(text, (x1 + x2) / 2, y - 8);
    p.pop();
  }

  function drawInfoBadge(x, y, text, align = "left", fillColor = "rgba(255,255,255,0.08)", strokeColor = "rgba(255,255,255,0.14)"){
    p.push();

    const fontSize = 13;
    const padX = 12;
    const padY = 8;
    const radius = 12;

    p.textSize(fontSize);
    const tw = p.textWidth(text);
    const boxW = tw + padX * 2;
    const boxH = fontSize + padY * 2;

    let bx = x;
    if(align === "center") bx = x - boxW / 2;
    if(align === "right") bx = x - boxW;

    const by = y;

    p.noStroke();
    p.fill(fillColor);
    p.rect(bx, by, boxW, boxH, radius);

    p.stroke(strokeColor);
    p.strokeWeight(1);
    p.noFill();
    p.rect(bx, by, boxW, boxH, radius);

    p.noStroke();
    p.fill(240,246,255);
    p.textAlign(p.LEFT, p.TOP);
    p.text(text, bx + padX, by + padY - 1);

    p.pop();
  }

  function drawSystem(data){
    p.clear();
    const w = p.width;
    const h = p.height;

    drawGrid(w, h);

    if(!data.valid){
      p.push();
      p.fill(255,230,210);
      p.textAlign(p.CENTER, p.CENTER);
      p.textSize(22);
      p.text(t("invalid"), w / 2, h / 2);
      p.pop();
      return;
    }

    // Espais reservats per evitar solapaments
    const topPad = 90;
    const bottomPad = 88;
    const dimensionPad = 42;
    const sidePad = 70;

    const usableW = w - sidePad * 2;
    const usableH = h - topPad - bottomPad - dimensionPad;

    const totalOuter = data.r1 + data.r2 + data.m * 2 + 20;
    const scaleX = usableW / totalOuter;
    const scaleY = usableH / (Math.max(data.r1, data.r2) * 2 + data.m * 4 + 20);
    const s = Math.max(0.6, Math.min(scaleX, scaleY));

    const pitchR1 = data.r1 * s;
    const pitchR2 = data.r2 * s;
    const outerR1 = (data.r1 + data.m) * s;
    const outerR2 = (data.r2 + data.m) * s;
    const rootR1 = Math.max((data.r1 - 1.18 * data.m) * s, pitchR1 * 0.62);
    const rootR2 = Math.max((data.r2 - 1.18 * data.m) * s, pitchR2 * 0.62);

    const cy = topPad + usableH / 2;
    const cx1 = sidePad + outerR1 + 8;
    const cx2 = cx1 + pitchR1 + pitchR2;

    const maxOuter = Math.max(outerR1, outerR2);
    const dimensionY = Math.min(cy + maxOuter + 28, h - bottomPad - 20);
    const bottomInfoY = h - 20;

    // Línia entre centres
    p.push();
    p.stroke(220,235,255,110);
    p.strokeWeight(2);
    p.drawingContext.setLineDash([8,6]);
    p.line(cx1, cy, cx2, cy);
    p.drawingContext.setLineDash([]);
    p.pop();

    drawDimensionLine(
      cx1,
      dimensionY,
      cx2,
      `${t("centerDistanceText")}: ${data.centerDistance.toFixed(2)} mm`
    );

    // Punt de contacte
    p.push();
    p.noStroke();
    p.fill(255,255,255,80);
    p.circle(cx1 + pitchR1, cy, 7);
    p.pop();

    // Engranatges
    drawGear(cx1, cy, pitchR1, outerR1, rootR1, data.z1, state.angle1, "#8fcbff", "#2258b6");
    drawGear(cx2, cy, pitchR2, outerR2, rootR2, data.z2, state.angle2, "#ffc0c0", "#b93a3a");

    // Fletxes de gir
    const dir1 = data.rpm1 >= 0 ? 1 : -1;
    const dir2 = data.rpm2 >= 0 ? 1 : -1;

    if(dir1 > 0){
      drawCurvedArrow(cx1, cy, outerR1 + 18, Math.PI * 0.12, Math.PI * 0.92, "#7cc0ff");
    } else {
      drawCurvedArrow(cx1, cy, outerR1 + 18, Math.PI * 0.92, Math.PI * 0.12, "#7cc0ff");
    }

    if(dir2 > 0){
      drawCurvedArrow(cx2, cy, outerR2 + 18, Math.PI * 0.12, Math.PI * 0.92, "#ffb0b0");
    } else {
      drawCurvedArrow(cx2, cy, outerR2 + 18, Math.PI * 0.92, Math.PI * 0.12, "#ffb0b0");
    }

    // Badges superiors
    drawInfoBadge(
      18,
      18,
      `${t("gear1Title")} · ${state.driver === "g1" ? t("input") : t("output")}`,
      "left",
      "rgba(88,166,255,0.18)",
      "rgba(88,166,255,0.35)"
    );

    drawInfoBadge(
      w - 18,
      18,
      `${t("gear2Title")} · ${state.driver === "g2" ? t("input") : t("output")}`,
      "right",
      "rgba(255,138,138,0.18)",
      "rgba(255,138,138,0.35)"
    );

    drawInfoBadge(
      w / 2,
      18,
      state.driver === "g1" ? t("driverText1") : t("driverText2"),
      "center",
      "rgba(255,255,255,0.08)",
      "rgba(255,255,255,0.12)"
    );

    // Badges inferiors
    drawInfoBadge(
      18,
      bottomInfoY - 28,
      `z₁ = ${data.z1} · d₁ = ${data.d1.toFixed(1)} mm`,
      "left",
      "rgba(88,166,255,0.14)",
      "rgba(88,166,255,0.22)"
    );

    drawInfoBadge(
      w - 18,
      bottomInfoY - 28,
      `z₂ = ${data.z2} · d₂ = ${data.d2.toFixed(1)} mm`,
      "right",
      "rgba(255,138,138,0.14)",
      "rgba(255,138,138,0.22)"
    );
  }

  p.setup = () => {
    const host = document.getElementById("canvasHost");
    const w = host.clientWidth || 800;
    const h = Math.max(460, Math.min(720, Math.round(w * 0.72)));
    canvas = p.createCanvas(w, h);
    canvas.parent("canvasHost");
  };

  p.windowResized = () => {
    const host = document.getElementById("canvasHost");
    const w = host.clientWidth || 800;
    const h = Math.max(460, Math.min(720, Math.round(w * 0.72)));
    p.resizeCanvas(w, h);
  };

  p.draw = () => {
    const data = calc();

    if(state.playing && data.valid){
      const w1 = Math.abs(data.rpm1) * 2 * Math.PI / 60;
      const w2 = Math.abs(data.rpm2) * 2 * Math.PI / 60;
      const dir1 = data.rpm1 >= 0 ? 1 : -1;
      const dir2 = data.rpm2 >= 0 ? 1 : -1;

      state.angle1 += dir1 * w1 * (1 / 60) * state.animScale;
      state.angle2 += dir2 * w2 * (1 / 60) * state.animScale;
    }

    drawSystem(data);
  };
};

window.__gearP5 = new p5(sketch);

/* =========================
   ESDEVENIMENTS
========================= */
document.querySelectorAll(".lang-btn").forEach(btn => {
  btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
});

["module","teeth1","teeth2","rpmInput","animScale"].forEach(id => {
  const el = $(id);
  if(el) el.addEventListener("input", updateAll);
});

document.querySelectorAll('input[name="driver"]').forEach(radio => {
  radio.addEventListener("change", () => {
    resetTeacherQuestion();
    updateAll();
  });
});

document.querySelectorAll(".preset-btn").forEach(btn => {
  btn.addEventListener("click", () => applyPreset(btn.dataset.preset));
});

els.playPauseBtn.addEventListener("click", () => {
  state.playing = !state.playing;
  updatePlayPauseButton();
});

els.resetBtn.addEventListener("click", resetAll);

els.toggleResultsBtn.addEventListener("click", () => {
  state.hideResults = !state.hideResults;
  updateToggleResultsButton();
  updateAll();
});

if(els.activitySelect){
  els.activitySelect.addEventListener("change", (e) => {
    state.teacher.activity = e.target.value;
    resetTeacherQuestion();
    renderTeacherMode();
  });
}

if(els.newQuestionBtn){
  els.newQuestionBtn.addEventListener("click", () => {
    resetTeacherQuestion();
    renderTeacherMode();
  });
}

if(els.showSolutionBtn){
  els.showSolutionBtn.addEventListener("click", () => {
    state.teacher.showSolution = !state.teacher.showSolution;
    renderTeacherMode();
  });
}

/* =========================
   INICI
========================= */
syncInputs();
applyLanguage("ca");
updateAll();



































