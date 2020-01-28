class Input{
    constructor(callbackKEyboard){
        this.activeType = "begin";
        this.inputBlocked = false;
        this.KeyInCallback = callbackKEyboard;
        var that = this;
        this.templELKeyboard = function(e){if(e.key.match(/^[a-zA-Z]$/) && !that.inputBlocked){that.handleKeyboardInput(e.key);}};;
        this.templELEncBtn = function(){that.handleTextInput()};
        this.templELnoFocus = function(){this.blur();};
        this.templELSwitchInput = function(){that.switchInputType()};
        var tmp = document.getElementById("inputText");
        if(tmp != null){
            tmp.addEventListener("focus",that.templELnoFocus);
        }
        tmp = document.getElementById("inputSwitch");
        if(tmp != null){
            tmp.addEventListener("change",that.templELSwitchInput);
        } 
        tmp = document.getElementById("outputText");
        if(tmp != null){
            tmp.addEventListener("focus",that.templELnoFocus)
        }
        this.switchInputType();
    }
    /**
     * switches from keyboard to text input and vice versa
     */
    switchInputType(){
        if(this.activeType == "keyboard"){
            this.activeType = "text";
            document.body.removeEventListener("keyup", this.templELKeyboard);
            var tmp = document.getElementById("btnEncrypt");
            if(tmp != null){
                tmp.addEventListener("click",this.templELEncBtn);
            }
            tmp = document.getElementById("inputText");
            if(tmp != null){
                tmp.removeEventListener("focus",this.templELnoFocus);
            }
        }
        else{
            document.body.addEventListener("keyup",this.templELKeyboard);
            this.activeType ="keyboard";
            var tmp = document.getElementById("btnEncrypt");
            if(tmp != null){
                tmp.removeEventListener("click",this.templELEncBtn);
            }
            tmp = document.getElementById("inputText");
            if(tmp != null){
                tmp.addEventListener("focus",this.templELnoFocus);
            }
        }
    }
    /**
     * Turns on/off the whole input
     * @param {Boolean} off if its true it will set it off else it will set it on
     */
    turnInputOnOff(off){
        if(off){
            document.body.removeEventListener("keyup", this.templELKeyboard);
            return;
        }
        else if(this.activeType == "keyboard"){
            document.body.addEventListener("keyup", this.templELKeyboard);
            return;
        }
        else{
            //activate text input
        }
    }
    /**
     * Takes the Key and make it in a enigma readble code p.e.: A=65/a=96 to A/a = 1 and sends it into the encryption function
     * @param {Character} input the key pressed on keyboard
     */
    handleKeyboardInput(input){
        var tmp = input.charCodeAt();
        tmp = tmp > 96 ? tmp - 96 : tmp - 64;
        this.KeyInCallback(tmp,false);
    }
    handleTextInput(){
        var tmp1 = document.getElementById("inputText").value;
        var tmp2 = tmp1.split("");
        var output = [];
        var tmp3 = document.getElementById("outputText");
        tmp3.value = "";
        for(var i = 0; i < tmp2.length; i++){
            if(tmp2[i].match(/^[a-zA-Z]$/)){
                tmp2[i] = tmp2[i].charCodeAt();
                tmp2[i] = tmp2[i] > 96 ? tmp2[i] - 96 : tmp2[i] -64;
                output[i] = this.KeyInCallback(tmp2[i],true);
                output[i] = String.fromCharCode(output[i] + 64);
            }
            else{
                output[i] = tmp2[i]; //if it isnt a letter it will be not encrypted
            }
            tmp3.value += output[i];
        }
    }
}