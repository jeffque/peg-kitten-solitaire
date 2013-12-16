function clicked(cell) {
	var id_parts, r, c;

	id_parts = cell.id.split("_");
	r = id_parts[1] - 1;
	c = id_parts[2] - 1;

	switch (cell.className) {
		case 'occupied':
		case 'selected':
			cell.className = "invalid";
			break;
		case 'empty':
		case 'possible':
			cell.className = "occupied";
			break;
		case 'invalid':
			cell.className = "empty";
			break;
		default:
	}

	codify_gameboard();
}

function rows_minus() {
	var code_obj = new PK.peg_code(window.location.hash);

	code_obj.rows--;

	code_obj.code = code_obj.code.slice(0, code_obj.rows * code_obj.columns);
	console.debug('novo code após rows_minus: ' + code_obj.stringfy());

	remove_gameboard();
	decodify_gameboard(code_obj.stringfy());
}

function rows_plus() {
	var code_obj = new PK.peg_code(window.location.hash);
	var i = '';

	code_obj.rows++;

	for (i = 0; i < code_obj.columns; i++) {
		code_obj.code += 'I';
	}

	remove_gameboard();
	decodify_gameboard(code_obj.stringfy());
}

function columns_minus() {
}

function columns_plus() {
}
