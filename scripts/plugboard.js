class Plugboard{
    constructor(inputClass){
        this.plugboard = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        this.focusOn = 1;
        var that = this;
        this.templELBlur = function(){this.blur();};
        this.templELInputOff = function(){inputClass.turnInputOnOff(true)};
        this.templELInputOn = function(){inputClass.turnInputOnOff(false)};
        this.templELInput = function(){that.handleInput(this.value,false);};
        this.templELBackspace = function(e){if(e.key == "Backspace"){that.handleInput(this.value,true);e.preventDefault();return false}};
        this.setupInputs();
    };
    setupInputs(){
        for(var i = 1; i <= 10;i++){
            this.inputOffonFocus(i); 
        }
        for(var i = 2; i <= 10;i++){
            this.diableFocus(i);
        }
        this.setFocus(1);

    }
    addToPlugbrd(input){
       this.plugboard[this.convertInput(input[0])-1] = this.convertInput(input[1])
       this.plugboard[this.convertInput(input[1])-1] = this.convertInput(input[0])
       console.log(this.plugboard);
    }
    rmvFromPlugbrd(input){
        this.plugboard[this.convertInput(input[0])-1] = 0;
        this.plugboard[this.convertInput(input[1])-1] = 0;
        console.log(this.plugboard);

    }
    goThroughPlugboard(input){
        return this.plugboard[input - 1] != 0 ? this.plugboard[input - 1] : input;
    }
    diableFocus(id){
        var tmp = document.getElementById("inPlugBrd" + id);
        if(tmp != null){
            tmp.addEventListener("focus",this.templELBlur);
            tmp.removeEventListener("input", this.templELInput);
            tmp.removeEventListener("keyup", this.templELBackspace);
            tmp.blur();
        }
    }
    setFocus(id){
        var tmp = document.getElementById("inPlugBrd" + id);
        if(tmp != null){
            tmp.removeEventListener("focus",this.templELBlur);
            tmp.addEventListener("input", this.templELInput);
            tmp.addEventListener("keydown", this.templELBackspace);
            tmp.focus();
        }
    }
    /**
     * deactivates the input if plugboard is focused, to prevent to get a keyboard input when user writes in plugboard
     * @param {Number} id 
     */
    inputOffonFocus(id){
        var tmp = document.getElementById("inPlugBrd" + id);
        if(tmp != null){
            tmp.addEventListener("focus",this.templELInputOff); //deactivates input if focused
            tmp.addEventListener("blur",this.templELInputOn); //activates input if blured
        }
    }
    /**
     * 
     * @param {Array} input 
     */
    checkPlugboard(input){
        var tmp;
        for(var i = 1; i  < this.focusOn; i++){
           tmp = document.getElementById("inPlugBrd" + i);
           if(tmp != null){
               if(tmp.value[0] == input[0] || tmp.value[1] == input[0] || tmp.value[1] == input[0] || tmp.value[1] == input[1]){
                   return true;
               }
           } 
        }
        return false;
    }
    /**
     * 
     * @param {Array} input 
     * @param {Boolean} backspace 
     */
    handleInput(input,backspace){
        if(backspace){
            if(this.focusOn != 1){
                if(input.length == 0){
                    this.diableFocus(this.focusOn);
                    this.focusOn--;
                    this.setFocus(this.focusOn);
                    tmp = document.getElementById("inPlugBrd" + this.focusOn);
                    if(tmp != null){
                        this.rmvFromPlugbrd(tmp.value);
                        tmp.value = "";
                    }
                }
                else if(this.focusOn == 10){
                    tmp = document.getElementById("inPlugBrd" + this.focusOn);
                    if(tmp != null){
                        this.rmvFromPlugbrd(tmp.value);
                        tmp.value = "";
                    }
                }
            }
            else{
                var tmp = document.getElementById("inPlugBrd" + this.focusOn);
                if(tmp != null){
                    tmp.value = "";
                }
            }
        }
        else if(input.length == 2){
            if(input[0].match(/^[a-zA-Z]$/) && input[1].match(/^[a-zA-Z]$/)){
                if(input[0] != input[1]){
                    if(!this.checkPlugboard(input)){
                        this.addToPlugbrd(input);
                        if(this.focusOn != 10){
                            this.diableFocus(this.focusOn);
                            this.focusOn++;
                            this.setFocus(this.focusOn);
                        }
                    }
                    else{
                        var tmp = document.getElementById("inPlugBrd" + this.focusOn);
                        if(tmp != null){
                            tmp.value = "";
                        }
                        //error -> same letter in plugboard
                    }
                }
                else{
                    var tmp = document.getElementById("inPlugBrd" + this.focusOn);
                    if(tmp != null){
                        tmp.value = "";
                    }
                    //error -> same letter in input
                }
            }
            else{
                var tmp = document.getElementById("inPlugBrd" + this.focusOn);
                if(tmp != null){
                    tmp.value = "";
                }
                //error -> not a letter used
            }   
        }
        else if(input.length > 2){
            var tmp = document.getElementById("inPlugBrd" + this.focusOn);
            if(tmp != null){
                var tmp2 = [input[0],input[1]];
                tmp.value = "";
                tmp.value = tmp2[0] + tmp2[1];
            }
        }
    }
    convertInput(input){
        var tmp = input.charCodeAt();
        tmp = tmp > 96 ? tmp - 96 : tmp - 64;
        return tmp; 
    }
}