
//"use strict";
window.onload=function(){
	var pic = document.getElementById("picZone");
	var arrow = document.getElementById("arrow");
	//插入图片放大
	var showZone=document.getElementById("showZone");
	var showImg=document.getElementById("showImg");
	var newImg = document.createElement("img");
	newImg.src=document.getElementById("imgSource").src;
	showImg.appendChild(newImg);
	//取到PIC的距离
	function getPos(obj){
	    var l=0;
	    var t=0;
	    while(obj){
	        l+=obj.offsetLeft; //取到定位父级的距离
	        t+=obj.offsetTop;  //取到定位父级的距离
	        obj=obj.offsetParent;  //把obj的定位父级变成obj
	    }
	    return {left:l,top:t};
	}
	//获取鼠标位置
	function getMousePos(event){
	   var e = event || window.event;
	   var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
	   var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
	   var x = e.pageX || e.clientX + scrollX;
	   var y = e.pageY || e.clientY + scrollY;
	   return { 'x':x,'y':y };
	}
	pic.onmousemove=function(){
		arrow.style.display="block";//显示滑动块和展示框
		showZone.style.display="block";
		var arrowWidth=(pic.clientWidth*showImg.clientWidth)/newImg.clientWidth;//设置滑动块的宽度和高度
		if(arrowWidth>pic.clientWidth){
			arrowWidth=pic.clientWidth;
		}
		arrow.style.width=arrowWidth;
		arrow.style.height=arrowWidth;

		var page = getMousePos(event);
		var x=page.x-getPos(pic).left-(arrowWidth/2);//计算滑动块偏离左边距离
		var y=page.y-getPos(pic).top-(arrowWidth/2);//计算滑动块偏离顶部距离
		if(x<0){x=0}
		if(x>pic.clientWidth-arrowWidth){
			x=pic.clientWidth-arrowWidth;
		}
		if(y<0){y=0}
		if(y>pic.clientHeight-arrowWidth){
			y=pic.clientHeight-arrowWidth;
		}
	    arrow.style.left=x;
	    arrow.style.top=y;
		var newImgleft=((arrow.offsetLeft*newImg.clientWidth)/pic.clientWidth);//大图相对展示框偏离左边距离
		var newImgtop=((arrow.offsetTop*newImg.clientHeight)/pic.clientHeight);//大图相对展示框偏离顶部距离
		newImg.style.left=-newImgleft;
		newImg.style.top=-newImgtop;
	}
	arrow.onmouseout=function(){//隐藏滑动块和展示框
		arrow.style.display=("none");
		showZone.style.display=("none");		
	}
}