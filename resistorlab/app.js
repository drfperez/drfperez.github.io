const $ = (id) => document.getElementById(id);

const COLOR_HEX = {
  black: "#111111",
  brown: "#6B3E26",
  red: "#D7263D",
  orange: "#F97316",
  yellow: "#FACC15",
  green: "#16A34A",
  blue: "#2563EB",
  violet: "#7C3AED",
  grey: "#9CA3AF",
  white: "#F8FAFC",
  gold: "#D4AF37",
  silver: "#C0C0C0",
  none: "transparent"
};

const DIGIT_COLORS = ["black","brown","red","orange","yellow","green","blue","violet","grey","white"];
const MULTIPLIERS = [
  { exp: -2, key: "silver" },
  { exp: -1, key: "gold" },
  { exp: 0, key: "black" },
  { exp: 1, key: "brown" },
  { exp: 2, key: "red" },
  { exp: 3, key: "orange" },
  { exp: 4, key: "yellow" },
  { exp: 5, key: "green" },
  { exp: 6, key: "blue" },
  { exp: 7, key: "violet" },
  { exp: 8, key: "grey" },
  { exp: 9, key: "white" }
];

const TOLERANCES = [
  { value: 0.05, key: "grey" },
  { value: 0.1, key: "violet" },
  { value: 0.25, key: "blue" },
  { value: 0.5, key: "green" },
  { value: 1, key: "brown" },
  { value: 2, key: "red" },
  { value: 5, key: "gold" },
  { value: 10, key: "silver" },
  { value: 20, key: "none" }
];

const i18n = {
  ca: {
    pageTitle: "ResistorLab · Simulador didàctic de resistències",
    pageSubtitle: "Aprèn a llegir i construir el codi de colors de les resistències de forma visual, guiada i fàcil d'entendre.",

    controlsTitle: "Controls",
    bandCountLabel: "Nombre de bandes",
    band4Label: "4 bandes",
    band5Label: "5 bandes",
    bandCountHelp: "Les resistències de 4 bandes tenen 2 xifres significatives; les de 5 bandes en tenen 3.",

    modeColorBtn: "Codi → valor",
    modeValueBtn: "Valor → codi",

    colorModeTitle: "Codi de colors a valor",
    valueModeTitle: "Valor a codi de colors",
    band1Label: "Banda 1",
    band2Label: "Banda 2",
    band3Label: "Banda 3",
    multiplierLabel: "Multiplicador",
    toleranceColorLabel: "Tolerància",
    valueInputLabel: "Valor de la resistència",
    valueInputHelp: "Pots escriure valors com 220, 4.7k, 10k, 1M o 2.2M.",
    toleranceInputLabel: "Tolerància",

    formulaTitle: "Idees clau",
    formulaLine1: "Les primeres bandes indiquen les xifres significatives.",
    formulaLine2: "La banda multiplicadora desplaça la coma decimal.",
    formulaLine3: "La tolerància indica el marge d'error admès.",

    visualTitle: "Visualització",
    bandsBadge: "Bandes ordenades d'esquerra a dreta",
    toleranceBadge: "La darrera banda és la tolerància",
    visualFootnote: "Recorda: en una resistència, les bandes es llegeixen des del costat oposat a la banda de tolerància.",

    resultsTitle: "Resultats",
    mainValueLabel: "Valor nominal",
    toleranceLabel: "Tolerància",
    minValueLabel: "Valor mínim",
    maxValueLabel: "Valor màxim",
    summaryLabel: "Resum del codi",
    stepsTitle: "Explicació pas a pas",

    interpretationText: "La tolerància indica el marge d'error permès sobre el valor nominal.",
    teacherTipBox: "Suggeriment didàctic: fes que l'alumnat predigui primer el valor abans de prémer «Calcula».",
    powerNote: "Aquest simulador està pensat per a la interpretació educativa del codi de colors de resistències.",

    resetBtn: "Restableix",
    calculateBtn: "Calcula",
    hideResults: "Amaga resultats",
    showResults: "Mostra resultats",

    invalidValue: "Valor no vàlid.",
    invalidInputHint: "Introdueix una resistència positiva. Exemples vàlids: 220, 4.7k, 1M.",
    approximationText: "Aquest valor s'ha aproximat a la representació més propera possible amb el nombre de bandes seleccionat.",

    stepColor1_4: "Banda 1 i banda 2 donen les xifres significatives: {digits}.",
    stepColor1_5: "Banda 1, banda 2 i banda 3 donen les xifres significatives: {digits}.",
    stepColor2: "La banda multiplicadora equival a ×10^{exp}, és a dir, ×{mult}.",
    stepColor3: "El valor nominal és {value}.",
    stepColor4: "La tolerància és ±{tol} %, així que el valor pot variar entre {min} i {max}.",

    stepValue1: "Es parteix del valor introduït: {valueInput}.",
    stepValue2_4: "Per a 4 bandes, es trien 2 xifres significatives: {digits}.",
    stepValue2_5: "Per a 5 bandes, es trien 3 xifres significatives: {digits}.",
    stepValue3: "Això deixa un multiplicador de ×10^{exp}, és a dir, ×{mult}.",
    stepValue4: "El codi de colors resultant representa aproximadament {value}.",
    stepValue5: "La tolerància triada és ±{tol} %.",

    bandDigit: "xifra",
    bandMultiplier: "multiplicador",
    bandTolerance: "tolerància",
    noBand: "sense banda",

    colors: {
      black: "Negre",
      brown: "Marró",
      red: "Vermell",
      orange: "Taronja",
      yellow: "Groc",
      green: "Verd",
      blue: "Blau",
      violet: "Violeta",
      grey: "Gris",
      white: "Blanc",
      gold: "Daurat",
      silver: "Plata",
      none: "Sense color"
    },

    teacherTitle: "Mode professor",
    activityLabel: "Activitat guiada",
    activity_multiplier_up: "Si el multiplicador puja un pas, què passa?",
    activity_predict_current: "Prediu abans de calcular",
    activity_gold_tolerance: "Quina tolerància indica l'or?",
    newQuestionBtn: "Nova pregunta",
    showSolutionBtn: "Mostra solució",
    hideSolutionBtn: "Amaga solució",
    checkAnswerBtn: "Comprova resposta",
    predictionLabel: "Escriu la teva predicció",
    predictionPlaceholder: "Explica què creus que passarà i per què...",
    teacherHint: "Primer respon sense mirar els resultats. Després comprova la teva idea.",
    noAnswer: "Selecciona una resposta abans de comprovar-la.",
    correctMsg: "Correcte! Bona predicció.",
    incorrectMsg: "Encara no. Revisa el significat de les bandes.",
    solutionTitle: "Solució raonada",

    option_x10: "El valor es multiplica per 10",
    option_div10: "El valor es divideix per 10",
    option_same: "El valor no canvia",

    option_gold_5: "±5 %",
    option_gold_10: "±10 %",
    option_gold_1: "±1 %",

    teacher_solution_multiplier_up: "Si el multiplicador puja un pas (per exemple, de vermell a taronja), l'exponent augmenta en 1 i el valor total es multiplica per 10.",
    teacher_solution_predict_current: "Amb els valors actuals, la resistència representada és {value} amb una tolerància de ±{tol} %.",
    teacher_solution_gold: "La banda daurada indica una tolerància de ±5 %.",

    summaryColorToValue: "Codi llegit: {bands}",
    summaryValueToColor: "Codi generat: {bands}"
  },

  es: {
    pageTitle: "ResistorLab · Simulador didáctico de resistencias",
    pageSubtitle: "Aprende a leer y construir el código de colores de las resistencias de forma visual, guiada y fácil de entender.",

    controlsTitle: "Controles",
    bandCountLabel: "Número de bandas",
    band4Label: "4 bandas",
    band5Label: "5 bandas",
    bandCountHelp: "Las resistencias de 4 bandas tienen 2 cifras significativas; las de 5 bandas tienen 3.",

    modeColorBtn: "Código → valor",
    modeValueBtn: "Valor → código",

    colorModeTitle: "Código de colores a valor",
    valueModeTitle: "Valor a código de colores",
    band1Label: "Banda 1",
    band2Label: "Banda 2",
    band3Label: "Banda 3",
    multiplierLabel: "Multiplicador",
    toleranceColorLabel: "Tolerancia",
    valueInputLabel: "Valor de la resistencia",
    valueInputHelp: "Puedes escribir valores como 220, 4.7k, 10k, 1M o 2.2M.",
    toleranceInputLabel: "Tolerancia",

    formulaTitle: "Ideas clave",
    formulaLine1: "Las primeras bandas indican las cifras significativas.",
    formulaLine2: "La banda multiplicadora desplaza la coma decimal.",
    formulaLine3: "La tolerancia indica el margen de error permitido.",

    visualTitle: "Visualización",
    bandsBadge: "Bandas ordenadas de izquierda a derecha",
    toleranceBadge: "La última banda es la tolerancia",
    visualFootnote: "Recuerda: en una resistencia, las bandas se leen desde el lado opuesto a la banda de tolerancia.",

    resultsTitle: "Resultados",
    mainValueLabel: "Valor nominal",
    toleranceLabel: "Tolerancia",
    minValueLabel: "Valor mínimo",
    maxValueLabel: "Valor máximo",
    summaryLabel: "Resumen del código",
    stepsTitle: "Explicación paso a paso",

    interpretationText: "La tolerancia indica el margen de error permitido sobre el valor nominal.",
    teacherTipBox: "Sugerencia didáctica: pide al alumnado que prediga primero el valor antes de pulsar «Calcular».",
    powerNote: "Este simulador está pensado para la interpretación educativa del código de colores de resistencias.",

    resetBtn: "Restablecer",
    calculateBtn: "Calcular",
    hideResults: "Ocultar resultados",
    showResults: "Mostrar resultados",

    invalidValue: "Valor no válido.",
    invalidInputHint: "Introduce una resistencia positiva. Ejemplos válidos: 220, 4.7k, 1M.",
    approximationText: "Este valor se ha aproximado a la representación más cercana posible con el número de bandas seleccionado.",

    stepColor1_4: "La banda 1 y la banda 2 dan las cifras significativas: {digits}.",
    stepColor1_5: "La banda 1, la banda 2 y la banda 3 dan las cifras significativas: {digits}.",
    stepColor2: "La banda multiplicadora equivale a ×10^{exp}, es decir, ×{mult}.",
    stepColor3: "El valor nominal es {value}.",
    stepColor4: "La tolerancia es ±{tol} %, así que el valor puede variar entre {min} y {max}.",

    stepValue1: "Se parte del valor introducido: {valueInput}.",
    stepValue2_4: "Para 4 bandas, se eligen 2 cifras significativas: {digits}.",
    stepValue2_5: "Para 5 bandas, se eligen 3 cifras significativas: {digits}.",
    stepValue3: "Esto deja un multiplicador de ×10^{exp}, es decir, ×{mult}.",
    stepValue4: "El código de colores resultante representa aproximadamente {value}.",
    stepValue5: "La tolerancia elegida es ±{tol} %.",

    bandDigit: "cifra",
    bandMultiplier: "multiplicador",
    bandTolerance: "tolerancia",
    noBand: "sin banda",

    colors: {
      black: "Negro",
      brown: "Marrón",
      red: "Rojo",
      orange: "Naranja",
      yellow: "Amarillo",
      green: "Verde",
      blue: "Azul",
      violet: "Violeta",
      grey: "Gris",
      white: "Blanco",
      gold: "Dorado",
      silver: "Plata",
      none: "Sin color"
    },

    teacherTitle: "Modo profesor",
    activityLabel: "Actividad guiada",
    activity_multiplier_up: "Si el multiplicador sube un paso, ¿qué pasa?",
    activity_predict_current: "Predice antes de calcular",
    activity_gold_tolerance: "¿Qué tolerancia indica el oro?",
    newQuestionBtn: "Nueva pregunta",
    showSolutionBtn: "Mostrar solución",
    hideSolutionBtn: "Ocultar solución",
    checkAnswerBtn: "Comprobar respuesta",
    predictionLabel: "Escribe tu predicción",
    predictionPlaceholder: "Explica qué crees que ocurrirá y por qué...",
    teacherHint: "Primero responde sin mirar los resultados. Después comprueba tu idea.",
    noAnswer: "Selecciona una respuesta antes de comprobarla.",
    correctMsg: "¡Correcto! Buena predicción.",
    incorrectMsg: "Todavía no. Revisa el significado de las bandas.",
    solutionTitle: "Solución razonada",

    option_x10: "El valor se multiplica por 10",
    option_div10: "El valor se divide por 10",
    option_same: "El valor no cambia",

    option_gold_5: "±5 %",
    option_gold_10: "±10 %",
    option_gold_1: "±1 %",

    teacher_solution_multiplier_up: "Si el multiplicador sube un paso (por ejemplo, de rojo a naranja), el exponente aumenta en 1 y el valor total se multiplica por 10.",
    teacher_solution_predict_current: "Con los valores actuales, la resistencia representada es {value} con una tolerancia de ±{tol} %.",
    teacher_solution_gold: "La banda dorada indica una tolerancia de ±5 %.",

    summaryColorToValue: "Código leído: {bands}",
    summaryValueToColor: "Código generado: {bands}"
  },

  en: {
    pageTitle: "ResistorLab · Didactic resistor simulator",
    pageSubtitle: "Learn to read and build resistor color codes in a visual, guided and easy-to-understand way.",

    controlsTitle: "Controls",
    bandCountLabel: "Number of bands",
    band4Label: "4 bands",
    band5Label: "5 bands",
    bandCountHelp: "4-band resistors use 2 significant digits; 5-band resistors use 3.",

    modeColorBtn: "Code → value",
    modeValueBtn: "Value → code",

    colorModeTitle: "Color code to value",
    valueModeTitle: "Value to color code",
    band1Label: "Band 1",
    band2Label: "Band 2",
    band3Label: "Band 3",
    multiplierLabel: "Multiplier",
    toleranceColorLabel: "Tolerance",
    valueInputLabel: "Resistor value",
    valueInputHelp: "You can write values like 220, 4.7k, 10k, 1M or 2.2M.",
    toleranceInputLabel: "Tolerance",

    formulaTitle: "Key ideas",
    formulaLine1: "The first bands indicate the significant digits.",
    formulaLine2: "The multiplier band shifts the decimal point.",
    formulaLine3: "Tolerance indicates the allowed error margin.",

    visualTitle: "Visualization",
    bandsBadge: "Bands ordered from left to right",
    toleranceBadge: "The last band is the tolerance band",
    visualFootnote: "Remember: resistors are read from the side opposite the tolerance band.",

    resultsTitle: "Results",
    mainValueLabel: "Nominal value",
    toleranceLabel: "Tolerance",
    minValueLabel: "Minimum value",
    maxValueLabel: "Maximum value",
    summaryLabel: "Code summary",
    stepsTitle: "Step-by-step explanation",

    interpretationText: "Tolerance indicates the allowed error margin around the nominal value.",
    teacherTipBox: "Teaching suggestion: ask students to predict the value before pressing “Calculate”.",
    powerNote: "This simulator is designed for educational interpretation of resistor color codes.",

    resetBtn: "Reset",
    calculateBtn: "Calculate",
    hideResults: "Hide results",
    showResults: "Show results",

    invalidValue: "Invalid value.",
    invalidInputHint: "Enter a positive resistance. Valid examples: 220, 4.7k, 1M.",
    approximationText: "This value has been approximated to the nearest representable code using the selected band count.",

    stepColor1_4: "Band 1 and band 2 provide the significant digits: {digits}.",
    stepColor1_5: "Band 1, band 2 and band 3 provide the significant digits: {digits}.",
    stepColor2: "The multiplier band equals ×10^{exp}, that is ×{mult}.",
    stepColor3: "The nominal value is {value}.",
    stepColor4: "The tolerance is ±{tol} %, so the value may vary between {min} and {max}.",

    stepValue1: "Start from the entered value: {valueInput}.",
    stepValue2_4: "For 4 bands, choose 2 significant digits: {digits}.",
    stepValue2_5: "For 5 bands, choose 3 significant digits: {digits}.",
    stepValue3: "This leaves a multiplier of ×10^{exp}, that is ×{mult}.",
    stepValue4: "The resulting color code represents approximately {value}.",
    stepValue5: "The selected tolerance is ±{tol} %.",

    bandDigit: "digit",
    bandMultiplier: "multiplier",
    bandTolerance: "tolerance",
    noBand: "no band",

    colors: {
      black: "Black",
      brown: "Brown",
      red: "Red",
      orange: "Orange",
      yellow: "Yellow",
      green: "Green",
      blue: "Blue",
      violet: "Violet",
      grey: "Gray",
      white: "White",
      gold: "Gold",
      silver: "Silver",
      none: "None"
    },

    teacherTitle: "Teacher mode",
    activityLabel: "Guided activity",
    activity_multiplier_up: "If the multiplier goes up one step, what happens?",
    activity_predict_current: "Predict before calculating",
    activity_gold_tolerance: "What tolerance does gold indicate?",
    newQuestionBtn: "New question",
    showSolutionBtn: "Show solution",
    hideSolutionBtn: "Hide solution",
    checkAnswerBtn: "Check answer",
    predictionLabel: "Write your prediction",
    predictionPlaceholder: "Explain what you think will happen and why...",
    teacherHint: "Answer first without looking at the results. Then check your idea.",
    noAnswer: "Select an answer before checking it.",
    correctMsg: "Correct! Good prediction.",
    incorrectMsg: "Not yet. Review the meaning of the bands.",
    solutionTitle: "Worked solution",

    option_x10: "The value is multiplied by 10",
    option_div10: "The value is divided by 10",
    option_same: "The value does not change",

    option_gold_5: "±5 %",
    option_gold_10: "±10 %",
    option_gold_1: "±1 %",

    teacher_solution_multiplier_up: "If the multiplier goes up one step (for example, from red to orange), the exponent increases by 1 and the total value is multiplied by 10.",
    teacher_solution_predict_current: "With the current values, the represented resistor is {value} with a tolerance of ±{tol} %.",
    teacher_solution_gold: "The gold band indicates a tolerance of ±5 %.",

    summaryColorToValue: "Code read: {bands}",
    summaryValueToColor: "Code generated: {bands}"
  }
};

const state = {
  lang: "ca",
  mode: "colorToValue",
  bandCount: 4,
  colorBands: {
    band1: 1,
    band2: 0,
    band3: 0,
    multiplier: 1,
    tolerance: 5
  },
  valueInput: "220",
  valueTolerance: 5,
  hideResults: false,
  teacher: {
    activity: "multiplier_up",
    selectedAnswer: "",
    predictionText: "",
    showSolution: false,
    feedbackType: "",
    feedbackText: ""
  }
};

const els = {
  calculateBtn: $("calculateBtn"),
  resetBtn: $("resetBtn"),
  toggleResultsBtn: $("toggleResultsBtn"),

  modeColorBtn: $("modeColorBtn"),
  modeValueBtn: $("modeValueBtn"),
  colorModePanel: $("colorModePanel"),
  valueModePanel: $("valueModePanel"),

  band1: $("band1"),
  band2: $("band2"),
  band3: $("band3"),
  band3Wrap: $("band3Wrap"),
  multiplier: $("multiplier"),
  toleranceColor: $("toleranceColor"),
  valueInput: $("valueInput"),
  toleranceInput: $("toleranceInput"),

  resultsGrid: $("resultsGrid"),
  mainValue: $("mainValue"),
  toleranceValue: $("toleranceValue"),
  minValue: $("minValue"),
  maxValue: $("maxValue"),
  summaryValue: $("summaryValue"),
  stepsList: $("stepsList"),
  interpretationBox: $("interpretationBox"),
  teacherTipBox: $("teacherTipBox"),
  powerNote: $("powerNote"),

  resistorSvg: $("resistorSvg"),
  bandLegend: $("bandLegend"),

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

function replaceVars(text, vars = {}){
  let out = text;
  Object.keys(vars).forEach(key => {
    out = out.replaceAll(`{${key}}`, vars[key]);
  });
  return out;
}

function colorName(key){
  return i18n[state.lang].colors[key] || key;
}

function formatOhms(value){
  if (!isFinite(value)) return "—";
  const abs = Math.abs(value);

  let unit = "Ω";
  let scaled = value;

  if(abs >= 1_000_000){
    unit = "MΩ";
    scaled = value / 1_000_000;
  } else if(abs >= 1_000){
    unit = "kΩ";
    scaled = value / 1_000;
  }

  let decimals = 0;
  if(Math.abs(scaled) < 10) decimals = 2;
  else if(Math.abs(scaled) < 100) decimals = 1;
  else decimals = 0;

  const text = scaled.toFixed(decimals).replace(/\.00$/,"").replace(/(\.\d)0$/,"$1");
  return `${text} ${unit}`;
}

function parseResistanceInput(str){
  if(typeof str !== "string") return NaN;
  const cleaned = str.trim().replace(/\s+/g, "").replace(",", ".");
  const match = cleaned.match(/^(\d+(\.\d+)?)([kKmM]?)$/);
  if(!match) return NaN;

  let value = parseFloat(match[1]);
  const suffix = match[3].toLowerCase();

  if(suffix === "k") value *= 1_000;
  if(suffix === "m") value *= 1_000_000;

  return value;
}

function updateModeUI(){
  els.modeColorBtn.classList.toggle("active", state.mode === "colorToValue");
  els.modeValueBtn.classList.toggle("active", state.mode === "valueToColor");
  els.colorModePanel.classList.toggle("hidden", state.mode !== "colorToValue");
  els.valueModePanel.classList.toggle("hidden", state.mode !== "valueToColor");
}

function updateBandVisibility(){
  els.band3Wrap.classList.toggle("hidden", state.bandCount !== 5);
}

function populateSelects(){
  // Digit bands
  [els.band1, els.band2, els.band3].forEach(select => select.innerHTML = "");
  DIGIT_COLORS.forEach((key, idx) => {
    [els.band1, els.band2, els.band3].forEach(select => {
      const opt = document.createElement("option");
      opt.value = idx;
      opt.textContent = colorName(key);
      select.appendChild(opt);
    });
  });

  // Multiplier
  els.multiplier.innerHTML = "";
  MULTIPLIERS.forEach(item => {
    const opt = document.createElement("option");
    opt.value = item.exp;
    opt.textContent = `${colorName(item.key)} · ×10^${item.exp}`;
    els.multiplier.appendChild(opt);
  });

  // Tolerance
  [els.toleranceColor, els.toleranceInput].forEach(select => {
    select.innerHTML = "";
    TOLERANCES.forEach(item => {
      const opt = document.createElement("option");
      opt.value = item.value;
      opt.textContent = item.key === "none"
        ? `${colorName(item.key)} · ±${item.value}%`
        : `${colorName(item.key)} · ±${item.value}%`;
      select.appendChild(opt);
    });
  });

  // Apply current values
  els.band1.value = String(state.colorBands.band1);
  els.band2.value = String(state.colorBands.band2);
  els.band3.value = String(state.colorBands.band3);
  els.multiplier.value = String(state.colorBands.multiplier);
  els.toleranceColor.value = String(state.colorBands.tolerance);
  els.toleranceInput.value = String(state.valueTolerance);
}

function syncInputs(){
  document.querySelector(`input[name="bandCount"][value="${state.bandCount}"]`).checked = true;
  els.valueInput.value = state.valueInput;
  populateSelects();
  updateBandVisibility();
  updateModeUI();
}

function readInputs(){
  state.bandCount = parseInt(document.querySelector('input[name="bandCount"]:checked')?.value || "4", 10);
  state.colorBands.band1 = parseInt(els.band1.value || "0", 10);
  state.colorBands.band2 = parseInt(els.band2.value || "0", 10);
  state.colorBands.band3 = parseInt(els.band3.value || "0", 10);
  state.colorBands.multiplier = parseInt(els.multiplier.value || "0", 10);
  state.colorBands.tolerance = parseFloat(els.toleranceColor.value || "5");
  state.valueInput = els.valueInput.value;
  state.valueTolerance = parseFloat(els.toleranceInput.value || "5");
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
    ["bandCountLabel","bandCountLabel"],
    ["band4Label","band4Label"],
    ["band5Label","band5Label"],
    ["bandCountHelp","bandCountHelp"],
    ["colorModeTitle","colorModeTitle"],
    ["valueModeTitle","valueModeTitle"],
    ["band1Label","band1Label"],
    ["band2Label","band2Label"],
    ["band3Label","band3Label"],
    ["multiplierLabel","multiplierLabel"],
    ["toleranceColorLabel","toleranceColorLabel"],
    ["valueInputLabel","valueInputLabel"],
    ["valueInputHelp","valueInputHelp"],
    ["toleranceInputLabel","toleranceInputLabel"],
    ["formulaTitle","formulaTitle"],
    ["formulaLine1","formulaLine1"],
    ["formulaLine2","formulaLine2"],
    ["formulaLine3","formulaLine3"],
    ["visualTitle","visualTitle"],
    ["bandsBadge","bandsBadge"],
    ["toleranceBadge","toleranceBadge"],
    ["visualFootnote","visualFootnote"],
    ["resultsTitle","resultsTitle"],
    ["mainValueLabel","mainValueLabel"],
    ["toleranceLabel","toleranceLabel"],
    ["minValueLabel","minValueLabel"],
    ["maxValueLabel","maxValueLabel"],
    ["summaryLabel","summaryLabel"],
    ["stepsTitle","stepsTitle"],
    ["teacherTipBox","teacherTipBox"],
    ["powerNote","powerNote"],
    ["teacherTitle","teacherTitle"],
    ["activityLabel","activityLabel"]
  ].forEach(([id, key]) => {
    const el = $(id);
    if(el) el.textContent = t(key);
  });

  $("modeColorBtn").textContent = t("modeColorBtn");
  $("modeValueBtn").textContent = t("modeValueBtn");
  $("calculateBtn").textContent = t("calculateBtn");
  $("resetBtn").textContent = t("resetBtn");
  $("interpretationBox").textContent = t("interpretationText");
  updateToggleResultsButton();
  populateSelects();
  renderTeacherMode();
  updateAll(false);
}

function updateToggleResultsButton(){
  els.toggleResultsBtn.textContent = state.hideResults ? t("showResults") : t("hideResults");
}

function resetAll(){
  state.mode = "colorToValue";
  state.bandCount = 4;
  state.colorBands = { band1: 1, band2: 0, band3: 0, multiplier: 1, tolerance: 5 };
  state.valueInput = "220";
  state.valueTolerance = 5;
  state.hideResults = false;
  state.teacher = {
    activity: "multiplier_up",
    selectedAnswer: "",
    predictionText: "",
    showSolution: false,
    feedbackType: "",
    feedbackText: ""
  };
  syncInputs();
  updateToggleResultsButton();
  updateAll(false);
}

function getToleranceItem(value){
  return TOLERANCES.find(t => Number(t.value) === Number(value)) || TOLERANCES.find(t => t.value === 5);
}

function getMultiplierItem(exp){
  return MULTIPLIERS.find(m => Number(m.exp) === Number(exp));
}

function computeColorToValue(){
  const sigDigits = state.bandCount === 4 ? 2 : 3;
  const digitsArray = [state.colorBands.band1, state.colorBands.band2];
  if(sigDigits === 3) digitsArray.push(state.colorBands.band3);

  const digitsText = digitsArray.join("");
  const base = Number(digitsText);
  const exp = state.colorBands.multiplier;
  const tolerance = state.colorBands.tolerance;
  const value = base * Math.pow(10, exp);

  if(!isFinite(value) || value <= 0){
    return { valid: false, error: t("invalidInputHint") };
  }

  const min = value * (1 - tolerance / 100);
  const max = value * (1 + tolerance / 100);

  const bands = [
    { key: DIGIT_COLORS[state.colorBands.band1], role: "digit", label: `${t("bandDigit")} 1` },
    { key: DIGIT_COLORS[state.colorBands.band2], role: "digit", label: `${t("bandDigit")} 2` }
  ];

  if(sigDigits === 3){
    bands.push({ key: DIGIT_COLORS[state.colorBands.band3], role: "digit", label: `${t("bandDigit")} 3` });
  }

  const multItem = getMultiplierItem(exp);
  bands.push({ key: multItem.key, role: "multiplier", label: t("bandMultiplier") });

  const tolItem = getToleranceItem(tolerance);
  bands.push({ key: tolItem.key, role: "tolerance", label: t("bandTolerance") });

  const steps = [
    replaceVars(t(sigDigits === 2 ? "stepColor1_4" : "stepColor1_5"), { digits: digitsText }),
    replaceVars(t("stepColor2"), { exp: String(exp), mult: Math.pow(10, exp).toLocaleString("en-US") }),
    replaceVars(t("stepColor3"), { value: formatOhms(value) }),
    replaceVars(t("stepColor4"), { tol: tolerance, min: formatOhms(min), max: formatOhms(max) })
  ];

  const summaryBands = bands.map(b => `${colorName(b.key)} (${b.label})`).join(" · ");

  return {
    valid: true,
    mode: "colorToValue",
    value,
    tolerance,
    min,
    max,
    bands,
    steps,
    summary: replaceVars(t("summaryColorToValue"), { bands: summaryBands }),
    approx: false
  };
}

function computeValueToColor(){
  const requestedValue = parseResistanceInput(state.valueInput);
  const tolerance = state.valueTolerance;

  if(!isFinite(requestedValue) || requestedValue <= 0){
    return { valid: false, error: t("invalidInputHint") };
  }

  const sigDigits = state.bandCount === 4 ? 2 : 3;
  let exp = Math.floor(Math.log10(requestedValue)) - (sigDigits - 1);
  let base = Math.round(requestedValue / Math.pow(10, exp));

  if(base >= Math.pow(10, sigDigits)){
    exp += 1;
    base = Math.round(requestedValue / Math.pow(10, exp));
  }

  if(exp < -2 || exp > 9){
    return { valid: false, error: t("invalidInputHint") };
  }

  const approxValue = base * Math.pow(10, exp);
  const digitsText = String(base).padStart(sigDigits, "0");
  const digitsArray = digitsText.split("").map(Number);

  const bands = [
    { key: DIGIT_COLORS[digitsArray[0]], role: "digit", label: `${t("bandDigit")} 1` },
    { key: DIGIT_COLORS[digitsArray[1]], role: "digit", label: `${t("bandDigit")} 2` }
  ];

  if(sigDigits === 3){
    bands.push({ key: DIGIT_COLORS[digitsArray[2]], role: "digit", label: `${t("bandDigit")} 3` });
  }

  const multItem = getMultiplierItem(exp);
  bands.push({ key: multItem.key, role: "multiplier", label: t("bandMultiplier") });

  const tolItem = getToleranceItem(tolerance);
  bands.push({ key: tolItem.key, role: "tolerance", label: t("bandTolerance") });

  const min = approxValue * (1 - tolerance / 100);
  const max = approxValue * (1 + tolerance / 100);
  const approx = Math.abs(approxValue - requestedValue) > 1e-9;

  const steps = [
    replaceVars(t("stepValue1"), { valueInput: state.valueInput }),
    replaceVars(t(sigDigits === 2 ? "stepValue2_4" : "stepValue2_5"), { digits: digitsText }),
    replaceVars(t("stepValue3"), { exp: String(exp), mult: Math.pow(10, exp).toLocaleString("en-US") }),
    replaceVars(t("stepValue4"), { value: formatOhms(approxValue) }),
    replaceVars(t("stepValue5"), { tol: tolerance })
  ];

  if(approx){
    steps.push(t("approximationText"));
  }

  const summaryBands = bands.map(b => `${colorName(b.key)} (${b.label})`).join(" · ");

  return {
    valid: true,
    mode: "valueToColor",
    value: approxValue,
    requestedValue,
    tolerance,
    min,
    max,
    bands,
    steps,
    summary: replaceVars(t("summaryValueToColor"), { bands: summaryBands }),
    approx
  };
}

function getCurrentData(){
  return state.mode === "colorToValue" ? computeColorToValue() : computeValueToColor();
}

function renderResults(data){
  els.resultsGrid.classList.toggle("hidden", state.hideResults);

  if(!data.valid){
    els.mainValue.textContent = t("invalidValue");
    els.toleranceValue.textContent = "—";
    els.minValue.textContent = "—";
    els.maxValue.textContent = "—";
    els.summaryValue.textContent = "—";
    els.stepsList.innerHTML = `<li>${data.error || t("invalidInputHint")}</li>`;
    return;
  }

  els.mainValue.textContent = formatOhms(data.value);
  els.toleranceValue.textContent = `±${data.tolerance}%`;
  els.minValue.textContent = formatOhms(data.min);
  els.maxValue.textContent = formatOhms(data.max);
  els.summaryValue.textContent = data.summary;
  els.stepsList.innerHTML = data.steps.map(step => `<li>${step}</li>`).join("");
}

function renderLegend(bands){
  els.bandLegend.innerHTML = "";
  bands.forEach((band, index) => {
    const item = document.createElement("div");
    item.className = "legend-item";

    const chip = document.createElement("span");
    chip.className = "band-chip";
    chip.style.background = band.key === "none" ? "transparent" : COLOR_HEX[band.key];
    chip.style.borderStyle = band.key === "none" ? "dashed" : "solid";
    chip.style.borderColor = band.key === "none" ? "rgba(255,255,255,.4)" : "rgba(255,255,255,.18)";

    const text = document.createElement("span");
    text.textContent = `${index + 1}. ${colorName(band.key)} · ${band.label}`;

    item.appendChild(chip);
    item.appendChild(text);
    els.bandLegend.appendChild(item);
  });
}

function drawResistor(data){
  const svg = els.resistorSvg;
  if(!svg) return;

  if(!data.valid){
    svg.innerHTML = `
      <rect x="0" y="0" width="760" height="260" rx="24" fill="rgba(255,255,255,.03)"></rect>
      <text x="380" y="130" text-anchor="middle" fill="#fee2e2" font-size="22" font-weight="700">${t("invalidValue")}</text>
    `;
    els.bandLegend.innerHTML = "";
    return;
  }

  const bands = data.bands;
  const bodyX = 170;
  const bodyY = 65;
  const bodyW = 420;
  const bodyH = 130;
  const bodyFill = "#E8D8B5";
  const capFill = "#CDBB95";

  const positions4 = [250, 320, 430, 520];
  const positions5 = [235, 295, 355, 440, 535];
  const positions = state.bandCount === 4 ? positions4 : positions5;

  const bandsSvg = bands.map((band, index) => {
    const x = positions[index] || 250 + index * 60;
    const color = band.key === "none" ? "transparent" : COLOR_HEX[band.key];
    const stroke = band.key === "none" ? "rgba(120,120,120,.8)" : "rgba(0,0,0,.18)";
    const dash = band.key === "none" ? 'stroke-dasharray="6 4"' : "";

    return `
      <rect x="${x}" y="${bodyY}" width="22" height="${bodyH}" rx="4"
            fill="${color}" stroke="${stroke}" stroke-width="1.5" ${dash}></rect>
    `;
  }).join("");

  svg.innerHTML = `
    <rect x="0" y="0" width="760" height="260" rx="24" fill="rgba(255,255,255,.03)"></rect>

    <!-- leads -->
    <line x1="45" y1="130" x2="${bodyX}" y2="130" stroke="#D6E4F7" stroke-width="10" stroke-linecap="round"></line>
    <line x1="${bodyX + bodyW}" y1="130" x2="715" y2="130" stroke="#D6E4F7" stroke-width="10" stroke-linecap="round"></line>

    <!-- shadow -->
    <ellipse cx="380" cy="210" rx="220" ry="18" fill="rgba(0,0,0,.22)"></ellipse>

    <!-- body -->
    <rect x="${bodyX}" y="${bodyY}" width="${bodyW}" height="${bodyH}" rx="48" fill="${bodyFill}" stroke="#B89E6A" stroke-width="3"></rect>
    <rect x="${bodyX}" y="${bodyY + 10}" width="34" height="${bodyH - 20}" rx="16" fill="${capFill}" opacity=".9"></rect>
    <rect x="${bodyX + bodyW - 34}" y="${bodyY + 10}" width="34" height="${bodyH - 20}" rx="16" fill="${capFill}" opacity=".9"></rect>

    <!-- highlight -->
    <ellipse cx="360" cy="92" rx="150" ry="26" fill="rgba(255,255,255,.22)"></ellipse>

    ${bandsSvg}
  `;

  renderLegend(bands);
}

/* =========================
   TEACHER MODE
========================= */
function resetTeacherQuestion(){
  state.teacher.selectedAnswer = "";
  state.teacher.predictionText = "";
  state.teacher.showSolution = false;
  state.teacher.feedbackType = "";
  state.teacher.feedbackText = "";
}

function getTeacherActivity(data){
  if(!data.valid){
    return {
      prompt: t("invalidInputHint"),
      subtext: "",
      options: [],
      correct: "",
      solution: t("invalidInputHint")
    };
  }

  if(state.teacher.activity === "multiplier_up"){
    return {
      prompt: t("activity_multiplier_up"),
      subtext: t("teacherHint"),
      options: [
        { value: "x10", label: t("option_x10") },
        { value: "div10", label: t("option_div10") },
        { value: "same", label: t("option_same") }
      ],
      correct: "x10",
      solution: t("teacher_solution_multiplier_up")
    };
  }

  if(state.teacher.activity === "gold_tolerance"){
    return {
      prompt: t("activity_gold_tolerance"),
      subtext: t("teacherHint"),
      options: [
        { value: "5", label: t("option_gold_5") },
        { value: "10", label: t("option_gold_10") },
        { value: "1", label: t("option_gold_1") }
      ],
      correct: "5",
      solution: t("teacher_solution_gold")
    };
  }

  if(state.teacher.activity === "predict_current"){
    const correctLabel = formatOhms(data.value);
    const wrong1 = formatOhms(data.value * 10);
    const wrong2 = formatOhms(data.value / 10);

    const options = [
      { value: "correct", label: correctLabel },
      { value: "wrong1", label: wrong1 },
      { value: "wrong2", label: wrong2 }
    ].sort(() => Math.random() - 0.5);

    return {
      prompt: t("activity_predict_current"),
      subtext: t("teacherHint"),
      options,
      correct: "correct",
      solution: replaceVars(t("teacher_solution_predict_current"), {
        value: formatOhms(data.value),
        tol: data.tolerance
      })
    };
  }

  return {
    prompt: t("invalidInputHint"),
    subtext: "",
    options: [],
    correct: "",
    solution: t("invalidInputHint")
  };
}

function renderTeacherMode(){
  const data = getCurrentData();
  const activity = getTeacherActivity(data);

  els.teacherTitle.textContent = t("teacherTitle");
  els.activityLabel.textContent = t("activityLabel");
  els.newQuestionBtn.textContent = t("newQuestionBtn");
  els.showSolutionBtn.textContent = state.teacher.showSolution ? t("hideSolutionBtn") : t("showSolutionBtn");

  els.activitySelect.innerHTML = `
    <option value="multiplier_up">${t("activity_multiplier_up")}</option>
    <option value="predict_current">${t("activity_predict_current")}</option>
    <option value="gold_tolerance">${t("activity_gold_tolerance")}</option>
  `;
  els.activitySelect.value = state.teacher.activity;

  const optionsHTML = activity.options.map(option => `
    <label class="answer-option">
      <input type="radio" name="teacherAnswer" value="${option.value}" ${state.teacher.selectedAnswer === option.value ? "checked" : ""}>
      <span>${option.label}</span>
    </label>
  `).join("");

  const feedbackHTML = state.teacher.feedbackText
    ? `<div class="feedback-box ${state.teacher.feedbackType}">${state.teacher.feedbackText}</div>`
    : "";

  const solutionHTML = state.teacher.showSolution
    ? `<div class="solution-box"><strong>${t("solutionTitle")}</strong>${activity.solution}</div>`
    : "";

  els.teacherActivityCard.innerHTML = `
    <div class="teacher-prompt">${activity.prompt}</div>
    <div class="teacher-subtext">${activity.subtext || ""}</div>

    <div class="answer-list">${optionsHTML}</div>

    <label for="predictionText" style="display:block; margin-bottom:6px; font-weight:700;">
      ${t("predictionLabel")}
    </label>
    <textarea id="predictionText" class="teacher-textarea" placeholder="${t("predictionPlaceholder")}">${state.teacher.predictionText}</textarea>

    <div class="teacher-actions">
      <button class="teacher-btn primary" id="checkAnswerBtn">${t("checkAnswerBtn")}</button>
    </div>

    ${feedbackHTML}
    ${solutionHTML}

    <div class="teacher-small">${t("teacherHint")}</div>
  `;

  const predictionTextEl = $("predictionText");
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

  const checkBtn = $("checkAnswerBtn");
  if(checkBtn){
    checkBtn.addEventListener("click", checkTeacherAnswer);
  }
}

function checkTeacherAnswer(){
  const data = getCurrentData();
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
   MAIN UPDATE
========================= */
function updateAll(read = true){
  if(read) readInputs();

  const data = getCurrentData();
  renderResults(data);
  drawResistor(data);
  renderTeacherMode();
}

function attachEvents(){
  document.querySelectorAll(".lang-btn").forEach(btn => {
    btn.addEventListener("click", () => applyLanguage(btn.dataset.lang));
  });

  document.querySelectorAll('input[name="bandCount"]').forEach(radio => {
    radio.addEventListener("change", () => {
      readInputs();
      updateBandVisibility();
      resetTeacherQuestion();
      updateAll(false);
    });
  });

  ["band1","band2","band3","multiplier","toleranceColor","valueInput","toleranceInput"].forEach(id => {
    const el = $(id);
    if(el){
      el.addEventListener("input", () => updateAll());
      el.addEventListener("change", () => updateAll());
    }
  });

  els.modeColorBtn.addEventListener("click", () => {
    state.mode = "colorToValue";
    updateModeUI();
    resetTeacherQuestion();
    updateAll();
  });

  els.modeValueBtn.addEventListener("click", () => {
    state.mode = "valueToColor";
    updateModeUI();
    resetTeacherQuestion();
    updateAll();
  });

  els.calculateBtn.addEventListener("click", () => updateAll());
  els.resetBtn.addEventListener("click", resetAll);

  els.toggleResultsBtn.addEventListener("click", () => {
    state.hideResults = !state.hideResults;
    updateToggleResultsButton();
    updateAll(false);
  });

  els.activitySelect.addEventListener("change", (e) => {
    state.teacher.activity = e.target.value;
    resetTeacherQuestion();
    renderTeacherMode();
  });

  els.newQuestionBtn.addEventListener("click", () => {
    resetTeacherQuestion();
    renderTeacherMode();
  });

  els.showSolutionBtn.addEventListener("click", () => {
    state.teacher.showSolution = !state.teacher.showSolution;
    renderTeacherMode();
  });
}

/* =========================
   INIT
========================= */
syncInputs();
attachEvents();
applyLanguage("ca");
updateAll(false);























