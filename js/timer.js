var mytimer = new timer();

function timer(){
	this.clock = {};
	this.chrono = {};
	this.timer = {};
	this.timer.setTime = {};
	this.interval = null;
	this.alarm = {};
	this.chrono.time =
	{
		date : "",
		ms : 0,
		s : 0,
		min : 0,
		hr : 0,
	};
}

//////////////////////
timer.prototype.init = function() {
	//REMOVE HORLOGE
	var init = {};
	var self = this;
	init.chrono = function(){
			clearInterval(self.interval)
			self.mode = "chrono";
			var active = self.chrono.active;
			if(active){
				self.start();
			}
			self.stream();
		};
	init.clock = function(){
			clearInterval(self.interval)
			self.mode = "clock";
			self.start();
			return self.mode;
		};
	init.timer = function(){
			clearInterval(self.interval)
			self.mode = "timer";
			self.timer.time = self.timer.setTime;
			self.stream()
			if(self.timer.active){
				self.start();
			}else{
				// self.pause.call(self)
			}
		};
	return init;
};

timer.prototype.treatement = function() {
	var self = this;
	var treatement = {};
	treatement.chrono = function(dateR){
		var initTime = self.chrono.initTime;
		var elapse = self.chrono.elapse;
		if(!initTime){
			if(elapse){
				$subTime(dateR, elapse);
			}
			self.chrono.initTime = dateR;
			return;
		}else{
			$subTime(dateR, initTime);
			self.chrono.time = dateR;
		}
		self.stream();
	};
	treatement.clock = function(){
		clock = self.clock;
		newDate = new $date();
		clock.time =newDate;
		self.stream();
		return clock;
	};
	treatement.timer = function(){
		var initTime = self.timer.initTime;
		if(!initTime){
			newDate = new $date();
			this.timer.time = this.timer.setTime;
			self.timer.initTime = newDate;
		}
		else{
			newDate = new $date();
			self.timer.elapse = $subTime(newDate, self.timer.initTime);
			var setTime = self.timer.setTime;
			var elapse = self.timer.elapse;
			var tt = {};
			tt.ms = setTime.ms;
			tt.s = setTime.s;
			tt.min = setTime.min;
			tt.hr = setTime.hr;

			self.timer.time = $subTime(tt, elapse);
			self.stream();
		}
	};
	return treatement;
};

timer.prototype.stream = function() {
	var mode = this.mode,
		resolve = this[mode].time;
		if(this[mode].animation){
			this[mode].animation(resolve);
		}
		this.checkAlarm();
	return resolve;
};

timer.prototype.set = function(setTime) {
	setTrigger.call(this, setTime);
};

timer.prototype.checkAlarm = function() {
	checkAlarm.call(this)
};

timer.prototype.start = function() {
	loop.call(this);
	if(this.mode === "timer"){
		setAlarm.call(this, this.timer.time);
	}
};

timer.prototype.pause = function(){
	pause.call(this);
};
timer.prototype.restart = function() {
	restart.call(this);
};

function loop(modeD){
	var self = this;
	var mode = modeD || this.mode;
	this[mode].active = true;
	this.interval = window.setInterval(loop, 10);

	function loop(el, index){
		newDate = new $date();
		self.treatement()[self.mode](newDate);
	}
}
function pause(modeD){
	var mode = this.mode ;
	var newDate = new $date();
	clearInterval(this.interval)
	this[mode].active = false;
	var elapse = this[mode].time;

	this.treatement()[this.mode](newDate);
	this[mode].initTime = false;
	this[mode].elapse = elapse;

	if(mode === "timer"){
		this[mode].setTime = this[mode].time;
	}
}
function restart(){
	var time = this.chrono.time;
	time.ms = 0;
	time.s = 0;
	time.min = 0;
	time.getHours = 0;
	this.stream();

	this.chrono.elapse = 0;
}
function $date(){
	var newDate = new Date();
	this.date = newDate;
	this.ms = newDate.getMilliseconds();
	this.s = newDate.getSeconds();
	this.min = newDate.getMinutes();
	this.hr = newDate.getHours();
	return this;
}
function $subTime(dateR, soustracted){
	dateR.ms -= soustracted.ms;
	dateR.s -= soustracted.s;
	dateR.min -= soustracted.min;
	dateR.hr -= soustracted.hr;
	if(dateR.ms < 0){
		dateR.ms += 1000;
		dateR.s--;
	}
	if(dateR.s < 0){
		dateR.s += 60;
		dateR.min--;
	}
	if(dateR.min < 0){
		dateR.min += 60;
	}
	if(dateR.hr < 0){
		dateR.hr += 24;
	}
	if(dateR.s === 60){
		dateR.min ++;
	}
	if(dateR.min === 60){
		dateR.hr ++;
	}
	return dateR;
}

function $supTime(newTime){
	if(newTime.ms > 1000){
		min = Math.floor(newTime.ms / 1000);
		rest = newTime.ms - min*1000;
		newTime.ms = rest;
		newTime.s = min;
	}
	if(newTime.s > 60){
		min = Math.floor(newTime.s / 60);
		rest = newTime.s - min * 60;
		newTime.min += min;
		newTime.s = rest;
	}
	if(newTime.min > 60){
		min = Math.floor(newTime.min / 60);
		rest = newTime.min - min * 60;
		newTime.hr += min;
		newTime.min = rest;
	}
	return newTime;
}

function setTrigger(setTime){
	var newDate = new $date();
	var time = this.timer.setTime;
	time.ms = setTime.ms || 0;
	time.s = setTime.s || 0;
	time.min = setTime.min || 0;
	time.hr = setTime.hr % 24 || 0;

	time = $supTime(time);
	this.stream();
}

function setAlarm(){
	time = this.timer.time;
	var newAlarm = new $date();
		newAlarm.ms += time.ms || 0;
		newAlarm.s += time.s || 0;
		newAlarm.min += time.min || 0;
		newAlarm.hr += time.hr%24 || 0;
		newAlarm = $supTime(newAlarm);
	this.alarm = newAlarm;
	return newAlarm;
}


function checkAlarm(){
	var alarm = this.alarm;
	if(alarm.ms === undefined){
		return;
	}
	newDate = new $date();
	if(newDate.hr === alarm.hr){
		if(newDate.min === alarm.min){
			if(newDate.s >= alarm.s){
				alert("oiu")
				var time = this.timer.time;
				time.ms = 0;
				time.s = 0;
				time.min = 0;
				time.hr = 0;
				this.timer.active = false;
				this.stream();
				this.alarm.callback();
				clearInterval(this.interval)
			};
		}
	}
}
///////CHRONO
