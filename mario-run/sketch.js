// Documentation for p5.play.js: http://p5play.molleindustria.org/docs/modules/p5.play.html
// setting up local server: https://github.com/processing/p5.js/wiki/Local-server (use the easy way)
// p5.js: https://p5js.org/
// working with Github: https://help.github.com/articles/fetching-a-remote/
// some good examples: http://creative-coding.decontextualize.com/making-games-with-p5-play/
var GRAVITY = .3;
var GROUND_Y = 450;
var MIN_OPENING = 300;
var marioStanding, marioJumping, marioRunning, marioDead, groundImg, pipeImg, backgroundImg;
var mario, ground;
var gameOver;
var pipes;

function preload() {
   marioStanding = loadImage("img/Standing-Mario.gif");
   marioJumping = loadImage("img/Jumping-Mario.gif");
   marioRunning = loadImage("img/Running-Mario.gif");
   marioDead = loadImage("img/Dead-Mario.gif");
   groundImg = loadImage("img/Ground.png");
   pipeImg = loadImage("img/Pipe.png");
   backgroundImg = loadImage("img/Mario-Background.png");
}

function setup() {
   createCanvas(800, 600);
   background(0,100,190);
   mario = createSprite(width/3, height/1.2);
   mario.velocity.y = 4;

   // mario.setCollider("circle", 0,0,20);
   mario.addImage("mario", marioStanding);
   //
   ground = createSprite(0, 551);
   ground.addImage(groundImg);
   //
   pipes = new Group();
   gameOver = true;
   // updateSprites(false);
   //
   // camera.position.y = height/2;
}

function draw() {
   clear();
   background(0,100,190);
   if(gameOver) {
      newGame();
   }

   if(!gameOver) {
      //mario.velocity.y += GRAVITY;

      if(frameCount%60 == 0) {
         var pipeH = 10;
         var pipe = createSprite(mario.position.x + width, GROUND_Y-pipeH/2+1+100, 80, pipeH);
         pipe.addImage(pipeImg);
         pipes.add(pipe);
      }

      //get rid of passed pipes
      for(var i = 0; i<pipes.length; i++) {
         if(pipes[i].position.x < mario.position.x-width/2) {
            pipes[i].remove();
         }
      }


   }

   // camera.position.x = mario.position.x + width/4;
   //
   // //wrap ground
   // if(camera.position.x > ground.position.x-ground.width+width/2)
   //   ground.position.x+=ground.width;
   //
   // camera.off();
   // image(backgroundImg, 0, GROUND_Y-190);
   // camera.on();
   //
   // drawSprites(pipes);
   // drawSprite(ground);
   if(keyIsDown(LEFT_ARROW)) {
      mario.position.x -= 5;
   } else if(keyIsDown(RIGHT_ARROW)) {
      mario.position.x += 5;
   }

   if(mario.position.y > 500) {
      mario.position.y = 500;
   }

   drawSprites();
}

function keyPressed() {
   if(keyCode == UP_ARROW) {
      mario.position.y -= 85;
   }
}

function newGame() {
   pipes.removeSprites();
   gameOver = false;
   updateSprites(true);
   mario.position.x = width/3;
   mario.position.y = height/1.2;
   mario.velocity.y = 4;
   ground.position.x = 0;
   ground.position.y = 551;
}

function die() {
   updateSprites(false);
   gameOver = true;
}
