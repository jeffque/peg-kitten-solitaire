var select = null;
var situation = 'empty';

function select_cell(cell) {
	var id_parts, r, c;
	var id_partsS, rS, cS;
	var n_select = 0;

	id_parts = cell.id.split("_");
	r = id_parts[1] - 1;
	c = id_parts[2] - 1;


	// Try to set the cell as valid if there is an occupied cell between
	cS = c;
	for (rS = r - 2; rS <= r + 2; rS += 4) {
		if ((rS < 0) || (rS >= n_rows) || (cS < 0) || (cS >= n_columns)) {
			continue;
		}
		if ((cells[rS][cS].className == 'empty') && (cells[(r + rS)/2][(c + cS)/2].className == 'occupied')) {
			n_select++;
			cells[rS][cS].className = 'possible';
		}
	}
	rS = r;
	for (cS = c - 2; cS <= c + 2; cS += 4) {
		if ((rS < 0) || (rS >= n_rows) || (cS < 0) || (cS >= n_columns)) {
			continue;
		}
		if ((cells[rS][cS].className == 'empty') && (cells[(r + rS)/2][(c + cS)/2].className == 'occupied')) {
			n_select++;
			cells[rS][cS].className = 'possible';
		}
	}

	if (n_select > 0) {
		cell.className = 'selected';
		situation = 'selected';
		select = cell;
	}
}

function desselect_cell(cell) {
	var id_parts, r, c;
	var id_partsS, rS, cS;

	id_parts = cell.id.split("_");
	r = id_parts[1] - 1;
	c = id_parts[2] - 1;

	cell.className = 'occupied';

	cS = c;
	for (rS = r - 2; rS <= r + 2; rS += 4) {
		if ((rS < 0) || (rS >= n_rows) || (cS < 0) || (cS >= n_columns)) {
			continue;
		}
		if (cells[rS][cS].className == 'possible') {
			cells[rS][cS].className = 'empty';
		}
	}
	rS = r;
	for (cS = c - 2; cS <= c + 2; cS += 4) {
		if ((rS < 0) || (rS >= n_rows) || (cS < 0) || (cS >= n_columns)) {
			continue;
		}
		if (cells[rS][cS].className == 'possible') {
			cells[rS][cS].className = 'empty';
		}
	}

	situation = 'empty';
	select = null;
}

function move_piece(origin, destination) {
	var id_parts1, r1, c1;
	var id_parts2, rS, cS;
	var rM, cM;

	// Remove origin and its "possible"
	desselect_cell(origin);
	origin.className = 'empty';

	// Kill the middle piece
	id_parts1 = origin.id.split("_");
	r1 = id_parts1[1] - 1;
	c1 = id_parts1[2] - 1;

	id_parts2 = destination.id.split("_");
	r2 = id_parts2[1] - 1;
	c2 = id_parts2[2] - 1;

	rM = (r1 + r2)/2;
	cM = (c1 + c2)/2;

	cells[rM][cM].className = 'empty';


	// Put the piece in the destiny
	destination.className = 'occupied';

	// Set the globais properly
	situation = 'empty';
	select = null;

	codify_gameboard();
	n_occupied--;
	if (n_occupied == bounty_threshold) {
		give_bounty();
	}
}

function clicked(cell) {
	var id_parts, r, c;

	id_parts = cell.id.split("_");
	r = id_parts[1] - 1;
	c = id_parts[2] - 1;

	switch (situation) {
		case 'empty':
			switch (cell.className) {
				case 'occupied':
					select_cell(cell);
					break;
				default:
			}
			break;
		case 'selected':
			switch (cell.className) {
				case 'occupied':
					desselect_cell(select);
					select_cell(cell);
					break;
				case 'selected':
				case 'invalid':
				case 'empty':
					desselect_cell(select);
					break;
				case 'possible':
					move_piece(select, cell);
					break;
				default:
			}
		default:
	}
}

function give_bounty() {
	console.debug("get your bounty");
	$("#bounty").css("background-image", get_kitten_url());
}

function get_kitten_url() {
	return "url('http://farm6.static.flickr.com/5562/14423838371_87509d27c0_z.jpg')";
}
