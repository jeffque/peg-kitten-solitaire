/**
 * Peg Kitten application namespace
 * @namespace
 */
PK = {
	CODE_OBJ_VERSION : 1,
	peg_code : function (brute_code) {
		this.stringfiers = [ function(peg_object) { // version 0
			return "#_" + peg_object.rows + "_" + peg_object.columns + "_" + peg_object.code;
		},
		function(peg_object) { // version 1
			return "#_" + peg_object.rows + "_" + peg_object.columns + "_" + peg_object.code + "_" + peg_object.bounty_threshold + "_" + 1;
		}
];
		// version defaults to PK.CODE_OBJ_VERSION
		this.stringfy = function(version) {
			if (this.rows < 0) {
				this.rows = 0;
			}
			if (this.columns < 0) {
				this.columns = 0;
			}
			if (this.bounty_threshold === undefined) {
				this.bounty_threshold = 1;
			}

			if (version === undefined) {
				version = PK.CODE_OBJ_VERSION;
			}
			return this.stringfiers[version](this);
		}


		if ((brute_code == null) || (brute_code == "")) {
			this.rows = this.columns = 0;
			this.code = "";
		} else {
			console.debug("creating peg_code " + brute_code);
			var code_split = brute_code.split("_");
			this.rows = code_split[1];
			this.columns = code_split[2];
			this.code = code_split[3];
			this.bounty_threshold = code_split[4];
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
