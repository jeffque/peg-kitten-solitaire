PK.App = {

    /**
     * Binds the game events
     * @private
     */
    _bindEvents: function(){
        $("#edit").click(function(){
            window.location='peg_edit.html' + window.location.hash;
        });

        $("#play").click(function(){
            window.location='peg_kitten.html' + window.location.hash;
        })
    },


    /**
     * Starts the application
     */
    start: function(){
        this._bindEvents();
        set_gameboard();
    }
};


/**
 * When all html, css and js is loaded
 * execute the start function declared above :)
 */
$(document).ready(function(){
    PK.App.start();
});