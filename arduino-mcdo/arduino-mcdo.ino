const int pinStart = 22;
//const int pinY = A1;
const int pinX = A2;

//como mando la información que me indique que hice "click" con el pin 2?



void setup() {
  pinMode(pinStart, INPUT);
  digitalWrite(pinStart, HIGH);
    Serial.begin(9600);
  //pinMode(pinX, OUTPUT);
  //pinMode(pinY, OUTPUT);
}

void loop() {

sendingData();
 
}
void sendingData(){
  int posX = analogRead(pinX);
int posXMapped = map(posX, 0, 1023, 0, 960);
int pinStartValue = digitalRead(pinStart);

  sendSerialData('A', pinStartValue, posXMapped);  


//int posY = analogRead(pinY);
  


  //Serial.print('Switch: ');
 // Serial.print('X axis: ');
  

  
 // Serial.print('Y axis: ');
  //int posYMapped = map(posY, 0, 1023, 0, 100);
  //Serial.print(posYMapped);
  //Serial.print("\n\n");
 
  delay(500);

  


//posY = analogRead (pinY);
//posY = map(posY, 0, 1023, 0, 100);
// Serial.print('Y:');
//Serial.print (posY);
//Serial.print('\n');
//  Serial.println(' ');
//por qué empieza lanzado valor de 2 y 3?
//valores que me arroja: DER->16. IZQ->2 ARRIB->500-800 ABAJO->0

//posX = analogRead (pinX);
//Serial.print (posX);
//Serial.print('\n');

}

void sendSerialData(char keyA, int pinStartValue, int posXMapped) {
Serial.print(keyA);
Serial.print(' ');
Serial.print(pinStartValue);
Serial.print(' ');
Serial.print(posXMapped);
Serial.println();
}





