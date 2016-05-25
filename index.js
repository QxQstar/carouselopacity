function addLoadEvent(func){
	var oldLoad = window.onload;
	if(typeof oldLoad != 'function'){
		window.onload = func();
	}else{
		window.onload = function(){
			oldLoad();
			func();
		}
	}
}
function setListHeight(){
	var list = document.getElementById('list');
	var imgItem = list.getElementsByTagName('img')[0];
	var height = imgItem.offsetHeight;
	var list = document.getElementById('list');
	list.style.height = height + 'px';
}
function setLiIndex(){
	var list = document.getElementById('list');
	var li = list.getElementsByTagName('li');
	var liLen = li.length;
	for(var i = 0;i<liLen;i++){
		li[i].style.zIndex = liLen-i;
	}
}
var index = 1;//index表示当前显示的页面,index是一个全局变量
var timer;
function btnClick(){
	var pre = document.getElementById('pre');
	var next = document.getElementById('next');
	pre.onclick = function(){
		if(index == 1){
			index = 3;
		}else{
			--index;
		}
		stop();
		anmitate();
	};
	next.onclick = function(){
		if(index == 3){
			index = 1;
		}else{
			++index;
		}
		stop();
		anmitate();
	};
}
function anmitate(){
	var list = document.getElementById('list');
	var imgs = list.getElementsByTagName('img');
	var imgsLen = imgs.length;
	var whole = 300;//切换一张图片用的时间
	var inverTime = 5;//时间间隔
	var inverOpacity = 1/(whole/inverTime);
	for(var i = 0;i<imgsLen;i++){
		imgs[i].style.opacity = 0;
	}
	var ID = setInterval(function(){
		 var opacityed = parseFloat(imgs[index - 1].style.opacity);
		if(opacityed < 1){
			imgs[index-1].style.opacity = opacityed + inverOpacity; 
		}else{
			clearInterval(ID);
		}

	},inverTime);
}
function play() {
	timer = setTimeout(function () {
	if(index == 3){
			index = 1;
		}else{
			++index;
		}
		anmitate();
     	play();
 }, 3000);
}
function stop() {
	clearTimeout(timer);
}
function getBtn(){
	var pre = document.getElementById('pre');
	var next = document.getElementById('next');
	pre.onmouseout = play;
	next.onmouseout = play;
}
addLoadEvent(setListHeight);
addLoadEvent(setLiIndex);
addLoadEvent(btnClick);
addLoadEvent(play);
addLoadEvent(getBtn);
