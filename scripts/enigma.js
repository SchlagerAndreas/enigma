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

//to go quickly thrugh the enigma
function test(){setTimeout(()=>{document.body.dispatchEvent(new KeyboardEvent ("keyup",{key: 'a'}));test()},10);}

class Enigma{
    constructor(){
         /*Default Settings:
          -Rotors at Position A-1
          -Rotors I,II and III are used
          -UKW-A is used
          -nothing is pluged in in the Plugboard
        */
        var that = this;
        this.inputClass = new Input((input) => {this.encryptLetter(input);});
        this.R1 = new Rotator(0,1);
        this.R2 = new Rotator(1,2);
        this.R3 = new Rotator(2,3);
        this.UKWClass = new UKW(1);
        this.plugboard = new Plugboard(this.inputClass);
        this.outputLights = new Lights();
    }
    /**
     * takes a input and encrypt it through the enigma
     * @param {Number} input character wich will be encrypt 
     */
    encryptLetter(input){
        if(this.checkRotators){
            var tmp = input;
            tmp = this.goThroughRotator(this.R1,tmp,false);
            tmp = this.goThroughRotator(this.R2,tmp,false);
            tmp = this.goThroughRotator(this.R3,tmp,false);
            tmp = this.UKWClass.goThroughUKW(tmp);
            tmp = this.goThroughRotator(this.R3,tmp,true);
            tmp = this.goThroughRotator(this.R2,tmp,true);
            tmp = this.goThroughRotator(this.R1,tmp,true);
            var output = this.plugboard.goThroughPlugboard(tmp);
            document.getElementById("rotatorPos1").innerHTML = String.fromCharCode(this.R1.activePosition + 64) + " " + this.R1.activePosition.toString();
            document.getElementById("rotatorPos2").innerHTML = String.fromCharCode(this.R2.activePosition + 64) + " " + this.R2.activePosition.toString();
            document.getElementById("rotatorPos3").innerHTML = String.fromCharCode(this.R3.activePosition + 64) + " " + this.R3.activePosition.toString();
            this.outputLights.setLightOn(output);
            this.inputClass.inputBlocked = false;
        }
        else{
            //error->same rotors used
        }
    };
    /**
     * takes a string and encrypts the complete string
     * @param {String} input 
     */
    encryptText(input){

    }
    
    /**
     * takes an input character and let it through a rotator, also rotates the rotator if necessery
     * @param {Rotator} rotator through wich rotor its going
     * @param {Number} input the input character
     * @param {boolean} backwards if it comes from the keyboard or the UKW, because in backwards direction the rotors doesnt rotate
     * @returns {Number} 
     */
    goThroughRotator(rotator,input,backwards){
        var tmp = rotator.wheel[input - 1];
        if(!backwards){
            if(rotator.rotatorNum == 1){
                rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                rotator.rotateRotator(1);
            }
            else if(rotator.rotatorNum == 2){
                switch(this.R1.wheelNumber){
                    case 1: if(this.R1.activePosition == 18){  
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        this.R3.rotateBlocked = false;
                    }break;
                    case 2: if(this.R1.activePosition== 6){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        this.R3.rotateBlocked = false;
                    }break;
                    case 3: if(this.R1.activePosition== 23){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        this.R3.rotateBlocked = false;
                    }break;
                    case 4: if(this.R1.activePosition == 11){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        this.R3.rotateBlocked = false;
                    }break;
                    case 5: if(this.R1.activePosition == 26){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        this.R3.rotateBlocked = false;
                    }break;
                }
            }
            else if(rotator.rotatorNum == 3){
                switch(this.R2.wheelNumber){
                    case 1: if(this.R2.activePosition == 18 && !rotator.rotateBlocked){  
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        rotator.rotateBlocked = true;
                    }break;
                    case 2: if(this.R2.activePosition== 6 && !rotator.rotateBlocked){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        rotator.rotateBlocked = true;
                    }break;
                    case 3: if(this.R2.activePosition== 23 && !rotator.rotateBlocked){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        rotator.rotateBlocked = true;
                    }break;
                    case 4: if(this.R2.activePosition == 11 && !rotator.rotateBlocked){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        rotator.rotateBlocked = true;
                    }break;
                    case 5: if(this.R2.activePosition == 26 && !rotator.rotateBlocked){
                        rotator.activePosition = (rotator.activePosition + 1) > 26 ? 1 : (rotator.activePosition + 1);
                        rotator.rotateRotator(1);
                        rotator.rotateBlocked = true;
                    }break;
                }
            }
            
        }
        return tmp;
    }

    checkRotators(){
        if(this.R1.wheelNumber == this.R2.wheelNumber){
            return false;
        }
        else if(this.R1.wheelNumber == this.R3.wheelNumber){
            return false;
        }
        else if(this.R2.wheelNumber == this.R3.wheelNumber){
            return false;
        }
        else{
            return true;
        }
    }
}





