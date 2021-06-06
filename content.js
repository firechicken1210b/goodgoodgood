

let textBoxes = [];
function setup() {
    createCanvas(1920, 969);
    print(theDiary[0].date);
    print(theDiary[50].content);

    for(let i =0;i<theDiary.length;i++){
        let _textBox = new textBox(theDiary[i].date , theDiary[i].content, 600, 420+240*i);
        textBoxes.push(_textBox);
    }

    //textFont('NotoSerifTC_ExtraLight');
    //textFont('Noto Serif TC');
}
  
function draw() {
    background(220);
    // square.display();
    push();
    translate(0, wheeler*-1);
    for(let i =0;i<theDiary.length;i++){
        textBoxes[i].display();
    }
    pop();
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
        this.height = 240;

        this.textX = 300;
        this.textY = 50;
        this.textSize = 15;
        this.textLeading = 15;
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

        fill(255);
        stroke(0);
        rect(   
            this.x,
            this.y,
            this.wdith,
            this.height
            );

        select('canvas').elt.style.letterSpacing = "3px";
        fill(0);
        noStroke();
        textLeading(this.textLeading);
        textAlign(LEFT, TOP);
        textSize(this.textSize);
        textFont('Playfair Display');
        text(   
            this.date,
            this.x,
            this.textY + this.y,
        );
        textSize(this.textSize);
        textFont('Noto Serif TC');
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
    print(wheeler);
    wheeler += event.delta;
}
let wheelIndex = 0;
function wheelControl() {
    wheelIndex = (abs(wheelIndex - wheeler) > 10) ? wheelIndex + (wheeler - wheelIndex)/2 :wheeler;
}