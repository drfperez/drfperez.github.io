/* EcoTrivial app.js v3
 * Producció: model robust amb IDs estables, migració de bancs antics,
 * persistència versionada, ordre estable de preguntes i validació detallada.
 */

const BANK_STORAGE_KEY = 'ecotrivial-editor-bank-corregit';
const CONFIG_STORAGE_KEY = 'ecotrivial-editor-config-corregit';
const HELP_SEEN_KEY = 'ecotrivial-help-center-seen';
const BANK_SCHEMA_VERSION = 3;

const CATEGORIES = [
  { id:'verd', label:'Verd', icon:'🌿', colorClass:'cat-verd', tagBg:'#8cb369', tagColor:'#173217' },
  { id:'blau', label:'Blau', icon:'💧', colorClass:'cat-blau', tagBg:'#5b8cbf', tagColor:'#fff' },
  { id:'taronja', label:'Taronja', icon:'🐄', colorClass:'cat-taronja', tagBg:'#e6a15c', tagColor:'#3d2c15' },
  { id:'vermell', label:'Vermell', icon:'📜', colorClass:'cat-vermell', tagBg:'#d96c6c', tagColor:'#fff' },
  { id:'groc', label:'Groc', icon:'🌻', colorClass:'cat-groc', tagBg:'#e5d06d', tagColor:'#433d14' },
  { id:'lila', label:'Lila', icon:'🍇', colorClass:'cat-lila', tagBg:'#b58db5', tagColor:'#fff' }
];
const CATEGORY_IDS = CATEGORIES.map(c => c.id);

const PATH = [
  [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
  [1,6],[2,6],[3,6],[4,6],[5,6],[6,6],
  [6,5],[6,4],[6,3],[6,2],[6,1],[6,0],
  [5,0],[4,0],[3,0],[2,0],[1,0],
  [1,1],[1,2],[1,3],[1,4],[1,5],
  [2,5],[3,5],[4,5],[5,5],
  [5,4],[5,3],[5,2],[5,1],
  [4,1],[3,1],[2,1],
  [2,2],[2,3],[2,4],
  [3,4],[4,4],[4,3],[4,2],
  [3,2],[3,3]
];

const SPECIALS = {
  4:{ type:'wedge', label:'W', text:'Casella de falca' },
  12:{ type:'wedge', label:'W', text:'Casella de falca' },
  20:{ type:'wedge', label:'W', text:'Casella de falca' },
  28:{ type:'wedge', label:'W', text:'Casella de falca' },
  36:{ type:'wedge', label:'W', text:'Casella de falca' },
  44:{ type:'wedge', label:'W', text:'Casella de falca' },

  9:{ type:'bonus', label:'B', text:'Casella bonus (+5)' },
  24:{ type:'bonus', label:'B', text:'Casella bonus (+5)' },
  41:{ type:'bonus', label:'B', text:'Casella bonus (+5)' },

  15:{ type:'again', label:'↺', text:'Casella torna a tirar' },
  32:{ type:'again', label:'↺', text:'Casella torna a tirar' },

  6:{ type:'challenge', label:'R', text:'Repte docent (+5)' },
  18:{ type:'challenge', label:'R', text:'Repte docent (+5)' },
  29:{ type:'challenge', label:'R', text:'Repte docent (+5)' }
};

const DICE = ['⚀','⚁','⚂','⚃','⚄','⚅'];

const DEFAULT_QUESTION_BANK = {
  verd: [
    { pregunta:"Quina varietat de tomàquet és tradicional i molt apreciada a Catalunya en ecològic?", opcions:["Tomàquet de penjar","Tomàquet cherry","Tomàquet raïm","Tomàquet d'amanida"], correcte:0, explicacio:"El tomàquet de penjar és una varietat autòctona, molt sucosa i perfecta per a l'agricultura ecològica." },
    { pregunta:"Quin cultiu ecològic és típic de la comarca de les Garrigues (Lleida)?", opcions:["L'olivera","La vinya","L'ametller","El cereal"], correcte:0, explicacio:"Les Garrigues són famoses per l'oli d'oliva verge extra ecològic, amb DO." },
    { pregunta:"Què és un cultiu de cobertura en agricultura ecològica?", opcions:["Una planta que protegeix el sòl entre collites","Una lona plàstica","Un hivernacle","Un tipus de reg"], correcte:0, explicacio:"Els cultius de cobertura eviten l'erosió i aporten nitrogen al sòl." },
    { pregunta:"Quina hortalissa d'hivern es conrea sovint en ecològic a l'horta del Maresme?", opcions:["La carxofa","La síndria","El pebrot","La mongeta tendra"], correcte:0, explicacio:"La carxofa és una hortalissa típica d'hivern, molt cultivada a la costa catalana." },
    { pregunta:"Què és la rotació de cultius i per què és important?", opcions:["Alternar espècies per mantenir la fertilitat del sòl","Plantar sempre el mateix","Utilitzar adobs químics","Regar molt"], correcte:0, explicacio:"La rotació evita l'esgotament de nutrients i trenca els cicles de plagues." },
    { pregunta:"Quin és un dels principals beneficis de l'ús de fems animals en ecològic?", opcions:["Aporten matèria orgànica i nutrients","Emmagatzemen aigua","No fan res","Eliminen les males herbes"], correcte:0, explicacio:"El fem ben compostat enriqueix el sòl de manera natural i millora la seva estructura." },
    { pregunta:"Què significa varietat tradicional en agricultura?", opcions:["Varietats adaptades al territori i cultivades històricament","Varietats modificades genèticament","Varietats importades","Varietats de flor"], correcte:0, explicacio:"Les varietats tradicionals són riquesa genètica i cultural, molt apreciades en ecològic." },
    { pregunta:"Per què l'agricultura ecològica afavoreix la pol·linització?", opcions:["Perquè no fa servir pesticides tòxics per a les abelles","Perquè no té flors","Perquè tot és verd","Perquè fa molt de soroll"], correcte:0, explicacio:"La manca de pesticides permet que les abelles i altres pol·linitzadors prosperin." }
  ],
  blau: [
    { pregunta:"Per què l'agricultura ecològica contribueix a estalviar aigua?", opcions:["Perquè millora la capacitat de retenció del sòl","Perquè fa servir menys reg","Perquè no rega mai","Perquè fa servir aigua de mar"], correcte:0, explicacio:"Els sòls rics en matèria orgànica retenen millor la humitat, reduint la necessitat de reg." },
    { pregunta:"Quin impacte positiu té l'agricultura ecològica sobre els aqüífers?", opcions:["No contamina amb nitrats","Augmenta la salinitat","Els buida completament","No té cap efecte"], correcte:0, explicacio:"En no fer servir fertilitzants de síntesi, s'evita la filtració de nitrats a les aigües subterrànies." },
    { pregunta:"Què són les zones humides i per què són importants?", opcions:["Ecosistemes que filtren l'aigua i acullen biodiversitat","Zones sense aigua","Terrenys de secà","Embassaments artificials"], correcte:0, explicacio:"Les zones humides són claus per a l'equilibri ecològic i la purificació de l'aigua." },
    { pregunta:"La ramaderia ecològica redueix la petjada de carboni perquè...", opcions:["Els animals pasturen i fertilitzen el sòl naturalment","Els animals mengen plàstic","No tenen aigua","Són animals més petits"], correcte:0, explicacio:"El pasturatge regenera el sòl i segresta carboni, a més d'evitar pinsos importats." },
    { pregunta:"Què és l'agroecologia en relació amb l'aigua?", opcions:["Un sistema que optimitza l'ús de l'aigua i la protegeix","Un sistema que gasta molta aigua","No té relació","Només usa aigua de pluja"], correcte:0, explicacio:"L'agroecologia dissenya paisatges que capten i filtren l'aigua de manera natural." },
    { pregunta:"Com pot l'agricultura ecològica ajudar a lluitar contra la sequera?", opcions:["Millorant la infiltració i l'emmagatzematge d'aigua al sòl","Plantant cactus","No regant mai","Usant plàstics"], correcte:0, explicacio:"Sòls sans amb matèria orgànica actuen com una esponja, retenint aigua per als períodes secs." },
    { pregunta:"Què és el reg per degoteig i com s'usa en ecològic?", opcions:["Un sistema que aplica aigua gota a gota, estalviant-ne","Un sistema de reg per inundació","Un sistema que rega amb mànegues","Un sistema que no rega"], correcte:0, explicacio:"El reg per degoteig és molt eficient i s'usa sovint en horticultura ecològica." },
    { pregunta:"Per què és important mantenir la vegetació de ribera en zones agrícoles?", opcions:["Per protegir els cursos d'aigua i la biodiversitat","Perquè és bonica","Per ombra","Perquè no cal regar"], correcte:0, explicacio:"La vegetació de ribera filtra contaminants i proporciona refugi per a la fauna." }
  ],
  taronja: [
    { pregunta:"Com es diu la pràctica de criar vaques, ovelles o cabres en llibertat i amb aliment ecològic?", opcions:["Ramaderia intensiva","Ramaderia ecològica de pastura","Indústria càrnia","Transhumància moderna"], correcte:1, explicacio:"La ramaderia ecològica de pastura garanteix benestar animal i aliments lliures de químics." },
    { pregunta:"Quin és un dels requisits per a la ramaderia ecològica certificada?", opcions:["Els animals han de tenir accés a l'aire lliure","Els animals han de viure en gàbies","Els animals només mengen pinso importat","No es poden vacunar"], correcte:0, explicacio:"El benestar animal exigeix espai a l'aire lliure i condicions naturals." },
    { pregunta:"Les gallines ecològiques, a diferència de les intensives...", opcions:["Poden picotejar a terra i menjar insectes","No poden sortir mai","Són més petites","No posen ous"], correcte:0, explicacio:"La llibertat de moviment i la dieta natural són la base de l'aviram ecològic." },
    { pregunta:"Què és el benestar animal en el context ecològic?", opcions:["Que l'animal no pateix i viu segons la seva espècie","Que l'animal engreixa ràpid","Que està en una gàbia neta","Que rep antibiòtics"], correcte:0, explicacio:"El benestar animal és un pilar de l'agroecologia, respectant ritmes i comportaments naturals." },
    { pregunta:"Per què la ramaderia ecològica sovint té animals de races autòctones?", opcions:["Perquè estan més adaptades al territori i tenen més resistència","Perquè són més grans","Perquè donen més llet","Perquè són més bonics"], correcte:0, explicacio:"Les races autòctones són més resistents a les condicions locals i requereixen menys intervencions." },
    { pregunta:"Què és l'alimentació ecològica per als animals?", opcions:["Menjar procedent d'agricultura ecològica, sense OMG ni químics","Menjar de supermercat","Menjar amb molts additius","Menjar de soja importada"], correcte:0, explicacio:"Els pinsos ecològics han de ser certificats i lliures de transgènics." },
    { pregunta:"Com afecta la ramaderia ecològica al benestar del sòl?", opcions:["El pasturatge millora la fertilitat i l'estructura del sòl","El compacta","No el toca","El contamina"], correcte:0, explicacio:"Els animals pasturen i fertilitzen, i si es gestiona bé, regeneren el sòl." },
    { pregunta:"Què és la transhumància i per què és una pràctica sostenible?", opcions:["El moviment estacional dels ramats per aprofitar pasturatges naturals","Criar animals en naus","Transportar animals en camions","No té relació"], correcte:0, explicacio:"La transhumància aprofita recursos naturals sense sobrepasturar." }
  ],
  vermell: [
    { pregunta:"Quin és l'ens oficial que certifica els productes ecològics a Catalunya?", opcions:["CCPAE","DOQ","ICO","Generalitat Verda"], correcte:0, explicacio:"El Consell Català de la Producció Agrària Ecològica és el certificador oficial." },
    { pregunta:"Quin segell europeu identifica els aliments ecològics?", opcions:["Una fulla verda amb estrelles","Un cercle blau","Un triangle groc","Una abella"], correcte:0, explicacio:"El logotip de la fulla verda és el segell oficial de la Unió Europea." },
    { pregunta:"Què vol dir que un producte tingui certificació ecològica?", opcions:["Que ha superat controls i compleix la normativa","Que és més barat","Que és de color verd","Que ve de fora"], correcte:0, explicacio:"La certificació garanteix que tot el procés segueix les normes ecològiques." },
    { pregunta:"Quin ODS està més directament relacionat amb l'alimentació ecològica?", opcions:["ODS 2: Fam zero","ODS 5: Igualtat de gènere","ODS 8: Treball digne","Tots els anteriors"], correcte:3, explicacio:"L'alimentació ecològica contribueix a diversos ODS alhora." },
    { pregunta:"Què és el consum responsable segons l'ODS 12?", opcions:["Comprar productes locals i de temporada","Comprar el més barat","Comprar el més envasat","No comprar res"], correcte:0, explicacio:"L'ODS 12 promou producció i consum responsables." },
    { pregunta:"Què vol dir sobirania alimentària?", opcions:["Dret dels pobles a decidir el seu sistema alimentari","Que els aliments siguin barats","Que els aliments vinguin de fora","Que només es mengi pa"], correcte:0, explicacio:"Defensa que cada comunitat pugui decidir com produeix i consumeix aliments." },
    { pregunta:"Per què és important el comerç just en productes ecològics?", opcions:["Per garantir condicions dignes als productors","Perquè és més car","Perquè és de luxe","No és important"], correcte:0, explicacio:"Assegura preus justos i condicions laborals adequades." },
    { pregunta:"Què és la traçabilitat en alimentació ecològica?", opcions:["Poder seguir tot el camí del producte, del camp a la taula","Que el producte sigui rastrejable per GPS","Que tingui un codi de barres","Que sigui fàcil de transportar"], correcte:0, explicacio:"La traçabilitat garanteix transparència i confiança." }
  ],
  groc: [
    { pregunta:"Què són els 10 elements de l'Agroecologia de la FAO?", opcions:["Un decàleg per a sistemes alimentaris sostenibles","Deu tipus de fems","Deu verdures","Unes lleis europees"], correcte:0, explicacio:"La FAO va definir elements clau per aplicar l'agroecologia als sistemes alimentaris." },
    { pregunta:"Quin benefici social té l'agricultura ecològica al món rural?", opcions:["Genera ocupació i fixa població","Redueix la biodiversitat","Només beneficia grans empreses","No té cap benefici"], correcte:0, explicacio:"L'agricultura ecològica pot afavorir ocupació i desenvolupament local." },
    { pregunta:"Què significa aliment de km 0?", opcions:["Que és de proximitat, produït a prop","Que té 0 calories","Que ve de l'altra punta del món","Que és congelat"], correcte:0, explicacio:"El km 0 redueix la petjada de carboni i dona suport als productors locals." },
    { pregunta:"Per què l'agroecologia promou la diversitat de cultius?", opcions:["Perquè augmenta la resiliència i redueix plagues","Perquè queda més bonic","Perquè és més fàcil","Perquè ho diu la llei"], correcte:0, explicacio:"La diversitat fa els sistemes més forts davant plagues i canvis climàtics." },
    { pregunta:"Què és una cooperativa agroecològica?", opcions:["Un grup de productors que treballen junts, de manera sostenible","Una empresa multinacional","Un banc","Una botiga de llavors"], correcte:0, explicacio:"Les cooperatives permeten compartir recursos i comercialitzar millor." },
    { pregunta:"Com pot l'agricultura ecològica ajudar a la salut de les persones?", opcions:["Reduint l'exposició a pesticides i promovent aliments més sans","No té efecte","Augmenta les malalties","Només afecta els animals"], correcte:0, explicacio:"Redueix l'exposició a químics i promou aliments més saludables." },
    { pregunta:"Què és la petjada ecològica dels aliments?", opcions:["L'impacte ambiental de la producció i transport d'un aliment","La mida de l'aliment","El seu pes","El seu color"], correcte:0, explicacio:"Mesura l'impacte ambiental dels aliments al llarg del seu cicle." },
    { pregunta:"Per què és important l'educació en agroecologia a les escoles?", opcions:["Per formar ciutadans conscients i responsables amb el medi ambient","Perquè és una assignatura obligatòria","Per omplir temps","No és important"], correcte:0, explicacio:"Fomenta valors de sostenibilitat i coneixement del territori." }
  ],
  lila: [
    { pregunta:"Quina fruita de temporada ecològica és típica del Priorat?", opcions:["El raïm","La poma","La pera","La taronja"], correcte:0, explicacio:"El Priorat és conegut per la vinya i el raïm." },
    { pregunta:"Què són els productes de la terra en l'àmbit ecològic?", opcions:["Productes frescos de temporada i proximitat","Productes congelats","Productes importats","Productes enllaunats"], correcte:0, explicacio:"Respecten el calendari natural i el territori." },
    { pregunta:"La poma ecològica de la comarca de la Segarra es caracteritza per...", opcions:["Ser més saborosa i lliure de químics","Ser més petita","Ser de color vermell","No tenir llavors"], correcte:0, explicacio:"Les pràctiques ecològiques afavoreixen el sabor i una millor conservació." },
    { pregunta:"Quin d'aquests és un producte ecològic típic de les Terres de l'Ebre?", opcions:["L'arròs ecològic del Delta","Els plàtans","Les magranes de Múrcia","El kiwi"], correcte:0, explicacio:"L'arròs ecològic del Delta és un producte singular i de gran qualitat." },
    { pregunta:"Què és la biodiversitat agrícola?", opcions:["La varietat d'espècies i varietats que es conreen en una explotació","La diversitat d'animals salvatges","La diversitat de maquinària","La diversitat de colors"], correcte:0, explicacio:"Una major biodiversitat agrícola fa els sistemes més resilients." },
    { pregunta:"Per què els horts escolars ecològics són una bona eina educativa?", opcions:["Permeten aprendre fent, connectant amb la natura i l'alimentació","Perquè donen fruita gratis","Perquè són bonics","Perquè ocupen espai"], correcte:0, explicacio:"Fomenten aprenentatge vivencial i hàbits saludables." },
    { pregunta:"Què és la collita de tardor típica en ecològic a Catalunya?", opcions:["Carabasses, bolets, pomes i raïm","Síndries i melons","Espàrrecs","Maduixes"], correcte:0, explicacio:"A la tardor es cullen productes de temporada com carbassa, poma i raïm." },
    { pregunta:"Com podem identificar un producte ecològic al mercat?", opcions:["Pel segell oficial i l'etiquetatge","Pel seu color","Pel seu preu","Per la seva mida"], correcte:0, explicacio:"La certificació i l'etiquetatge són les garanties més fiables." }
  ]
};

function emptyBank(){
  return { verd:[], blau:[], taronja:[], vermell:[], groc:[], lila:[] };
}

function uid(prefix = 'id'){
  if (window.crypto?.randomUUID) return `${prefix}_${window.crypto.randomUUID()}`;
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function nowIso(){
  return new Date().toISOString();
}

function makeOption(text = '', id = null){
  return {
    id: id || uid('opt'),
    text: String(text || '').trim()
  };
}

function makeQuestion({
  id = null,
  categoria = '',
  pregunta = '',
  opcions = [],
  correctOptionId = null,
  explicacio = '',
  order = 0,
  createdAt = null,
  updatedAt = null
} = {}){
  return {
    id: id || uid('q'),
    categoria: String(categoria || '').trim().toLowerCase(),
    pregunta: String(pregunta || '').trim(),
    opcions: opcions.map(opt => typeof opt === 'string' ? makeOption(opt) : makeOption(opt?.text || '', opt?.id)),
    correctOptionId,
    explicacio: String(explicacio || '').trim(),
    order: Number.isFinite(Number(order)) ? Number(order) : 0,
    createdAt: createdAt || nowIso(),
    updatedAt: updatedAt || nowIso()
  };
}

function compareQuestionsStable(a, b){
  if (a.order !== b.order) return a.order - b.order;
  if (a.createdAt !== b.createdAt) return String(a.createdAt).localeCompare(String(b.createdAt));
  return String(a.id).localeCompare(String(b.id));
}

function sortCategory(catId){
  questionBank[catId].sort(compareQuestionsStable);
  questionBank[catId].forEach((q, idx) => { q.order = idx; });
}

function sortAllCategories(){
  CATEGORY_IDS.forEach(sortCategory);
}

function nextOrderForCategory(catId){
  const arr = questionBank[catId] || [];
  if(!arr.length) return 0;
  return Math.max(...arr.map(q => Number.isFinite(q.order) ? q.order : 0)) + 1;
}

function serializeBank(bank){
  return {
    schemaVersion: BANK_SCHEMA_VERSION,
    savedAt: nowIso(),
    bank
  };
}

function normalizeQuestionRecord(raw, categoria, orderIndex = 0){
  const cat = String(categoria || raw.categoria || raw.category || '').trim().toLowerCase();
  if(!CATEGORY_IDS.includes(cat)) throw new Error(`Categoria no vàlida: ${cat}`);

  const pregunta = String(raw.pregunta || raw.question || '').trim();
  const explicacio = String(raw.explicacio || raw.explanation || '').trim();

  if(!pregunta) throw new Error('Falta la pregunta');

  // Model nou robust
  if (Array.isArray(raw.opcions) && raw.opcions.length === 4 && typeof raw.opcions[0] === 'object') {
    const opcions = raw.opcions.map(opt => makeOption(opt?.text || '', opt?.id));
    const correctOptionId = String(raw.correctOptionId || '').trim();
    if(!correctOptionId) throw new Error(`La pregunta "${pregunta}" no té correctOptionId`);
    if(!opcions.some(o => o.id === correctOptionId)) {
      throw new Error(`La pregunta "${pregunta}" té una resposta correcta no vàlida`);
    }

    return makeQuestion({
      id: raw.id,
      categoria: cat,
      pregunta,
      opcions,
      correctOptionId,
      explicacio,
      order: raw.order ?? orderIndex,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt
    });
  }

  // Model antic
  const opcionsRaw = Array.isArray(raw.opcions)
    ? raw.opcions
    : [raw.opcio1, raw.opcio2, raw.opcio3, raw.opcio4];

  const texts = opcionsRaw.map(o => String(o ?? '').trim());
  if(texts.length !== 4 || texts.some(t => !t)) {
    throw new Error(`La pregunta "${pregunta}" ha de tenir exactament 4 opcions no buides`);
  }

  const correcte = Number(raw.correcte ?? raw.correct ?? raw.correctIndex);
  if(![0,1,2,3].includes(correcte)) {
    throw new Error(`La pregunta "${pregunta}" té un índex de resposta correcta invàlid`);
  }

  const opcions = texts.map(text => makeOption(text));
  const correctOptionId = opcions[correcte].id;

  return makeQuestion({
    id: raw.id,
    categoria: cat,
    pregunta,
    opcions,
    correctOptionId,
    explicacio,
    order: raw.order ?? orderIndex,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt
  });
}

let questionBank = emptyBank();

const state = {
  config:{ mode:'solo', difficulty:'medium', questionSeconds:20 },
  started:false, ended:false, canRoll:false, questionOpen:false,
  gameTimerStart:null, gameTimerInterval:null, questionTimerInterval:null, questionTimeLeft:0,
  currentTeamIndex:0, lastRoll:null, teams:[],
  usedQuestions:{ verd:[], blau:[], taronja:[], vermell:[], groc:[], lila:[] },
  currentQuestion:null, currentCategoryId:null, currentSpecial:null, currentTeamRef:null,
  currentPresentedOptions:[],
  editor:{ activeCategory:'verd', selectedQuestionId:null }
};

const $ = (id) => document.getElementById(id);

const startScreen = $('startScreen');
const gameScreen = $('gameScreen');
const endScreen = $('endScreen');

const modeSolo = $('modeSolo');
const modeTeams = $('modeTeams');
const modeProjector = $('modeProjector');

const team1Input = $('team1Input');
const team2Input = $('team2Input');
const team2Field = $('team2Field');
const difficultySelect = $('difficultySelect');
const timerSelect = $('timerSelect');
const btnStart = $('btnStart');

const bankStatus = $('bankStatus');
const btnOpenEditor = $('btnOpenEditor');
const btnImport = $('btnImport');
const btnExportJson = $('btnExportJson');
const btnExportCsv = $('btnExportCsv');
const btnTemplateCsv = $('btnTemplateCsv');
const btnTemplateJson = $('btnTemplateJson');
const btnEditHelp = $('btnEditHelp');
const btnResetBank = $('btnResetBank');
const questionFile = $('questionFile');

const boardEl = $('board');
const teamList = $('teamList');
const turnLabel = $('turnLabel');
const statusBox = $('statusBox');
const uiGameTime = $('uiGameTime');
const uiLastRoll = $('uiLastRoll');
const uiDifficulty = $('uiDifficulty');
const uiBankSize = $('uiBankSize');
const diceEl = $('dice');
const btnRoll = $('btnRoll');
const btnHome = $('btnHome');

const questionOverlay = $('questionOverlay');
const categoryTag = $('categoryTag');
const modalTurnInfo = $('modalTurnInfo');
const modalSpecialInfo = $('modalSpecialInfo');
const modalTimerInfo = $('modalTimerInfo');
const questionText = $('questionText');
const answersBox = $('answersBox');
const feedbackBox = $('feedbackBox');
const feedbackTitle = $('feedbackTitle');
const feedbackText = $('feedbackText');
const btnContinue = $('btnContinue');
const timerBar = $('timerBar');
const timerFill = $('timerFill');

const editorOverlay = $('editorOverlay');
const btnCloseEditor = $('btnCloseEditor');
const btnOpenEditHelpFromEditor = $('btnOpenEditHelpFromEditor');
const btnNewQuestion = $('btnNewQuestion');
const categoryTabs = $('categoryTabs');
const questionList = $('questionList');
const editorCount = $('editorCount');
const editorCategory = $('editorCategory');
const editorCorrect = $('editorCorrect');
const editorQuestion = $('editorQuestion');
const editorOption1 = $('editorOption1');
const editorOption2 = $('editorOption2');
const editorOption3 = $('editorOption3');
const editorOption4 = $('editorOption4');
const editorExplanation = $('editorExplanation');
const btnSaveQuestion = $('btnSaveQuestion');
const btnDuplicateQuestion = $('btnDuplicateQuestion');
const btnDeleteQuestion = $('btnDeleteQuestion');
const btnEditorExportJson = $('btnEditorExportJson');
const btnEditorExportCsv = $('btnEditorExportCsv');
const editorStatus = $('editorStatus');

const btnHelpStart = $('btnHelpStart');
const btnHelpGame = $('btnHelpGame');

const helpCenterOverlay = $('helpCenterOverlay');
const btnCloseHelpCenter = $('btnCloseHelpCenter');
const btnHelpCenterOk = $('btnHelpCenterOk');
const tabPlayHelp = $('tabPlayHelp');
const tabEditHelp = $('tabEditHelp');
const playHelpPanel = $('playHelpPanel');
const editHelpPanel = $('editHelpPanel');

const winnerText = $('winnerText');
const finalTime = $('finalTime');
const finalMode = $('finalMode');
const finalDifficulty = $('finalDifficulty');
const finalBank = $('finalBank');
const teacherSummary = $('teacherSummary');
const teamsSummary = $('teamsSummary');
const btnRestartSame = $('btnRestartSame');
const btnBackStart = $('btnBackStart');

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

function vibrar(ms=30){
  if('vibrate' in navigator) navigator.vibrate(ms);
}

function formatTemps(segons){
  const min = Math.floor(segons/60);
  const sec = Math.floor(segons%60);
  return `${String(min).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
}

function setStatus(html){
  statusBox.innerHTML = html;
}

function totalQuestionCount(){
  return CATEGORY_IDS.reduce((sum, cat) => sum + (questionBank[cat]?.length || 0), 0);
}

function getCurrentTeam(){
  return state.teams[state.currentTeamIndex];
}

function getModeLabel(){
  return state.config.mode==='projector' ? 'Projector' : state.config.mode==='teams' ? '2 equips' : 'Individual';
}

function getDifficultyLabel(){
  return { basic:'Bàsic', medium:'Mitjà', advanced:'Avançat' }[state.config.difficulty] || 'Mitjà';
}

function getCategoriaPerPosicio(index){
  if(index===PATH.length-1) return null;
  return CATEGORIES[index % CATEGORIES.length];
}

function calcDestination(origin, roll){
  const meta=PATH.length-1;
  let dest=origin+roll;
  if(dest>meta){
    const excess=dest-meta;
    dest=meta-excess;
  }
  return dest;
}

function resetQuestionUsage(){
  state.usedQuestions = { verd:[], blau:[], taronja:[], vermell:[], groc:[], lila:[] };
}

function stopGameTimer(){
  if(state.gameTimerInterval){
    clearInterval(state.gameTimerInterval);
    state.gameTimerInterval=null;
  }
}

function stopQuestionTimer(){
  if(state.questionTimerInterval){
    clearInterval(state.questionTimerInterval);
    state.questionTimerInterval=null;
  }
}

function getQuestionById(cat, qid){
  return (questionBank[cat] || []).find(q => q.id === qid) || null;
}

function getQuestionIndexById(cat, qid){
  return (questionBank[cat] || []).findIndex(q => q.id === qid);
}

function shuffleArray(arr){
  const copy = [...arr];
  for(let i = copy.length - 1; i > 0; i--){
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function normalizeBankShape(bank){
  const out = emptyBank();
  CATEGORY_IDS.forEach(cat => {
    const arr = Array.isArray(bank?.[cat]) ? bank[cat] : [];
    out[cat] = arr.map((item, idx) => normalizeQuestionRecord(item, cat, idx)).sort(compareQuestionsStable);
    out[cat].forEach((q, idx) => { q.order = idx; });
  });
  return out;
}

function updateBankStatus(source='default'){
  const counts = CATEGORY_IDS.map(cat => `${cat}: ${questionBank[cat].length}`).join(' · ');
  bankStatus.innerHTML = `<strong>Banc actual:</strong> ${source==='default' ? 'banc per defecte' : 'banc personalitzat'}<br><strong>Preguntes totals:</strong> ${totalQuestionCount()}<br>${counts}`;
  if(uiBankSize) uiBankSize.textContent = `${totalQuestionCount()} Q`;
}

function createTemplateCSV(){
  return [
    'categoria;pregunta;opcio1;opcio2;opcio3;opcio4;correcte;explicacio',
    'verd;Què és la rotació de cultius?;Alternar espècies;Plantar sempre el mateix;Regar més;Fer servir plàstic;0;La rotació conserva fertilitat i redueix plagues.',
    'blau;Quin reg és més eficient?;Reg per degoteig;Reg per inundació;Mànega oberta;Cap dels anteriors;0;El degoteig estalvia aigua.',
    'vermell;Quin segell europeu identifica un producte ecològic?;Fulla verda amb estrelles;Cercle blau;Triangle groc;Cap opció;0;És el logotip oficial europeu.'
  ].join('\n');
}

function createTemplateJSON(){
  return JSON.stringify({
    schemaVersion: BANK_SCHEMA_VERSION,
    bank: normalizeBankShape({
      verd: [{ pregunta:'Què és un cultiu de cobertura?', opcions:['Una planta que protegeix el sòl','Un plàstic negre','Un tipus de reg','Una màquina'], correcte:0, explicacio:'Protegeix el sòl entre collites i en millora la fertilitat.' }],
      blau: [{ pregunta:'Per què la matèria orgànica ajuda amb l’aigua?', opcions:['Perquè actua com una esponja','Perquè impermeabilitza','Perquè elimina arrels','Perquè no té efecte'], correcte:0, explicacio:'Millora la capacitat de retenció d’aigua del sòl.' }]
    })
  }, null, 2);
}

async function downloadTextFile(filename, content, mime = 'text/plain;charset=utf-8'){
  const blob = new Blob([content], { type: mime });

  try {
    const file = new File([blob], filename, { type: mime });
    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({ title: filename, files: [file] });
      return;
    }
  } catch (err) {
    console.warn('No s’ha pogut compartir el fitxer:', err);
  }

  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();

  setTimeout(() => {
    URL.revokeObjectURL(a.href);
    a.remove();
  }, 100);
}

function bankToJSONArray(){
  const arr=[];
  CATEGORY_IDS.forEach(cat => {
    const sorted = [...questionBank[cat]].sort(compareQuestionsStable);
    sorted.forEach(q => {
      const correcte = q.opcions.findIndex(o => o.id === q.correctOptionId);
      arr.push({
        id: q.id,
        categoria: cat,
        pregunta: q.pregunta,
        opcions: q.opcions.map(o => ({ id:o.id, text:o.text })),
        correctOptionId: q.correctOptionId,
        correcte,
        explicacio: q.explicacio,
        order: q.order,
        createdAt: q.createdAt,
        updatedAt: q.updatedAt
      });
    });
  });
  return arr;
}

function bankToCSV(){
  const esc = (v) => {
    const s = String(v ?? '');
    return /[;"\n\r]/.test(s) ? '"' + s.replace(/"/g,'""') + '"' : s;
  };
  const lines=['categoria;pregunta;opcio1;opcio2;opcio3;opcio4;correcte;explicacio'];
  CATEGORY_IDS.forEach(cat => {
    const sorted = [...questionBank[cat]].sort(compareQuestionsStable);
    sorted.forEach(q => {
      const correcte = q.opcions.findIndex(o => o.id === q.correctOptionId);
      lines.push([
        esc(cat),
        esc(q.pregunta),
        esc(q.opcions[0]?.text || ''),
        esc(q.opcions[1]?.text || ''),
        esc(q.opcions[2]?.text || ''),
        esc(q.opcions[3]?.text || ''),
        esc(correcte),
        esc(q.explicacio)
      ].join(';'));
    });
  });
  return lines.join('\n');
}

function validateRecord(obj, idx='registre'){
  const errors = [];
  const categoria = String(obj.categoria || obj.category || '').trim().toLowerCase();
  if(!CATEGORY_IDS.includes(categoria)) errors.push(`${idx}: categoria no vàlida (${categoria})`);

  const pregunta = String(obj.pregunta || obj.question || '').trim();
  if(!pregunta) errors.push(`${idx}: falta la pregunta`);

  const explicacio = String(obj.explicacio || obj.explanation || '').trim();
  const opcions = Array.isArray(obj.opcions) ? obj.opcions : [obj.opcio1,obj.opcio2,obj.opcio3,obj.opcio4];
  const finalOpcions = opcions.map(o => typeof o === 'object' ? String(o?.text || '').trim() : String(o ?? '').trim());

  if(finalOpcions.length !== 4) errors.push(`${idx}: calen 4 opcions`);
  finalOpcions.forEach((t, i) => {
    if(!t) errors.push(`${idx}: manca text a l'opció ${i + 1}`);
  });

  const correcte = Number(obj.correcte ?? obj.correct ?? obj.correctIndex);
  if(![0,1,2,3].includes(correcte)) errors.push(`${idx}: la resposta correcta ha de ser 0,1,2 o 3`);

  if(errors.length) throw new Error(errors.join('\n'));
  return { categoria, registre:{ pregunta, opcions:finalOpcions, correcte, explicacio } };
}

function normalizeImportedData(data){
  if(data && typeof data === 'object' && !Array.isArray(data)){
    if(Array.isArray(data.questions)) return normalizeImportedData(data.questions);
    if(data.bank) return normalizeImportedData(data.bank);
  }

  const bank = emptyBank();

  if(Array.isArray(data)){
    data.forEach((item, idx) => {
      const q = normalizeQuestionRecord(item, item.categoria || item.category || '', idx);
      bank[q.categoria].push(q);
    });
    return bank;
  }

  if(data && typeof data==='object'){
    let found=false;
    CATEGORY_IDS.forEach(cat => {
      if(Array.isArray(data[cat])){
        found=true;
        data[cat].forEach((item, idx) => {
          const q = normalizeQuestionRecord({ ...item, categoria:cat }, cat, idx);
          bank[cat].push(q);
        });
      }
    });
    if(found) return bank;
  }

  throw new Error('Format JSON no reconegut.');
}

function parseCSV(text){
  const trimmed = text.replace(/^\uFEFF/, '').trim();
  if(!trimmed) throw new Error('El fitxer CSV és buit.');

  const delimiter = (trimmed.match(/;/g) || []).length >= (trimmed.match(/,/g) || []).length ? ';' : ',';

  const rows=[];
  let current='', row=[], inQuotes=false;

  for(let i=0;i<trimmed.length;i++){
    const ch=trimmed[i], next=trimmed[i+1];
    if(ch==='"'){
      if(inQuotes && next==='"'){ current+='"'; i++; }
      else inQuotes=!inQuotes;
    } else if(ch===delimiter && !inQuotes){
      row.push(current); current='';
    } else if((ch==='\n' || ch==='\r') && !inQuotes){
      if(ch==='\r' && next==='\n') i++;
      row.push(current); rows.push(row); row=[]; current='';
    } else {
      current+=ch;
    }
  }
  row.push(current);
  rows.push(row);

  const realRows = rows.filter(r => r.some(cell => String(cell).trim() !== ''));
  const headers = realRows.shift().map(h => String(h).trim().toLowerCase());

  const required = ['categoria','pregunta','opcio1','opcio2','opcio3','opcio4','correcte','explicacio'];
  const missing = required.filter(h => !headers.includes(h));
  if(missing.length) throw new Error(`Falten columnes: ${missing.join(', ')}`);

  const bank = emptyBank();
  realRows.forEach((r, idx) => {
    const obj={};
    headers.forEach((h, i) => obj[h] = r[i] ?? '');
    const { categoria, registre } = validateRecord(obj, `Fila ${idx+2}`);
    bank[categoria].push(normalizeQuestionRecord({ ...registre, categoria, order: idx }, categoria, idx));
  });

  return bank;
}

function ensureImportedBankHasMinimum(bank){
  const total = CATEGORY_IDS.reduce((sum, cat) => sum + (bank[cat]?.length || 0), 0);
  if(total < 6) throw new Error('Calen almenys 6 preguntes en total.');
  const empty = CATEGORY_IDS.filter(cat => !bank[cat] || bank[cat].length===0);
  if(empty.length) throw new Error(`Falten categories amb preguntes: ${empty.join(', ')}`);
  return true;
}

function persistBank(){
  sortAllCategories();
  localStorage.setItem(BANK_STORAGE_KEY, JSON.stringify(serializeBank(questionBank)));
}

function loadQuestionBank(){
  try{
    const saved = localStorage.getItem(BANK_STORAGE_KEY);
    if(!saved){
      questionBank = normalizeBankShape(DEFAULT_QUESTION_BANK);
      updateBankStatus('default');
      return;
    }

    const parsed = normalizeImportedData(JSON.parse(saved));
    ensureImportedBankHasMinimum(parsed);
    questionBank = normalizeBankShape(parsed);
    sortAllCategories();
    updateBankStatus('custom');
  } catch(err){
    console.warn(err);
    questionBank = normalizeBankShape(DEFAULT_QUESTION_BANK);
    sortAllCategories();
    updateBankStatus('default');
  }
}

async function importQuestions(){
  const file = questionFile.files?.[0];
  if(!file){ questionFile.click(); return; }

  try{
    const text = await file.text();
    const bank = file.name.toLowerCase().endsWith('.json')
      ? normalizeImportedData(JSON.parse(text))
      : parseCSV(text);

    ensureImportedBankHasMinimum(bank);
    questionBank = normalizeBankShape(bank);
    sortAllCategories();
    persistBank();
    updateBankStatus('custom');
    renderEditor();
    alert('Importació correcta. El nou banc ja està actiu.');
  } catch(err){
    console.error(err);
    alert(`No s'ha pogut importar el fitxer.\n\nMotiu: ${err.message}`);
  } finally {
    questionFile.value='';
  }
}

function resetQuestionBankToDefault(){
  if(!confirm('Vols recuperar el banc de preguntes per defecte?')) return;
  questionBank = normalizeBankShape(DEFAULT_QUESTION_BANK);
  sortAllCategories();
  persistBank();
  updateBankStatus('default');
  renderEditor();
  questionFile.value='';
}

function getQuestion(catId){
  const arr = questionBank[catId] || [];
  if(!arr.length) return null;

  let used = state.usedQuestions[catId];
  if(used.length >= arr.length){
    used = [];
    state.usedQuestions[catId] = [];
  }

  const available = arr.filter(q => !used.includes(q.id));
  const picked = available[Math.floor(Math.random() * available.length)];
  state.usedQuestions[catId].push(picked.id);
  return picked;
}

function createTeam(name, cssClass, shortLabel){
  return {
    name, cssClass, shortLabel,
    pos:0, score:0, streak:0, maxStreak:0, answered:0, correct:0,
    wedges:[],
    correctByCat:{ verd:0, blau:0, taronja:0, vermell:0, groc:0, lila:0 },
    attemptsByCat:{ verd:0, blau:0, taronja:0, vermell:0, groc:0, lila:0 }
  };
}

function teamHasWon(team){
  return team.pos===PATH.length-1 && team.wedges.length===CATEGORIES.length;
}

function renderBoard(){
  boardEl.innerHTML='';
  for(let r=0;r<7;r++){
    for(let c=0;c<7;c++){
      const idx = PATH.findIndex(p => p[0]===r && p[1]===c);
      const tile=document.createElement('div');
      tile.className='tile';

      if(idx===-1){
        tile.classList.add('empty');
      } else if(idx===PATH.length-1){
        tile.classList.add('meta');
        tile.innerHTML='<div class="inner"><div class="icon" style="font-size:1.7rem;">⭐</div><div class="label">META</div></div>';
      } else {
        const cat=getCategoriaPerPosicio(idx);
        tile.classList.add(cat.colorClass);
        tile.innerHTML=`<span class="step">${idx}</span><div class="inner"><div class="icon">${cat.icon}</div><div class="label">${cat.label}</div></div>`;
        if(SPECIALS[idx]){
          const tag=document.createElement('span');
          tag.className='special-tag';
          tag.textContent=SPECIALS[idx].label;
          tag.title=SPECIALS[idx].text;
          tile.appendChild(tag);
        }
      }

      const teamsHere = state.teams.filter(t => t.pos===idx);
      if(teamsHere.length){
        tile.classList.add('active');
        const tokens=document.createElement('div');
        tokens.className='tokens';
        teamsHere.forEach(team => {
          const token=document.createElement('div');
          token.className=`token ${team.cssClass}`;
          token.textContent=team.shortLabel;
          token.title=team.name;
          tokens.appendChild(token);
        });
        tile.appendChild(tokens);
      }

      boardEl.appendChild(tile);
    }
  }
}

function renderTeams(){
  teamList.innerHTML='';
  state.teams.forEach((team, idx) => {
    const card=document.createElement('div');
    card.className='team-card' + (idx===state.currentTeamIndex ? ' active' : '');
    card.innerHTML = `
      <div class="team-head">
        <div class="team-title">
          <div class="team-icon ${team.cssClass}">${team.shortLabel}</div>
          <div>${team.name}</div>
        </div>
        <div class="subtle">${idx===state.currentTeamIndex ? 'Torn actual' : 'En espera'}</div>
      </div>

      <div class="team-meta">
        <div class="mini"><div class="m-k">📍 Posició</div><div class="m-v">${team.pos}/${PATH.length-1}</div></div>
        <div class="mini"><div class="m-k">⭐ Punts</div><div class="m-v">${team.score}</div></div>
        <div class="mini"><div class="m-k">🏆 Falques</div><div class="m-v">${team.wedges.length}/6</div></div>
        <div class="mini"><div class="m-k">🔥 Ratxa</div><div class="m-v">${team.streak}</div></div>
      </div>

      <div class="wedges">
        ${CATEGORIES.map(cat => `<div class="wedge ${team.wedges.includes(cat.id) ? 'obtinguda' : ''}" title="${cat.label}: ${team.correctByCat[cat.id]} encerts / ${team.attemptsByCat[cat.id]} intents">${team.wedges.includes(cat.id) ? '✅' : cat.icon}</div>`).join('')}
      </div>

      <div class="cat-progress">
        ${CATEGORIES.map(cat => `<div class="prog"><span>${cat.icon} ${cat.label}</span><strong>${team.correctByCat[cat.id]}/${team.attemptsByCat[cat.id]}</strong></div>`).join('')}
      </div>
    `;
    teamList.appendChild(card);
  });
}

function refreshUI(){
  renderBoard();
  renderTeams();
  const current=getCurrentTeam();
  turnLabel.textContent=`Torn de ${current ? current.name : '—'}`;
  uiLastRoll.textContent = state.lastRoll ?? '—';
  uiDifficulty.textContent = getDifficultyLabel();
  uiBankSize.textContent = `${totalQuestionCount()} Q`;
  btnRoll.disabled = !state.canRoll || state.questionOpen || state.ended;
  document.body.classList.toggle('projector', state.config.mode==='projector');
}

function setMode(mode){
  state.config.mode=mode;
  modeSolo.classList.toggle('active', mode==='solo');
  modeTeams.classList.toggle('active', mode==='teams');
  modeProjector.classList.toggle('active', mode==='projector');
  team2Field.classList.toggle('hidden', mode==='solo');
}

function buildTeamsFromConfig(){
  const t1=(team1Input.value || 'Equip Verd').trim() || 'Equip Verd';
  const t2=(team2Input.value || 'Equip Blau').trim() || 'Equip Blau';
  return state.config.mode==='solo'
    ? [createTeam(t1,'team1','J')]
    : [createTeam(t1,'team1','A'), createTeam(t2,'team2','B')];
}

function saveLastConfig(){
  localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify({
    mode:state.config.mode,
    difficulty:state.config.difficulty,
    questionSeconds:state.config.questionSeconds,
    team1:team1Input.value,
    team2:team2Input.value
  }));
}

function loadLastConfig(){
  try{
    const saved=JSON.parse(localStorage.getItem(CONFIG_STORAGE_KEY) || 'null');
    if(!saved) return;
    setMode(saved.mode || 'solo');
    difficultySelect.value=saved.difficulty || 'medium';
    timerSelect.value=String(saved.questionSeconds ?? 20);
    team1Input.value=saved.team1 || 'Equip Verd';
    team2Input.value=saved.team2 || 'Equip Blau';
  } catch(err){ console.warn(err); }
}

function applyConfigFromUI(){
  state.config.difficulty = difficultySelect.value;
  state.config.questionSeconds = Number(timerSelect.value || 0);
}

function startGameTimer(){
  if(state.gameTimerInterval) return;
  state.gameTimerStart=Date.now();
  state.gameTimerInterval=setInterval(() => {
    uiGameTime.textContent = formatTemps((Date.now()-state.gameTimerStart)/1000);
  }, 250);
}

function startGame(){
  applyConfigFromUI();
  state.started=true;
  state.ended=false;
  state.canRoll=true;
  state.questionOpen=false;
  state.currentTeamIndex=0;
  state.lastRoll=null;
  state.currentQuestion=null;
  state.currentCategoryId=null;
  state.currentSpecial=null;
  state.currentTeamRef=null;
  state.currentPresentedOptions=[];
  stopGameTimer();
  stopQuestionTimer();
  resetQuestionUsage();
  uiGameTime.textContent='00:00';
  diceEl.textContent='🎲';
  state.teams = buildTeamsFromConfig();

  startScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  gameScreen.classList.remove('hidden');

  refreshUI();
  setStatus(`🎮 Partida preparada. <strong>${state.teams[0].name}</strong>, prem <strong>“Llençar dau”</strong> per començar.`);
  saveLastConfig();
}

function backToStart(){
  stopGameTimer();
  stopQuestionTimer();
  state.started=false;
  state.ended=false;
  state.canRoll=false;
  state.questionOpen=false;
  state.currentQuestion=null;
  state.currentPresentedOptions=[];
  questionOverlay.classList.remove('visible');
  helpCenterOverlay.classList.remove('visible');

  gameScreen.classList.add('hidden');
  endScreen.classList.add('hidden');
  startScreen.classList.remove('hidden');
  document.body.classList.remove('projector');
}

function getStrongWeak(team){
  const scores=CATEGORIES.map(cat => {
    const attempts=team.attemptsByCat[cat.id];
    const correct=team.correctByCat[cat.id];
    const ratio=attempts ? correct/attempts : 0;
    return { label:cat.label, icon:cat.icon, ratio, correct };
  });
  const sorted=[...scores].sort((a,b) => b.ratio-a.ratio || b.correct-a.correct);
  return { strong:sorted[0], weak:sorted[sorted.length-1] };
}

function buildTeacherSummary(){
  const attempts=state.teams.reduce((sum,t)=>sum+t.answered,0);
  const correct=state.teams.reduce((sum,t)=>sum+t.correct,0);
  const ratio=attempts ? Math.round((correct/attempts)*100) : 0;

  if(ratio>=80) return `Rendiment excel·lent: ${ratio}% d’encert global. Bon moment per obrir debat aplicat al territori.`;
  if(ratio>=60) return `Bon equilibri entre encert i repte: ${ratio}% d’encert global. Recomanable revisar categories amb menys seguretat.`;
  return `La partida ha funcionat com a diagnosi inicial: ${ratio}% d’encert global. Recomanació: reprendre les categories amb menys encert.`;
}

function endGame(winner){
  state.ended=true;
  state.canRoll=false;
  state.questionOpen=false;
  stopGameTimer();
  stopQuestionTimer();
  questionOverlay.classList.remove('visible');
  helpCenterOverlay.classList.remove('visible');

  gameScreen.classList.add('hidden');
  endScreen.classList.remove('hidden');

  finalTime.textContent=uiGameTime.textContent;
  finalMode.textContent=getModeLabel();
  finalDifficulty.textContent=getDifficultyLabel();
  finalBank.textContent=`${totalQuestionCount()} preguntes`;
  teacherSummary.textContent=buildTeacherSummary();

  winnerText.innerHTML=`<strong>${winner.name}</strong> guanya amb ${winner.score} punts, ${winner.wedges.length} falques i arribant a la meta.`;

  teamsSummary.innerHTML=state.teams.map(team => {
    const sw=getStrongWeak(team);
    return `
      <div class="summary-team">
        <div class="summary-line"><strong>${team.name}</strong><strong>${team.score} punts</strong></div>
        <div class="summary-line"><span>Falques</span><span>${team.wedges.length}/6</span></div>
        <div class="summary-line"><span>Encerts / intents</span><span>${team.correct}/${team.answered}</span></div>
        <div class="summary-line"><span>Millor ratxa</span><span>${team.maxStreak}</span></div>
        <div class="summary-line"><span>Categoria forta</span><span>${sw.strong.icon} ${sw.strong.label}</span></div>
        <div class="summary-line"><span>Categoria a reforçar</span><span>${sw.weak.icon} ${sw.weak.label}</span></div>
      </div>
    `;
  }).join('');
}

async function animateDice(){
  diceEl.classList.add('rolling');
  for(let i=0;i<12;i++){
    const v=Math.floor(Math.random()*6)+1;
    diceEl.textContent=DICE[v-1];
    await sleep(68);
  }
  diceEl.classList.remove('rolling');
}

async function rollDice(){
  if(!state.canRoll || state.questionOpen || state.ended) return;
  state.canRoll=false;
  btnRoll.disabled=true;

  if(!state.gameTimerInterval) startGameTimer();

  await animateDice();

  const roll=Math.floor(Math.random()*6)+1;
  state.lastRoll=roll;
  diceEl.textContent=DICE[roll-1];
  vibrar(35);

  const team=getCurrentTeam();
  setStatus(`🎲 <strong>${team.name}</strong> ha tret un <strong>${roll}</strong>.`);
  await moveTeam(team, roll);
  refreshUI();
}

async function moveTeam(team, steps){
  const start=team.pos;
  const dest=calcDestination(start, steps);

  if(dest>=start){
    for(let i=start+1;i<=dest;i++){
      team.pos=i;
      renderBoard();
      renderTeams();
      await sleep(140);
    }
  } else {
    for(let i=start+1;i<=PATH.length-1;i++){
      team.pos=i;
      renderBoard();
      renderTeams();
      await sleep(140);
    }
    for(let i=PATH.length-2;i>=dest;i--){
      team.pos=i;
      renderBoard();
      renderTeams();
      await sleep(140);
    }
  }

  team.pos=dest;
  renderBoard();

  if(team.pos===PATH.length-1){
    if(team.wedges.length===CATEGORIES.length){
      endGame(team);
      return;
    }
    setStatus(`⭐ <strong>${team.name}</strong> ha arribat al centre, però encara no té totes les falques. Retrocedeix una casella i continua.`);
    await sleep(650);
    team.pos=PATH.length-2;
    refreshUI();
  }

  const cat=getCategoriaPerPosicio(team.pos);
  if(!cat){ passTurn(); return; }

  openQuestion(team, cat.id, SPECIALS[team.pos] || null);
}

function passTurn(forceSameTeam=false){
  if(state.ended) return;
  if(!forceSameTeam && state.teams.length>1) state.currentTeamIndex=(state.currentTeamIndex+1)%state.teams.length;
  state.canRoll=true;
  refreshUI();
  setStatus(`👉 Torn de <strong>${getCurrentTeam().name}</strong>. Llença el dau per continuar.`);
}

function startQuestionTimer(){
  stopQuestionTimer();

  if(state.config.questionSeconds<=0){
    timerBar.style.display='none';
    modalTimerInfo.textContent='⏳ sense límit';
    return;
  }

  state.questionTimeLeft = state.config.questionSeconds;
  timerBar.style.display='block';
  timerFill.style.width='100%';
  modalTimerInfo.textContent=`⏳ ${state.questionTimeLeft}s`;

  state.questionTimerInterval=setInterval(() => {
    state.questionTimeLeft--;
    timerFill.style.width=`${Math.max(0,(state.questionTimeLeft/state.config.questionSeconds)*100)}%`;
    modalTimerInfo.textContent=`⏳ ${Math.max(0,state.questionTimeLeft)}s`;

    if(state.questionTimeLeft<=0){
      stopQuestionTimer();
      answerQuestion(-1,true);
    }
  }, 1000);
}

function difficultyPenalty(){
  return state.config.difficulty==='basic' ? 2 : state.config.difficulty==='advanced' ? 6 : 5;
}

function awardWedgeIfNeeded(team, catId){
  if(team.wedges.includes(catId)) return { awarded:false, text:'Ja tenies aquesta falca.' };

  if(state.config.difficulty==='basic'){
    team.wedges.push(catId);
    return { awarded:true, text:'Has guanyat la falca amb 1 encert en aquesta categoria.' };
  }

  if(state.config.difficulty==='medium'){
    if(team.correctByCat[catId] >= 2){
      team.wedges.push(catId);
      return { awarded:true, text:'Has guanyat la falca després de 2 encerts en aquesta categoria.' };
    }
    return { awarded:false, text:`Progrés de falca: ${team.correctByCat[catId]}/2 encerts.` };
  }

  if(state.currentSpecial && state.currentSpecial.type==='wedge'){
    team.wedges.push(catId);
    return { awarded:true, text:'Has guanyat la falca perquè has encertat en una casella W.' };
  }

  return { awarded:false, text:'En nivell avançat, la falca només s’obté encertant en una casella W.' };
}

function openQuestion(team, catId, special){
  const q=getQuestion(catId);
  if(!q){
    setStatus('No hi ha preguntes disponibles en aquesta categoria.');
    passTurn();
    return;
  }

  const cat=CATEGORIES.find(c => c.id===catId);
  state.currentQuestion=q;
  state.currentCategoryId=catId;
  state.currentSpecial=special;
  state.currentTeamRef=team;
  state.questionOpen=true;

  categoryTag.textContent=`${cat.icon} ${cat.label}`;
  categoryTag.style.background=cat.tagBg;
  categoryTag.style.color=cat.tagColor;
  modalTurnInfo.textContent=`Torn de ${team.name}`;
  modalSpecialInfo.textContent=special ? special.text : 'Casella normal';
  modalTimerInfo.textContent=state.config.questionSeconds>0 ? `⏳ ${state.config.questionSeconds}s` : '⏳ sense límit';
  questionText.textContent=q.pregunta;

  const presentedOptions = shuffleArray(q.opcions);
  state.currentPresentedOptions = presentedOptions;

  answersBox.innerHTML='';
  feedbackBox.classList.remove('show');
  btnContinue.style.display='none';

  presentedOptions.forEach((opt, idx) => {
    const btn=document.createElement('button');
    btn.className='answer';
    btn.dataset.optionId = opt.id;
    btn.innerHTML=`<strong>${idx+1}.</strong> ${opt.text}`;
    btn.addEventListener('click', () => answerQuestion(opt.id));
    answersBox.appendChild(btn);
  });

  questionOverlay.classList.add('visible');
  setStatus(`❓ <strong>${team.name}</strong> respon una pregunta de <strong>${cat.label}</strong>.`);
  startQuestionTimer();
}

function answerQuestion(selectedOptionId, timeout=false){
  if(!state.currentQuestion || !state.currentTeamRef) return;

  const q=state.currentQuestion;
  const team=state.currentTeamRef;
  const catId=state.currentCategoryId;

  const buttons=[...document.querySelectorAll('.answer')];
  if(buttons[0]?.disabled) return;

  stopQuestionTimer();
  buttons.forEach(btn => btn.disabled=true);

  team.answered++;
  team.attemptsByCat[catId]++;

  const correctOptionId = q.correctOptionId;
  const isCorrect = !timeout && selectedOptionId === correctOptionId;

  buttons.forEach(btn => {
    if(btn.dataset.optionId === correctOptionId) btn.classList.add('correcte');
    if(!timeout && btn.dataset.optionId === String(selectedOptionId) && selectedOptionId !== correctOptionId){
      btn.classList.add('incorrecte');
    }
  });

  if(timeout) buttons.forEach(btn => btn.classList.add('timeout'));

  let forceSameTeam=false;

  if(isCorrect){
    team.correct++;
    team.streak++;
    team.maxStreak=Math.max(team.maxStreak, team.streak);
    team.correctByCat[catId]++;

    let points=10;
    const extras=[];

    if(team.streak>0 && team.streak%3===0){ points+=5; extras.push('Bonus de ratxa +5'); }
    if(state.currentSpecial?.type==='bonus'){ points+=5; extras.push('Casella bonus +5'); }
    if(state.currentSpecial?.type==='challenge'){ points+=5; extras.push('Repte docent +5'); }
    if(state.currentSpecial?.type==='again'){ forceSameTeam=true; extras.push('Mantens el torn'); }

    team.score += points;
    const wedgeResult=awardWedgeIfNeeded(team, catId);

    feedbackTitle.textContent='✅ Correcte!';
    feedbackText.innerHTML=`${q.explicacio}<br><br><strong>+${points} punts.</strong> ${wedgeResult.text}${extras.length ? '<br><strong>' + extras.join(' · ') + '</strong>' : ''}`;
    setStatus(`✅ <strong>${team.name}</strong> encerta. +${points} punts. ${wedgeResult.text}`);
    vibrar(32);
  } else {
    team.streak=0;
    const penalty=difficultyPenalty();
    team.score=Math.max(0, team.score-penalty);

    const correctText = q.opcions.find(o => o.id === correctOptionId)?.text || '—';
    feedbackTitle.textContent=timeout ? '⏰ Temps esgotat' : '❌ No és correcte';
    feedbackText.innerHTML=`${q.explicacio}<br><br><strong>La resposta correcta era:</strong> ${correctText}.<br><strong>- ${penalty} punts.</strong>`;
    setStatus(timeout
      ? `⏰ <strong>${team.name}</strong> s’ha quedat sense temps. Perd ${penalty} punts i rep l’explicació.`
      : `❌ <strong>${team.name}</strong> ha fallat. Perd ${penalty} punts però rep l’explicació correcta.`
    );
    vibrar([20,40,20]);
  }

  renderTeams();
  feedbackBox.classList.add('show');
  btnContinue.style.display='inline-block';
  btnContinue.dataset.sameTeam=forceSameTeam ? '1' : '0';
  btnContinue.focus();
}

function continueAfterQuestion(){
  questionOverlay.classList.remove('visible');
  state.questionOpen=false;
  stopQuestionTimer();

  const sameTeam=btnContinue.dataset.sameTeam==='1';
  const team=state.currentTeamRef;

  state.currentQuestion=null;
  state.currentCategoryId=null;
  state.currentSpecial=null;
  state.currentTeamRef=null;
  state.currentPresentedOptions=[];
  btnContinue.style.display='none';
  btnContinue.dataset.sameTeam='0';

  refreshUI();

  if(team && teamHasWon(team)){
    endGame(team);
    return;
  }

  state.canRoll=true;
  if(!sameTeam && state.teams.length>1) state.currentTeamIndex=(state.currentTeamIndex+1)%state.teams.length;
  refreshUI();

  setStatus(sameTeam
    ? `🔁 <strong>${getCurrentTeam().name}</strong> manté el torn gràcies a la casella ↺.`
    : `👉 Torn de <strong>${getCurrentTeam().name}</strong>. Pots continuar la partida.`
  );
}

function renderCategoryTabs(){
  categoryTabs.innerHTML='';
  editorCategory.innerHTML='';

  CATEGORIES.forEach(cat => {
    const tab=document.createElement('button');
    tab.className='cat-tab' + (state.editor.activeCategory===cat.id ? ' active' : '');
    tab.textContent=`${cat.icon} ${cat.label}`;
    tab.addEventListener('click', () => {
      state.editor.activeCategory = cat.id;
      state.editor.selectedQuestionId = null;
      renderEditor();
      startNewQuestion(cat.id);
    });
    categoryTabs.appendChild(tab);

    const opt=document.createElement('option');
    opt.value=cat.id;
    opt.textContent=`${cat.icon} ${cat.label}`;
    editorCategory.appendChild(opt);
  });
}

function escapeHtml(str){
  return String(str || '').replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
}

function questionPreview(catId, q){
  const correctIndex = q.opcions.findIndex(o => o.id === q.correctOptionId);
  return `
    <div class="q-card ${state.editor.activeCategory===catId && state.editor.selectedQuestionId===q.id ? 'active' : ''}" data-qid="${q.id}">
      <div class="q-title">${escapeHtml(q.pregunta)}</div>
      <div class="q-meta">Correcta: opció ${correctIndex + 1} · ${q.explicacio ? 'amb explicació' : 'sense explicació'}</div>
    </div>
  `;
}

function renderQuestionList(){
  const cat = state.editor.activeCategory;
  const arr = [...(questionBank[cat] || [])].sort(compareQuestionsStable);

  questionList.innerHTML = arr.length
    ? arr.map(q => questionPreview(cat, q)).join('')
    : '<div class="status-line">Encara no hi ha preguntes en aquesta categoria.</div>';

  const catObj=CATEGORIES.find(c => c.id===cat);
  editorCount.textContent = `${catObj.icon} ${catObj.label} · ${arr.length} preguntes`;

  [...questionList.querySelectorAll('.q-card')].forEach(el => {
    el.addEventListener('click', () => loadQuestionIntoForm(el.dataset.qid));
  });
}

function startNewQuestion(category=state.editor.activeCategory){
  state.editor.selectedQuestionId=null;
  state.editor.activeCategory = category;
  editorCategory.value=category;
  editorCorrect.value='0';
  editorQuestion.value='';
  editorOption1.value='';
  editorOption2.value='';
  editorOption3.value='';
  editorOption4.value='';
  editorExplanation.value='';
  editorStatus.textContent='Mode nova pregunta. Omple els camps i desa.';
  btnDeleteQuestion.disabled=true;
  btnDuplicateQuestion.disabled=true;
}

function loadQuestionIntoForm(questionId){
  const cat=state.editor.activeCategory;
  const q=getQuestionById(cat, questionId);
  if(!q) return;

  state.editor.selectedQuestionId=q.id;
  editorCategory.value=q.categoria;
  editorQuestion.value=q.pregunta;
  editorOption1.value=q.opcions[0]?.text || '';
  editorOption2.value=q.opcions[1]?.text || '';
  editorOption3.value=q.opcions[2]?.text || '';
  editorOption4.value=q.opcions[3]?.text || '';
  editorExplanation.value=q.explicacio || '';
  editorCorrect.value=String(Math.max(0, q.opcions.findIndex(o => o.id === q.correctOptionId)));
  editorStatus.textContent=`Editant la pregunta de la categoria ${cat}.`; 
  btnDeleteQuestion.disabled=false;
  btnDuplicateQuestion.disabled=false;
  renderQuestionList();
}

function saveQuestionFromForm(){
  try{
    const categoria = editorCategory.value;
    const pregunta = editorQuestion.value.trim();
    const explicacio = editorExplanation.value.trim();
    const correctIndex = Number(editorCorrect.value);

    if(!CATEGORY_IDS.includes(categoria)) throw new Error('Categoria no vàlida');
    if(!pregunta) throw new Error('Falta la pregunta');

    const texts = [
      editorOption1.value.trim(),
      editorOption2.value.trim(),
      editorOption3.value.trim(),
      editorOption4.value.trim()
    ];

    const missingOptions = texts.map((t, i) => !t ? i + 1 : null).filter(Boolean);
    if(missingOptions.length) throw new Error(`Falten opcions: ${missingOptions.join(', ')}`);
    if(![0,1,2,3].includes(correctIndex)) throw new Error('Resposta correcta invàlida');

    let existing = null;
    let oldCat = null;
    if(state.editor.selectedQuestionId){
      oldCat = state.editor.activeCategory;
      existing = getQuestionById(oldCat, state.editor.selectedQuestionId);
    }

    const optionIds = existing?.opcions?.map(o => o.id) || [uid('opt'), uid('opt'), uid('opt'), uid('opt')];
    const opcions = texts.map((text, i) => makeOption(text, optionIds[i]));
    const correctOptionId = opcions[correctIndex].id;

    const targetOrder = existing && categoria === oldCat ? existing.order : nextOrderForCategory(categoria);
    const createdAt = existing?.createdAt || nowIso();

    const question = makeQuestion({
      id: existing?.id || null,
      categoria,
      pregunta,
      opcions,
      correctOptionId,
      explicacio,
      order: targetOrder,
      createdAt,
      updatedAt: nowIso()
    });

    if(existing && oldCat){
      const oldIndex = getQuestionIndexById(oldCat, existing.id);
      if(oldIndex !== -1) questionBank[oldCat].splice(oldIndex, 1);
    }

    questionBank[categoria] ||= [];
    questionBank[categoria].push(question);
    sortCategory(categoria);
    if(existing && oldCat && oldCat !== categoria) sortCategory(oldCat);

    editorStatus.textContent = existing
      ? (oldCat !== categoria ? 'Canvis desats i pregunta moguda de categoria.' : 'Canvis desats correctament.')
      : 'Pregunta nova desada correctament.';

    state.editor.activeCategory = categoria;
    state.editor.selectedQuestionId = question.id;

    persistBank();
    updateBankStatus('custom');
    renderEditor();
    loadQuestionIntoForm(question.id);
  } catch(err){
    alert(`No s'ha pogut desar la pregunta.\n\n${err.message}`);
  }
}

function duplicateQuestion(){
  const cat=state.editor.activeCategory;
  const qid=state.editor.selectedQuestionId;
  if(!qid) return;

  const original=getQuestionById(cat, qid);
  if(!original) return;

  const originalCorrectIndex = original.opcions.findIndex(o => o.id === original.correctOptionId);
  const clone=makeQuestion({
    categoria:cat,
    pregunta:original.pregunta + ' (còpia)',
    opcions:original.opcions.map(opt => makeOption(opt.text)),
    explicacio:original.explicacio,
    order: nextOrderForCategory(cat),
    createdAt: nowIso(),
    updatedAt: nowIso()
  });
  clone.correctOptionId = clone.opcions[originalCorrectIndex].id;

  questionBank[cat].push(clone);
  sortCategory(cat);

  persistBank();
  updateBankStatus('custom');
  renderEditor();
  loadQuestionIntoForm(clone.id);
  editorStatus.textContent='Pregunta duplicada.';
}

function deleteQuestion(){
  const cat = state.editor.activeCategory;
  const qid = state.editor.selectedQuestionId;
  if(!qid) return;

  const totalBefore = totalQuestionCount();
  if(totalBefore <= 6){
    alert('No pots deixar el banc amb menys de 6 preguntes totals.');
    return;
  }

  if((questionBank[cat]?.length || 0) <= 1){
    alert(`No pots eliminar l’última pregunta de la categoria "${cat}".`);
    return;
  }

  if(!confirm('Vols eliminar aquesta pregunta?')) return;

  const idx = getQuestionIndexById(cat, qid);
  if(idx !== -1) questionBank[cat].splice(idx, 1);
  sortCategory(cat);

  persistBank();
  updateBankStatus('custom');
  renderEditor();
  startNewQuestion(cat);
  editorStatus.textContent = 'Pregunta eliminada.';
}

function renderEditor(){
  renderCategoryTabs();
  renderQuestionList();
  const current = state.editor.selectedQuestionId
    ? getQuestionById(state.editor.activeCategory, state.editor.selectedQuestionId)
    : null;
  if(!current) startNewQuestion(state.editor.activeCategory);
}

function openEditor(){
  renderEditor();
  editorOverlay.classList.add('visible');
}

function closeEditor(){
  editorOverlay.classList.remove('visible');
}

function switchHelpTab(tab='play'){
  const play = tab === 'play';
  tabPlayHelp.classList.toggle('active', play);
  tabEditHelp.classList.toggle('active', !play);
  playHelpPanel.classList.toggle('active', play);
  editHelpPanel.classList.toggle('active', !play);
}

function openHelpCenter(tab='play'){
  switchHelpTab(tab);
  helpCenterOverlay.classList.add('visible');
}

function closeHelpCenter(){
  helpCenterOverlay.classList.remove('visible');
}

modeSolo.addEventListener('click', () => setMode('solo'));
modeTeams.addEventListener('click', () => setMode('teams'));
modeProjector.addEventListener('click', () => setMode('projector'));

btnStart.addEventListener('click', startGame);
btnRoll.addEventListener('click', rollDice);
btnHome.addEventListener('click', backToStart);
btnContinue.addEventListener('click', continueAfterQuestion);
btnRestartSame.addEventListener('click', startGame);
btnBackStart.addEventListener('click', backToStart);

btnOpenEditor.addEventListener('click', openEditor);
btnCloseEditor.addEventListener('click', closeEditor);
btnOpenEditHelpFromEditor.addEventListener('click', () => openHelpCenter('edit'));
btnNewQuestion.addEventListener('click', () => startNewQuestion(state.editor.activeCategory));
btnSaveQuestion.addEventListener('click', saveQuestionFromForm);
btnDuplicateQuestion.addEventListener('click', duplicateQuestion);
btnDeleteQuestion.addEventListener('click', deleteQuestion);

btnHelpStart.addEventListener('click', () => openHelpCenter('play'));
btnHelpGame.addEventListener('click', () => openHelpCenter('play'));
btnEditHelp.addEventListener('click', () => openHelpCenter('edit'));

btnCloseHelpCenter.addEventListener('click', closeHelpCenter);
btnHelpCenterOk.addEventListener('click', closeHelpCenter);
tabPlayHelp.addEventListener('click', () => switchHelpTab('play'));
tabEditHelp.addEventListener('click', () => switchHelpTab('edit'));

btnImport.addEventListener('click', () => questionFile.click());
questionFile.addEventListener('change', importQuestions);
btnResetBank.addEventListener('click', resetQuestionBankToDefault);

btnExportJson.addEventListener('click', () => downloadTextFile(
  'ecotrivial_preguntes.json',
  JSON.stringify(serializeBank(questionBank), null, 2),
  'application/json;charset=utf-8'
));
btnExportCsv.addEventListener('click', () => downloadTextFile('ecotrivial_preguntes.csv', bankToCSV(), 'text/csv;charset=utf-8'));
btnTemplateCsv.addEventListener('click', () => downloadTextFile('plantilla_preguntes_ecotrivial.csv', createTemplateCSV(), 'text/csv;charset=utf-8'));
btnTemplateJson.addEventListener('click', () => downloadTextFile('plantilla_preguntes_ecotrivial.json', createTemplateJSON(), 'application/json;charset=utf-8'));
btnEditorExportJson.addEventListener('click', () => downloadTextFile(
  'ecotrivial_preguntes.json',
  JSON.stringify(serializeBank(questionBank), null, 2),
  'application/json;charset=utf-8'
));
btnEditorExportCsv.addEventListener('click', () => downloadTextFile('ecotrivial_preguntes.csv', bankToCSV(), 'text/csv;charset=utf-8'));

editorCategory.addEventListener('change', () => {
  if(state.editor.selectedQuestionId === null){
    state.editor.activeCategory = editorCategory.value;
    renderEditor();
    startNewQuestion(editorCategory.value);
  }
});

questionOverlay.addEventListener('click', (e) => {
  if(e.target===questionOverlay && btnContinue.style.display!=='none') continueAfterQuestion();
});

editorOverlay.addEventListener('click', (e) => {
  if(e.target===editorOverlay) closeEditor();
});

helpCenterOverlay.addEventListener('click', (e) => {
  if(e.target===helpCenterOverlay) closeHelpCenter();
});

document.addEventListener('keydown', (e) => {
  if(e.key==='Escape'){
    if(editorOverlay.classList.contains('visible')) closeEditor();
    if(helpCenterOverlay.classList.contains('visible')) closeHelpCenter();
    return;
  }

  if(gameScreen.classList.contains('hidden')) return;

  if((e.key===' ' || e.key==='Enter') && !state.questionOpen && !editorOverlay.classList.contains('visible') && !helpCenterOverlay.classList.contains('visible')){
    e.preventDefault();
    rollDice();
    return;
  }

  if(state.questionOpen){
    const map={ '1':0, '2':1, '3':2, '4':3 };
    if(Object.prototype.hasOwnProperty.call(map, e.key)){
      e.preventDefault();
      const idx = map[e.key];
      const opt = state.currentPresentedOptions?.[idx];
      if(opt) answerQuestion(opt.id);
    }
    if((e.key===' ' || e.key==='Enter') && btnContinue.style.display!=='none'){
      e.preventDefault();
      continueAfterQuestion();
    }
  }
});

setMode('solo');
loadLastConfig();
loadQuestionBank();
sortAllCategories();
renderEditor();

if(!localStorage.getItem(HELP_SEEN_KEY)){
  setTimeout(() => {
    openHelpCenter('play');
    localStorage.setItem(HELP_SEEN_KEY, '1');
  }, 500);
}










