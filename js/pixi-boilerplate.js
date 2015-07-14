$(document).ready(function() {

	// create an new instance of a pixi stage
    // root of the display tree
    var stage = new PIXI.Stage(0x000000);

    // create a renderer instance.
    // every time you render you paint something to the screen - run every frame
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
 
    // add the renderer view element to the DOM
    // The canvas element that everything is drawn to
    document.body.appendChild( renderer.view );

    var tireSprite = new PIXI.Sprite.fromImage( "images/tire.png" );

    stage.addChild( tireSprite );

    var tick = 0;

    function update() {

        tick++;

        tireSprite.position.x = Math.sin( tick * .1 ) * 200 + ( window.innerWidth * .5 );
        tireSprite.position.y = Math.cos( tick * .1 ) * 200 + ( window.innerHeight * .5 );

        // render the stage   
        renderer.render(stage);

    	requestAnimationFrame( update );

    }

    update();

});