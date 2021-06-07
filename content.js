

let textBoxes = [];
function setup() {
    createCanvas(1920, 969);
    print(theDiary[0].date);
    print(theDiary[50].content);

    for(let i =0;i<theDiary.length;i++){
        //let _textBox = new textBox(theDiary[i].date , theDiary[i].content, 600, 420+240*i);
        let _textBox = new textBox(theDiary[i].date , theDiary[i].content, 510*i, margin*4);
        textBoxes.push(_textBox);
    }

    //textFont('NotoSerifTC_ExtraLight');
    //textFont('Noto Serif TC');
}
  
function draw() {
    background(outerBg);
    // square.display();
    push();
    translate(wheelIndex*-1,0);
    for(let i =0;i<theDiary.length;i++){
        textBoxes[i].display();
    }
    pop();

    InterFace();

    weather(width-margin*4,margin*3);
    wheelControl();
    bgColor();
}

let result;
let NotoSerifTC_ExtraLight;
function preload() {
    loadStrings('data/diary2.txt', stringsAnalyze);
    //NotoSerifTC_ExtraLight = loadFont('data/NotoSerifTC-Black.otf');
}

let theDiary = [];
function stringsAnalyze(result){
    let _line = 0;
    print(result.length);

    while(_line < result.length){
        let _string = result[_line];
        let _regexp = "- ";
        let _m = match(_string, _regexp);

        let _date = "";
        let _content = "";

        if(_m != null ){
            //print(_string);
            _date = _string;

            let _contentLine = 1;
            while(_line + _contentLine < result.length){
                let _string = result[_line + _contentLine];
                let _regexp = "- ";
                let _m = match(_string, _regexp);
                
                if(_m == null){
                    //print(_string);
                    _content += _string + '\n';
                }else{
                    var _perDairy ={
                        date : _date,
                        content : _content
                    }
                    theDiary.push(_perDairy);
                    _line = _line + _contentLine-1;
                    _contentLine = result.length;
                }
                _contentLine+=1;
            }

        }
        _line+=1;
    }
}

class textBox {
    constructor(_date, _content,_x,_y) {
        this.x = _x;
        this.y = _y;
        this.wdith = 510;
        this.height = margin*42;

        this.textX = margin*2;
        this.textY = margin*21;
        this.textSize = 14.4;
        this.textLeading = 24;
        this.textWidth = 2;
        this.textHeight = 30;

        this.date = _date;
        this.content = _content;
    }

    setBox(_x,_y,_width,_height) {
        this.x = _x;
        this.y = _y;
        this.wdith = _width;
        this.height = _height;
    }
    setText(_textX,_textY,_textSize,_textLeading,_textWidth,_textHeight) {
        this.textX = _textX;
        this.textY = _textY;
        this.textSize = _textSize;
        this.textLeading = _textLeading;
        this.textWidth = _textWidth;
        this.textHeight = _textHeight;
    }

    display(){

        fill(innerBg);
        stroke(0);
        rect(   
            this.x,
            this.y,
            this.wdith,
            this.height
            );
        
        select('canvas').elt.style.letterSpacing = "1.2px"; //字距
        textLeading(this.textLeading); //行距
        fill(0);
        noStroke();
        textAlign(LEFT, TOP);
        textSize(this.textSize*2);
        //date
        textFont('Playfair Display');
        this.day = this.date.charAt(9) + this.date.charAt(10);
        text(   
            this.day,
            this.textX + this.x,
            this.textY + this.y - margin*4,
        );
        //content
        textSize(this.textSize);
        textFont('Noto Serif TC');
        textLeading(this.textLeading); //行距
        text(   
            this.content,
            this.textX + this.x,
            this.textY + this.y,
            );
            // print(this.content);
    }
}

let wheeler =0;
function mouseWheel(event) {
    //print(wheeler);
    wheeler += event.delta;
}
let wheelIndex = 0;
let wheelStep = 2;
function wheelControl() {
    wheelStep = (wheeler - wheelIndex)*0.051;
    wheelStep = (abs(wheelStep)< 1) ? ceil(wheelStep):wheelStep;
    wheelIndex = (abs(wheelIndex - wheeler) > 1) ? wheelIndex + wheelStep :wheeler;
    //print(wheelIndex);
}

let margin = 18;
function InterFace(){
    fill(innerBg);
    stroke(0);
    strokeWeight(1);
    line(
        margin,
        margin,
        width-margin,
        margin
        );
    line(
        margin,
        margin*51,
        width - margin,
        margin*51,
        );
    line(
        margin,
        margin,
        margin,
        margin*51,
        );
    line(
        width-margin,
        margin,
        width - margin,
        margin*51,
        );
    
    rect(
        margin,
        margin,
        width-margin*2,
        margin*3
        );
    /*
    rect(
        margin,
        margin*4,
        margin,
        margin*42
        );
    rect(
        width - margin*2,
        margin*4,
        margin,
        margin*42
        );
    */
    rect(
        margin,
        margin*46,
        width-margin*2,
        margin*5
        );
    
    noStroke();
    fill(outerBg);    
    rect(
        0,
        margin*4,
        margin,
        margin*42+1
        );
    rect(
        width - margin+1,
        margin*4,
        margin,
        margin*42+1
        );
}

let weatherText = ['🌤','🌥','🌦','☁','🌧','⛈','🌩','☀','🌨'];
function weather(_x,_y){
    fill(0);
    textSize(30);
    let _weatherIndex = floor(wheeler/2100)%weatherText.length;
    //print(_weatherIndex);
    text(weatherText[_weatherIndex],_x,_y);
}

let innerBg = 220;
let outerBg = 180;
function bgColor(){
    let n = noise(frameCount/120) * 30;
    innerBg = 220 + n;
    outerBg = 180 + n;
    //print(innerBg);
}