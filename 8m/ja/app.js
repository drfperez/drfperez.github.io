
// Variables
// -----------------------------------------------------------------------------

var words = [
	new Word(0, "A", "Comença per A:", " Visió del món, on l'home és el centre de tot.", "Androcentrisme"),
	new Word(1, "B", "Comença per B:", " Neologisme, compost per la paraula anglesa per tio i apropiació referida al fet que els homes, com per exemple científics s'apropiin de la feina feta per les dones", "Broappropiating"),
	new Word(2, "C", "Comença per C:", "Cognom de investigadora de la radiactivitat guanyadora del premi Nobel al 1903", "Curie"),
	new Word(3, "D", "Comença per D:", " Cognom de la premi Nobel en Química 2020 sobre edició genètica amb CRISP", "Doudna"),
	new Word(4, "E", "Comença per E:", " Procés pel qual una persona o un grup pot ser capaç d'obtenir poder", "Empoderament"),
	new Word(5, "F", "Comença per F:", " Autora de les fotografies de raigs X que van permetre descobrir la estructura de l'ADN", "Franklin"),
	new Word(6, "G", "Comença per G:", "Cognom d'una famosa investigadora en primats", "Goodall"),
	new Word(7, "H", "Comença amb la H:", " Sistema de pensament basat en la heterosexualitat i el paper únic  primordial per a l'home", "Heteropatriarcat"),
	new Word(8, "I", "Comença per I:", " Que té característiques sexuals masculines i femenines simultàniament ", "Intersexual"),
	new Word(9, "J", "Comença per J:", " Cognom anglès molt comú i d'una científica i informàtica afroamericana de la NASA morta al 2020", "Johnson"),
	new Word(10, "L", "Científica i actriu amb L:", " Cognom de l'actriu i científica que va fer patents i descubriments relacionats amb les comunicacions inalàmbriques que van donar lloc al Wi-fi", "Lamarr"),
	new Word(11, "M", "Comença per M:", " Neologisme anglès format per les paraules home i xoc en anlès i es refereix a l'actitud dels homes que empenyen o xoquen amb dones en les vies públiques o transport. ", "Manslamming"),
	new Word(12, "N", "Empieza por N:", " Tubo fluorescente que produce una luz brillante.", "Neon"),
	new Word(13, "Ñ", "Contiene la Ñ:", " País con más de 1000 muertes de violencia machista desde 2003 al 2019.", "España"),
	new Word(14, "O", "Empieza por O:", " Que conoce todas las cosas reales y posibles.", "Omnisciente"),
	new Word(15, "P", "Comença amb P:", " Tipus de societat on els homes tenen el poder.", "Patriarcal"),
	new Word(16, "Q", "Empieza por Q:", " Que se puede romper fácilmente.", "Quebradizo"),
	new Word(17, "R", "Comença per R:", " Cognom de la descobridora de la matèria fosca a l'Univers.", "Rubin"),
	new Word(18, "S", "Comença amb S:", " Germanor entre dones", "Sororitat"),
	new Word(19, "T", "Empieza por T:", " Persona alocada, bulliciosa y molesta.", "Tabardillo"),
	new Word(20, "U", "Contiene la U:", " Persona que rehúye el trato de otras personas y rechaza las atenciones y muestras de cariño.", "Huraño"),
	new Word(21, "V", "Empieza por V:", " Tributo que el vasallo pagaba a su señor o servicio que le prestaba según este vínculo.", "Vasallaje"),
	new Word(22, "X", "Conté la X:", " Punt culminant o de major satisfacció de la excitació sexual en les zones erògenes o sexuals.", "Climax"),
	new Word(23, "Y", "Contiene la Y:", " Toro castrado, que se utiliza como animal de tiro y del cual se aprovecha su carne.", "Buey"),
	new Word(24, "Z", "Contiene la Z:", " Que es tonto o tiene poca rapidez mental.", "Pazguato")
];

// Functions
// -----------------------------------------------------------------------------

function Word(idNumber, letter, hint, definition, word, correct) {
	this.idNumber = idNumber;
	this.letter = letter;
	this.hint = hint;
	this.definition = definition;
	this.word = word;
	this.correct = null;
}

function showDefinition(pos) {
	$("#js--hint").html(words[pos].hint);
	$("#js--definition").html(words[pos].definition);
}

var remainingWords = 25;

function checkAnswer(pos) {
	var userAnswer = $("#js--user-answer").val().toLowerCase();
	if (userAnswer == words[pos].word.toLowerCase()) {
		words[pos].correct = true;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--success");

	} else {
		words[pos].correct = false;
		$(".circle .item").eq(words[pos].idNumber).addClass("item--failure");
	}
remainingWords--;
	$("#js--score").html(remainingWords);

	return count++;
}

function pasapalabra(pos) {
	var w = words.splice(pos, 1)[0];
	words.push(w);

}

function continuePlaying() {
	if (count != 25) {
		$("#js--user-answer").val("");
		showDefinition(count);
	} else {
		endGame();
	}
}

var seconds;
var temp;

function countdown() {
	seconds = $("#js--timer").html();
	seconds = parseInt(seconds, 10);
	if (seconds == 1) {
		temp = $("#js--timer");
		temp.innerHTML = 0;
		endGame();
		return;
	}
	seconds--;
	temp = $("#js--timer");
	temp.html(seconds);
	timeoutMyOswego = setTimeout(countdown, 1000);
}

function endGame() {
	$("#js--question-controls").addClass("hidden");
	$("#js--pa-controls").removeClass("hidden");
	$("#js--end-title").html("Has finalitzat la partida!");
	$("#js--end-subtitle").html(showUserScore());
	$("#js--close").addClass("hidden")
}

function showUserScore() {
	var counter = 0;
	for (i = 0; i < words.length; i++) {
		if (words[i].correct == true) {
			counter++;
		}
	}
	return "Has aconseguit un total de " + counter + " encerts.";
}


// Main Program
// ----------------------------------------------------------------------------- */

// New game
var count = 0; // Counter for answered words
$("#js--new-game").click(function() {
	$("#js--ng-controls").addClass("hidden");
	$("#js--question-controls").removeClass("hidden");
	$("#js--close").removeClass("hidden");
	showDefinition(count);
	countdown();
});

// Send the answer
$("#js--send").click(function() {
	checkAnswer(count);
	continuePlaying();
});

// Key bindings for send the answer
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "13") {
		checkAnswer(count);
		continuePlaying();
	}
});

// Skip the word
$("#js--pasapalabra").click(function() {
	pasapalabra(count);
	continuePlaying();
});

// Key bindings for skip the word
$("#js--question-controls").keypress(function(event) {
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if (keycode == "32") {
		pasapalabra(count);
		continuePlaying();
	}
});

// Play again
$("#js--pa").click(function() {
	location.reload()
});

// End the game
$("#js--close").click(function() {
	endGame();
});
