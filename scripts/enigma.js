/*
CharNum 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6
ArrPos  0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5
Letter  A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
I       E K M F L G D Q V Z N T O W Y H X U S P A I B R C J
IR      J E K M F L G D Q V Z N T O W Y H X U S P A I B R C
II      A J D K S I R U X B L H W T M C Q G Z N P Y F V O E
III     B D F H J L C P R T X V Z N Y E I W G A K M U S Q O
IV      E S O V P Z J A Y Q U I R H X L N F T G K D C M W B
V       V Z B R G I T Y U P S D N H L X A W M J Q O F E C K

UKW A   E J M Z A L Y X V B W F C R Q U O N T S P I K H G D
UKW B   Y R U H Q S L D P X N G O K M I E B F Z C W V J A T
UKW C   F V P J I A O Y E D R Z X W G C T K U Q S B N M H L
*/

//rotator class
class Rotator{
    constructor(wheelNumber,rotatorNumber){
        this.wheel1Conf = [5,11,13,6,12,7,4,17,22,26,14,20,15,23,25,8,24,21,19,16,1,9,2,18,3,10];
        this.wheel2Conf = [1,10,4,11,19,9,18,21,24,2,12,8,23,20,13,3,17,7,26,14,16,25,6,22,15,5];
        this.wheel3Conf = [2,4,6,8,10,12,3,16,18,20,24,22,26,14,25,5,9,23,7,1,11,13,21,19,17,15];
        this.wheel4Conf = [5,19,15,22,16,26,10,1,25,17,21,9,18,8,24,12,14,6,20,7,11,4,3,13,23,2];
        this.wheel5Conf = [22,26,2,18,7,9,20,25,21,16,19,4,14,8,12,24,1,23,13,10,17,15,6,5,3,11];
        this.wheelConf = [this.wheel1Conf, this.wheel2Conf, this.wheel3Conf, this.wheel4Conf, this.wheel5Conf];
        this.rotatorNum = rotatorNumber;
        this.wheel = this.wheelConf[wheelNumber];
        this.wheelNumber = wheelNumber + 1;
        this.position = 1;
        this.cnt = 1;
        var tmp = document.getElementById("rotator" + this.rotatorNum);
        var that = this;
        if(tmp != null){
            tmp.addEventListener("change",function(e){
                that.setRotator(e.target.value);
            });
        }
        tmp = document.getElementById("rotatorIpos" + this.rotatorNum);
        if(tmp != null){
            tmp.addEventListener("click",function(){
                that.incPos()
            })
        }
        tmp = document.getElementById("rotatorDpos" + this.rotatorNum);
        if(tmp != null){
            tmp.addEventListener("click",function(){
                that.decPos()
            })
        }
        
    };
    /**
     * set wich rotator will be used and rotates it if necessery
     * @param {Number} w the number wich tetermite wich rotor will be used
     */
    setRotator(w){
        this.wheel = this.wheelConf[w-1];
        console.log("rotator changed to " + String(w))
        this.rotateRotator(this.position);
    };
    /**
     * increase the position of the rotor 1 and print it out
     */
    incPos(){
        this.position = this.cnt == 26 ? 1 : this.cnt+1;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
        console.log("increased position");
        this.rotateRotator(2);
        this.cnt = this.cnt == 26 ? 1 : this.cnt+1;
    };
    /**
     * lowers the position from the rotator 1 and print it out
     */
    decPos(){
        this.position = this.cnt == 1 ? 26 : this.cnt-1;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
        console.log("decreased position");
        this.rotateRotator(26);
        this.cnt = this.cnt == 1 ? 26 : this.cnt-1;
    };
    /**
     * rotates the rotator, by copiing the last character of the array to the position 0 and then deleting the last one
     * @param {Number} pos the input how often the rotator should rotate; Attention! pos = 2 means one rotation
     */
    rotateRotator(pos){
        console.log("rotor Rotation with " + String(pos -1));
        for(var i = 0; i < (pos - 1); i++){
            this.wheel.unshift(this.wheel[25]);
            this.wheel.pop();
        }
    };
};

class Enigma{
    constructor(){
         /*Default Settings:
          -Rotors at Position A-1
          -Rotors I,II and III are used
          -UKW-A is used
          -nothing is pluged in in the Plugboard
        */
        this.UKWAConf = [5,10,13,26,1,12,25,24,22,2,23,6,3,18,17,21,15,14,20,19,16,9,11,8,7,4];
        this.UKWBConf = [25,18,21,8,17,19,12,4,16,24,14,7,15,11,13,9,5,2,6,26,3,23,22,10,1,20];
        this.UKWCConf = [6,22,16,10,9,1,15,25,5,4,18,26,24,23,7,3,20,11,21,17,19,2,14,13,8,12];
        this.UKWConf = [this.UKWAConf,this.UKWBConf,this.UKWCConf];
        this.plugboard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.R1 = new Rotator(0,1);
        this.R2 = new Rotator(1,2);
        this.R3 = new Rotator(2,3);
        this.out = new Output();
        this.UKW = this.UKWConf[0];
        this.inputBlocked = false;
        var that = this;
        this.tempalteELKeyboard = function(e){if(e.key.match(/^[a-zA-Z]$/) && !that.inputBlocked){that.handleInput(e.key);}};
        var tmp = document.getElementById("UKW");
        if(tmp != null){
            tmp.addEventListener("change", function(e){
                that.setupUKW(e.target.value);
            });
        }
        tmp = document.getElementById("testBtn");
        if(tmp != null){
            tmp.addEventListener("click", function(){
                that.encrypt(1);
            });
        }
        this.setKeyboardOn();
    }
    /**
     * activates the keyboard input
     */
    setKeyboardOn(){
        document.body.addEventListener("keyup",this.tempalteELKeyboard);
    }
    /**
     * deactivates the keyboard input
     */
    setKeyboardOff(){
        document.body.removeEventListener("keyup",this.tempalteELKeyboard);
    }
    /**
     * takes a number as input wich will tertemite wich UKW will be used
     * @param {Number} tmp the input number
     */
    setupUKW(tmp){
        this.UKW = this.UKWConf[tmp-1];
        console.log(" -UKW changed");
    };
    /**
     * takes a input and encrypt it through the enigma
     * @param {Number} input character wich will be encrypt 
     */
    encrypt(input){
        this.inputBlocked = true;
        var tmp = input;
        console.log(Array.from(this.R1.wheel));
        console.log(Array.from(this.R2.wheel));
        console.log(Array.from(this.R3.wheel));
        console.log(Array.from(this.plugboard));
        console.log(this.UKW);
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R1: " + String((tmp + this.R1.position -2)));
        tmp = this.goThroughRotator(this.R1,tmp,false);
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("R1 Counter: " + String(this.R1.cnt));
        console.log("R2 Counter: " + String(this.R2.cnt));
        console.log(this.R1.wheel);
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R2: " + String((tmp + this.R2.position -2)));
        tmp = this.goThroughRotator(this.R2,tmp,false);
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R3: " + String((tmp + this.R3.position -2)));
        tmp = this.goThroughRotator(this.R3,tmp,false);
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos UKW: " + String((tmp-1)));
        tmp = this.goThroughUKW(tmp);
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R3: " + String((tmp + this.R3.position -2)));
        tmp = this.goThroughRotator(this.R3,tmp,true);
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R2: " + String((tmp + this.R2.position -2)));
        tmp = this.goThroughRotator(this.R2,tmp,true);
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R1: " + String((tmp + this.R1.position -2)));
        tmp = this.goThroughRotator(this.R1,tmp,true);
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        var output = this.goThroughPlugboard(tmp);
        console.log("R1 cnt: " + this.R1.cnt.toString());
        console.log("R2 cnt: " + this.R2.cnt.toString());
        console.log("R3 cnt: " + this.R3.cnt.toString());
        console.log("#");
        document.getElementById("rotatorPos1").innerHTML = String.fromCharCode(this.R1.cnt + 64) + " " + this.R1.cnt.toString();
        document.getElementById("rotatorPos2").innerHTML = String.fromCharCode(this.R2.cnt + 64) + " " + this.R2.cnt.toString();
        document.getElementById("rotatorPos3").innerHTML = String.fromCharCode(this.R3.cnt + 64) + " " + this.R3.cnt.toString();
        this.out.setLightOn(output);
        this.inputBlocked = false;
    };
    /**
     * makes the keycode(ASCII) into for the enigma readble code p.e.: A=65/a=97 to a|A = 1
     * @param {Number} input keycode from keyboard
     */
    handleInput(input){
        var tmp = input.charCodeAt(0) - 64;
        if(tmp > 26){
            tmp -= 32;
        }
        this.encrypt(tmp);
    };
    
    /**
     * takes an input character and let it through a rotator, also rotates the rotator if necessery
     * @param {Rotator} rotator through wich rotor its going
     * @param {Number} input the input character
     * @param {boolean} backwards if it comes from the keyboard or the UKW, because in backwards direction the rotors doesnt rotate
     * @returns {Number} 
     */
    goThroughRotator(rotator,input,backwards){
        var tmp = rotator.wheel[((input + rotator.position -2) > 25) ? 0 : ((input + rotator.position -2) < 0) ? 25 : (input + rotator.position -2)];
        if(!backwards){
            if(rotator.rotatorNum == 1){
                rotator.cnt ++;
                rotator.rotateRotator(2);
            }
            else if(rotator.rotatorNum == 2){
                switch(rotator.wheelNumber){
                    case 1: if(this.R1.cnt == 18){  
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 2: if(this.R1.cnt== 6){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 3: if(this.R1.cnt== 23){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 4: if(this.R1.cnt == 11){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 5: if(this.R1.cnt == 26){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                }
            }
            else if(rotator.rotatorNum == 3){
                switch(rotator.wheelNumber){
                    case 1: if(this.R2.cnt == 18){  
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 2: if(this.R2.cnt== 6){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 3: if(this.R2.cnt== 23){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 4: if(this.R2.cnt == 11){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                    case 5: if(this.R2.cnt == 26){
                        rotator.cnt++;
                        rotator.rotateRotator(2);
                    }break;
                }
            }
            this.R1.cnt = this.R1.cnt > 26 ? 1 : this.R1.cnt;
            this.R2.cnt = this.R2.cnt > 26 ? 1 : this.R2.cnt;
        }
        return tmp;
    }
    /**
     * takes a character and let it through the UKW
     * @param {Number} input the input character wich goes through the UKW
     */
    goThroughUKW(input){
        return this.UKW[input -1];
    }
    /**
     * takes a character and let it through the plugboard if necessery
     * @param {Number} input the input character
     */
    goThroughPlugboard(input){
        return this.plugboard[input-1] != 0 ? this.plugboard[input-1] : input;
    }
    /**
     * gets two numbers and sets the plugboard array
     * @param {String} input contains a string wich corospant to the two letters that are connected within the plugboard
     * @param {Bool} write 
     */
    setPlugboard(input,write){
        var tmp1 = input.charCodeAt(0) > 90 ? input.charCodeAt(0) - 96 : input.charCodeAt(0) - 64;
        var tmp2 = input.charCodeAt(1) > 90 ? input.charCodeAt(1) - 96 : input.charCodeAt(1) - 64;
        if(write){
            this.plugboard[tmp1-1] = tmp2;
            this.plugboard[tmp2-1] = tmp1;
        }
        else{
            this.plugboard[tmp1-1] = 0;
            this.plugboard[tmp2-1] = 0;
        }
    }
}

class Output{
    constructor(){
        this.radius = 15;
        this.spaceBetweenXpos = 5;
        this.spaceBetweenYpos = 5;
        this.initializeXpos = 20;
        this.initializeYpos = 20;
        this.offset = 20;
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = document.getElementById("outputLights").getContext("2d");
        this.drawOutputLights();
    }
    /**
     * Draws all lights of into the canvas
     */
    drawOutputLights(){
        for(var j = 0; j < 9; j++){
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j * 2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(65+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius*2,this.radius*2);

        }
        for(var j = 0; j < 8; j++){
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos + this.radius*2 + this.spaceBetweenYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(74+j),this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+this.radius*2 + this.spaceBetweenYpos,this.radius*2,this.radius*2);
        }
        for(var j = 0; j < 9; j++){
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2 + this.spaceBetweenYpos) * 2,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(82+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2+ this.spaceBetweenYpos) * 2,this.radius*2,this.radius*2);
        }
        
    }
    /**
     * redraw the complete canvas but set on light on (fill the circle yellow)
     * @param {Number} letter wich of the lights turn on
     */
    setLightOn(letter){
        for(var j = 0; j < 9; j++){
            if(letter == (j+1)){
                this.ctx.fillStyle = "#FFFF00";
            }
            else {
                this.ctx.fillStyle = "#FFFFFF";
            }
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j * 2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(65+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius*2,this.radius*2);

        }
        for(var j = 0; j < 8; j++){
            if(letter == (j+10)){
                this.ctx.fillStyle = "#FFFF00";
            }
            else {
                this.ctx.fillStyle = "#FFFFFF";
            }
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos + this.radius*2 + this.spaceBetweenYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(74+j),this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+this.radius*2 + this.spaceBetweenYpos,this.radius*2,this.radius*2);
        }
        for(var j = 0; j < 9; j++){
            if(letter == (j+18)){
                this.ctx.fillStyle = "#FFFF00";
            }
            else {
                this.ctx.fillStyle = "#FFFFFF";
            }
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2 + this.spaceBetweenYpos) * 2,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(82+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2+ this.spaceBetweenYpos) * 2,this.radius*2,this.radius*2);
        }
    }
}



