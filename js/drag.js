	// 拖拽组件代码
	function Drag(id){
		this.div = document.getElementById(id);
		this.disX = 0;
		this.disY = 0;
		this.json = {
			down:function(){},
			move:function(){},
			up:function(){},
		};
	}

	Drag.prototype.init = function(obj){
		for(var attr in obj){
			if(this.json.hasOwnProperty(attr)){
				this.json[attr] = obj[attr];
			}
		}

		for(var key in this.json.Style){
			this.div.style[key] = this.json.Style[key];
		}
		var _this = this;
		this.div.addEventListener('mousedown',function(ev){
			// 按下的时候
			tirgger(_this,'按下');
			_this.fnDown(ev);
		});
	}
	Drag.prototype.fnDown = function(ev){
		this.disX = ev.pageX - this.div.offsetLeft;
		this.disY = ev.pageY - this.div.offsetTop;
		var _this = this;
		document.addEventListener('mousemove',move1);
		document.addEventListener('mouseup',up1);
		function move1(ev){
			// 移动的时候
			tirgger(_this,'移动');
			_this.fnMove(ev);
		}
		function up1(){
			// 抬起的时候
			tirgger(_this,'抬起');
			_this.fnUP(move1,up1);
		}
		ev.preventDefault();
	}
	Drag.prototype.fnMove = function(ev){	
		this.div.style.left = ev.pageX - this.disX + 'px';
		this.div.style.top = ev.pageY - this.disY + 'px';
	}
	Drag.prototype.fnUP = function(move1,up1){
		document.removeEventListener('mousemove',move1);
		document.removeEventListener('mouseup',up1);
	}
	function addEvent(obj,evName,fn){
		obj.Ev = obj.Ev || {};
		obj.Ev[evName] = obj.Ev[evName] || [];
		obj.Ev[evName].push(fn);
	}
	function tirgger(obj,evName){
		if(obj.Ev[evName]){
			obj.Ev[evName].forEach(function(elem,index){
				elem();
			})
		}
	}
	
	

	



