window.onload=function(){

	var commandBox = document.getElementsByClassName("command-box")[0];
	var commander = new Commander(commandBox);
	// delayOneSecond(function(){
	// 	console.log("延迟1秒");
	// });
	setCommand(commandBox,commander);

}
function setCommand(commandBox,commander){
	var newBtn = document.getElementsByClassName("new")[0];
	var space = document.getElementsByClassName("space")[0];
	var star = document.getElementsByClassName("star")[0];
	commandBox.addEventListener("click",function(){
		var event = arguments[0] || window.event;
		var button = event.srcElement ? event.srcElement : event.target;
		var command = button.parentNode.parentNode;
		if(button.getAttribute("startFly")){
			commander.sendStartFly(command.id);
		}
		if(button.getAttribute("stop")){
			commander.sendStopFly(command.id);
		}
		if(button.getAttribute("destory")){
			commander.sendDestory(command.id)
		}
		if(button.getAttribute("new")){
			commander.createNewShip(star,newBtn,commandBox)
		}
	});
}
Star={
	W:300,
	H:300,
	L:155,
	T:140,
}
Commander = function(commandBox){
	this.commandBox = commandBox;
	this.ships = [];
	this.shipId = [];
	this.commandDoms = [];
	this.shipIdInUsed = [false,false,false,false];
};
Commander.prototype = {
	constructor:Commander,
	createNewShip :function(star,newBtn,commandBox){
			var id;
			var findId = false;
			var j;
			for(var i=0; i <= 3 && !findId; i++){
				if(!this.shipIdInUsed[i]){
					this.shipIdInUsed[i] = true;
					findId = true;
					id = i+1;
					j = i;
					this.shipId[i] = id;
				}
			}
		if(findId){
			var dom = makeShipDom(id);
			var commandDom = makeCommandDom(id);
			var ship = new Ship(id,dom);
			this.commandDoms[j] = commandDom;
			this.ships.push(ship);
			dom.style.left = Star.W/2-ship.width/2+"px";
			dom.style.top = -ship.height+"px";
			dom.style.webkitTransform= "rotate(0deg)";
			star.appendChild(dom);
			commandBox.insertBefore(commandDom,newBtn);
			
		}else{
			console.log("你已经创建了4架飞船了");
		}
	},
	sendStartFly:function(id){
		for(var i =0 ; i < this.ships.length;i++){
			
			var ship= this.ships[i];
			
			if(this.shipIdInUsed[i] || ship){
				delayOneSecond(ship,{id:id,command:"start"});
				// delayOneSecond(
				// 	function(){这种做法不可以的
				// 		randomEvent(function(){	
				// 				console.log(ship);
				// 				ship.accessCommand({id:id,command:"start"});
				// 			},
				// 			function(){
				// 				console.log("发送给飞船"+ship.id+"数据失败");
				// 			},
				// 		1);
				// 	}
				// );
			}
		}
	},
	sendStopFly:function(id){
		for(var i =0 ; i < this.ships.length;i++){
			
			var ship= this.ships[i];
			
			if(this.shipIdInUsed[i] || ship){
				delayOneSecond(ship,{id:id,command:"stop"});
			}
		}
	},
	sendDestory:function(id){
		var ship;
		var _this = this;
		for(var i =0 ; i < this.ships.length;i++){
			ship= this.ships[i];

			if(this.shipIdInUsed[i] || ship){
				delayOneSecond(ship,{id:id,command:"destory"},this);
			}
		}
		for(var i =0 ; i < this.shipId.length;i++){
			if(this.shipId[i] == id){
				this.shipId[i] = 0;
				this.shipIdInUsed[i]  = false;
				var commandBox = document.getElementsByClassName("command-box")[0];
				commandBox.removeChild(this.commandDoms[i]);
			}
		}
		
	}
}
// function delayOneSecond(fn){
// 	setTimeout(function(){
// 		console.log("发送数据中");
// 		fn();
// 	},1000);
// }
function delayOneSecond(ship,command,commander){
	console.log("正在发送给飞船"+ship.id+"命令");
	setTimeout(function(){
		randomEvent(function(){
			ship.accessCommand(command,commander);
		},function(){
			console.log("发送给"+ship.id+"命令失败");
		},0.7);
	}, 1000);
}
function randomEvent(successFn,failFn,rand){
	if(Math.random()<rand){
		successFn();
	}else{
		failFn();
	}
}
Ship = function(id,dom,commandDom){
	this.id = id;
	this.isFlying = false;
	this.dom = dom;
	this.energy = 100;
	this.weizhi = 0;
}
Ship.prototype = {
	width:110,
	height:30,
	constructor:Ship,
	accessCommand:function(command,commander){
		if(this.id == command.id && command.command == "start"){
			console.log("startFly");
			this.startFly();
		}
		if(this.id == command.id && command.command == "stop"){
			this.stop();
		}
		if(this.id == command.id && command.command =="destory"){
			this.destory(commander);
		}
	},
	startFly:function(){
		var speed = 20*1/10 ;
		/*一度等于2.61799px*/
		var _this = this;
		var jiaoSpeed = speed/(360/(Star.W*Math.PI));
		if(!this.isFlying){
			this.clearTimer(this.timer3);
			_this.isFlying = true;
			this.timer = window.setInterval(function(){
				_this.weizhi  = _this.weizhi+jiaoSpeed;
				if(_this.energy>=0){
					_this.fly(_this.weizhi);
				}else{
					_this.stop();
				}
			},100);
			this.timer2 = window.setInterval(function(){
				_this.energy -= 5;
				if(_this.energy>=0){
					_this.costEnergy(_this.energy);
				}
			},1000)
		}
	},
	fly:function(start){
		this.dom.style.webkitTransform= "rotate("+start+"deg)";
	},
	costEnergy:function(energy){
		this.dom.getElementsByClassName("ship-head")[0].innerHTML = this.id+" 号-"+energy+"%";
	},
	stop:function(){
		var _this = this;
		if(_this.isFlying){
			this.clearTimer(this.timer);
			this.clearTimer(this.timer2);
			this.isFlying = false;
			this.timer3 = window.setInterval(function(){
				_this.energy+=2;
				if(_this.energy>=100){
					_this.energy = 100;
					_this.clearTimer(_this.timer3);
					_this.costEnergy(_this.energy);
				}else{
					_this.costEnergy(_this.energy);
				}
			},1000);
		}
	},
	clearTimer:function(timer){
		clearInterval(timer);
	},
	destory:function(commander){
		this.clearTimer(this.timer);
		this.clearTimer(this.timer2);
		this.clearTimer(this.timer3);
		var star = document.getElementsByClassName("star")[0];
		star.removeChild(this.dom);
		deleteObjOnArr(commander.ships,this);
	}
}

function deleteObjOnArr(arr,obj){
	for(var i = 0 ; i < arr.length; i++){
		if(arr[i] == obj){
			arr.splice(i,1);
			console.log(arr[i] == obj)
		}
	}
}

function makeCommandDom(id){
	var command = document.createElement("div");
	command.setAttribute("id",id);
	var commandText  = document.createElement("div");
	addClass(commandText,"text");
	commandText.innerHTML = "对"+id+"号飞船下达指令:";
	var btnGroup = document.createElement("div");
	addClass(btnGroup,"btn-group");
	var startFlyBtn = document.createElement("button");
	startFlyBtn.innerHTML = "开始飞行";
	startFlyBtn.setAttribute("startFly",true);
	btnGroup.appendChild(startFlyBtn);
	var stopFlyBtn = document.createElement("button");
	stopFlyBtn.innerHTML = "停止飞行";
	stopFlyBtn.setAttribute("stop",true);
	btnGroup.appendChild(stopFlyBtn);
	var destoryBtn =  document.createElement("button");
	destoryBtn.setAttribute("destory",true);
	destoryBtn.innerHTML ="销毁";
	btnGroup.appendChild(destoryBtn);
	command.appendChild(commandText);
	command.appendChild(btnGroup);
	addClass(command,"command");
	return command;
}
function makeShipDom(id){
	var spaceShip = document.createElement("div");
	var shipHead = document.createElement("div");
	addClass(spaceShip,"space-ship");
	addClass(shipHead,"ship-head");
	spaceShip.appendChild(shipHead);
	shipHead.innerHTML = id+"号-100%";
	return spaceShip;
}

function addClass(element, newClassName) {
    var oldClassName=element.className;
    element.className=oldClassName===""?newClassName:oldClassName+" "+newClassName;
}

