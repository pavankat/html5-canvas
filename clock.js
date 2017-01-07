//clock

var c = document.querySelector("#clock");
var ctx = c.getContext("2d");
//make the radius half the height
	var radius = c.height / 2;

//Remap the (0,0) position (of the drawing object) to the center of the canvas:
	ctx.translate(radius, radius);

//Reduce the clock radius (to 90%) to draw the clock well inside the canvas:
	radius = radius * 0.90

setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius){
	var grad;

	//Draw the white circle:
		ctx.beginPath();
		ctx.arc(0, 0, radius, 0, 2*Math.PI);
		ctx.fillStyle = 'white';
		ctx.fill();

	//Create a radial gradient (95% and 105% of original clock radius):
		grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);

	//Create 3 color stops, corresponding with the inner, middle, and outer edge of the arc:
		grad.addColorStop(0, '#333');
		grad.addColorStop(0.5, 'white');
		grad.addColorStop(1, '#333');

	//Define the gradient as the stroke style of the drawing object:
		ctx.strokeStyle = grad;
	
	//Define the line width of the drawing object (10% of radius):
		ctx.lineWidth = radius*0.1;

	//draw the circle
		ctx.stroke();

	//Draw the clock center:
		ctx.beginPath();
		ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
		ctx.fillStyle = '#333';
		ctx.fill();
}

function drawNumbers(ctx, radius){
    var ang;
    var num;
    
    //Set the font size (of the drawing object) to 15% of the radius
    	ctx.font = radius*0.15 + "px arial";
    
    //Set the text alignment to the middle and the center of the print position:
	    ctx.textBaseline = "middle";
	    ctx.textAlign = "center";

	//Calculate the print position (for 12 numbers) to 85% of the radius, rotated (PI/6) for each number:
    for(num= 1; num < 13; num++){
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius*0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius*0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius){
    var now = new Date();

    //returns integer in military time
    var hour = now.getHours(); 

    //returns integer 0 to 60
    var minute = now.getMinutes(); 

    //returns integer 0 to 60
    var second = now.getSeconds(); 

    //convert military time to normal time
    hour = hour % 12; 

    //draw the hour hand
	    var hourAngle = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
	    //angle = hourAngle
	    //length = radius*0.5 to make the hour hand the shortest hand
	    //width = radius*0.07 to make the minute hand the same width as the hour hand
	    drawHand(ctx, hourAngle, radius*0.5, radius*0.07);

    //draw the minute hand
	    var minuteAngle = (minute*Math.PI/30)+(second*Math.PI/(30*60));
	   
	    //angle = minuteAngle
	    //length = radius*0.8 to make the minute hand slightly shorter than the second hand but bigger than the minute hand
	    //width = radius*0.07 to make the minute hand the same width as the hour hand
	    drawHand(ctx, minuteAngle, radius*0.8, radius*0.07);

    //draw the second hand
	    var secondAngle = (second*Math.PI/30); //at 6 it'll be Math.PI, at 12 it'll be 2*Math.PI
	    console.log(secondAngle);

	    //angle = secondAngle
	    //length = radius*0.9 to make the second hand the longest hand
	    //width = radius*0.02 to make the second hand the thinnest
	    drawHand(ctx, secondAngle, radius*0.9, radius*0.02);
}

//draws a line with a given length and width.
function drawHand(ctx, angle, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(angle);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-angle);
}