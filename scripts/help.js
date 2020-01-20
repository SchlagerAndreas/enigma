class HelpSite{
    constructor(){
        var that = this;
        var tmp = document.getElementById("helpBtn");
        if(tmp != null){
            tmp.addEventListener("click", function(){
                that.showHelp();
            })
        }
        tmp = document.getElementById("closeHelp");
        if(tmp != null){
            tmp.addEventListener("click", function(){
                that.hideHelp();
            })
        }
    };
    showHelp(){
        document.getElementById("help").dataset.visible = "true";
        this.visible = true;
    }
    hideHelp(){
        document.getElementById("help").dataset.visible = "false";
        this.visible = false;
    }
}