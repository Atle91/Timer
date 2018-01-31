$(document).ready(() => {
	let downWards, workTime,start,time,seconds, minutes, hours, timerOn, days,display;
	let down = false;
	const week = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	Storage.prototype.setObj = function(key, obj){
		return this.setItem(key, JSON.stringify(obj));
	}
	Storage.prototype.getObj = function(key, obj){
		return key, JSON.parse(this.getItem(key));
	}
	function init(){
		timerOn = false;
		if(localStorage.length !== 0){
			workTime = Number(localStorage.getItem("workTime"));
			$(".sec").get(0).firstChild.nodeValue = (seconds < 10)? "0"+seconds : seconds;
			$(".min").get(0).firstChild.nodeValue = (minutes < 10)? "0" + minutes : minutes;
			$(".hours").get(0).firstChild.nodeValue = (hours < 10)? "0" + hours : hours;
			days = (localStorage.getObj("days"))? localStorage.getObj("days") : [];
		}else{
			workTime = 0;
			days = [];
			
		}}
		init();

		$(".timer").on("click", ()=>{
			$(".timer").get(0).firstChild.nodeValue = "";
			startTimer();
		});

		function startTimer(){
			timerOn = !timerOn;
			if(timerOn) {
				timer()
				start = setInterval(() => timer(), 1000);
				display = setInterval(()=> displayWork(), 1000);
			}else{
				clearInterval(start);
				clearInterval(display);
				$(".timer").css("border-color","hsl(2, 47%, 57%)")
			}
		}

		function timer(){
			$(".timer").css("border-color","hsl(112, 21%, 53%)");
			workTime++;
			seconds = workTime % 60;
			minutes = Math.floor((workTime / 60) % 60);
			hours = Math.floor((workTime / 3600) % 60);
			$(".sec").get(0).firstChild.nodeValue = (seconds < 10)? "0"+seconds : seconds;
			$(".min").get(0).firstChild.nodeValue = (minutes < 10)? "0" + minutes : minutes;
			$(".hours").get(0).firstChild.nodeValue = (hours < 10)? "0" + hours : hours;
			setTimeout(() => $(".sec").css( "font-size","57px"), 750);
			setTimeout(() => $(".sec").css( "opacity","1"), 750);
			setTimeout(() => $(".sec").css( "font-size","36px"), 1250);
			setTimeout(() => $(".sec").css( "opacity","0"), 1250);
			localStorage.setItem("workTime", "" + workTime);
			localStorage.setItem("seconds", "" + seconds);
			localStorage.setItem("minutes", "" + minutes);
			localStorage.setItem("hours", "" + hours);
		}
	////test
	//startTimer();
	///
	$(".del").on("click", ()=>{
		reset();
		$(".confirm").css("opacity", "0");
		$(".confirm").css("z-index", "-1");
	})
	function reset(){
		clearInterval(start)
		clearInterval(display);
		localStorage.clear();
		$(".text").text(0+"%")
		$(".days").text("");
		$(".sec").get(0).firstChild.nodeValue = "";
		$(".min").get(0).firstChild.nodeValue = "";
		$(".hours").get(0).firstChild.nodeValue = "";
		$(".timer").get(0).firstChild.nodeValue = "Start";
		$(".timer").css("border-color","black")
		displayWork();
		init();
	}

	function resetDay(){
		clearInterval(start)
		clearInterval(display);
		const keepItem = localStorage.getObj("days");
		localStorage.clear();
		localStorage.setObj("days", keepItem);
		$(".text").text(0+"%")
		$(".days").text("");
		$(".sec").get(0).firstChild.nodeValue = "";
		$(".min").get(0).firstChild.nodeValue = "";
		$(".hours").get(0).firstChild.nodeValue = "";
		$(".timer").get(0).firstChild.nodeValue = (timerOn) ? "" : "Start";
		$(".timer").css("border-color","hsl(245, 43%, 14%)")
		displayWork();
		init();
	}

	function clearTime(){

	}

	function displayWork(){
		let percent = Math.round((workTime / 86400) * 10000) / 100;
		$(".progress").css("width", ""+percent+"%");
		$(".text").text(percent+"%")
	}
	displayWork();

	function logPreviousDay(){

		days.map((time, i) => {
			let day = $(document.createElement("li"));
			day.addClass("list"+i);
			let percent = Math.round((time / 86400) * 10000) / 100;
			let color = Math.min(127, percent * 2.5);
			day.css("width", percent+"%");
			day.css("background", "hsl("+color+", 36%, 39%)");

			let h = Math.floor(time / 3600);
			let m = Math.floor(time / 60);
			let timeAmount = h + ":" + m;
			day.text(timeAmount);
			day.prependTo(".days");

			let showPercent = $(document.createElement("li"));

			showPercent.addClass("perc");
			showPercent.text(percent + "%");
			showPercent.prependTo(".days");

			let now = new Date();
			let today = week[now.getDay()];
			let showDay = $(document.createElement("li"));
			showDay.addClass("date");
			showDay.text(today+"");
			showDay.prependTo(".days");
		})
		
	}


	$(".reset").on("click", ()=>{
		$(".confirm").css("opacity", "1");
		$(".confirm").css("z-index", "5");
	});
	$(".cancel").on("click", ()=>{
		$(".confirm").css("opacity", "0");
		$(".confirm").css("z-index", "-1");
	})




	let now = new Date;
	let msLeft = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 0) - now;
	setTimeout(() => newDay(), msLeft);
	function newDay(){
		let timeCopy = localStorage.getItem("workTime"); 
		let currTime = (timeCopy) ? timeCopy : "0:0:0";
		days.push(timeCopy);
		localStorage.setObj("days", days);
		if(timerOn){
			
			resetDay();
			startTimer();

		}else{
			resetDay();
		}
		logPreviousDay();
	};
	//setTimeout(() => newDay(), 4000);




	function countDown(){
		
		if(down){
			clearInterval(downWards);
			timer()
			start = setInterval(() => timer(), 1000);
			display = setInterval(()=> displayWork(), 1000);
		}else{

			clearInterval(start);
			$(".timer").css("border-color","hsl(1, 21%, 53%)");
			downWards = setInterval(() => {
				workTime--;
				seconds = workTime % 60;
				minutes = Math.floor((workTime / 60) % 60);
				hours = Math.floor((workTime / 3600) % 60);
				$(".sec").get(0).firstChild.nodeValue = (seconds < 10)? "0"+seconds : seconds;
				$(".min").get(0).firstChild.nodeValue = (minutes < 10)? "0" + minutes : minutes;
				$(".hours").get(0).firstChild.nodeValue = (hours < 10)? "0" + hours : hours;
				setTimeout(() => $(".sec").css( "font-size","57px"), 750);
				setTimeout(() => $(".sec").css( "opacity","1"), 750);
				setTimeout(() => $(".sec").css( "font-size","36px"), 1250);
				setTimeout(() => $(".sec").css( "opacity","0"), 1250);
				localStorage.setItem("workTime", "" + workTime);
				localStorage.setItem("seconds", "" + seconds);
				localStorage.setItem("minutes", "" + minutes);
				localStorage.setItem("hours", "" + hours);
			},1000)}

			down = !down;	
		}

		$(".switch").on("click", function(){
			countDown()
		});



		$( window ).on("unload", function(){
			timerOn = false;
			startTimer();
		});

		function centerText(){
			const timer = $(".timer");
			const timerHeight = Math.min(window.innerWidth*0.6, 400);
			console.log(window.innerWidth)
			console.log(timerHeight)
			timer.css({
				lineHeight: timerHeight+"px"
			})

		}
		centerText();
	})
