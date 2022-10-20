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
var botao

function preload()
{
 imgcoelho = loadImage("assets/blink_1.png");
 imgfruta = loadImage("assets/melon.png");
 imgfundo = loadImage("assets/background.png");

}


function setup() 
{
  createCanvas(500,700);
 
  engine = Engine.create();
  world = engine.world;

  corda = new Rope(6,{x:250,y:30});

  solo = new Ground(width/2, height-10, width, 10);

  fruta = Bodies.circle(300,300,60);
  Composite.add(corda.body,fruta);

  link = new Link(corda,fruta);

  coelho = createSprite(width/2, height - 100);
  coelho.addImage(imgcoelho)
  coelho.scale = 0.3

  rectMode(CENTER);
  ellipseMode(RADIUS);
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

 

 image(imgfruta, fruta.position.x, fruta.position.y,60,60);

  solo.show();

  corda.show();

  Engine.update(engine);
  
   drawSprites();
}
