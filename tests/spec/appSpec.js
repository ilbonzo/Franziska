describe('App', function() {
    var offset = 300;
    beforeEach(function(){
        $('<section id="first" class="photo-bg" data-magellan-destination="first"><div class="story"><div class="float-right" ><div class="black-bg"><h2>Translator</h2><p>Lorem ipsum Ut in reprehenderit nulla consequat amet incididunt ex do in fugiat nisi Ut anim tempor quis anim labore cillum dolor.</p></div></div></div></section>').appendTo('body');
        $('<section id="second" class="photo-bg" data-magellan-destination="second"><div class="story"><div class="float-right" ><div class="black-bg"><h2>Translator</h2><p>Lorem ipsum Ut in reprehenderit nulla consequat amet incididunt ex do in fugiat nisi Ut anim tempor quis anim labore cillum dolor.</p></div></div></div></section>').appendTo('body');

        app.init();
    });

    it('height full', function () {
        var height = $(window).height();
        expect($('#first').height()).toEqual(height);
    });

    it('height offset', function () {
        var height = $(window).height();
        expect($('#second').height()).toEqual(height - offset);
    });
});
