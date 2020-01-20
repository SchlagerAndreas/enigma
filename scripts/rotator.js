class Rotator{
    constructor(wheelNumber,rotatorNumber){ 
        //whellConf 1-5 are the internal configuration of the original rotators of the enigma
        this.wheel1Conf = [5,11,13,6,12,7,4,17,22,26,14,20,15,23,25,8,24,21,19,16,1,9,2,18,3,10];
        this.wheel2Conf = [1,10,4,11,19,9,18,21,24,2,12,8,23,20,13,3,17,7,26,14,16,25,6,22,15,5];
        this.wheel3Conf = [2,4,6,8,10,12,3,16,18,20,24,22,26,14,25,5,9,23,7,1,11,13,21,19,17,15];
        this.wheel4Conf = [5,19,15,22,16,26,10,1,25,17,21,9,18,8,24,12,14,6,20,7,11,4,3,13,23,2];
        this.wheel5Conf = [22,26,2,18,7,9,20,25,21,16,19,4,14,8,12,24,1,23,13,10,17,15,6,5,3,11];
        this.wheelConf = [this.wheel1Conf, this.wheel2Conf, this.wheel3Conf, this.wheel4Conf, this.wheel5Conf];
        this.rotatorNum = rotatorNumber;
        this.wheel = this.wheelConf[wheelNumber];
        this.wheelNumber = wheelNumber + 1;
        this.rotateBlocked = false;
        this.initialPosition = 1; //wich position the rotator is set at the start of the encryption
        this.activePosition = 1; //wich position the rotator is now
        var tmp = document.getElementById("rotator" + this.rotatorNum);
        var that = this;
        if(tmp != null){
            tmp.addEventListener("change",function(e){
                that.setRotator(e.target.value);
            });
        }
        tmp = document.getElementById("rotatorIpos" + this.rotatorNum);
        if(tmp != null){
            tmp.addEventListener("click",function(){
                that.incPos()
            })
        }
        tmp = document.getElementById("rotatorDpos" + this.rotatorNum);
        if(tmp != null){
            tmp.addEventListener("click",function(){
                that.decPos()
            })
        }
        
    };
    /**
     * set wich rotator will be used and rotates it if necessery
     * @param {Number} w the number wich tetermite wich rotor will be used
     */
    setRotator(w){
        this.wheel = this.wheelConf[w-1];
        this.wheelNumber = parseInt(w,10);
        this.rotateRotator(this.activePosition);
    };
    /**
     * increase the position of the rotor 1 and print it out
     */
    incPos(){
        this.initialPosition = this.activePosition == 26 ? 1 : this.activePosition + 1;
        var tmp = String.fromCharCode(this.initialPosition + 64) + " " + this.initialPosition.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
        this.rotateRotator(2);
        this.activePosition = this.activePosition == 26 ? 1 : this.activePosition + 1;
    };
    /**
     * lowers the position from the rotator 1 and print it out
     */
    decPos(){
        this.initialPosition = this.activePosition == 1 ? 26 : this.activePosition - 1;
        var tmp = String.fromCharCode(this.initialPosition + 64) + " " + this.initialPosition.toString();
        document.getElementById("rotatorPos" + this.rotatorNum).innerHTML = tmp;
        this.rotateRotator(26);
        this.activePosition = this.activePosition == 1 ? 26 : this.activePosition - 1;
    };
    /**
     * rotates the rotator, by copiing the last character of the array to the position 0 and then deleting the last one
     * @param {Number} count how often the rotator should rotate; Attention! pos = 2 means one rotation
     */
    rotateRotator(count){
        for(var i = 0; i < (count); i++){
            this.wheel.unshift(this.wheel[25]);
            this.wheel.pop();
        }
    };
}