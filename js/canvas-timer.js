	var c = document.getElementById("canvas");
	var ctx = c.getContext("2d");
	var cCenter = c.width / 2;

	ctx.imageSmoothingEnabled = false;

	devicePixelRatio = devicePixelRatio || 1,
	backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
							ctx.mozBackingStorePixelRatio ||
							ctx.msBackingStorePixelRatio ||
							ctx.oBackingStorePixelRatio ||
							ctx.backingStorePixelRatio || 1;

	ctx.translate(0.5, 0.5)

	function drawCircle(circleD, context){
			context.beginPath();
			context.arc(circleD.x, circleD.y , circleD.radius, circleD.start, circleD.end ,false);
			context.lineCap='round';
			context.fillStyle = 'red';
			context.strokeStyle = circleD.color;
			context.lineWidth = (circleD.lineH)? circleD.lineH : 10;
			context.strokeWidth = 15;
			context.stroke();
	}

	function drawBase (stream){
			ctx.strokeStyle = '#101010';
			ctx.fillStyle = '#101010';
			ctx.lineWidth = 4;
			ctx.beginPath();
			ctx.arc(cCenter, cCenter, cCenter-10,0,2*Math.PI, false);
			ctx.fill();
			ctx.beginPath();
			ctx.arc(cCenter, cCenter, cCenter-20,0,2*Math.PI, false);
			ctx.fill();
			ctx.stroke();



			ctx.font = 'small-caps 10pt sans-serif';
	}

	function spacing(value){
			if( value < 10){
					value = "0"+value;
			}
			return value;
	}

	function pourcent(value, limit){
			var result = value * 100 / limit;
			return result;
	}

	// SET CLOCK
	var circle3 = {
			x : cCenter,
			y : cCenter,
			radius : cCenter,
			start : -Math.PI / 2,
			end : 0,
	}
	//TIMER S
	var circle2 = {
			x : cCenter,
			y : cCenter,
			radius : cCenter -30,
			start : -Math.PI / 2,
			end : 0,
	}
	var circle1 = {
			x : cCenter,
			y : cCenter,
			radius : cCenter-20,
			start : -Math.PI / 2,
			end : 0,
	}
	// SEC CLOCK
	circle6 = {
			x : cCenter,
			y : cCenter,
			radius : cCenter -20,
			start : -Math.PI / 2,
			end : 0,
			color : "#00B8B8"
	}
	//TIMER MS
	circle4 = {
			x : cCenter,
			y : cCenter,
			radius : cCenter -20,
			start : -Math.PI / 2,
			end : 0,
			color : "#BF1736"
	}
	circle5 = {
			x : cCenter,
			y : cCenter,
			radius :cCenter -100,
			start : -Math.PI / 2,
			end : 0,
			color : "white",
			lineH : 10,
	}

	function Circle(circle){
			this.x = circle.x,
			this.y = circle.y,
			this.radius = circle.radius,
			this.start = circle.start,
			this.end = circle.end,
			this.color = circle.color;
	}


	function drawTimer(stream){
			ms = stream.ms;
			s = stream.s;
			min = stream.min;
			hr = stream.hr;

			ctx.clearRect(0, 0, c.width, c.height);
			drawBase(stream);

			pourcentMs = pourcent(ms, 1000);
			pourcentS = pourcent(s, 60);
			pourcentMin = pourcent(min, 60);

			var end = Math.PI * 2 / 100;

			circle4.start = end * pourcentMs - Math.PI / 2 - .05;
			circle4.end = end * pourcentMs - Math.PI / 2;
			circle4.color = "#BF1736";
			circle2.end = end * pourcentS - Math.PI / 2;
			circle2.lineH = 4;
			circle2.color = "#BF1736";
			circle3.end = end * pourcentMin - Math.PI / 2;
			circle3.lineH = 4;
			circle3.color = "#BF1736";
			circle3.radius = cCenter - 40;

			drawCircle(circle4, ctx);
			drawCircle(circle2, ctx);
			drawCircle(circle3, ctx);
	}


	function drawChrono(stream){
			ms = stream.ms;
			s = stream.s;
			min = stream.min;
			hr = stream.hr;

			pourcentMs = pourcent(ms, 1000);
			pourcentS = pourcent(s, 60);
			pourcentMin = pourcent(min, 60);

			var end = Math.PI * 2 / 100;
			circle1.end = end * pourcentMs - Math.PI / 2;
			circle1.color = "darkCyan";
			circle2.end = end * pourcentS - Math.PI / 2;
			circle2.color = "#00B8B8";
			circle2.lineH = 10;
			circle3.end = end * pourcentMin - Math.PI / 2;
			circle3.color = "cyan";
			circle3.lineH = 10;
			circle3.radius = cCenter - 40;

			ctx.clearRect(0, 0, c.width, c.height);
			drawBase(stream);
			drawCircle(circle3, ctx);
			drawCircle(circle2, ctx);
			drawCircle(circle1, ctx);
	}

	function drawClock(stream){
			ctx.clearRect(0, 0, c.width, c.height);
			drawBase(stream);
			var pourcentS = stream.s * 100 / 60;
			var newCircle = new Circle(circle6);
			newCircle.start = - Math.PI / 2;
			newCircle.end = pourcentS * Math.PI *2/100 - Math.PI / 2;

			drawCircle(newCircle, ctx);
	}

	mytimer.chrono.animation = function(stream){
			var score = angular.element(document.getElementById("canvas")).scope();
			score.scoreThis(stream);
			animationFrame = drawChrono(stream);
			requestAnimationFrame = drawChrono(stream);
	}

	mytimer.clock.animation = function(stream){
			var score = angular.element(document.getElementById("canvas")).scope();
				score.scoreThis(stream);
				animationFrame = drawClock(stream);
				requestAnimationFrame = drawClock(stream);

	};

	mytimer.timer.animation = function(stream){
			var score = angular.element(document.getElementById("canvas")).scope();
			score.scoreThis(stream);
			animationFrame = drawTimer(stream);
			requestAnimationFrame = drawTimer(stream);
	};

	drawBase(true);
