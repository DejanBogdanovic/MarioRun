// Documentation for p5.play.js: http://p5play.molleindustria.org/docs/modules/p5.play.html
// setting up local server: https://github.com/processing/p5.js/wiki/Local-server (use the easy way)
// p5.js: https://p5js.org/
// working with Github: https://help.github.com/articles/fetching-a-remote/
// some good examples: http://creative-coding.decontextualize.com/making-games-with-p5-play/
var GRAVITY = .3;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var marioStanding, marioJumping, marioRunning, marioDead, groundImg, pipeImg, backgroundImg, coinImg, enemyImg1, enemyImg2;
var mario, ground;
var gameOver;
var coinCount = 0;
var pipes, coins, enemies;

function preload() {
   marioStanding = loadImage("img/Standing-Mario-Copy.gif");
   marioJumping = loadImage("img/Jumping-Mario.gif");
   marioRunning = loadImage("img/Running-Mario.gif");
   marioDead = loadImage("img/Dead-Mario.gif");
   groundImg = loadImage("img/Ground - Copy.png");
   pipeImg = loadImage("img/Pipe2.png");
   backgroundImg = loadImage("img/Mario-Background.png");
   coinImg = loadImage("img/Coin.png");
	enemyImg1 = loadImage("img/Enemy1.jpg");
	enemyImg2 = loadImage("img/Enemy2.png");
}

function setup() {
   createCanvas(800, 600);
   background(0,100,190);
   mario = createSprite(width/3, 552);
   mario.velocity.y = 4;

   // mario.setCollider("circle", 0,0,20);
   mario.addImage("mario", marioStanding);

   ground = createSprite(400, 562);
   ground.addImage(groundImg);

   pipes = new Group();
   coins = new Group();
	enemies = new Group();

   gameOver = true;
   updateSprites(false);

   camera.position.y = height/2;
}

function draw() {
   clear();
   background(0,100,190);

   textSize(36);
   textAlign(LEFT, TOP);

   if(gameOver) {
		text("Press Enter to start the game", -250, height/2);
		if(keyIsDown(ENTER)) {
			newGame();
		}
   } else {
		//mario.velocity.y += GRAVITY;

		//create obstacles and coins only if mario is moving
		//otherwise multiple objects could be created at the same spot
		if(keyIsDown(RIGHT_ARROW)) {
			//create pipes
			if(frameCount%120 == 0) {
				var enemyNr = round(random(1,3));
				console.log(enemyNr);
				if(enemyNr == 1) {
					var pipe = createSprite(mario.position.x + width, 481);
					pipe.addImage(pipeImg);
					pipes.add(pipe);
				} else if(enemyNr == 2) {
					var enemy = createSprite(mario.position.x + width, 481);
					enemy.addImage(enemyImg1);
					enemy.maxSpeed = 3;
					enemy.attractionPoint(0.2, 0, 481);
					enemies.add(enemy);
				} else if(enemyNr == 3) {
					var enemy = createSprite(mario.position.x + width, 481);
					enemy.addImage(enemyImg2);
					enemy.maxSpeed = 2;
					enemy.attractionPoint(0.2, 0, 481);
					enemies.add(enemy);
				}

			}

		  //create coin
			if(frameCount%40 == 0) {
				var counter = random(1,4);
				var spacing = 35;
				for(var i = 0; i<=counter; i++) {
					var coin = createSprite(mario.position.x + width+spacing, 400);
					coin.addImage(coinImg);
					coins.add(coin);
					spacing += 35;
				}

			}
		}

      //get rid of passed pipes
      for(var i = 0; i<pipes.length; i++) {
         if(pipes[i].position.x < mario.position.x-width/2) {
            pipes[i].remove();
         }
      }

		//get rid of passed coins
      for(var i = 0; i<coins.length; i++) {
         if(coins[i].position.x < mario.position.x-width/2) {
            coins[i].remove();
         }
      }

		//get rid of passed coins
      for(var i = 0; i<enemies.length; i++) {
         if(enemies[i].position.x < mario.position.x-width/2) {
            enemies[i].remove();
         }
      }

		//check if mario catches coin
		mario.overlap(coins, getCoin);
		text("Score: " + coinCount, mario.position.x-200, 20);

		//mario collides with one of the pipes
      for(var i = 0; i<pipes.length; i++) {
			mario.collide(pipes[i]);
      }

		//mario collides with one of the enemies
		for(var i = 0; i<enemies.length; i++) {
			mario.collide(enemies[i]);
			console.log("collide with enemy");
			//gameOver = true;
      }

		camera.position.x = mario.position.x + width/4;

		//wrap ground
		//if(camera.position.x > ground.position.x-ground.width+width/2)
		//  ground.position.x+=ground.width;

		camera.off();
		// image(backgroundImg, 0, GROUND_Y-190);
	   camera.on();

	   if(keyIsDown(LEFT_ARROW)) {
		  mario.position.x -= 5;
	   } else if(keyIsDown(RIGHT_ARROW)) {
		  mario.position.x += 5;
	   }

	   if(mario.position.y > 486) {
		  mario.position.y = 486;
	   }

	   drawSprites();
	}

}

function getCoin(mario, coin) {
	coin.remove();
	coinCount += 1;
}

function keyPressed() {
   if(keyCode == UP_ARROW) {
		if(mario.position.y = 486) {
			mario.position.y -= 125;
		}
   }
}

function newGame() {
   pipes.removeSprites();
   gameOver = false;
   updateSprites(true);
   mario.position.x = width/3;
   mario.position.y = 486;
   mario.velocity.y = 4;
   ground.position.x = 400;
   ground.position.y = 562;
}

function die() {
   updateSprites(false);
   gameOver = true;
}
