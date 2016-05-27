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
//设置class为list的高度,因为图片的position为absolute所以.list元素的高度为零
//如果一个元素的父元素高度为0，那么设置这个元素的margin: auto 0; 不起作用
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
var untilEvent = {
	addEvent:function(element,type,hander){
		if(element.addEventListener){
			element.addEventListener(type,hander,false);
		}else if(element.attachEvent){
			element.attachEvent('on'+type,hander);
		}else{
			element['on'+type] = hander;
		}
	},
	getEvent:function(event){
		return event?event:window.event;
	},
	getTarget:function(event){
		return event.target||event.srcElement;
	}

};
function btnClick(){
	var warp = document.getElementById('warp');
	untilEvent.addEvent(warp,'click',function(event){
		var event = untilEvent.getEvent(event);
		var target = untilEvent.getTarget(event);
		switch(target.id){
			case 'pre': if(index == 1){
					index =3;
				}else{
					--index;
				}
				anmitate();
				break;
			case 'next':if(index == 3){
				index = 1;
				}else{
					++index;
				}
				anmitate();
				break;
		}
	});
}
//切换图片的函数
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
	var go = function(){
		var opacityed = parseFloat(imgs[index - 1].style.opacity);
		if(opacityed < 1){
			imgs[index-1].style.opacity = opacityed + inverOpacity;
			setTimeout(go,inverTime);
		}
	};
	go();
}
//自动切换函数
function play() {
	timer = setTimeout(function () {
	if(index == 3){
			index = 1;
		}else{
			++index;
		}
		anmitate();
     	play();
     	// 
 }, 3000);
}
//停止切换函数,当鼠标点击了左箭头或者右箭头时会取消自动切换，当鼠标从箭头上移开，又开始自动切换
function stop() {
	clearTimeout(timer);
}
function getWarp(){
	var warp = document.getElementById('warp');
	warp.onmouseout = play;
	warp.onmouseover = stop;
}
addLoadEvent(setListHeight);
addLoadEvent(setLiIndex);
addLoadEvent(btnClick);
addLoadEvent(play);
addLoadEvent(getWarp);
