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
var corda, corda2, corda3;
var fruta;
var solo;
var link, link2, link3;
var coelho;
var imgcoelho, imgfruta, imgfundo;
var botao, botaoMudo, balao, botao2, botao3;
var coelhoComendo, coelhoTriste, coelhoPiscando;
var somFundo, somComendo, somCorda, somTriste, somAr;
var canW, canH;

function preload()
{
 imgcoelho = loadImage("assets/blink_1.png");
 imgfruta = loadImage("assets/melon.png");
 imgfundo = loadImage("assets/background.png");
 coelhoComendo = loadAnimation("assets/eat_0.png", "assets/eat_1.png", "assets/eat_2.png", "assets/eat_3.png", "assets/eat_4.png");
 coelhoTriste = loadAnimation("assets/sad_1.png", "assets/sad_2.png", "assets/sad_3.png");
 coelhoPiscando = loadAnimation("assets/blink_1.png", "assets/blink_2.png", "assets/blink_3.png");

 somFundo = loadSound("assets/sound1.mp3");
 somComendo = loadSound("assets/eating_sound.mp3");
 somCorda = loadSound("assets/rope_cut.mp3");
 somTriste = loadSound("assets/sad.wav");
 somAr = loadSound("assets/air.wav");

 coelhoComendo.looping = false;
 coelhoPiscando.looping = true;
 coelhoTriste.looping = false;

 coelhoComendo.playing  = true;
 coelhoPiscando.playing = true;
 coelhoTriste.playing = true;
}


function setup() 
{
  var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth;
    canH = displayHeight;
    createCanvas(canW+80, canH);
  }else{
    canW = windowWidth;
    canH = windowHeight;
    createCanvas(canW, canH);
  }
  
  somFundo.play();
  somFundo.setVolume(0.3);
 
  engine = Engine.create();
  world = engine.world;

  corda = new Rope(5,{x:200,y:30});
  corda2 = new Rope(3,{x:110,y:150});
  corda3 = new Rope(8,{x:249,y:10});


  solo = new Ground(width/2, canH-50, width, 10);

  coelhoPiscando.frameDelay = 10;
  coelhoTriste.frameDelay = 10;
  coelhoComendo.frameDelay = 7;

  coelho = createSprite(300, canH - 150);
  //coelho.addImage(imgcoelho);
  
  coelho.addAnimation("piscando", coelhoPiscando);
  coelho.addAnimation("comendo", coelhoComendo);
  coelho.addAnimation("triste", coelhoTriste);

  coelho.scale = 0.3;

  fruta = Bodies.circle(300,300,20);
  Matter.Composite.add(corda.body,fruta);
  //Matter.Composite.add(corda2.body,fruta);
  //Matter.Composite.add(corda3.body,fruta);

  
  link = new Link(corda,fruta);
  link2 = new Link(corda2,fruta);
  link3 = new Link(corda3,fruta);


  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  //imageMode(CENTER);
  
  botao = createImg("assets/cut_button.png");
  botao.position(195,30);
  botao.size(30,30);
  botao.mouseClicked(cortar);

  botao2 = createImg("assets/cut_button.png");
  botao2.position(100,150);
  botao2.size(30,30);
  botao2.mouseClicked(cortar2);

  botao3 = createImg("assets/cut_button.png");
  botao3.position(240,10);
  botao3.size(30,30);
  botao3.mouseClicked(cortar3);

  botaoMudo = createImg("assets/mute.png");
  botaoMudo.position(300,30);
  botaoMudo.size(50,50);
  botaoMudo.mouseClicked(mutar);

  balao = createImg("assets/balloon.png");
  balao.position(50,200);
  balao.size(100,100);
  balao.mouseClicked(soprar);
}

function cortar(){
  corda.break();
  link.detach();
  link = null;
  somCorda.play();
}

function cortar2(){
  corda2.break();
  link2.detach();
  link2 = null;
  somCorda.play();
}

function cortar3(){
  corda3.break();
  link3.detach();
  link3 = null;
  somCorda.play();
}

function mutar(){
  if(somFundo.isPlaying()){
    somFundo.stop();
  }else{
    somFundo.play();
  }
}

function soprar(){
  Body.applyForce(fruta,{x:0,y:0},{x:0.01,y:0});
  somAr.play();
}

function draw() 
{
  background(imgfundo);

  //ellipse(fruta.position.x, fruta.position.y,60);

  corda.show();
  corda2.show();
  corda3.show();
 
  if(fruta != null){
    image(imgfruta, fruta.position.x-25, fruta.position.y-50,60,60);
  }

  //solo.show();

  Engine.update(engine);
  
  if (colisao(fruta,coelho) == true){
    coelho.changeAnimation("comendo");
    somComendo.play();
  }

  if (fruta != null && fruta.position.y>=650){
    coelho.changeAnimation("triste");
    somTriste.play();
    fruta = null;
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