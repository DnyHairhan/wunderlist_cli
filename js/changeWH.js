function Change(id){
	this.obj = document.getElementById(id);
}

Change.prototype.init = function(){
	var _this = this;
	document.addEventListener('mousemove',function(ev){
		_this.fnMove1(ev);
		// console.log(ev.pageX);
	});
}

Change.prototype.fnMove1 = function(ev){
	// 鼠标移动到的位置
	var l = this.obj.offsetLeft;
	var r = this.obj.offsetLeft+this.obj.offsetWidth;
	var t = this.obj.offsetTop;
	var b = this.obj.offsetHeight+this.obj.offsetTop; 
	
	/*if(ev.pageX == l && ev.pageY == t || ev.pageX ==r && ev.pageY ==b){
		this.obj.style.cursor = 'nw-resize';
	}else if(ev.pageX == l && ev.pageY ==b || ev.pageX ==r && ev.pageY ==t){
		this.obj.style.cursor = 'ne-resize';
	}else */if(ev.pageX == l ||ev.pageX ==r){
		// 鼠标碰到左右
		this.obj.style.cursor = 'w-resize';
	}else if(ev.pageY ==t ||ev.pageY ==b){
		// 鼠标碰到上下
		this.obj.style.cursor = 'n-resize';
	}
	 
		
	// 右上角cursor: ne-resize;
	// 左上角cursor: nw-resize;

	
	
}
var wrap = new Change('wrap');
wrap.init();