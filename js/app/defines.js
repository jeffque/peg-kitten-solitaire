/**
 * Peg Kitten application namespace
 * @namespace
 */
PK = {
	peg_code : function (brute_code) {
		if ((brute_code == null) || (brute_code == "")) {
			this.rows = this.columns = 0;
			this.code = "";
		} else {
			console.debug("creating peg_code " + brute_code);
			var code_split = brute_code.split("_");
			this.rows = code_split[1];
			this.columns = code_split[2];
			this.code = code_split[3];
		}

		this.stringfy = function() {
			if (this.rows < 0) {
				this.rows = 0;
			}
			if (this.columns < 0) {
				this.columns = 0;
			}
			return "#_" + this.rows + "_" + this.columns + "_" + this.code;
		}
	}
};

/**
 * Possible cell states
 * @enum {String}
 */
PK.states = {
    OCCUPIED: "O",
    EMPTY: "E",
    INVALID: "I"
};
