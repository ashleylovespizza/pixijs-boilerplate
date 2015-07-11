$(document).ready(function() {

	// create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x000000);

    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
 
    // add the renderer view element to the DOM
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