let login = false;
let button;
function setup() {
    createCanvas(1920, 969);

    button = createButton('click me');
    button.position(width/2, height/2);
    button.mousePressed(loginProcess);
  }
  
function draw() {
    background(220);
    MouseSetting();
    //print(windowWidth, windowHeight);
}

function loginProcess(){
    login = true;
    let fs = fullscreen();

    fullscreen(!fs);
    fullscreen();
    resizeCanvas(displayWidth, displayHeight);

    button.remove();
}

function MouseSetting(){
    if(login){
        noCursor();
        MouseStyle();
    }
}

let _initStyleRadius = 1920;
let _styleRadius = 18;
let _InitStyle = false;
function MouseStyle(){
    _initStyleRadius = (_initStyleRadius > _styleRadius && !_InitStyle) ? (_initStyleRadius-_styleRadius)*0.93:_styleRadius;
    if(_initStyleRadius == _styleRadius){_InitStyle = true;}
    let mouseColor = map(_initStyleRadius,width,_styleRadius,220,255);
    fill(mouseColor,99);
    ellipse(mouseX,mouseY,_initStyleRadius,_initStyleRadius);
}