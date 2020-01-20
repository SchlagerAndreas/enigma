class Input{
    constructor(callbackKEyboard){
        this.activeType = "begin";
        this.inputBlocked = false;
        this.KeyInCallback = callbackKEyboard;
        var that = this;
        this.templELKeyboard = function(e){if(e.key.match(/^[a-zA-Z]$/) && !that.inputBlocked){that.handleKeyboardInput(e.key);}};;
        this.templELEncBtn;
        this.switchInputType();
    }
    /**
     * switches from keyboard to text input and vice versa
     */
    switchInputType(){
        if(this.activeType == "keyboard"){
            document.body.removeEventListener("keyup", this.templELKeyboard);
            //activate text input
        }
        else{
            document.body.addEventListener("keyup",this.templELKeyboard);
            this.activeType ="keyboard";
            //deactivate text input
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
        this.KeyInCallback(tmp);
    }
    handleTextInput(){

    }
}