const NGROK = `${window.location.hostname}`;
let socket = io(NGROK, {
  path: '/real-time'
});
console.log('Server IP: ', NGROK);

class HappyMeal {
  constructor() {
    this.x = 200;
    this.y = 1190;
  }
}

class Ronald {
  constructor() {
    this.x = (Math.random() * 600) + 100;
    this.y = 0;
  }
  show() {
    fill(255, 0, 0);
    this.y += 3;
  }
}

class Thief {
  constructor() {
    this.x = (Math.random() * 600) + 100;
    this.y = 0;
  }
  show() {
    fill(255, 0, 255);
    this.y += 3;
  }
}

let controllerX, controllerY = 0;
let deviceWidth, deviceHeight = 0;
let mupiWidth, mupiHeight = 0;

//let screen = 1
let mupiScreen = 0


let screenMupi

let ronalds = [];
let thiefs = [];
let points = 0;
let wHeight  = 1440 ;
let wWidth  = 960 ;

let mobileScreen;
let timeCount = 0;

let mupiImages = [];

let character = {
  x: 0,
  y: 0
};

let derecha= false
let izquierda= false
let presionado 
let music

socket.on('arduino', press=>{
  let {pinStart} = press
 presionado=pinStart
});

function mupiLoadImages() {
  mupiImages[0] = loadImage('img/0.mupi.jpg');
  mupiImages[1] = loadImage('img/1.mupi.jpg');
  mupiImages[2] = loadImage('img/2.mupi.jpg');
  mupiImages[4] = loadImage('img/backg.png');
  mupiImages[5] = loadImage('img/5.mupi.jpg');
  mupiImages[6] = loadImage('img/6.mupi.jpg');
  mupiImages[7] = loadImage('img/box.png');
  mupiImages[8] = loadImage('img/bad.png');
  mupiImages[9] = loadImage('img/good.png');
}

function preload() {
  mupiLoadImages();
  poppins = loadFont ('img/Poppins-Regular.ttf')
}

let happyMeal = new HappyMeal();

function setup() {
  createCanvas(960, 1440)
 
  background(0)
  frameRate(60);
  mupiScreen = 0
  mupiWidth = 960;
  mupiHeight = 1440;
  controllerX = wWidth / 2;
  controllerY = wHeight / 2;
 
  background(0);
}

function score(number){
  points+=number;
}

function substractScore(number){
  points-=number;
}

function validateCollisionRondald(){
  ronalds.forEach((clown,i) => {
    if(dist(clown.x, clown.y, controllerX -50 , happyMeal.y,) < 120){
     // console.log("Score bitch");
      //ronalds.splice(i,2);
      clown.x = -500;
      //console.log(i);
      score(10);
    }});
  }

  function validateCollisionThief(){
    thiefs.forEach((bad,i) => {
      if(dist(bad.x, bad.y, controllerX -50 , happyMeal.y,) < 120){
      //  console.log("so saddd bitch");
      //thiefs.splice(i,2);
      bad.x = -500;
        substractScore(5);
      }});
    }
/////////
/* TO DO: 
 function validateCollisionRondald(){}
 function validateCollisionThief(){}
 function score(number){}
 function substractScore(){}
 function lostRonalds(){} 
 */
////////
function draw() {
  background(0);
 
  console.log(mupiScreen);
  //
   //newCursor(pmouseX, pmouseY);

  switch (mupiScreen) {
    case 0: // Pantalla inicial mupi 1
      image(mupiImages[0], 0, 0, 960, 1440);
      if (frameCount % 300 == 0) {
        mupiScreen=1
        console.log(mupiScreen)
      }
      break;
      case 1: // Pantalla inicial mupi 2
      image(mupiImages[1], 0, 0, 960, 1440);
      if (frameCount % 300 == 0) {
        mupiScreen=2
        console.log(mupiScreen)
      }
      break;
    case 2: // Pantalla misión
      image(mupiImages[2], 0, 0, 960, 1440);
    /*  if (frameCount % 300 == 0) {
        mupiScreen=4
      }*/
      if(presionado === 0){
        mupiScreen=4
     }
      break;

    case 4: // Pantalla de Juego
    
      imageMode(CORNER);
      if (frameCount % 200 == 0) {
        ronalds.push(new Ronald()); //add splice
      }

      if (frameCount % 280 == 0) {
        thiefs.push(new Thief()); //add splice
      }
      image(mupiImages[4], 0, 0, wWidth, wHeight);
      imageMode(CENTER);
      //image(mupiImages[7], controllerX, mupiHeight - 400, 270, 337);
     // image(mupiImages[7], 480, 900, 270, 337);

      imageMode(CORNER);
     // image(mupiImages[8], 0, 480, 158, 163);

      imageMode(CORNER);
    //  image(mupiImages[9], 400, 0, 158, 163);

    //hacer el IF - ELSE IF de der e izq

    if(derecha){
      controllerX+=4.5
    }  else if
     (izquierda) {
      controllerX-=4.5
    }
    image(mupiImages[7],  controllerX -150 , happyMeal.y, 200, 250)
      //console.log(controllerX);

      ronalds.forEach(element => {
        element.show();
        image(mupiImages[9], element.x, element.y, 100, 100);
      });
      thiefs.forEach(element => {
        element.show();
        image(mupiImages[8], element.x, element.y, 100, 100);
      })
      validateCollisionRondald();
      validateCollisionThief()
      fill(255)
     textFont(poppins);
      textSize(60)
      text(points, 724,132,700,700)
      text(timeCount, 124,132,700,700)
      
      if (frameCount % 60 === 0) {
        timeCount ++ 
        console.log(timeCount)
      }
  
      /*setTimeout ( () => {
        mupiScreen=5
        ScreenChange(1);
      }, 60000) */
      
      break;
    case 5: // Pantalla de puntos / recollecion de datos
      image(mupiImages[5], 0, 0, 960, 1440);
      fill(237, 4, 0)
      textFont(poppins);
      textSize(120)
      text(points, 410,632,700,700)
      if (frameCount % 3600 == 0) {
        mupiScreen=6
      }
      break;
    case 6: // Pantalla thanks for playing
      image(mupiImages[6], 0, 0, 960, 1440);
      break;
    default:
      break;
  }

  
  if (points > 80) {
    mupiScreen=5
  }
  
  //Cambio de pantalla con click del joystick
  
  console.log(presionado);

 /* if(mupiScreen === 2 && presionado === '0'){
    mupiScreen=4
 }*/

 //instruccion para que en el celular pase del control al score despues de 60 segundos 
 /*if (timeCount >= 60 && mupiScreen === 4) {
  ScreenChange(1); 
  mupiScreen=5
}*/
//console.log(screenMupi);

//Cambio de pantalla cuando envio el "Send" del form 
/*if(screenMupi===5){
  mupiScreen=6
}
console.log(screenMupi);*/

}

/*function ScreenChange(screenBigMupi){
  socket.emit('actual-screen-mupi', screenBigMupi)
}*/

socket.on('arduino', ubijoystick => {
  let {posXMapped} = ubijoystick
 
  //DERECHA
  if( posXMapped > 479 && posXMapped > 480 && controllerX <960) {
    derecha = true;
  }else {
    derecha = false;
  }
  //IZQUIERDA
  if( posXMapped <479 && posXMapped < 480 && controllerX > 0) {
    izquierda = true;
  }else {
    izquierda = false;
  }

});


/*socket.on('mupi-instructions', instructions => {

  let {interactions} = instructions;
  switch (interactions) {
    case 2:
      let {
        rotationX, rotationY, rotationZ
      } = instructions;
      
      //console.log(rotationY );
     // controllerY = (rotationX * mupiHeight) / 90;
      controllerX = (rotationY * mupiWidth) / 90;
    console.log(controllerX);
     //console.log(mupiWidth)
      break;
  }
});*/


/*socket.on('mupi-size', deviceSize => {
  let {
    wWidth,
    wHeight
  } = deviceSize;
  deviceWidth = wWidth;
  mupiWidth = wWidth;
  console.log(wWidth);
  deviceHeight = wHeight;
  //console.log(`User is using a smartphone size of $//{deviceWidth} and ${deviceHeight}`);

  
});

socket.on('screen-mupi', message =>{
 console.log(message);
  screenMupi=message;
})*/

function windowResized() {
  resizeCanvas(wWidth, wHeight);
}