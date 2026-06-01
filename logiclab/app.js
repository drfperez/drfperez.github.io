(function() {
    const svgNS = "http://www.w3.org/2000/svg";
    let components = [];
    let connections = [];
    let nextId = 0;
    let wiring = false;
    let startPoint = null;
    let simulating = false;

    const svg = document.getElementById('canvas');
    const wireBtn = document.getElementById('wireBtn');
    const simBtn = document.getElementById('simBtn');
    const statusSpan = document.getElementById('status');

    let historyStack = [];
    let historyIndex = -1;
    const MAX_HISTORY = 60;

    const specRows = 16;
    const specVarNames = ['a', 'b', 'c', 'd'];
    let specFValues = new Array(specRows).fill(0);
    const specTbody = document.getElementById('specTableBody');
    const sopSpan = document.getElementById('sopExpr');
    const posSpan = document.getElementById('posExpr');
    const simpsopSpan = document.getElementById('simpsopExpr');
    const simpposSpan = document.getElementById('simpposExpr');
    window.currentSimpSOP = [];

    const kmapBody = document.getElementById('kmapBody');
    const kmapGray = [0, 1, 3, 2];

    function getDefaultLang() {
        const saved = localStorage.getItem('logiclab_lang');
        if (saved && ['ca', 'es', 'en'].includes(saved)) return saved;

        const nav = (navigator.language || 'en').toLowerCase();
        if (nav.startsWith('ca')) return 'ca';
        if (nav.startsWith('es')) return 'es';
        return 'en';
    }

    let currentLang = getDefaultLang();

    const translations = {
        ca: {
            pageTitle: 'LogicLab · Laboratori de Portes Lògiques',
            appTitle: '⚡ LogicLab: Laboratori de Portes Lògiques',
            truthTableTitle: '⚡ Taula de veritat de 4 variables',
            truthTableSubtitle: 'a b c d fixes · f commuta (0/1/X)',
            randomF: 'f aleatori',
            resetAllZero: 'Tot f = 0',
            buildFromSOP: 'Construeix des de SOP',
            kmapTitle: '📊 Mapa de Karnaugh interactiu (ab ↓  cd →)',
            kmapHint: '👆 Fes clic a qualsevol cel·la per alternar 0 → 1 → X • Sincronització en viu amb la taula de veritat',
            canonicalSOP: '🔹 SOP canònica (minterms)',
            canonicalPOS: '🔸 POS canònica (maxterms)',
            simplifiedSOP: '✨ SOP simplificada',
            simplifiedPOS: '✨ POS simplificada',
            cycleHint: '⚡ fes clic a qualsevol f o cel·la del K-map per alternar: 0 → 1 → X',

            addAND: 'AND',
            addOR: 'OR',
            addNOT: 'NOT',
            addInput: 'Entrada',
            addOutput: 'Sortida',
            wire: 'Cableja',
            stopWire: 'Atura cablejat',
            simulate: 'Simula',
            stopSim: 'Atura simulació',
            save: 'Desa',
            load: 'Carrega',
            undo: 'Desfés',
            redo: 'Refés',

            ready: '⚡ llest',
            wiringMode: '🔌 mode cablejat',
            selectInputPort: '📍 selecciona un port d’entrada',
            simulationOn: '⚡ simulació ACTIVADA',
            nothingUndo: '⚡ no hi ha res per desfer',
            nothingRedo: '⚡ no hi ha res per refer',
            saved: '✅ desat',
            loaded: '✅ carregat',

            fromLabel: '📍 des de {name} • {port}',
            newLabelPrompt: 'Etiqueta nova:',
            deleteComponentConfirm: 'Vols eliminar aquest component?',
            wireStartOutputAlert: 'El cable ha de començar en un port de SORTIDA.',
            wireEndInputAlert: 'El cable ha d’acabar en un port d’ENTRADA.',
            wireSameComponentAlert: 'No es pot connectar al mateix component.',
            invalidFile: 'Fitxer no vàlid',

            helpTitle: 'Com utilitzar LogicLab – Laboratori de Portes Lògiques',
            helpP1: '<strong>1. Defineix la teva funció</strong><br>Fes clic a les cel·les de la taula de veritat o del mapa de Karnaugh per establir f = 0 / 1 / X. Les expressions s’actualitzen a l’instant.',
            helpP2: '<strong>2. Mapa de Karnaugh</strong><br>Eina visual per simplificar: fes clic a les cel·les i observa com canvien SOP i POS en temps real.',
            helpP3: '<strong>3. Construeix el circuit</strong><br>Fes clic a “Construeix des de SOP” i es crearà automàticament un circuit net de dos nivells a partir de la SOP simplificada.',
            helpP4: '<strong>4. Simula i edita</strong><br>Afegeix portes, cableja (sortida → entrada) i activa la simulació. Fes clic dret sobre qualsevol component per eliminar-lo.',
            helpP5: '<strong>5. Desa / Carrega</strong><br>Utilitza els botons de la barra per desar el circuit en un fitxer JSON o carregar-ne un de desat prèviament. Desfés/Refés funciona tant al circuit com a la taula de veritat.',
            helpFooter: 'Perfecte per aprendre àlgebra de Boole, mapes de Karnaugh i disseny a nivell de portes. Que en gaudeixis!',
            helpAria: 'Ajuda'
        },

        es: {
            pageTitle: 'LogicLab · Laboratorio de Puertas Lógicas',
            appTitle: '⚡ LogicLab: Laboratorio de Puertas Lógicas',
            truthTableTitle: '⚡ Tabla de verdad de 4 variables',
            truthTableSubtitle: 'a b c d fijas · f alterna (0/1/X)',
            randomF: 'f aleatoria',
            resetAllZero: 'Todo f = 0',
            buildFromSOP: 'Construir desde SOP',
            kmapTitle: '📊 Mapa de Karnaugh interactivo (ab ↓  cd →)',
            kmapHint: '👆 Haz clic en cualquier celda para alternar 0 → 1 → X • Sincronización en vivo con la tabla de verdad',
            canonicalSOP: '🔹 SOP canónica (minterms)',
            canonicalPOS: '🔸 POS canónica (maxterms)',
            simplifiedSOP: '✨ SOP simplificada',
            simplifiedPOS: '✨ POS simplificada',
            cycleHint: '⚡ haz clic en cualquier f o celda del K-map para alternar: 0 → 1 → X',

            addAND: 'AND',
            addOR: 'OR',
            addNOT: 'NOT',
            addInput: 'Entrada',
            addOutput: 'Salida',
            wire: 'Cablear',
            stopWire: 'Detener cableado',
            simulate: 'Simular',
            stopSim: 'Detener simulación',
            save: 'Guardar',
            load: 'Cargar',
            undo: 'Deshacer',
            redo: 'Rehacer',

            ready: '⚡ listo',
            wiringMode: '🔌 modo cableado',
            selectInputPort: '📍 selecciona un puerto de entrada',
            simulationOn: '⚡ simulación ACTIVADA',
            nothingUndo: '⚡ nada que deshacer',
            nothingRedo: '⚡ nada que rehacer',
            saved: '✅ guardado',
            loaded: '✅ cargado',

            fromLabel: '📍 desde {name} • {port}',
            newLabelPrompt: 'Nueva etiqueta:',
            deleteComponentConfirm: '¿Quieres eliminar este componente?',
            wireStartOutputAlert: 'El cable debe empezar desde un puerto de SALIDA.',
            wireEndInputAlert: 'El cable debe terminar en un puerto de ENTRADA.',
            wireSameComponentAlert: 'No se puede conectar al mismo componente.',
            invalidFile: 'Archivo no válido',

            helpTitle: 'Cómo usar LogicLab – Laboratorio de Puertas Lógicas',
            helpP1: '<strong>1. Define tu función</strong><br>Haz clic en las celdas de la tabla de verdad o del mapa de Karnaugh para establecer f = 0 / 1 / X. Las expresiones se actualizan al instante.',
            helpP2: '<strong>2. Mapa de Karnaugh</strong><br>Herramienta visual para simplificar: haz clic en las celdas y observa cómo cambian SOP y POS en tiempo real.',
            helpP3: '<strong>3. Construye el circuito</strong><br>Haz clic en “Construir desde SOP” y se creará automáticamente un circuito limpio de dos niveles a partir de la expresión SOP simplificada.',
            helpP4: '<strong>4. Simula y edita</strong><br>Añade puertas, cablea (salida → entrada) y activa la simulación. Haz clic derecho en cualquier componente para eliminarlo.',
            helpP5: '<strong>5. Guardar / Cargar</strong><br>Usa los botones de la barra para guardar tu circuito en un archivo JSON o cargar uno guardado previamente. Deshacer/Rehacer funciona tanto en el circuito como en la tabla de verdad.',
            helpFooter: 'Perfecto para aprender álgebra de Boole, mapas de Karnaugh y diseño a nivel de puertas. ¡Disfrútalo!',
            helpAria: 'Ayuda'
        },

        en: {
            pageTitle: 'LogicLab · Logic Gate Lab',
            appTitle: '⚡ LogicLab: Logic Gate Lab',
            truthTableTitle: '⚡ 4-variable truth table',
            truthTableSubtitle: 'a b c d fixed · f toggles (0/1/X)',
            randomF: 'Random f',
            resetAllZero: 'All f = 0',
            buildFromSOP: 'Build from SOP',
            kmapTitle: '📊 Interactive Karnaugh Map (ab ↓  cd →)',
            kmapHint: '👆 Click any cell to cycle 0 → 1 → X • Live sync with truth table',
            canonicalSOP: '🔹 Canonical SOP (Minterms)',
            canonicalPOS: '🔸 Canonical POS (Maxterms)',
            simplifiedSOP: '✨ Simplified SOP',
            simplifiedPOS: '✨ Simplified POS',
            cycleHint: '⚡ click any f or K-map cell to cycle: 0 → 1 → X',

            addAND: 'AND',
            addOR: 'OR',
            addNOT: 'NOT',
            addInput: 'Input',
            addOutput: 'Output',
            wire: 'Wire',
            stopWire: 'Stop Wire',
            simulate: 'Simulate',
            stopSim: 'Stop Sim',
            save: 'Save',
            load: 'Load',
            undo: 'Undo',
            redo: 'Redo',

            ready: '⚡ ready',
            wiringMode: '🔌 wiring mode',
            selectInputPort: '📍 select input port',
            simulationOn: '⚡ simulation ON',
            nothingUndo: '⚡ nothing to undo',
            nothingRedo: '⚡ nothing to redo',
            saved: '✅ saved',
            loaded: '✅ loaded',

            fromLabel: '📍 from {name} • {port}',
            newLabelPrompt: 'New label:',
            deleteComponentConfirm: 'Delete this component?',
            wireStartOutputAlert: 'Wire must start from an OUTPUT port.',
            wireEndInputAlert: 'Wire must end at an INPUT port.',
            wireSameComponentAlert: 'Cannot connect to same component.',
            invalidFile: 'Invalid file',

            helpTitle: 'How to use LogicLab – Logic Gate Lab',
            helpP1: '<strong>1. Define your function</strong><br>Click cells in the truth table or Karnaugh Map to set f = 0 / 1 / X. Expressions update instantly.',
            helpP2: '<strong>2. Karnaugh Map</strong><br>Visual tool for simplification – click cells, watch SOP and POS change live.',
            helpP3: '<strong>3. Build circuit</strong><br>Click “Build from SOP” – automatically creates a clean two-level circuit from the simplified SOP expression.',
            helpP4: '<strong>4. Simulate & edit</strong><br>Add gates, wire (output → input), toggle simulation. Right-click any component to delete.',
            helpP5: '<strong>5. Save / Load</strong><br>Use the toolbar buttons to save your circuit to a JSON file or load a previously saved one. Undo/Redo works on both circuit and truth table.',
            helpFooter: 'Perfect for learning Boolean algebra, K-maps, and gate-level design. Enjoy!',
            helpAria: 'Help'
        }
    };

    function t(key, vars = {}) {
        let str = (translations[currentLang] && translations[currentLang][key]) ||
                  (translations.en && translations.en[key]) ||
                  key;

        for (const [k, v] of Object.entries(vars)) {
            str = str.replaceAll(`{${k}}`, v);
        }
        return str;
    }

    function applyLanguage() {
        document.documentElement.lang = currentLang;
        document.title = t('pageTitle');

        document.getElementById('langSelect').value = currentLang;
        document.getElementById('appTitle').textContent = t('appTitle');
        document.getElementById('truthTableTitle').textContent = t('truthTableTitle');
        document.getElementById('truthTableSubtitle').textContent = t('truthTableSubtitle');
        document.getElementById('randomSpecBtn').textContent = `🎲 ${t('randomF')}`;
        document.getElementById('resetSpecBtn').textContent = `⏪ ${t('resetAllZero')}`;
        document.getElementById('buildCircuitBtn').textContent = `⚙️ ${t('buildFromSOP')}`;
        document.getElementById('kmapTitle').textContent = t('kmapTitle');
        document.getElementById('kmapHint').textContent = t('kmapHint');
        document.getElementById('canonicalSOPTitle').textContent = t('canonicalSOP');
        document.getElementById('canonicalPOSTitle').textContent = t('canonicalPOS');
        document.getElementById('simplifiedSOPTitle').textContent = t('simplifiedSOP');
        document.getElementById('simplifiedPOSTitle').textContent = t('simplifiedPOS');
        document.getElementById('cycleHint').textContent = t('cycleHint');

        document.getElementById('addAndBtn').textContent = `➕ ${t('addAND')}`;
        document.getElementById('addOrBtn').textContent = `➕ ${t('addOR')}`;
        document.getElementById('addNotBtn').textContent = `➕ ${t('addNOT')}`;
        document.getElementById('addInputBtn').textContent = `🔘 ${t('addInput')}`;
        document.getElementById('addOutputBtn').textContent = `🖍️ ${t('addOutput')}`;
        wireBtn.textContent = wiring ? `⛔ ${t('stopWire')}` : `🔌 ${t('wire')}`;
        simBtn.textContent = simulating ? `⏹️ ${t('stopSim')}` : `▶ ${t('simulate')}`;
        document.getElementById('saveBtn').textContent = `💾 ${t('save')}`;
        document.getElementById('loadBtn').textContent = `📂 ${t('load')}`;
        document.getElementById('undoBtn').textContent = `↩️ ${t('undo')}`;
        document.getElementById('redoBtn').textContent = `↪️ ${t('redo')}`;
        document.getElementById('helpButton').setAttribute('aria-label', t('helpAria'));

        document.getElementById('helpTitle').textContent = t('helpTitle');
        document.getElementById('helpP1').innerHTML = t('helpP1');
        document.getElementById('helpP2').innerHTML = t('helpP2');
        document.getElementById('helpP3').innerHTML = t('helpP3');
        document.getElementById('helpP4').innerHTML = t('helpP4');
        document.getElementById('helpP5').innerHTML = t('helpP5');
        document.getElementById('helpFooter').textContent = t('helpFooter');

        updateStatus();
    }

    function getTranslateFromElement(el) {
        let trans = el.getAttribute('transform');
        if (!trans) return { x: 0, y: 0 };
        let match = trans.match(/translate$$\s*([-\d.]+)[,\s]+([-\d.]+)\s*$$/);
        if (match) return { x: parseFloat(match[1]), y: parseFloat(match[2]) };
        return { x: 0, y: 0 };
    }

    function getPointPos(compId, port) {
        const g = svg.querySelector(`g[data-id="${compId}"]`);
        if (!g) return { x: 0, y: 0 };
        const c = g.querySelector(`circle[data-port="${port}"]`);
        if (!c) return { x: 0, y: 0 };
        const trans = getTranslateFromElement(g);
        const cx = parseFloat(c.getAttribute('cx'));
        const cy = parseFloat(c.getAttribute('cy'));
        return { x: trans.x + cx, y: trans.y + cy };
    }

    function updateWiresForComp(id) {
        connections.forEach(conn => {
            if (conn.from.id === id || conn.to.id === id) {
                const start = getPointPos(conn.from.id, conn.from.port);
                const end = getPointPos(conn.to.id, conn.to.port);
                conn.line.setAttribute('x1', start.x);
                conn.line.setAttribute('y1', start.y);
                conn.line.setAttribute('x2', end.x);
                conn.line.setAttribute('y2', end.y);
            }
        });
    }

    function getValue(id, visited = new Set()) {
        if (visited.has(id)) return 0;
        visited.add(id);
        let comp = components.find(c => c.id == id);
        if (!comp) return 0;
        if (comp.value !== undefined) return comp.value;

        let inVals = {};
        for (let port in comp.connectionsIn) {
            let from = comp.connectionsIn[port];
            inVals[port] = getValue(from.fromId, visited);
        }

        if (comp.type === 'AND') comp.value = (inVals['in1'] && inVals['in2']) ? 1 : 0;
        else if (comp.type === 'OR') comp.value = (inVals['in1'] || inVals['in2']) ? 1 : 0;
        else if (comp.type === 'NOT') comp.value = (inVals['in'] ? 0 : 1);
        else if (comp.type === 'OUTPUT') comp.value = inVals['in'] || 0;
        else comp.value = 0;

        return comp.value;
    }

    function propagate() {
        if (!simulating) return;
        components.forEach(c => { if (c.type !== 'INPUT') c.value = undefined; });
        components.forEach(c => { c.value = getValue(c.id, new Set()); });

        components.filter(c => c.type === 'OUTPUT').forEach(out => {
            let g = svg.querySelector(`g[data-id="${out.id}"]`);
            if (g) {
                let text = g.querySelector('text.valueText');
                if (text) {
                    text.textContent = out.value;
                    text.setAttribute('fill', out.value ? '#27ae60' : '#e74c3c');
                }
            }
        });

        components.filter(c => c.type === 'INPUT').forEach(inp => {
            let g = svg.querySelector(`g[data-id="${inp.id}"]`);
            if (g) {
                let text = g.querySelector('text.valueText');
                if (text) {
                    text.textContent = inp.value;
                    text.setAttribute('fill', inp.value ? '#27ae60' : '#e74c3c');
                }
            }
        });

        connections.forEach(conn => {
            let sourceVal = getValue(conn.from.id, new Set());
            conn.line.setAttribute('stroke', sourceVal ? '#27ae60' : '#e74c3c');
        });
    }

    function toggleWireMode() {
        wiring = !wiring;
        startPoint = null;
        wireBtn.textContent = wiring ? `⛔ ${t('stopWire')}` : `🔌 ${t('wire')}`;
        wireBtn.classList.toggle('wire-active', wiring);
        updateStatus();
    }

    function toggleSimulate() {
        simulating = !simulating;
        simBtn.textContent = simulating ? `⏹️ ${t('stopSim')}` : `▶ ${t('simulate')}`;
        simBtn.classList.toggle('sim-active', simulating);
        updateStatus();

        if (simulating) propagate();
        else {
            connections.forEach(conn => conn.line.setAttribute('stroke', '#2c3e50'));
            components.forEach(c => {
                let g = svg.querySelector(`g[data-id="${c.id}"]`);
                if (g) {
                    let rect = g.querySelector('rect');
                    if (rect) rect.setAttribute('stroke', '#2c3e50');
                }
            });
        }
    }

    function handlePointClick(e) {
        if (!wiring) return;
        e.stopPropagation();

        let point = e.target;
        let g = point.closest('g');
        if (!g) return;

        let id = g.dataset.id;
        let port = point.dataset.port;
        let pos = getPointPos(id, port);

        if (startPoint === null) {
            if (!point.classList.contains('output')) {
                alert(t('wireStartOutputAlert'));
                return;
            }

            startPoint = { id, port, pos };
            statusSpan.innerHTML = t('fromLabel', {
                name: g.querySelector('text.labelText')?.textContent || '?',
                port
            });
        } else {
            if (!point.classList.contains('input')) {
                alert(t('wireEndInputAlert'));
                return;
            }

            if (startPoint.id === id) {
                alert(t('wireSameComponentAlert'));
                return;
            }

            let targetComp = components.find(c => c.id == id);
            if (targetComp.connectionsIn && targetComp.connectionsIn[port]) {
                let oldIndex = connections.findIndex(c => c.to.id == id && c.to.port == port);
                if (oldIndex !== -1) {
                    connections[oldIndex].line.remove();
                    connections.splice(oldIndex, 1);
                }
                delete targetComp.connectionsIn[port];
            }

            let line = document.createElementNS(svgNS, 'line');
            line.setAttribute('stroke', '#2c3e50');
            line.setAttribute('stroke-width', '2.5');
            line.setAttribute('x1', startPoint.pos.x);
            line.setAttribute('y1', startPoint.pos.y);
            line.setAttribute('x2', pos.x);
            line.setAttribute('y2', pos.y);
            svg.insertBefore(line, svg.firstChild);

            connections.push({ from: { id: startPoint.id, port: startPoint.port }, to: { id, port }, line });

            if (!targetComp.connectionsIn) targetComp.connectionsIn = {};
            targetComp.connectionsIn[port] = { fromId: startPoint.id, fromPort: startPoint.port };

            startPoint = null;
            updateStatus();
            pushState();
        }
    }

    svg.addEventListener('click', (e) => {
        if (e.target === svg && wiring && startPoint) {
            startPoint = null;
            updateStatus();
        }
    });

    function toggleInput(e) {
        if (!simulating) return;
        let g = e.currentTarget;
        let id = g.dataset.id;
        let comp = components.find(c => c.id == id);
        comp.value = 1 - comp.value;

        let text = g.querySelector('text.valueText');
        if (text) {
            text.textContent = comp.value;
            text.setAttribute('fill', comp.value ? '#27ae60' : '#e74c3c');
        }

        propagate();
    }

    function editLabel(e) {
        e.stopPropagation();
        let g = e.currentTarget;
        let id = g.dataset.id;
        let comp = components.find(c => c.id == id);
        if (!comp) return;

        let newLabel = prompt(t('newLabelPrompt'), comp.label || '');
        if (newLabel !== null) {
            comp.label = newLabel;
            let labelText = g.querySelector('text.labelText');
            if (labelText) labelText.textContent = newLabel;
            pushState();
        }
    }

    function deleteComponent(id) {
        connections = connections.filter(conn => {
            if (conn.from.id == id || conn.to.id == id) {
                if (conn.line && conn.line.parentNode) conn.line.remove();
                return false;
            }
            return true;
        });

        const idx = components.findIndex(c => c.id == id);
        if (idx !== -1) {
            const g = svg.querySelector(`g[data-id="${id}"]`);
            if (g) g.remove();
            components.splice(idx, 1);
        }

        pushState();
        if (simulating) propagate();
    }

    function addDeleteListener(g) {
        g.addEventListener('contextmenu', e => {
            e.preventDefault();
            const id = parseInt(g.dataset.id);
            if (confirm(t('deleteComponentConfirm'))) {
                deleteComponent(id);
            }
        });
    }

    function createRect(x, y, w, h, fill = '#f5f7fa', stroke = '#2c3e50') {
        let r = document.createElementNS(svgNS, 'rect');
        r.setAttribute('x', x);
        r.setAttribute('y', y);
        r.setAttribute('width', w);
        r.setAttribute('height', h);
        r.setAttribute('fill', fill);
        r.setAttribute('stroke', stroke);
        r.setAttribute('stroke-width', '1.8');
        r.setAttribute('rx', '6');
        r.setAttribute('ry', '6');
        return r;
    }

    function createText(x, y, t, size = '16', color = '#1e272e', cls = '') {
        let txt = document.createElementNS(svgNS, 'text');
        txt.setAttribute('x', x);
        txt.setAttribute('y', y);
        txt.setAttribute('font-size', size);
        txt.setAttribute('text-anchor', 'middle');
        txt.setAttribute('dominant-baseline', 'middle');
        txt.setAttribute('fill', color);
        if (cls) txt.setAttribute('class', cls);
        txt.textContent = t;
        return txt;
    }

    function createCircle(x, y, r, cls = '', port = '') {
        let c = document.createElementNS(svgNS, 'circle');
        c.setAttribute('cx', x);
        c.setAttribute('cy', y);
        c.setAttribute('r', r);
        if (cls) c.setAttribute('class', cls);
        if (port) c.dataset.port = port;
        c.setAttribute('fill', 'white');
        c.setAttribute('stroke', '#2c3e50');
        c.setAttribute('stroke-width', '2');
        c.addEventListener('click', handlePointClick);
        return c;
    }

    function createGateElement(type, id, x, y, label = '') {
        let g = document.createElementNS(svgNS, 'g');
        g.setAttribute('transform', `translate(${x}, ${y})`);
        g.setAttribute('class', 'draggable');
        g.dataset.id = id;

        g.appendChild(createText(25, -10, label, '12', '#2c3e50', 'labelText'));
        let height = (type === 'NOT') ? 30 : 50;
        g.appendChild(createRect(0, 0, 50, height, '#f5f7fa', '#2c3e50'));

        if (type === 'AND') {
            g.appendChild(createText(25, 25, '&', '22', '#2c3e50'));
            g.appendChild(createCircle(-5, 15, 7, 'input', 'in1'));
            g.appendChild(createCircle(-5, 35, 7, 'input', 'in2'));
            g.appendChild(createCircle(55, 25, 7, 'output', 'out'));
        } else if (type === 'OR') {
            g.appendChild(createText(25, 25, '≥1', '16', '#2c3e50'));
            g.appendChild(createCircle(-5, 15, 7, 'input', 'in1'));
            g.appendChild(createCircle(-5, 35, 7, 'input', 'in2'));
            g.appendChild(createCircle(55, 25, 7, 'output', 'out'));
        } else if (type === 'NOT') {
            g.appendChild(createText(25, 15, '1', '18', '#2c3e50'));
            g.appendChild(createCircle(-5, 15, 7, 'input', 'in'));
            g.appendChild(createCircle(55, 15, 7, 'output', 'out'));

            let bubble = document.createElementNS(svgNS, 'circle');
            bubble.setAttribute('cx', 49);
            bubble.setAttribute('cy', 15);
            bubble.setAttribute('r', 3);
            bubble.setAttribute('fill', 'white');
            bubble.setAttribute('stroke', '#2c3e50');
            g.appendChild(bubble);
        }

        return g;
    }

    function createInputElement(id, x, y, value = 0, label = '') {
        let g = document.createElementNS(svgNS, 'g');
        g.setAttribute('transform', `translate(${x}, ${y})`);
        g.setAttribute('class', 'draggable');
        g.dataset.id = id;

        g.appendChild(createText(20, -10, label, '12', '#2c3e50', 'labelText'));
        g.appendChild(createRect(0, 0, 40, 40, '#fff3e0', '#2c3e50'));

        let text = createText(20, 20, value.toString(), '22', value ? '#27ae60' : '#e74c3c', 'valueText');
        g.appendChild(text);
        g.appendChild(createCircle(45, 20, 7, 'output', 'out'));

        return g;
    }

    function createOutputElement(id, x, y, label = '') {
        let g = document.createElementNS(svgNS, 'g');
        g.setAttribute('transform', `translate(${x}, ${y})`);
        g.setAttribute('class', 'draggable');
        g.dataset.id = id;

        g.appendChild(createText(20, -10, label, '12', '#2c3e50', 'labelText'));
        g.appendChild(createRect(0, 0, 40, 40, '#e8f4fd', '#2c3e50'));
        g.appendChild(createText(20, 20, '0', '22', '#e74c3c', 'valueText'));
        g.appendChild(createCircle(-5, 20, 7, 'input', 'in'));

        return g;
    }

    function addGate(type) {
        let id = nextId++;
        let x = Math.random() * 520 + 80;
        let y = Math.random() * 380 + 80;
        let g = createGateElement(type, id, x, y, '');
        svg.appendChild(g);

        components.push({ id, type, connectionsIn: {}, value: undefined, label: '' });
        makeDraggable(g);
        g.addEventListener('dblclick', editLabel);
        addDeleteListener(g);
        pushState();
    }

    function addInput() {
        let id = nextId++;
        let x = Math.random() * 520 + 80;
        let y = Math.random() * 380 + 80;
        let g = createInputElement(id, x, y, 0, '');
        svg.appendChild(g);

        components.push({ id, type: 'INPUT', value: 0, connectionsIn: {}, label: '' });
        makeDraggable(g);
        g.addEventListener('click', toggleInput);
        g.addEventListener('dblclick', editLabel);
        addDeleteListener(g);
        pushState();
    }

    function addOutput() {
        let id = nextId++;
        let x = Math.random() * 520 + 80;
        let y = Math.random() * 380 + 80;
        let g = createOutputElement(id, x, y, '');
        svg.appendChild(g);

        components.push({ id, type: 'OUTPUT', connectionsIn: {}, value: undefined, label: '' });
        makeDraggable(g);
        g.addEventListener('dblclick', editLabel);
        addDeleteListener(g);
        pushState();
    }

    function makeDraggable(elem) {
        let pos1, pos2, pos3, pos4, dragged = false;

        elem.addEventListener('mousedown', dragMouseDown);
        elem.addEventListener('touchstart', dragTouchStart, { passive: false });

        function dragMouseDown(e) {
            if (e.target.tagName === 'circle') return;
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.addEventListener('mouseup', closeDrag);
            document.addEventListener('mousemove', elementDrag);
        }

        function dragTouchStart(e) {
            if (e.touches.length !== 1 || e.target.tagName === 'circle') return;
            e.preventDefault();
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;
            document.addEventListener('touchend', closeDrag);
            document.addEventListener('touchmove', elementTouchMove, { passive: false });
        }

        function elementDrag(e) {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            let trans = getTranslateFromElement(elem);
            let x = trans.x - pos1;
            let y = trans.y - pos2;
            elem.setAttribute('transform', `translate(${x}, ${y})`);
            updateWiresForComp(elem.dataset.id);
            dragged = true;
        }

        function elementTouchMove(e) {
            if (e.touches.length !== 1) return;
            e.preventDefault();
            pos1 = pos3 - e.touches[0].clientX;
            pos2 = pos4 - e.touches[0].clientY;
            pos3 = e.touches[0].clientX;
            pos4 = e.touches[0].clientY;

            let trans = getTranslateFromElement(elem);
            let x = trans.x - pos1;
            let y = trans.y - pos2;
            elem.setAttribute('transform', `translate(${x}, ${y})`);
            updateWiresForComp(elem.dataset.id);
            dragged = true;
        }

        function closeDrag() {
            if (dragged) pushState();
            dragged = false;
            document.removeEventListener('mouseup', closeDrag);
            document.removeEventListener('mousemove', elementDrag);
            document.removeEventListener('touchend', closeDrag);
            document.removeEventListener('touchmove', elementTouchMove);
        }
    }

    function captureState() {
        const comps = components.map(c => {
            const g = svg.querySelector(`g[data-id="${c.id}"]`);
            const pos = getTranslateFromElement(g);
            return { id: c.id, type: c.type, x: pos.x, y: pos.y, value: c.value, label: c.label || '' };
        });

        const conns = connections.map(conn => ({
            from: { id: conn.from.id, port: conn.from.port },
            to: { id: conn.to.id, port: conn.to.port }
        }));

        return { components: comps, connections: conns, specFValues: [...specFValues] };
    }

    function pushState() {
        const state = captureState();
        historyStack = historyStack.slice(0, historyIndex + 1);
        historyStack.push(state);
        if (historyStack.length > MAX_HISTORY) historyStack.shift();
        historyIndex = historyStack.length - 1;
    }

    function restoreState(state) {
        svg.innerHTML = '';
        components = [];
        connections = [];

        state.components.forEach(comp => {
            let g;
            if (comp.type === 'INPUT') g = createInputElement(comp.id, comp.x, comp.y, comp.value || 0, comp.label);
            else if (comp.type === 'OUTPUT') g = createOutputElement(comp.id, comp.x, comp.y, comp.label);
            else g = createGateElement(comp.type, comp.id, comp.x, comp.y, comp.label);

            svg.appendChild(g);
            components.push({ id: comp.id, type: comp.type, connectionsIn: {}, value: comp.value, label: comp.label });
            makeDraggable(g);

            if (comp.type === 'INPUT') g.addEventListener('click', toggleInput);
            g.addEventListener('dblclick', editLabel);
            addDeleteListener(g);
        });

        state.connections.forEach(conn => {
            const startPos = getPointPos(conn.from.id, conn.from.port);
            const endPos = getPointPos(conn.to.id, conn.to.port);

            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('stroke', '#2c3e50');
            line.setAttribute('stroke-width', '2.5');
            line.setAttribute('x1', startPos.x);
            line.setAttribute('y1', startPos.y);
            line.setAttribute('x2', endPos.x);
            line.setAttribute('y2', endPos.y);
            svg.insertBefore(line, svg.firstChild);

            connections.push({ from: conn.from, to: conn.to, line });

            const target = components.find(c => c.id == conn.to.id);
            if (!target.connectionsIn) target.connectionsIn = {};
            target.connectionsIn[conn.to.port] = { fromId: conn.from.id, fromPort: conn.from.port };
        });

        nextId = components.reduce((max, c) => Math.max(max, c.id), -1) + 1;

        if (state.specFValues) {
            specFValues = [...state.specFValues];
            renderSpecTable();
            renderKMap();
            updateSpecExpressions();
        }

        if (simulating) propagate();
    }

    function undo() {
        if (historyIndex > 0) {
            historyIndex--;
            restoreState(historyStack[historyIndex]);
        } else {
            statusSpan.textContent = t('nothingUndo');
            setTimeout(updateStatus, 1200);
        }
    }

    function redo() {
        if (historyIndex < historyStack.length - 1) {
            historyIndex++;
            restoreState(historyStack[historyIndex]);
        } else {
            statusSpan.textContent = t('nothingRedo');
            setTimeout(updateStatus, 1200);
        }
    }

    function saveCircuit() {
        const state = captureState();
        const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'minisim-circuit.json';
        a.click();
        URL.revokeObjectURL(url);

        statusSpan.textContent = t('saved');
        setTimeout(updateStatus, 1500);
    }

    function loadCircuit() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';

        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();

            reader.onload = ev => {
                try {
                    const state = JSON.parse(ev.target.result);
                    restoreState(state);
                    pushState();
                    statusSpan.textContent = t('loaded');
                    setTimeout(updateStatus, 1500);
                } catch(err) {
                    alert(t('invalidFile'));
                }
            };

            reader.readAsText(file);
        };

        input.click();
    }

    function randomSpec() {
        for (let i = 0; i < specRows; i++) {
            const r = Math.random();
            specFValues[i] = r < 0.4 ? 0 : r < 0.8 ? 1 : 'X';
        }
    }

    function renderSpecTable() {
        let html = '';
        for (let i = 0; i < specRows; i++) {
            const a = (i >> 3) & 1, b = (i >> 2) & 1, c = (i >> 1) & 1, d = i & 1;
            html += `<tr>
                <td class="fixed-col">${a}</td>
                <td class="fixed-col">${b}</td>
                <td class="fixed-col">${c}</td>
                <td class="fixed-col">${d}</td>
                <td class="f-cell" data-index="${i}" data-val="${specFValues[i]}">${specFValues[i]}</td>
            </tr>`;
        }

        specTbody.innerHTML = html;

        document.querySelectorAll('.f-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                e.preventDefault();
                const idx = parseInt(cell.dataset.index);
                const cur = specFValues[idx];
                specFValues[idx] = cur === 0 ? 1 : cur === 1 ? 'X' : 0;
                renderSpecTable();
                renderKMap();
                updateSpecExpressions();
                pushState();
            });
        });
    }

    function renderKMap() {
        let html = '';
        for (let r = 0; r < 4; r++) {
            html += `<tr><th>${kmapGray[r].toString(2).padStart(2,'0')}</th>`;
            for (let c = 0; c < 4; c++) {
                const minterm = (kmapGray[r] << 2) | kmapGray[c];
                const val = specFValues[minterm];
                html += `<td class="kmap-cell" data-minterm="${minterm}" data-val="${val}">${val}</td>`;
            }
            html += '</tr>';
        }

        kmapBody.innerHTML = html;

        document.querySelectorAll('.kmap-cell').forEach(cell => {
            cell.addEventListener('click', (e) => {
                e.preventDefault();
                const m = parseInt(cell.dataset.minterm);
                const cur = specFValues[m];
                specFValues[m] = cur === 0 ? 1 : cur === 1 ? 'X' : 0;
                renderSpecTable();
                renderKMap();
                updateSpecExpressions();
                pushState();
            });
        });
    }

    function covers(pi, minterm) {
        for (let i = 0; i < 4; i++) {
            if (pi[i] !== '-' && pi[i] !== minterm[i]) return false;
        }
        return true;
    }

    function simplifyLogic(targetTerms, allowedTerms) {
        if (targetTerms.length === 0) return [];
        if (allowedTerms.length === 16) return ['----'];

        let combined = new Set(allowedTerms.map(m => m.toString(2).padStart(4, '0')));
        let pis = new Set();
        let hasMerged = true;

        while (hasMerged) {
            hasMerged = false;
            let next = new Set();
            let used = new Set();
            let arr = Array.from(combined);

            for (let i = 0; i < arr.length; i++) {
                for (let j = i + 1; j < arr.length; j++) {
                    let diff = 0, idx = -1;
                    for (let k = 0; k < 4; k++) {
                        if (arr[i][k] !== arr[j][k]) { diff++; idx = k; }
                    }
                    if (diff === 1) {
                        next.add(arr[i].substring(0, idx) + '-' + arr[i].substring(idx + 1));
                        used.add(arr[i]);
                        used.add(arr[j]);
                        hasMerged = true;
                    }
                }
            }

            for (let t of arr) if (!used.has(t)) pis.add(t);
            combined = next;
        }

        let piArray = Array.from(pis);
        let remaining = new Set(targetTerms.map(m => m.toString(2).padStart(4, '0')));
        let selected = [];

        for (let m of remaining) {
            let candidates = piArray.filter(pi => covers(pi, m));
            if (candidates.length === 1) {
                let epi = candidates[0];
                if (!selected.includes(epi)) {
                    selected.push(epi);
                    for (let rm of Array.from(remaining)) if (covers(epi, rm)) remaining.delete(rm);
                }
            }
        }

        while (remaining.size > 0) {
            let best = null, max = -1;
            for (let pi of piArray) {
                if (selected.includes(pi)) continue;
                let count = 0;
                for (let rm of remaining) if (covers(pi, rm)) count++;
                if (count > max) { max = count; best = pi; }
            }
            if (!best) break;
            selected.push(best);
            for (let rm of Array.from(remaining)) if (covers(best, rm)) remaining.delete(rm);
        }

        return selected;
    }

    function updateSpecExpressions() {
        let ones = [], zeros = [], dcares = [];

        for (let i = 0; i < specRows; i++) {
            if (specFValues[i] === 1) ones.push(i);
            else if (specFValues[i] === 0) zeros.push(i);
            else dcares.push(i);
        }

        let sopTerms = ones.map(m => (m&8?'a':'a\'') + (m&4?'b':'b\'') + (m&2?'c':'c\'') + (m&1?'d':'d\''));
        let sopD = dcares.map(m => `<span class="d-care">${(m&8?'a':'a\'') + (m&4?'b':'b\'') + (m&2?'c':'c\'') + (m&1?'d':'d\'')}</span>`);
        sopSpan.innerHTML = (sopTerms.length || sopD.length) ? sopTerms.concat(sopD).join(' + ') : '0';

        let posTerms = zeros.map(m => `(${(m&8?'a\'':'a')} + ${(m&4?'b\'':'b')} + ${(m&2?'c\'':'c')} + ${(m&1?'d\'':'d')})`);
        let posD = dcares.map(m => `<span class="d-care">(${(m&8?'a\'':'a')} + ${(m&4?'b\'':'b')} + ${(m&2?'c\'':'c')} + ${(m&1?'d\'':'d')})</span>`);
        posSpan.innerHTML = (posTerms.length || posD.length) ? posTerms.concat(posD).join(' · ') : '1';

        let simpsopPIs = simplifyLogic(ones, ones.concat(dcares));
        window.currentSimpSOP = simpsopPIs;

        if (simpsopPIs.length === 0) simpsopSpan.innerText = '0';
        else if (simpsopPIs.includes('----')) simpsopSpan.innerText = '1';
        else {
            simpsopSpan.innerText = simpsopPIs.map(pi => {
                let term = '';
                for (let i = 0; i < 4; i++) {
                    if (pi[i] === '1') term += specVarNames[i];
                    else if (pi[i] === '0') term += specVarNames[i] + "'";
                }
                return term || '1';
            }).join(' + ');
        }

        let simpposPIs = simplifyLogic(zeros, zeros.concat(dcares));
        if (simpposPIs.length === 0) simpposSpan.innerText = '1';
        else if (simpposPIs.includes('----')) simpposSpan.innerText = '0';
        else {
            simpposSpan.innerText = simpposPIs.map(pi => {
                let vars = [];
                for (let i = 0; i < 4; i++) {
                    if (pi[i] === '0') vars.push(specVarNames[i]);
                    else if (pi[i] === '1') vars.push(specVarNames[i] + "'");
                }
                return '(' + vars.join(' + ') + ')';
            }).join(' · ');
        }
    }

    function buildCircuitFromTerms(terms) {
        svg.innerHTML = '';
        components = [];
        connections = [];
        nextId = 0;

        function connect(fromId, fromPort, toId, toPort) {
            const start = getPointPos(fromId, fromPort);
            const end = getPointPos(toId, toPort);

            const line = document.createElementNS(svgNS, 'line');
            line.setAttribute('x1', start.x);
            line.setAttribute('y1', start.y);
            line.setAttribute('x2', end.x);
            line.setAttribute('y2', end.y);
            line.setAttribute('stroke', '#2c3e50');
            line.setAttribute('stroke-width', '2.8');
            svg.insertBefore(line, svg.firstChild);

            connections.push({ from: { id: fromId, port: fromPort }, to: { id: toId, port: toPort }, line });

            const target = components.find(c => c.id === toId);
            if (target) {
                if (!target.connectionsIn) target.connectionsIn = {};
                target.connectionsIn[toPort] = { fromId, fromPort };
            }
        }

        function addGateAt(type, x, y, label = '') {
            const id = nextId++;
            const g = createGateElement(type, id, x, y, label);
            svg.appendChild(g);
            components.push({ id, type, connectionsIn: {}, value: undefined, label });
            makeDraggable(g);
            g.addEventListener('dblclick', editLabel);
            addDeleteListener(g);
            return id;
        }

        function addInputAt(x, y, value, label) {
            const id = nextId++;
            const g = createInputElement(id, x, y, value, label);
            svg.appendChild(g);
            components.push({ id, type: 'INPUT', value, connectionsIn: {}, label });
            makeDraggable(g);
            g.addEventListener('click', toggleInput);
            g.addEventListener('dblclick', editLabel);
            addDeleteListener(g);
            return id;
        }

        function addOutputAt(x, y, label) {
            const id = nextId++;
            const g = createOutputElement(id, x, y, label);
            svg.appendChild(g);
            components.push({ id, type: 'OUTPUT', connectionsIn: {}, value: undefined, label });
            makeDraggable(g);
            g.addEventListener('dblclick', editLabel);
            addDeleteListener(g);
            return id;
        }

        if (!Array.isArray(terms)) terms = [];
        terms = Array.from(new Set(terms.filter(t => typeof t === 'string' && t.length === 4 && /^[01-]{4}$/.test(t))));

        if (terms.length === 0) {
            const const0 = addInputAt(100, 220, 0, '0');
            const outId = addOutputAt(650, 220, 'F');
            connect(const0, 'out', outId, 'in');
            pushState();
            if (simulating) propagate();
            return;
        }

        if (terms.includes('----')) {
            const const1 = addInputAt(100, 220, 1, '1');
            const outId = addOutputAt(650, 220, 'F');
            connect(const1, 'out', outId, 'in');
            pushState();
            if (simulating) propagate();
            return;
        }

        const COL = { IN: 70, NOT: 180, AND_START: 300, AND_STEP: 90, OR: 520, OUT: 680 };
        const ROW = { TOP: 90, STEP: 90 };

        const inputY = [80, 165, 250, 335];
        const inputIds = [];
        for (let i = 0; i < 4; i++) {
            inputIds.push(addInputAt(COL.IN, inputY[i], 0, specVarNames[i]));
        }

        const needNot = [0, 1, 2, 3].map(i => terms.some(t => t[i] === '0'));
        const notIds = [null, null, null, null];
        let nextNotY = 95;

        for (let i = 0; i < 4; i++) {
            if (needNot[i]) {
                notIds[i] = addGateAt('NOT', COL.NOT, nextNotY, specVarNames[i] + "'");
                connect(inputIds[i], 'out', notIds[i], 'in');
                nextNotY += 78;
            }
        }

        function termLabelOf(t) {
            let s = '';
            for (let i = 0; i < 4; i++) {
                if (t[i] === '1') s += specVarNames[i];
                else if (t[i] === '0') s += specVarNames[i] + "'";
            }
            return s || '1';
        }

        const products = [];
        terms.forEach((t, k) => {
            const y = ROW.TOP + k * ROW.STEP;
            const literals = [];

            for (let i = 0; i < 4; i++) {
                if (t[i] === '1') literals.push({ id: inputIds[i], port: 'out' });
                else if (t[i] === '0') literals.push({ id: notIds[i], port: 'out' });
            }

            if (literals.length === 0) return;

            if (literals.length === 1) {
                products.push({ id: literals[0].id, port: literals[0].port, y });
            } else {
                let current = literals[0];
                for (let j = 1; j < literals.length; j++) {
                    const isLast = (j === literals.length - 1);
                    const label = isLast ? termLabelOf(t) : '';
                    const andId = addGateAt('AND', COL.AND_START + (j - 1) * COL.AND_STEP, y, label);
                    connect(current.id, current.port, andId, 'in1');
                    connect(literals[j].id, literals[j].port, andId, 'in2');
                    current = { id: andId, port: 'out' };
                }
                products.push({ id: current.id, port: current.port, y });
            }
        });

        let finalSource = null;
        if (products.length === 1) {
            finalSource = { id: products[0].id, port: products[0].port };
        } else {
            let current = { id: products[0].id, port: products[0].port };
            for (let i = 1; i < products.length; i++) {
                const orY = ROW.TOP + (i - 1) * ROW.STEP;
                const orId = addGateAt('OR', COL.OR, orY, '');
                connect(current.id, current.port, orId, 'in1');
                connect(products[i].id, products[i].port, orId, 'in2');
                current = { id: orId, port: 'out' };
            }
            finalSource = current;
        }

        const avgY = (() => {
            if (products.length === 1) return products[0].y;
            const ys = products.map(p => p.y);
            return Math.round((Math.min(...ys) + Math.max(...ys)) / 2);
        })();

        const outId = addOutputAt(COL.OUT, Math.min(360, Math.max(100, avgY)), 'F');
        connect(finalSource.id, finalSource.port, outId, 'in');

        pushState();
        if (simulating) propagate();
    }

    function updateStatus() {
        if (wiring) statusSpan.innerHTML = startPoint ? t('selectInputPort') : t('wiringMode');
        else if (simulating) statusSpan.innerHTML = t('simulationOn');
        else statusSpan.innerHTML = t('ready');
    }

    window.addGate = addGate;
    window.addInput = addInput;
    window.addOutput = addOutput;
    window.toggleWireMode = toggleWireMode;
    window.toggleSimulate = toggleSimulate;
    window.saveCircuit = saveCircuit;
    window.loadCircuit = loadCircuit;
    window.undo = undo;
    window.redo = redo;

    renderSpecTable();
    renderKMap();
    updateSpecExpressions();

    document.getElementById('randomSpecBtn').addEventListener('click', () => {
        randomSpec();
        renderSpecTable();
        renderKMap();
        updateSpecExpressions();
        pushState();
    });

    document.getElementById('resetSpecBtn').addEventListener('click', () => {
        specFValues.fill(0);
        renderSpecTable();
        renderKMap();
        updateSpecExpressions();
        pushState();
    });

    document.getElementById('buildCircuitBtn').addEventListener('click', () => {
        buildCircuitFromTerms(window.currentSimpSOP || []);
    });

    const helpModal = document.getElementById('helpModal');
    const helpOverlay = document.getElementById('helpOverlay');

    window.openHelpModal = function() {
        helpModal.style.display = 'block';
        helpOverlay.style.display = 'block';
    };

    window.closeHelpModal = function() {
        helpModal.style.display = 'none';
        helpOverlay.style.display = 'none';
    };

    document.getElementById('helpButton').addEventListener('click', openHelpModal);

    document.getElementById('langSelect').addEventListener('change', (e) => {
        currentLang = e.target.value;
        localStorage.setItem('logiclab_lang', currentLang);
        applyLanguage();
    });

    applyLanguage();
    pushState();
    updateStatus();
})();





































