document.onkeydown = function(ev){
	console.log(ev.keyCode)
	if(ev.keyCode == 122){
		// requestFullScreen();
		document.body.style.height = '768px';
		// document.body.style.background = 'url(img/desktop.jpg) no-repeat';
	}else if(ev.keyCode == 27){
		// exitFullscreen();
		document.body.style.height = '667px';
		// document.body.style.background = 'url(img/desktop.jpg) no-repeat';
	}
	
}
// 进入全屏
function requestFullScreen() {
 	var de = document.documentElement;
 	if (de.requestFullscreen) {
    	de.requestFullscreen();
    } else if (de.mozRequestFullScreen) {
    	de.mozRequestFullScreen();
    } else if (de.webkitRequestFullScreen) {
    	de.webkitRequestFullScreen();
    }
}
// 退出全屏
function exitFullscreen() {
	var de = document;
	if (de.exitFullscreen) {
		de.exitFullscreen();
	} else if (de.mozCancelFullScreen) {
		de.mozCancelFullScreen();
	} else if (de.webkitCancelFullScreen) {
		de.webkitCancelFullScreen();
	}
}