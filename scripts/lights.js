class Lights{
    constructor(){
        this.radius = 15;
        this.spaceBetweenXpos = 5;
        this.spaceBetweenYpos = 5;
        this.initializeXpos = 20;
        this.initializeYpos = 20;
        this.offset = 20;
        /**
         * @type {CanvasRenderingContext2D}
         */
        this.ctx = document.getElementById("outputLights").getContext("2d");
        this.drawOutputLights();
    }
    /**
     * Draws all lights of into the canvas
     */
    drawOutputLights(){
        for(var j = 0; j < 9; j++){
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j * 2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(65+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius*2,this.radius*2);

        }
        for(var j = 0; j < 8; j++){
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos + this.radius*2 + this.spaceBetweenYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(74+j),this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+this.radius*2 + this.spaceBetweenYpos,this.radius*2,this.radius*2);
        }
        for(var j = 0; j < 9; j++){
            this.ctx.fillStyle = "#FFFFFF";
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2 + this.spaceBetweenYpos) * 2,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(82+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2+ this.spaceBetweenYpos) * 2,this.radius*2,this.radius*2);
        }
        
    }
    /**
     * redraw the complete canvas but set on light on (fill the circle yellow)
     * @param {Number} letter wich of the lights turn on
     */
    setLightOn(letter){
        for(var j = 0; j < 9; j++){
            if(letter == (j+1)){
                this.ctx.fillStyle = "#FFFF00";
            }
            else {
                this.ctx.fillStyle = "#FFFFFF";
            }
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j * 2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(65+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos,this.radius*2,this.radius*2);

        }
        for(var j = 0; j < 8; j++){
            if(letter == (j+10)){
                this.ctx.fillStyle = "#FFFF00";
            }
            else {
                this.ctx.fillStyle = "#FFFFFF";
            }
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos + this.radius*2 + this.spaceBetweenYpos,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(74+j),this.initializeXpos+this.offset+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+this.radius*2 + this.spaceBetweenYpos,this.radius*2,this.radius*2);
        }
        for(var j = 0; j < 9; j++){
            if(letter == (j+18)){
                this.ctx.fillStyle = "#FFFF00";
            }
            else {
                this.ctx.fillStyle = "#FFFFFF";
            }
            this.ctx.beginPath();
            this.ctx.arc(this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2 + this.spaceBetweenYpos) * 2,this.radius,0,2*Math.PI);
            this.ctx.fill();
            this.ctx.stroke();
            this.ctx.fillStyle = "#000000";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText(String.fromCharCode(82+j),this.initializeXpos+(this.radius * j *2) + (j*this.spaceBetweenXpos),this.initializeYpos+(this.radius*2+ this.spaceBetweenYpos) * 2,this.radius*2,this.radius*2);
        }
    }
}