//How the wheels are wired
var wheel1Conf = []
var wheel2Conf = []
var wheel3Conf = []
var wheel4Conf = []
var wheel5Conf = []
window.onload = function(){
    R1 = new Rotator(1);
    R2 = new Rotator(2);
    R3 = new Rotator(3);
}
//rotator class
class Rotator{
    constructor(numb){
        this.wheel = numb;
        this.position = 1;
        this.rotation = 1;
    };
    setRotator(r){
        this.wheel = r;
    };
    incPos(id){
        this.position = this.position < 26 ? this.position+1 : 1;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById(id).innerHTML = tmp;
    };
    decPos(id){
        this.position = this.position > 1 ? this.position-1 : 26;
        var tmp = String.fromCharCode(this.position + 64) + " " + this.position.toString();
        document.getElementById(id).innerHTML = tmp;
    };
    incRot(id){
        this.rotation = this.rotation < 26 ? this.rotation+1 : 1;
        var tmp = String.fromCharCode(this.rotation + 64) + " " + this.rotation.toString();
        document.getElementById(id).innerHTML = tmp;
    };
    decRot(id){
        this.rotation = this.rotation > 1 ? this.rotation-1 : 26;
        var tmp = String.fromCharCode(this.rotation + 64) + " " + this.rotation.toString();
        document.getElementById(id).innerHTML = tmp;
    };

    wheel;
    position;
    rotation;
};



