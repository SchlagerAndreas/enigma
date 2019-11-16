/*
        A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
I       E K M F L G D Q V Z N T O W Y H X U S P A I B R C J
II      A J D K S I R U X B L H W T M C Q G Z N P Y F V O E
III     B D F H J L C P R T X V Z N Y E I W G A K M U S Q O
IV      E S O V P Z J A Y Q U I R H X L N F T G K D C M W B
V       V Z B R G I T Y U P S D N H L X A W M J Q O F E C K

UKW A   E J M Z A L Y X V B W F C R Q U O N T S P I K H G D
UKW B   Y R U H Q S L D P X N G O K M I E B F Z C W V J A T
UKW C   F V P J I A O Y E D R Z X W G C T K U Q S B N M H L
*/

window.onload = function(){
    enigma = new Enigma();
}

//rotator class
class Rotator{
    constructor(w, rotatorNumber){
        this.rotatorNum = rotatorNumber;
        this.wheel = w;
        this.position = 1;
        this.rotation = 1;
        this.cnt = 0;
        var tmp = document.getElementById("rotator" + this.rotatorNum);
        var that = this;
        if(tmp != null){
            tmp.addEventListener("change",function(e){
                that.setRotator(e.value);
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
    setRotator(w){
        this.wheel = Enigma.wheelConf[w-1];
        document.getElementById("test").innerHTML += " -rotator changed"
        this.rotateRotator(this.wheel,this.position);
    };
    incPos(){
        this.position = this.position < 26 ? this.position+1 : 1;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
        document.getElementById("test").innerHTML += " -increased position"
        this.rotateRotator(this.wheel,2);
    };
    decPos(){
        this.position = this.position > 1 ? this.position-1 : 26;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
        document.getElementById("test").innerHTML += " -decreased position"
        this.rotateRotator(this.wheel,26);
    };
    rotateRotator(pos){
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
        this.wheel1Conf = [5,11,13,6,12,7,4,17,22,26,14,20,15,23,25,8,24,21,19,16,1,9,2,18,3,10]
        this.wheel2Conf = [1,10,4,11,19,9,18,21,24,2,12,8,23,20,13,3,17,7,26,14,16,25,6,22,15,5]
        this.wheel3Conf = [2,4,6,8,10,12,3,16,18,20,24,22,26,14,25,5,9,23,7,1,11,13,21,19,17,15]
        this.wheel4Conf = [5,19,15,22,16,26,10,1,25,17,21,9,18,8,24,12,14,6,20,7,11,4,3,13,23,2]
        this.wheel5Conf = [22,26,2,18,7,9,20,25,21,16,19,4,14,8,12,24,1,23,13,10,17,15,6,5,3,11]
        this.wheelConf = [this.wheel1Conf, this.wheel2Conf, this.wheel3Conf, this.wheel4Conf, this.wheel5Conf]
        this.UKWAConf = [5,10,13,26,1,12,25,24,22,2,23,6,3,18,17,21,15,14,20,19,16,9,11,8,7,4]
        this.UKWBConf = [25,18,21,8,17,19,12,4,16,24,14,7,15,11,13,9,5,2,6,26,3,23,22,10,1,20]
        this.UKWCConf = [6,22,16,10,9,1,15,25,5,4,18,26,24,23,7,3,20,11,21,17,19,2,14,13,8,12]
        this.UKWConf = [this.UKWAConf,this.UKWBConf,this.UKWCConf];
        this.plugboard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
        this.R1 = new Rotator(this.wheel1Conf,1);
        this.R2 = new Rotator(this.wheel2Conf,2);
        this.R3 = new Rotator(this.wheel3Conf,3);
        this.UKW = this.UKWConf[0];
        var tmp = document.getElementById("UKW");
        var that = this;
        if(tmp != null){
            tmp.addEventListener("change", function(e){
                that.setupUKW(e.value);
            })
        }
        tmp = document.getElementById("testBtn");
        if(tmp != null){
            tmp.addEventListener("click", function(){
                that.encrypt(1);
            })
        }
    };
    setupUKW(tmp){
        this.UKW = this.UKWConf[tmp-1];
        document.getElementById("test").innerHTML += " -UKW changed"
    };
    resetEnigma(){
        wheel1Conf = [5,11,13,6,12,7,4,17,22,26,14,20,15,23,25,8,24,21,19,16,1,9,2,18,3,10];
        wheel2Conf = [1,10,4,11,19,9,18,21,24,2,12,8,23,20,13,3,17,7,26,14,16,25,6,22,15,5];
        wheel3Conf = [2,4,6,8,10,12,3,16,18,20,24,22,26,14,25,5,9,23,7,1,11,13,21,19,17,15];
        wheel4Conf = [5,19,15,22,16,26,10,1,25,17,21,9,18,8,24,12,14,6,20,7,11,4,3,13,23,2];
        wheel5Conf = [22,26,2,18,7,9,20,25,21,16,19,4,14,8,12,24,1,23,13,10,17,15,6,5,3,11];
        plugboard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        UKWAConf = [5,10,13,26,1,12,25,24,22,2,23,6,3,18,17,21,15,14,20,19,16,9,11,8,7,4]
        UKWBConf = [25,18,21,8,17,19,12,4,16,24,14,7,15,11,13,9,5,2,6,26,3,23,22,10,1,20]
        UKWCConf = [6,22,16,10,9,1,15,25,5,4,18,26,24,23,7,3,20,11,21,17,19,2,14,13,8,12]
    };
    encrypt(input){
        var tmp = input;
        console.log(this.R1.wheel);
        console.log(this.R2.wheel);
        console.log(this.R3.wheel);
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R1: " + String((tmp + this.R1.position -2)));
        tmp = this.R1.wheel[((tmp + this.R1.position -2) > 25) ? 0 : ((tmp + this.R1.position -2) < 0) ? 25 : (tmp + this.R1.position -2)]; //the tmp character plus the position -1 because position 1 means 0 rotation of the rotator and -1 becuase an array begins with 0
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        this.R1.position ++;
        this.R1.cnt++;
        console.log("R1 Counter: " + String(this.R1.cnt));
        console.log("R2 Counter: " + String(this.R2.cnt));
        this.R1.rotateRotator(2) //2 because in the rotate logic an number of 1 means no rotation and 2 means a rotation of 1
        console.log(this.R1.wheel);
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R2: " + String((tmp + this.R2.position -2)));
        tmp = this.R2.wheel[(tmp + this.R2.position -2) > 25 ? 0 : ((tmp + this.R2.position -2) < 0) ? 25 : (tmp + this.R2.position -2)];
        if(this.R1.cnt == 26){
            this.R1.cnt = 0;
            this.R2.cnt++;
            this.R2.position++;
            this.R2.rotateRotator(2);
            console.log(this.R2.wheel);
        }
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R3: " + String((tmp + this.R3.position -2)));
        tmp = this.R3.wheel[(tmp + this.R3.position -2) > 25 ? 0 : ((tmp + this.R3.position -2) < 0) ? 25 : (tmp + this.R3.position -2)];
        if(this.R2.cnt == 26){
            this.R2.cnt = 0;
            this.R3.position++;
            this.R3.rotateRotator(2);
            console.log(this.R3.wheel);
        }
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos UKW: " + String((tmp-1)));
        tmp = this.UKW[tmp-1];
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R3: " + String((tmp + this.R3.position -2)));
        tmp = this.R3.wheel[(tmp + this.R3.position -2) > 25 ? 0 : ((tmp + this.R3.position -2) < 0) ? 25 : (tmp + this.R3.position -2)];
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R2: " + String((tmp + this.R2.position -2)));
        tmp = this.R2.wheel[(tmp + this.R2.position -2) > 25 ? 0 : ((tmp + this.R2.position -2) < 0) ? 25 : (tmp + this.R2.position -2)];
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("From: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        console.log("Array Pos R1: " + String((tmp + this.R1.position -2)));
        tmp = this.R1.wheel[((tmp + this.R1.position -2) > 25) ? 0 : ((tmp + this.R1.position -2) < 0) ? 25 : (tmp + this.R1.position -2)];
        console.log("To: " + String(tmp) + " - " + String.fromCharCode(tmp+64));
        var output = this.plugboard[tmp-1] != 0 ? this.plugboard[tmp-1] : tmp;
        document.getElementById('output').innerHTML = output;
        console.log("#");
    };
}



