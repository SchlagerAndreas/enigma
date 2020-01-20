class UKW{
    constructor(ukwNumber){
        var that = this;
        this.UKWAConf = [5,10,13,26,1,12,25,24,22,2,23,6,3,18,17,21,15,14,20,19,16,9,11,8,7,4];
        this.UKWBConf = [25,18,21,8,17,19,12,4,16,24,14,7,15,11,13,9,5,2,6,26,3,23,22,10,1,20];
        this.UKWCConf = [6,22,16,10,9,1,15,25,5,4,18,26,24,23,7,3,20,11,21,17,19,2,14,13,8,12];
        this.UKWConf = [this.UKWAConf,this.UKWBConf,this.UKWCConf];
        this.ukw = this.UKWConf[ukwNumber];
        this.tmplELsetUKW = function(e){that.setupUKW(e.target.value)};
        var tmp = document.getElementById("UKW");
        if(tmp != null){
            tmp.addEventListener("change",this.tmplELsetUKW);
        }
    }

    setupUKW(tmp){
        this.ukw = this.UKWConf[tmp-1];
    }
    /**
     * takes a character and let it through the UKW
     * @param {Number} input the input character wich goes through the UKW
     */
    goThroughUKW(input){
        return this.ukw[input -1];
    }
    
}
