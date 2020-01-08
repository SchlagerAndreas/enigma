class Plugboard{
    constructor(enigmaClass){
        this.focusOn = 1;
        var that = this;
        this.enigma = enigmaClass;
        this.tmp;
        this.templateELFocus = function(){this.blur();};
        this.templateELInput = function(){that.handleInput(that.focusOn,this.value);};
        for(var i = 2; i <= 10; i++){
            that.noFocus(i);
        }
        that.setFocus(1);
        this.antiInputEvent();
    };
    antiInputEvent(){
        var tmp;
        var that = this;
        for(var i = 1; i <= 10;i++){
            tmp = document.getElementById("inPlugBrd" + i);
            if(tmp != null){
                tmp.addEventListener("focus",function(){
                    that.enigma.setKeyboardOff();
                })
                tmp.addEventListener("blur",function(){
                    that.enigma.setKeyboardOn();
                })
            }
        }
    }
    /**
     * removes anti-focus event and adds the input event
     * @param {Number} id   wich input field of the plugboard is used 
     */
    setFocus(id){
        var tmp = document.getElementById("inPlugBrd" + id);
        if(tmp != null){
            tmp.removeEventListener("focus",this.templateELFocus);
            this.focusOn = id;
            tmp.addEventListener("input",this.templateELInput);
            tmp.focus();
        }
    }
    /**
     * removes the input event and adds the anti-focus event
     * @param {Number} id wich input field of the plugboard is used
     */
    noFocus(id){
        var tmp = document.getElementById("inPlugBrd" + id);
        if(tmp != null){
            tmp.removeEventListener("input",this.templateELInput);
            tmp.addEventListener("focus",this.templateELFocus);
            tmp.blur();
        }
    }
    /**
     * gets a inputstring chesck if the parameters are corredct adds this to the plugboard in the enigma class and set the focus to the next field
     * @param {Number} id wich input of the plugboard is used   
     * @param {String} input the input string wich contains the text of the input
     */
    handleInput(id,input){
        if(input.length == 2){
            if(input[0] != input[1]){
                if(input[0].match(/^[a-zA-Z]$/) && input[1].match(/^[a-zA-Z]$/)){
                    if(this.checkPlugboard(input) == false){
                        console.log("Plugboard Send");
                        this.enigma.setPlugboard(input);
                        if(id != 10){
                            this.noFocus(id);
                            this.setFocus(id+1);
                        }
                    }
                    else{
                        var tmp = document.getElementById("inPlugBrd" + (id));
                        if(tmp != null){
                            tmp.value = "";
                        }
                        //error not a letter used in plugboard
                    }
                }
                else{
                    var tmp = document.getElementById("inPlugBrd" + (id));
                    if(tmp != null){
                        tmp.value = "";
                    }
                    //error not a letter used in plugboard
                }
            }
            else{
                var tmp = document.getElementById("inPlugBrd" + (id));
                if(tmp != null){
                    tmp.value = "";
                }
                //error same letter in plugboard
            }
        }
        else if(input == "" && id != 1){
            var tmp = document.getElementById("inPlugBrd" + (id-1));
            if(tmp != null){
                tmp.value = "";
            }
            this.noFocus(id);
            this.setFocus(id-1);
        }
        else if(id == 10){
            
        }
    }
    /**
     * checks if one of the letter is used twice within the plugboard, if a letter is used twice it returns true else false
     * @param {String} input the input wich will be checked 
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
}