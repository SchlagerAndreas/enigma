//How the wheels are wired
var wheel1Conf = [5,11,13,6,12,7,4,17,22,26,14,20,15,23,25,8,24,21,19,16,1,9,2,18,3,10]
var wheel2Conf = [1,10,4,11,19,9,18,21,24,2,12,8,23,20,13,3,17,7,26,14,16,25,6,22,15,5]
var wheel3Conf = [2,4,6,8,10,12,3,16,18,20,24,22,26,14,25,5,9,23,7,1,11,13,21,19,17,15]
var wheel4Conf = [5,19,15,22,16,26,10,1,25,17,21,9,18,8,24,12,14,6,20,7,11,4,3,13,23,2]
var wheel5Conf = [22,26,2,18,7,9,20,25,21,16,19,4,14,8,12,24,1,23,13,10,17,15,6,5,3,11]
var wheelConf = [wheel1Conf, wheel2Conf, wheel3Conf, wheel4Conf, wheel5Conf]
var UKWAConf = [5,10,13,26,1,12,25,24,22,2,23,6,3,18,17,21,15,14,20,19,16,9,11,8,7,4]
var plugboard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


/*
        A B C D E F G H I J K L M N O P Q R S T U V W X Y Z
I       E K M F L G D Q V Z N T O W Y H X U S P A I B R C J
II      A J D K S I R U X B L H W T M C Q G Z N P Y F V O E
III     B D F H J L C P R T X V Z N Y E I W G A K M U S Q O
IV      E S O V P Z J A Y Q U I R H X L N F T G K D C M W B
V       V Z B R G I T Y U P S D N H L X A W M J Q O F E C K
*/

window.onload = function(){
    R1 = new Rotator(wheel1Conf, 1);
    R2 = new Rotator(wheel2Conf, 2);
    R3 = new Rotator(wheel3Conf, 3);
    resetRotatorConf();
}
function resetRotatorConf(){
    wheel1Conf = [5,11,13,6,12,7,4,17,22,26,14,20,15,23,25,8,24,21,19,16,1,9,2,18,3,10];
    wheel2Conf = [1,10,4,11,19,9,18,21,24,2,12,8,23,20,13,3,17,7,26,14,16,25,6,22,15,5];
    wheel3Conf = [2,4,6,8,10,12,3,16,18,20,24,22,26,14,25,5,9,23,7,1,11,13,21,19,17,15];
    wheel4Conf = [5,19,15,22,16,26,10,1,25,17,21,9,18,8,24,12,14,6,20,7,11,4,3,13,23,2];
    wheel5Conf = [22,26,2,18,7,9,20,25,21,16,19,4,14,8,12,24,1,23,13,10,17,15,6,5,3,11];
    plugboard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
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
        tmp = document.getElementById("rotatorIrot" + this.rotatorNum);
        if(tmp != null){
            tmp.addEventListener("click",function(){
                that.incRot()
            })
        }
        tmp = document.getElementById("rotatorDrot" + this.rotatorNum);
        if(tmp != null){
            tmp.addEventListener("click",function(){
                that.decRot()
            })
        }
    };
    setRotator(wheel){
        this.wheel = wheelConf[wheel];
    };
    incPos(){
        this.position = this.position < 26 ? this.position+1 : 1;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
    };
    decPos(){
        this.position = this.position > 1 ? this.position-1 : 26;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
    };
    incRot(){
        this.rotation = this.rotation < 26 ? this.rotation+1 : 1;
        var tmp = String.fromCharCode(this.rotation + 64) + " " + this.rotation.toString();
        document.getElementById("rotatorRot" + this.rotatorNum).innerHTML = tmp;
    };
    decRot(){
        this.rotation = this.rotation > 1 ? this.rotation-1 : 26;
        var tmp = String.fromCharCode(this.rotation + 64) + " " + this.rotation.toString();
        document.getElementById("rotatorRot" + this.rotatorNum).innerHTML = tmp;
    };
};

function rotateRotator(conf,pos){
    for(var i = 0; i < (pos - 1); i++){
        conf.unshift(conf[25]);
        conf.pop();
    }
    console.log(R1.wheel);
    console.log(R2.wheel);
    console.log(R3.wheel);
}

function encrypt(input){
    rotateRotator(R1.wheel,R1.position);
    rotateRotator(R2.wheel,R2.position);
    rotateRotator(R3.wheel,R3.position);
    console.log(R1.wheel);
    console.log(R2.wheel);
    console.log(R3.wheel);
    console.log("From: " + String(input) + String.fromCharCode(input+64));
    var tmp = R1.wheel[((input + R1.position -2) > 25) ? 0 : ((input + R1.position -2) < 0) ? 25 : (input + R1.position -2)]; //the input character plus the position -1 because position 1 means 0 rotation of the rotator and -1 becuase an array begins with 0
    console.log("To: " + String(tmp) + String.fromCharCode(tmp+64));
    R1.position ++;
    R1.cnt++;
    rotateRotator(R1.wheel,R1.position);
    console.log("From: " + String(tmp) + String.fromCharCode(tmp+64));
    tmp = R2.wheel[(tmp + R2.position -2) > 25 ? 0 : ((tmp + R2.position -2) < 0) ? 25 : (tmp + R2.position -2)];
    if(R1.cnt == 26){
        R1.cnt = 0;
        R2.cnt++;
        R2.position++;
        rotateRotator(R2.wheel,R2.position);
    }
    console.log("To: " + String(tmp) + String.fromCharCode(tmp+64));
    console.log("From: " + String(tmp) + String.fromCharCode(tmp+64));
    tmp = R3.wheel[(tmp + R3.position -2) > 25 ? 0 : ((tmp + R3.position -2) < 0) ? 25 : (tmp + R3.position -2)];
    if(R2.cnt == 26){
        R2.cnt = 0;
        R3.position++;
        rotateRotator(R3.wheel,R3.position);
    }
    console.log("To: " + String(tmp) + String.fromCharCode(tmp+64));
    console.log("From: " + String(tmp) + String.fromCharCode(tmp+64));
    tmp = UKWAConf[tmp];
    console.log("To: " + String(tmp) + String.fromCharCode(tmp+64));
    console.log("From: " + String(tmp) + String.fromCharCode(tmp+64));
    tmp = R3.wheel[(tmp + R3.position -2) > 25 ? 0 : ((tmp + R3.position -2) < 0) ? 25 : (tmp + R3.position -2)];
    console.log("To: " + String(tmp) + String.fromCharCode(tmp+64));
    console.log("From: " + String(tmp) + String.fromCharCode(tmp+64));
    tmp = R2.wheel[(tmp + R2.position -2) > 25 ? 0 : ((tmp + R2.position -2) < 0) ? 25 : (tmp + R2.position -2)];
    console.log("To: " + String(tmp) + String.fromCharCode(tmp+64));
    console.log("From: " + String(tmp) + String.fromCharCode(tmp+64));
    tmp = R1.wheel[((input + R1.position -2) > 25) ? 0 : ((input + R1.position -2) < 0) ? 25 : (input + R1.position -2)];
    console.log("To: " + String(tmp) + String.fromCharCode(tmp+64));
    var output = plugboard[tmp] != 0 ? plugboard[tmp] : tmp;
    document.getElementById('output').innerHTML = output;
    console.log("#");
}


