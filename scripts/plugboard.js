class Plugboard{
    constructor(){
        this.focusOn = 1;
        for(var i = 2; i <= 10; i++){
            var tmp = document.getElementById("inPlugBrd" + i);
            if(tmp != null){
                tmp.addEventListener("focus",function(){
                    this.blur();
                })
            }
        }
        
    };
    setFocus(from,to){

    }
}