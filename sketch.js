var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particles = [];
var plinkos = [];
var divisions =[];
var divisionHeight=300;
var score =0;
var contador = 0;
var EstadoJogo = "iniciar";
var ball;

function setup() {
  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);

  //criar objetos de divisão
  for (var k = 0; k <=800; k = k + 80) {
    divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
  }

  //crie a 1ª linha de objetos plinko
  for (var j = 75; j <=width; j=j+50) { 
    plinkos.push(new Plinko(j,75));
  }

  //crie a 2ª linha de objetos plinko
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,175));
  }

  //crie a 3ª linha de objetos plinko
  for (var j = 75; j <=width; j=j+50) 
  {
    plinkos.push(new Plinko(j,275));
  }
  
  //crie a 4ª linha de objetos plinko
  for (var j = 50; j <=width-10; j=j+50) 
  {
    plinkos.push(new Plinko(j,375));
  }

    
}


function draw() {
  background("black");
  textSize(40)

  fill("withe");

  text("500", 5, 550);
  text("500", 85, 550);
  text("500", 165, 550);
  text("500", 245, 550);
  text("100", 325, 550);
  text("100", 405, 550);
  text("100", 485, 550);
  text("200", 565, 550);
  text("200", 645, 550);
  text("200", 725, 550);

 
  Engine.update(engine);
  ground.display();
 
  
  //exibir os plinkos
  for (var i = 0; i < plinkos.length; i++) {
    plinkos[i].display();   
  }
   
  //exibir os divisões
  for (var k = 0; k < divisions.length; k++) {
    divisions[k].display();
  }

  //exibir as partículas
 // if(frameCount%90===0){
  //  particles.push(new Particle(random(width/2-10, width/2+10), 10, 10));
  //}
  //for(var w = 0; w < particles.length; w++){
  //  particles[w].display();
  //  
 // }

  if(ball != null){
    ball.display();

    if(ball.body.position.y> 720){

      if(ball.body.position.x < 300){
        score = score+500;
        ball = null;

        if(contador >= 5) {
          EstadoJogo = "end";}

      } else if(ball.body.position.x > 301 && ball.body.position.x < 600){
          score = score+100;
          ball = null;

          if(contador >= 5) {
            EstadoJogo = "end";}

        } else if(ball.body.position.x > 601 && ball.body.position.x <900){
            score = score+200;
            ball = null;
          
           if(contador >= 5){
            EstadoJogo = "end";
           } 
          }

    }

  }


  text("Score:"+ score, 5 ,50);
  console.log(score);

  
  if (EstadoJogo == "end"){
    textSize(100);
    text("GAME OVER", 150, 250);
  }
}

 
function mousePressed(){
  if(EstadoJogo !== "end"){
    contador++;
    ball = new Ball(mouseX, 30, 10);
  }
}

