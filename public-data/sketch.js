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
let mobileScreen = 0;
let screenCel;
let user = {} 
//const DNS = getDNS;
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
    background(2, 3, 4);

    userName = createInput('');
    userName.position(30, 270);
    userName.size(340, 40);
    userName.input(userNameInput);
    userName.style('display', 'none');
    
    email = createInput('');
    email.position(30, 400);
    email.size(340, 40);
    email.input(emailInput);
    email.style('display', 'none');

    cel = createInput('');
    cel.position(30, 530);
    cel.size(340, 40);
    cel.input(celInput);
    cel.style('display', 'none');

    submitButton = createButton("Enviar");
    submitButton.mousePressed(function () {
        userData(user);
        console.log(user);
        mobileScreen = 1

    });
    submitButton.position(75, 635);
    submitButton.size(275, 55);
    submitButton.style('display', 'none');
}

function userNameInput() {
    user['name'] = this.value();
}

function emailInput() {
    user['email'] = this.value();
}

function celInput() {
    user['cel'] = this.value();
}
  
   /*   nameInput = createInput('')
   nameInput.position(30, 270)
   nameInput.size(340, 40)
   nameInput.input(userNameInput)

   emailInput = createInput('')
   emailInput.position(30, 400)
   emailInput.size(340, 40)
   emailInput.input(emailInput)

  celInput = createInput('')
  celInput.position(30, 530)
  celInput.size(340, 40)
  celInput.input(celInput)

}


function userNameInput() {
    user['name'] = this.value();
}

function emailInput() {
    user['email'] = this.value();
}

function celInput() {
    user['cel'] = this.value();
}
*/

function draw() {
    console.log(mobileScreen)
    background(0);
   // mobileScreen = 2;
 

if (mobileScreen === 0) {
    image(imageFiles[3], 0, 0, 430, 932);
    userName.style('display', 'block')
    email.style('display', 'block')
    cel.style('display', 'block')
    submitButton.style('display', 'block')
   // nameInput.style('display', 'block');
   // emailInput.style('display', 'block');
    //celInput.style('display', 'block');
  /* submitButton.mousePressed(function () {
      
    });*/
}
if (mobileScreen === 1) {
    image(imageFiles[4], 0, 0, 430, 932);
    userName.style('display', 'none')
    email.style('display', 'none')
    cel.style('display', 'none')
    submitButton.style('display', 'none')
}
socket.emit('info', user);

   /* if(screenCel===1){
        mobileScreen=2
     }*/
}

/*function ScreenChange(screenApp){
    socket.emit('actual-screen-app', screenApp)
}*/

/*function deviceMoved() {
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
    user.name = this.value()
    console.log(user.name)
    user.email=this.value()
    console.log(user.email)
    user.cel=this.value()
    console.log(user.cel)
}*/

function mousePressed() { 
    if (mouseX > 97 && mouseX < 283 && mouseY > 605 && mouseY < 640 && mobileScreen === 0) {
        console.log("hola");
        mobileScreen = 1
      //  ScreenChange(2); //Got It
    }
    if (mouseX > 97 && mouseX < 283 && mouseY > 655 && mouseY < 690 && mobileScreen === 2) {
        console.log("qhubo");
      //  mobileScreen = 3 //send
    //    ScreenChange(5);
    }
}

/*socket.on('screen-cel', message =>{
   console.log(message);
   screenCel=message;
})*/

//FALTA ARREGLAR EL POST 

async function userData() {
    const data = {
        method: 'POST',
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(user)
    }
    await fetch('/userData', data);
}
