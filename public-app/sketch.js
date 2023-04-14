const NGROK = `https://${window.location.hostname}`;
//alert( NGROK);
let socket = io(NGROK, {
    path: '/real-time'
});

let controllerX, controllerY = 0;
let interactions = 2;
let isTouched = false;

let wHeight = screen.height;
let wWidth = screen.width;
let mupiScreen;

let imageFiles = [];
let mobileScreen = 4;
let screenCel;
let user = {name:'',
              email: '', cel: ''}



function loadMobileImages() {
    imageFiles[1] = loadImage('img/gotit.jpg');
    imageFiles[2] = loadImage('img/control3.jpg');
    imageFiles[3] = loadImage('img/datauser.jpg');
    imageFiles[4] = loadImage('img/prize.jpg');
    imageFiles[5] = loadImage('img/move.jpg');
}

function preload() {
    loadMobileImages();
}

function setup() {
    frameRate(60);
    createCanvas(430, 932);

    controllerX = wWidth / 2;
    controllerY = wHeight / 2;
    background(2, 3, 4);
    angleMode(DEGREES);

    socket.emit('device-size', {
        wWidth,
        wHeight
    });

    let btn = createButton("¡Mover!");
    btn.mousePressed(function () {
        DeviceOrientationEvent.requestPermission();
    });
    btn.position(170);

    userInput = createInput('')
    userInput.position(30, 270)
    userInput.size(340, 40)
    userInput.input(myInputEvent)


   emailInput = createInput('')
   emailInput.position(30, 400)
   emailInput.size(340, 40)
   emailInput.input(myInputEvent)

  celInput = createInput('')
  celInput.position(30, 530)
  celInput.size(340, 40)
  celInput.input(myInputEvent)


}


function draw() {
    console.log(mobileScreen)
    background(0);


    switch (mobileScreen) {
        case 0: //MISION
            image(imageFiles[1], 0, 0, 430, 932);
            userInput.style('display', 'none');
            emailInput.style('display', 'none');
            celInput.style('display', 'none');
            break;
        case 1: //CONTROLLER
            image(imageFiles[2], 0, 0, 430, 932);
            userInput.style('display', 'none');
            emailInput.style('display', 'none');
            celInput.style('display', 'none');
            /*if (frameCount % 3600 == 0) {
                mobileScreen=2
              }*/
            break;
        case 2: //FORM
            image(imageFiles[3], 0, 0, 430, 932);
            userInput.style('display', 'block');
            emailInput.style('display', 'block');
            celInput.style('display', 'block');
            break;
        case 3: //THNAK YOU
            image(imageFiles[4], 0, 0, 430, 932);
            userInput.style('display', 'none');
            emailInput.style('display', 'none');
            celInput.style('display', 'none');
            break;
        case 4: //MOVE
        image(imageFiles[5], 0, 0, 430, 932);
            userInput.style('display', 'none');
            emailInput.style('display', 'none');
            celInput.style('display', 'none');
            if (frameCount % 600 == 0) {
                mobileScreen=0
              }
            break;
        default:
            break;

    }
    if(screenCel===1){
        mobileScreen=2
     }


}

function ScreenChange(screenApp){
    socket.emit('actual-screen-app', screenApp)
}

function deviceMoved() {
    switch (interactions) {
        case 2:
            socket.emit('mobile-instructions', {
                interactions,
                rotationY,
                rotationZ,
                rotationX
            });
            background(0, 255, 0);
            break;
    }
}
function myInputEvent(){
    user.name=this.value()
    console.log(user.name)
    user.email=this.value()
    console.log(user.email)
    user.cel=this.value()
    console.log(user.cel)
}

function mousePressed() { 
    if (mouseX > 97 && mouseX < 283 && mouseY > 605 && mouseY < 640 && mobileScreen === 0) {
        console.log("hola");
        mobileScreen = 1
        ScreenChange(2); //Got It
    }
    if (mouseX > 97 && mouseX < 283 && mouseY > 655 && mouseY < 690 && mobileScreen === 2) {
        console.log("qhubo");
      //  mobileScreen = 3 //send
        ScreenChange(5);
    }
}

socket.on('screen-cel', message =>{
   console.log(message);
   screenCel=message;
})