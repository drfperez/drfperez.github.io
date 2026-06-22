# 🌾 EcoTrivial PWA

**EcoTrivial** és una aplicació web progressiva (**PWA**) pensada per a l’aula que transforma el repàs de continguts sobre **agricultura ecològica** en una experiència de joc visual, participativa i fàcilment adaptable.

> 🎯 **Idea clau:** no és només un joc per jugar, sinó una eina **didàctica, editable i reutilitzable**.

---

🎮 **Prova'l aquí:** [Joc Ecotrivial](https://pompeu.neocities.org/jocseco/1)

---

## 📚 Què és l’EcoTrivial?

EcoTrivial és un **trivial educatiu interactiu** amb:

- **tauler visual** de joc
- **preguntes per categories**
- **mode individual, per equips i projector**
- **temporitzador configurable**
- **editor integrat de preguntes**
- **importació i exportació de bancs** en **CSV** i **JSON**
- **instal·lació com a PWA** a Windows, ChromeOS, Android i altres entorns compatibles

Està orientat especialment a:

- ESO / Batxillerat
- Formació professional
- educació ambiental
- activitats de repàs, diagnosi i tancament d’unitats

---

## ✨ Per què aquest projecte és especial?

### ✅ 1. És **didàctic**
EcoTrivial no es limita a dir si una resposta és correcta o incorrecta.
Després de cada pregunta mostra una **explicació**, de manera que la resposta es converteix en una oportunitat d’aprenentatge.

### ✅ 2. És **editable**
Aquest és un dels punts més importants del projecte.
No és un joc tancat: qualsevol docent pot **modificar, ampliar o substituir completament** el banc de preguntes.

Això permet reutilitzar l’EcoTrivial per:

- diferents cursos
- diferents unitats didàctiques
- diferents nivells
- fins i tot per altres matèries

### ✅ 3. És **PWA**
Es pot utilitzar com una web normal, però també es pot **instal·lar com una aplicació** al dispositiu, amb icona pròpia i finestra independent.

### ✅ 4. És **portable i lleuger**
Tot el projecte funciona només amb **HTML, CSS i JavaScript**, sense backend obligatori.

---

# 🎯 Objectius didàctics

Aquest projecte està pensat per afavorir:

- la consolidació de continguts
- la memòria de recuperació
- la participació activa
- l’aprenentatge cooperatiu
- la reflexió a partir de l’error
- la motivació i la gamificació a l’aula

Es pot fer servir com a:

- **activitat inicial de diagnosi**
- **repàs abans d’una prova**
- **activitat de síntesi**
- **dinàmica per equips**
- **joc per projector** en gran grup

---

# 🧩 Categories del joc

L’EcoTrivial està organitzat en **6 categories**:

| Categoria | Color | Àmbit temàtic |
|---|---|---|
| Verd | 🌿 | Cultius, sòl i biodiversitat |
| Blau | 💧 | Aigua, sequera i ecosistemes |
| Taronja | 🐄 | Ramaderia ecològica i benestar animal |
| Vermell | 📜 | Certificació, normativa i consum responsable |
| Groc | 🌻 | Agroecologia, salut i sostenibilitat social |
| Lila | 🍇 | Productes de proximitat, temporada i territori |

---

# 🎮 Modes de joc

## 👩‍🌾 Mode individual
Ideal per a repàs personal o activitat autònoma.

## 👥 Mode equips
Pensat per a la dinàmica cooperativa o competitiva a l’aula.

## 🖥️ Mode projector
Interfície adaptada per a ús en pantalla gran o pissarra digital.

---

# ⚙️ Dificultats disponibles

- **Bàsic** → 1 encert en una categoria = falca
- **Mitjà** → 2 encerts en una categoria = falca
- **Avançat** → la falca només s’obté en caselles **W**

Això permet adaptar el joc a diferents nivells o moments del procés d’aprenentatge.

---

# ✏️ Projecte clarament **editable**

## Aquesta és la gran fortalesa del projecte

EcoTrivial està dissenyat perquè el **banc de preguntes sigui editable** des de la mateixa interfície.

### Pots:
- crear preguntes noves
- editar preguntes existents
- duplicar preguntes
- eliminar-les
- importar bancs externs
- exportar el banc actual
- restaurar el banc per defecte

## Això el converteix en una eina reutilitzable
Per exemple, pots fer una còpia del projecte i convertir-lo en:

- **BioTrivial**
- **QuimioTrivial**
- **Trivial d’història**
- **Trivial de llengua**
- **Trivial de farmàcia o alimentació**

Només canviant el banc de preguntes, el joc continua sent útil i funcional.

---

# 🗂️ Formats d’importació i exportació

El projecte admet dos formats principals:

## 1. CSV
Columnes requerides:

```csv
categoria;pregunta;opcio1;opcio2;opcio3;opcio4;correcte;explicacio
```

### Exemple:

```csv
verd;Què és la rotació de cultius?;Alternar espècies;Plantar sempre el mateix;Regar més;Fer servir plàstic;0;La rotació ajuda a mantenir la fertilitat del sòl i redueix plagues.
```

## 2. JSON
Es pot importar com:

- **array d’objectes**, o bé
- **objecte agrupat per categories**

### Exemple JSON:

```json
[
  {
    "categoria": "verd",
    "pregunta": "Què és un cultiu de cobertura?",
    "opcions": [
      "Una planta que protegeix el sòl",
      "Un plàstic negre",
      "Un tipus de reg",
      "Una màquina"
    ],
    "correcte": 0,
    "explicacio": "Protegeix el sòl entre collites i en millora la fertilitat."
  }
]
```

## Categories vàlides
Només s’admeten aquestes claus de categoria:

```txt
verd, blau, taronja, vermell, groc, lila
```

---

# 🧠 Significat didàctic de l’editor

L’editor no és només una comoditat tècnica.
És una funció pedagògica molt potent, perquè permet:

- adaptar el llenguatge al nivell de l’alumnat
- incorporar continguts locals o contextualitzats
- construir versions diferents segons el grup
- treballar per projectes o unitats
- compartir bancs de preguntes entre docents

En aquest sentit, l’EcoTrivial és més una **plantilla de joc didàctic** que no pas un joc tancat.

---

# 📱💻 Què vol dir que sigui una **PWA**?

Una **PWA (Progressive Web App)** és una aplicació web que es comporta com una app instal·lable.

Això vol dir que l’EcoTrivial pot:

- obrir-se al navegador com una web normal
- instal·lar-se com a app en dispositius compatibles
- mostrar-se amb **icona pròpia**
- executar-se en una **finestra independent**
- oferir una experiència més semblant a una aplicació que a una pàgina web

---

# 📄 El paper del `manifest.webmanifest`

El fitxer **`manifest.webmanifest`** és fonamental en una PWA.

## Explicació didàctica
Pots imaginar-lo com la **fitxa d’identitat de l’app**.
Li diu al navegador:

- quin nom té l’aplicació
- quina icona ha de mostrar
- quin color té el tema
- com s’ha d’obrir
- quina és la pàgina inicial

## Explicació tècnica
Aquest fitxer en format JSON defineix propietats com:

- `name`
- `short_name`
- `start_url`
- `scope`
- `display`
- `background_color`
- `theme_color`
- `orientation`
- `icons`

### Exemple del manifest:

```json
{
  "name": "EcoTrivial",
  "short_name": "EcoTrivial",
  "description": "Joc educatiu sobre agricultura ecològica amb editor de preguntes.",
  "lang": "ca",
  "start_url": "./index.html",
  "scope": "./",
  "display": "standalone",
  "background_color": "#eef7ea",
  "theme_color": "#2f8f4e",
  "orientation": "any",
  "icons": [
    {
      "src": "icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "icons/icon-maskable-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

## En resum
Sense aquest fitxer, la web continua funcionant, però **no es presenta correctament com a aplicació instal·lable**.

---

# 🛠️ Estructura tècnica del projecte

```txt
ecotrivial/
├─ index.html
├─ manifest.webmanifest
├─ sw.js
├─ css/
│  └─ styles.css
├─ js/
│  ├─ app.js
│  └─ sw-register.js
└─ icons/
   ├─ favicon.png
   ├─ icon-192.png
   ├─ icon-512.png
   └─ icon-maskable-512.png
```

## Fitxers principals

### `index.html`
Conté l’estructura principal de la interfície.

### `css/styles.css`
Conté tot l’estil visual del joc.

### `js/app.js`
Inclou la lògica del joc, les preguntes, els equips, el tauler, l’editor i la importació/exportació.

### `manifest.webmanifest`
Defineix la identitat instal·lable de la PWA.

### `sw.js`
Service Worker: s’utilitza per al comportament PWA i la gestió de recursos.

### `js/sw-register.js`
Registra el Service Worker al navegador.

---

# 🚀 Com executar el projecte

## Opció 1. Obrir-lo com a web
Pots servir-lo en local amb un servidor senzill.
Per exemple, amb Python:

```bash
python -m http.server 8080
```

I després obrir:

```txt
http://localhost:8080
```

## Opció 2. Instal·lar-lo com a PWA
En navegadors compatibles (com Chrome o Edge), pots instal·lar-lo com a aplicació si el projecte compleix els requisits de PWA.

---

# 🖥️ Instal·lació com a aplicació

Quan el projecte està correctament configurat com a PWA:

- es pot instal·lar des de Chrome o Edge a Windows
- es mostra com una aplicació amb icona pròpia
- pot aparèixer al menú d’inici o com a accés directe
- s’obre en una finestra independent del navegador

Això és ideal per a entorns educatius perquè simplifica l’accés de l’alumnat i del professorat.

---

# 🔧 Personalització recomanada

## Canvia el tema del joc
Pots modificar fàcilment:

- títol
- icones
- colors
- categories
- text d’ajuda

## Crea bancs específics
Algunes idees:

- alimentació sostenible
- cultius mediterranis
- canvi climàtic
- sòls i fertilitat
- biodiversitat agrària
- segells ecològics i consum responsable

## Reutilitza l’estructura
El sistema és prou flexible per adaptar-se a moltes altres matèries.

---

# 👩‍🏫 Recomanacions per a docents

Per traure’n el màxim profit:

- utilitza preguntes curtes i clares
- aprofita el camp **explicació**
- adapta el nivell de dificultat al grup
- utilitza el mode equips per fomentar argumentació
- combina’l amb debat posterior
- exporta bancs per compartir-los amb altres docents

---

# 🔍 Exemples d’ús a l’aula

## Diagnosi inicial
Serveix per detectar què sap ja l’alumnat sobre agricultura ecològica.

## Repàs abans d’una prova
És ideal per consolidar conceptes de forma més motivadora.

## Activitat de síntesi
Permet revisar una unitat sencera de manera global.

## Projecte interdisciplinari
Es pot adaptar i reutilitzar fàcilment en altres matèries.

---

# ❤️ Filosofia del projecte

EcoTrivial vol demostrar que una aplicació educativa pot ser alhora:

- rigorosa
- visual
- gamificada
- tècnicament lleugera
- i profundament editable

No és només una activitat lúdica: és una **eina de construcció didàctica**.

---

# 📌 En resum

**EcoTrivial PWA** és:

- un joc educatiu interactiu
- una PWA instal·lable
- una eina clarament **editable**
- una plantilla reutilitzable per a altres continguts
- un recurs didàctic útil, flexible i sostenible

---

# 📄 Llicència i ús


- MIT


---

# 🙌 Autor / autoria

Dr. Francesc Pérez García 
Institut Pompeu Fabra 

Exemple:

```txt
Projecte desenvolupat per al treball didàctic sobre agricultura ecològica.
Versió PWA editable per a ús educatiu.
```

---

# 📬 Idees futures

Possibles millores del projecte:

- més modes de joc
- estadístiques per sessió
- bancs modulars per unitat
- sincronització de preguntes
- versió Tauri / app d’escriptori
- exportació millorada
- gestió de perfils docents

---

Si aquest projecte et resulta útil, pots fer-ne una versió pròpia, adaptar-lo al teu context i convertir-lo en una eina real de centre.











