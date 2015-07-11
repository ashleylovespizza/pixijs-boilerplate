var bodies = [],
    particles = [];

$(document).ready(function() {

	// create an new instance of a pixi stage
    var stage = new PIXI.Stage(0x333333);
    var multiplier = 10;

    var particleCount = 75;

    var tireTexture = new PIXI.Texture.fromImage("images/tire.png")
 
    // create a renderer instance.
    var renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
 
    // add the renderer view element to the DOM
    document.body.appendChild(renderer.view);
 
	var gravity = new Box2D.b2Vec2(0.0, -10.0);
	var world = new Box2D.b2World(gravity);
	var bd_ground = new Box2D.b2BodyDef();
	var ground = world.CreateBody(bd_ground);

    var containerSize = 80;

	var shape0 = new Box2D.b2EdgeShape();
	shape0.Set(new Box2D.b2Vec2(-80.0, -56.0), new Box2D.b2Vec2(80.0, -56.0));
	ground.CreateFixture(shape0, 0.0);

    var tDef = new Box2D.b2FixtureDef();

    var boxShape = new Box2D.b2CircleShape(1.0);
    boxShape.set_m_radius(2.0);

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
        stage.addChild(g);
        particles.push(g);
        // body.view = g;

        bodies.push(body);
    }

    requestAnimFrame( animate );
 
    function animate() {

        world.Step(1/60, 3, 2);

        for(var b = 0; b < bodies.length; b++) {
            var posX = bodies[b].GetPosition().get_x(),
                posY = bodies[b].GetPosition().get_y();
            particles[b].x = posX * 16;
            particles[b].y = -posY * 16;
            particles[b].rotation = -bodies[b].GetAngle();
        }

    	// }
 
        requestAnimFrame( animate );
 
        // render the stage   
        renderer.render(stage);
    }

});