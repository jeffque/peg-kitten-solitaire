var gameboard;
var cells = null;
var bounty_threshold = 1;
var old_n_rows = 0;
var old_n_columns = 0;
var n_rows = 9;
var n_columns = 9;
var state = window.location.hash;

function remove_gameboard() {
	gameboard = document.getElementById("gameboard");

	while (gameboard.firstChild != null) {
		gameboard.removeChild(gameboard.firstChild);
	}
	cells = null;
}

function new_gameboard() {
	var i, j;
	var row;

	gameboard = document.getElementById("gameboard");
	cells = new Array();
	for (i = 0; i < n_rows; i++) {
		cells[i] = new Array();
		row = document.createElement("tr");
		row.id = "row_" + (i + 1);
		gameboard.appendChild(row);
	}
	for (i = 0; i < n_rows; i++) {
		row = document.getElementById("row_" + (i + 1));
		for (j = 0; j < n_columns; j++) {
			cells[i][j] = document.createElement("td");
			cells[i][j].id = "cell_" + (i + 1) + "_" + (j + 1);
			row.appendChild(cells[i][j]);
			if (cells[i][j] == null) {
				continue;
			}
			cells[i][j].setAttribute("onClick", "clicked(this);");
		}
	}
}

function vanilla_gameboard() {
	var i, j;
	var code_obj = new PK.peg_code('');
	
	code_obj.rows = code_obj.columns = n_rows = n_columns = 9;
	
	for (i = 0; i < 9; i++) {
		for (j = 0; j < 9; j++) {
			if ((i < 3) || (i >= 6)) {
				if ((j < 3) || (j >= 6)) {
					code_obj.code += PK.states.INVALID;
				} else {
					code_obj.code += PK.states.OCCUPIED;
				}
			} else {
				if ((i == j) && (j == 4)) {
					code_obj.code += PK.states.EMPTY;
				} else {
					code_obj.code += PK.states.OCCUPIED;
				}
			}
		}
	}
	
	decodify_gameboard(code_obj.stringfy());
}

/**
 * code_brute syntax:
 * #_<n_row>_<n_columns>_<<code>>_<bounty_threshold>_<version>
 *
 * where:
 * 	-- n_row is the number of rows
 * 	-- n_columns is the number of columns
 * 	-- code is a string of size "n_row*n_columns" composed of the following chars:
 * 		+ I -- indicates that it is an invalid space
 * 		+ O -- indicates that it is an occupied square
 * 		+ E -- indicates that it is an empty square
 * 	in case code is bigger than "n_row*n_columns", the lacking chars are treated as I
 * 	any chars beyond "n_row*n_columns" are ignored
 */
function decodify_gameboard(code_brute) {
	var i, j, n = 0;

	var code_obj = new PK.peg_code(code_brute);
	console.debug("code obj " + code_obj.code + "; rows " + code_obj.rows + "; columns " + code_obj.columns + "; bounty threshold: " + code_obj.bounty_threshold);
	console.debug("code obj stringfy: " + code_obj.stringfy());

	n_rows = code_obj.rows;
	n_columns = code_obj.columns;
	bounty_threshold = code_obj.bounty_threshold;

	if (cells == null) {
		new_gameboard();
	}

	for (i = 0; i < n_rows; i++) {
		for (j = 0; j < n_columns; j++) {
			switch(code_obj.code[n]) {
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
	state = window.location.hash = code_obj.stringfy();
}

function codify_gameboard() {
	var code_obj = new PK.peg_code("");
	var i, j;

	for (i = 0; i < n_rows; i++) {
		for (j = 0; j < n_columns; j++) {
			switch(cells[i][j].className) {
				case 'empty':
				case 'possible':
					code_obj.code += PK.states.EMPTY;
					break;
				case 'invalid':
					code_obj.code += PK.states.INVALID;
					break;
				default:
					code_obj.code += PK.states.OCCUPIED;
			}
		}
	}

	code_obj.rows = n_rows;
	code_obj.columns = n_columns;

	console.debug(code_obj.stringfy());
	state = window.location.hash = code_obj.stringfy();
}

function set_gameboard() {
	if ((state == null) || (state == '0') || (state == 'n0') || (state == '')) {
		vanilla_gameboard();
	} else {
		decodify_gameboard(state);
	}
}
