class Plugboard{
    constructor(enigmaClass){
        this.focusOn = 1;
        this.enigma = enigmaClass;
        this.templateELFocus = function(){this.blur();};
        var that = this;
        for(var i = 2; i <= 10; i++){
            that.setFocus(i);
        }
        var tmp = document.getElementById("inPlugBrd1");
        if(tmp != null){
            tmp.addEventListener("input",function(){
                if(tmp.value.length == 2){
                    that.handleInput(1,tmp.value);
                }
            })
        }
    };
    loseFocus(id){
        var tmp = document.getElementById("inPlugBrd" + id);
        if(tmp != null){
            tmp.removeEventListener("focus",this.templateELFocus)
        }
    }
    setFocus(id){
        var tmp = document.getElementById("inPlugBrd" + id);
        if(tmp != null){
            tmp.addEventListener("focus",this.templateELFocus)
        }
    }
    handleInput(id,input){
        if(input[0] != input[1]){
            if(input[0].match(/^[a-zA-Z]$/) && input[1].match(/^[a-zA-Z]$/)){
            
            }
        }
    }
    
}