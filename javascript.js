
function GameEngine()
{
	//create a new airplane object
	var airplane = new MyAirplane();
	var bullets = [];
	var bullets_total = 0;
	var keyPressed = [];
	var enemies = [];

	this.createNewEnemy = function()
	{
		var enemy = new EnemyPlane({x:parseInt(Math.random()*6)*80, y:0}, enemies.length, parseInt(Math.random()*2));
		enemies.push(enemy);
	}

	// parseInt(Math.random()*3)*80}
	// this.createNewEnemy();
	// this.createNewEnemy();
	// this.createNewEnemy();
	// this.createNewEnemy();

	//game loop that goes forever
	this.loop = function()
	{
		for(var i=0; i<bullets.length; i++)
		{
			bullets[i].moveUp();
		}
	}

	this.moveDown = function()
	{
		for (var i = 0; i < enemies.length; i++) {
			enemies[i].moveDown();
		};
	}

	this.collision = function()
	{
		for (var a = bullets.length-1; a > -1; a--) {
			for (var b = 0; b < enemies.length; b++) {
				if ((bullets[a].position.y <= enemies[b].position.y + 60) && ((bullets[a].position.x >= enemies[b].position.x) && (bullets[a].position.x <= enemies[b].position.x + 88))) {
					console.log(explosion);
					explosion({x: enemies[b].position.x, y: enemies[b].position.y});
					var bullet = document.getElementById("bullet"+bullets[a].bullet_html_id);
					bullet.remove();
					bullets.pop();
					var plane = document.getElementById("enemy"+enemies[b].plane_html_id);
					plane.remove();
					var temp = enemies[b];
					enemies[b] = enemies[enemies.length-1];
					enemies[enemies.length-1] = temp;
					enemies.pop();
					break;
				}
			}
		}
		if (document.getElementById("explosion") != null) {
			var removeExplosion = document.getElementById("explosion");
			setTimeout(function(){removeExplosion.remove()}, 800);
		}
	}

	//to detect multiple keys being pressed 
	$(document).keydown(function(e) {
		keyPressed[e.keyCode] = true;
		
		if(keyPressed[37])	//left arrow
			airplane.performAction("MOVE_LEFT");
		if(keyPressed[39]) //right arrow
			airplane.performAction("MOVE_RIGHT");
		if(keyPressed[32])	//space key
		{
			bullet = new Bullet({x: airplane.position.x+32, y: airplane.position.y-12}, bullets_total++); //create a new bullet
			bullets.push(bullet); //store the bullet in the bullets array
		}
	}).keyup(function(e) {
		delete keyPressed[e.keyCode];
	});

	setInterval(this.loop, 50);
	setInterval(this.collision, 50);
	setInterval(this.moveDown, 1000);
	setInterval(this.createNewEnemy, 2000);
}

function MyAirplane()
{
	this.position = {x:200, y:300};
	
	this.draw = function()
	{
		$('#my_plane').css({top: this.position.y+"px", left: this.position.x+"px" });
	}

	this.performAction = function(action)
	{
		if(action == "MOVE_LEFT")
			this.position.x -= 10;
		else if(action == 'MOVE_RIGHT')
			this.position.x += 10;

		this.draw();
	}
}

function Bullet(initial_coordinates, id)
{
	this.position = {x:initial_coordinates.x, y:initial_coordinates.y};
	this.bullet_html_id = id;

	this.initialize = function()
	{
		$('#canvas').append('<div class="bullet" id="bullet'+this.bullet_html_id+'"></div>'); //create the bullet
		this.draw();	//update the coordinates
	}

	this.draw = function()
	{
		$('#bullet'+this.bullet_html_id).css({top: this.position.y+"px", left: this.position.x+"px" });
	}

	this.moveUp = function()
	{
		this.position.y -= 10;
		this.draw();
	}

	this.initialize();
}

function EnemyPlane(initial_coordinates, id, type)
{
	this.position = {x:initial_coordinates.x, y:initial_coordinates.y};
	this.plane_html_id = id;

	this.initialize = function(type)
	{
		$('#canvas').append('<img class="enemy_plane" src="enemy'+type+'.gif" id="enemy'+this.plane_html_id+'" />'); //create the bullet
		this.draw();	//update the coordinates
	}

	this.draw = function()
	{
		$('#enemy'+this.plane_html_id).css({top: this.position.y+"px", left: this.position.x+"px" });
	}

	this.moveDown = function()
	{
		this.position.y += 10;
		this.draw();
	}

	this.initialize(type);

}

function explosion(initial_coordinates)
{
	this.position = {x:initial_coordinates.x, y:initial_coordinates.y};
	this.initialize = function()
	{
		$('#canvas').append('<img id="explosion" src="explosion.gif" width="71px" height="100px" />');
		this.draw();
	}

	this.draw = function()
	{
		$('#explosion').css({top: this.position.y+"px", left: this.position.x+"px" });
	}

	this.initialize();
}

var engine = new GameEngine();
