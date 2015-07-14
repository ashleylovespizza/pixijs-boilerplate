//var bodies = [],
//    particles = [];

var actors = [];

$(document).ready(function() {

	// create an new instance of a pixi stage
    var stage = new PIXI.Stage(0xcdcdcd);
    var stageContainer = new PIXI.DisplayObjectContainer();
    stage.addChild(stageContainer);

    stageContainer.scale.x = stageContainer.scale.y = 3.5;
    stageContainer.position.y = -750;
    stageContainer.position.x = 150;
    var multiplier = 10;

    var particleCount = 150;

    var tireTexture = new PIXI.Texture.fromImage("images/tire.png")
 
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
 
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
 

	var gravity = new Box2D.b2Vec2(0.0, -10.0);

    // similar to stage - outermost shell
	// "create bodies" on it
    var world = new Box2D.b2World(gravity);


	var bd_ground = new Box2D.b2BodyDef();
	var ground = world.CreateBody(bd_ground);

    var containerSize = 80;

    // line segment
	var shape0 = new Box2D.b2EdgeShape();
	shape0.Set(new Box2D.b2Vec2(-80.0, -20.0), new Box2D.b2Vec2(80.0, -20.0));
	ground.CreateFixture(shape0, 0.0);

    var tDef = new Box2D.b2FixtureDef();

    var boxShape = new Box2D.b2CircleShape(1.0);
    boxShape.set_m_radius(.5);

    // fixtures define physical collision
    tDef.set_shape( boxShape );
    tDef.set_density( 1.0 );
    tDef.set_friction( .5 );
    tDef.set_restitution( .9 );

    for(var i = 0; i < particleCount; i++) {

        // create box2d representation
        var bd = new Box2D.b2BodyDef();
        bd.set_type(Box2D.b2_dynamicBody);
        bd.set_position(new Box2D.b2Vec2(25.0 + Math.random(), 1.0 + Math.random()));
        var body = world.CreateBody(bd);
        body.CreateFixture(tDef);

        // create pixi representation
        var g = new PIXI.Sprite(tireTexture);
        g.pivot.x = 32;
        g.pivot.y = 32;
        g.scale.x = g.scale.y = .25;
        stageContainer.addChild(g);

        // create actor
        var actor = {};
        // pixi visual representation
        actor['particle'] = g;

        // box2d mathy representation
        actor['body'] = body;

        actors.push(actor);
    }

    function animate() {

        // simulate a frame in the physics world...
        world.Step(1/60, 3, 2);


        for (var a = 0; a < actors.length; a++) {
            var curr_actor = actors[a];

            var posX = curr_actor.body.GetPosition().get_x(),
                posY = curr_actor.body.GetPosition().get_y();

            curr_actor.particle.x = posX * 16;
            curr_actor.particle.y = posY * -16;
            curr_actor.particle.rotation = curr_actor.body.GetAngle() * -1;


        }

    	// }
 
        requestAnimFrame( animate );
 
        // render the stage   
        renderer.render(stage);
    }

    animate();

});