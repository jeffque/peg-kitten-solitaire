var cells = null;
var situacao = 'vazio';
var old_n_linhas = 0;
var old_n_colunas = 0;
var n_linhas = 9;
var n_colunas = 9;
var selec = null;
var state = window.location.hash;

function new_tabuleiro() {
	var i, j;
	cells = new Array();
	for (i = 0; i < n_linhas; i++) {
		cells[i] = new Array();
	}
	for (i = 0; i < n_linhas; i++) {
		for (j = 0; j < n_colunas; j++) {
			cells[i][j] = document.getElementById("cell_" + (i + 1) + "_" + (j + 1));
			if (cells[i][j] == null) {
				continue;
			}
			cells[i][j].setAttribute("onClick", "clicou(this);");
		}
	}
}

function vanilla_tabuleiro() {
	var i, j;
	var code = '#';
	
	n_linhas = n_colunas = 9;
	
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			if ((i < 3) || (i >= 6)) {
				if ((j < 3) || (j >= 6)) {
					code += 'I';
					//cells[i][j].className = "invalid";
				} else {
					code += 'O';
					//cells[i][j].className = "occupied";
				}
			} else {
				if ((i == j) && (j == 4)) {
					code += 'E';
					//cells[i][j].className = "empty";
				} else {
					code += 'O';
					//cells[i][j].className = "occupied";
				}
			}
		}
	}
	
	decodifica_tabuleiro(code);
}

function decodifica_tabuleiro(code) {
	var i, j, n = 1; // n == 1 para ignorar #

	for (i = 0; i < n_linhas; i++) {
		for (j = 0; j < n_colunas; j++) {
			switch(code[n]) {
				case 'O':
					cells[i][j].className = 'occupied';
					break;
				case 'E':
					cells[i][j].className = 'empty';
					break;
				case 'I':
				default:
					cells[i][j].className = 'invalid';
			}
			n++;
		}
	}
	state = window.locate.hash = code;
}

function seta_tabuleiro() {
	if (cells == null) {
		new_tabuleiro();
	}

	if ((state == null) || (state == '0') || (state == 'n0') || (state == '')) {
		vanilla_tabuleiro();
	} else {
		// decodifica magicamente a string de numeros
		decodifica_tabuleiro(state);
	}
}

function seleciona_casa(casa) {
	var id_partes, l, c;
	var id_partesS, lS, cS;
	var n_selec = 0;

	id_partes = casa.id.split("_");
	l = id_partes[1] - 1;
	c = id_partes[2] - 1;


	// Tenta setar casa como válido se tiver algo no meio do caminho
	cS = c;
	for (lS = l - 2; lS <= l + 2; lS += 4) {
		if ((lS < 0) || (lS >= 9) || (cS < 0) || (cS >= 9)) {
			continue;
		}
		if ((cells[lS][cS].className == 'empty') && (cells[(l + lS)/2][(c + cS)/2].className == 'occupied')) {
			n_selec++;
			cells[lS][cS].className = 'possible';
		}
	}
	lS = l;
	for (cS = c - 2; cS <= c + 2; cS += 4) {
		if ((lS < 0) || (lS >= 9) || (cS < 0) || (cS >= 9)) {
			continue;
		}
		if ((cells[lS][cS].className == 'empty') && (cells[(l + lS)/2][(c + cS)/2].className == 'occupied')) {
			n_selec++;
			cells[lS][cS].className = 'possible';
		}
	}

	if (n_selec > 0) {
		casa.className = 'selected';
		situacao = 'selecionado';
		selec = casa;
	}
}

function desseleciona_casa(casa) {
	var id_partes, l, c;
	var id_partesS, lS, cS;

	id_partes = casa.id.split("_");
	l = id_partes[1] - 1;
	c = id_partes[2] - 1;

	casa.className = 'occupied';

	cS = c;
	for (lS = l - 2; lS <= l + 2; lS += 4) {
		if ((lS < 0) || (lS >= 9) || (cS < 0) || (cS >= 9)) {
			continue;
		}
		if (cells[lS][cS].className == 'possible') {
			cells[lS][cS].className = 'empty';
		}
	}
	lS = l;
	for (cS = c - 2; cS <= c + 2; cS += 4) {
		if ((lS < 0) || (lS >= 9) || (cS < 0) || (cS >= 9)) {
			continue;
		}
		if (cells[lS][cS].className == 'possible') {
			cells[lS][cS].className = 'empty';
		}
	}

	situacao = 'vazio';
	selec = null;
}

function codifia_tabuleiro() {
	var string = '';
	var i, j;

	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			switch(cells[i][j].className) {
				case 'empty':
					string += 'E';
					break;
				case 'invalid':
					string += 'I';
					break;
				default:
					string += 'O';
			}
		}
	}
	console.debug(string);
	estado = window.location.hash = string;
}

function mata_meio(origem, destino) {
	var id_partes1, l1, c1;
	var id_partes2, lS, cS;
	var lM, cM;

	// Remove a origem e os possíveis dela
	desseleciona_casa(origem);
	origem.className = 'empty';

	// Remove o meio
	id_partes1 = origem.id.split("_");
	l1 = id_partes1[1] - 1;
	c1 = id_partes1[2] - 1;

	id_partes2 = destino.id.split("_");
	l2 = id_partes2[1] - 1;
	c2 = id_partes2[2] - 1;

	lM = (l1 + l2)/2;
	cM = (c1 + c2)/2;

	cells[lM][cM].className = 'empty';


	// Coloca pino no destino
	destino.className = 'occupied';

	// Seta as globais adequadamente
	situacao = 'vazio';
	selec = null;

	codifia_tabuleiro();
}


function clicou(casa) {
	var id_partes, l, c;

	id_partes = casa.id.split("_");
	l = id_partes[1] - 1;
	c = id_partes[2] - 1;

	switch (situacao) {
		case 'vazio':
			switch (casa.className) {
				case 'occupied':
					seleciona_casa(casa);
					break;
				default:
			}
			break;
		case 'selecionado':
			switch (casa.className) {
				case 'occupied':
					desseleciona_casa(selec);
					seleciona_casa(casa);
					break;
				case 'selected':
				case 'invalid':
				case 'empty':
					desseleciona_casa(selec);
					break;
				case 'possible':
					mata_meio(selec, casa);
					break;
				default:
			}
		default:
	}
}
