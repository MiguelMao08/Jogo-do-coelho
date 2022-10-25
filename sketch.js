const Engine = Matter.Engine; //mecanismo de física
const Render = Matter.Render; //renderização
const World = Matter.World; //mundo
const Bodies = Matter.Bodies; //corpos
const Constraint = Matter.Constraint; //restrição/ união
const Body = Matter.Body; //corpo
const Composites = Matter.Composites; //grupos
const Composite = Matter.Composite; //grupo

let engine; //escopo de bloco
let world;
var corda;
var fruta;
var solo;
var link;
var coelho;
var imgcoelho, imgfruta, imgfundo;
var botao;
var coelhoComendo, coelhoTriste, coelhoPiscando;

function preload()
{
 imgcoelho = loadImage("assets/blink_1.png");
 imgfruta = loadImage("assets/melon.png");
 imgfundo = loadImage("assets/background.png");
 coelhoComendo = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
 coelhoTriste = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png");
 coelhoPiscando = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png");

 coelhoComendo.looping = false;
 coelhoPiscando.looping = true;
 coelhoTriste.looping = false;

 coelhoComendo.playing  = true;
 coelhoPiscando.playing = true;
 coelhoTriste.playing = false;
}


function setup() 
{
  createCanvas(500,700);
 
  engine = Engine.create();
  world = engine.world;

  corda = new Rope(1,{x:250,y:30});

  solo = new Ground(width/2, height-10, width, 10);

  fruta = Bodies.circle(300,300,60);
  Composite.add(corda.body,fruta);

  link = new Link(corda,fruta);

  coelhoPiscando.frameDelay = 10;
  coelhoTriste.frameDelay = 10;
  coelhoComendo.frameDelay = 7;

  coelho = createSprite(width/2, height - 100);
  //coelho.addImage(imgcoelho);
  
  coelho.addAnimation("piscando", coelhoPiscando);
  coelho.addAnimation("comendo", coelhoComendo);
  coelho.addAnimation("triste", coelhoTriste);

  coelho.scale = 0.3

  rectMode(CENTER);
  //imageMode(CENTER);
  textSize(50)
  //imageMode(CENTER);
  
  botao = createImg("assets/cut_button.png");
  botao.position(250,30);
  botao.size(30,30);
  botao.mouseClicked(cortar)
}

function cortar(){
  corda.break();
  link.detach();
  link = null;
}

function draw() 
{
  background(imgfundo);

 
  if(fruta != null){
    image(imgfruta, fruta.position.x, fruta.position.y,60,60);
  }

  solo.show();

  corda.show();

  Engine.update(engine);
  
  if (colisao(fruta,coelho) == true){
    coelho.changeAnimation("comendo")
  }

   drawSprites();
}

function colisao (body, sprite){
  if (body != null){
    var distancia = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y);
    if (distancia <= 80){
      World.remove(engine.world, fruta);
      fruta = null;
      return true;
    }
    else {
      return false;
    }
  }
}