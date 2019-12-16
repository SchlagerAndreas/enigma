class Text{
    constructor(){
        this.textCnt = 2;
        var that = this;
        that.hideAllText();
        var tmp = document.getElementsByClassName("question");
        if(tmp != null){
            for(var i = 0; i < tmp.length; i++){
                tmp[i].addEventListener("click", function(){
                    that.hideShowText(this.id);
                });
            }
        }

    };
    hideAllText(){
        var tmp;
        for(var i = 0; i < this.textCnt; i++){
            tmp = "answer" + i.toString();
            document.getElementById(tmp).style.display = "none";
        }
    };
    hideShowText(id){
        var tmp1 = document.getElementById(id);
        if(tmp1.dataset.expanded == "false"){
            var tmp2 = "answer" + id.slice(1);
            document.getElementById(tmp2).style.display = "block";
            tmp1.dataset.expanded = "true";
        }
        else{
            var tmp2 = "answer" + id.slice(1);
            document.getElementById(tmp2).style.display = "none";
            tmp1.dataset.expanded = "false";
        }
    };
}