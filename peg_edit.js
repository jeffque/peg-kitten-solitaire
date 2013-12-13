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
