window.onload=function(){
/*1.让所有的图片旋转一定的平均度数  
  2.拖拽
  	按下去  移动鼠标   松开
  	找到旋转的度数>>> 鼠标移动的距离
  	移动的度数  鼠标移动的事件的当前事件与上一次移动事件的距离差
  	当前坐标值   上一次坐标值   坐标差
  	赋值  
  	差值是不能直接赋值给度数   会覆盖本身的一个度数 在原来的基础上加上差值
  3.鼠标松开一瞬间   惯性就有了
  	惯性 >> 度数变化就是差值的变化	差值在一定的时间内慢慢变小
  	当差值小到某一个程度   改变就结束
*/ 		
var oImg = document.getElementsByTagName('img');
var nowX,nowY,lastX,lastY,minusX,minusY,roX = -10,roY=0;
var oWrap = document.getElementById('wrap');
// console.log(oImg);

(function(i){
	var imgLen = oImg.length;//保存数据
	var deg = 360/imgLen;//每一个图片旋转的度数
	for (; i <imgLen; i++) {
		oImg[i].style.transform="rotateY("+deg*i+"deg) translateZ(350px)";
	};
	})(0);

	document.onmousedown=function(e){
		//鼠标按下
		var e = e ||window.event;
		lastX = e.clientX;
		lastY = e.clientY;
		console.log(e.clientX,e.clientY)
		this.onmousemove=function(){
			//鼠标移动
			var e = e ||window.event;
			//第一次点击的时候产生最早的旧的值
		
			nowX = e.clientX;//每移动一次产生一个新的坐标
			nowY = e.clientY;//每移动一次产生一个新的坐标

			//TODO 计算差
			minusX = nowX - lastX;
			minusY = nowY - lastY;
			// console.log(minusX,minusY)
			//旋转度数
			roY +=minusX*0.2; 
			roX -= minusY*0.1;
			//赋值给度数
			oWrap.style.transform='rotateX('+roX+'deg) rotateY('+roY+'deg)';

			//TODO  赋值给度数
			lastX = nowX;//用完之后旧的值
			lastY = nowY;
		}
		this.onmouseup=function(){
			//鼠标松开
			this.onmousemove=null;//清空鼠标移动事件
			//在一段时间重复做某件事情
			timer = setInterval(function(){
				minusX *= 0.95;
				minusY *= 0.95;

				roY +=minusX*0.2; 
				roX -= minusY*0.1;

				oWrap.style.transform='rotateX('+roX+'deg) rotateY('+roY+'deg)';
				//差值的绝对值判断
				if(Math.abs(minusX)<0.1 || Math.abs(minusY)<0.1){///Math.abs   绝对值
					clearInterval(timer);//停止当前定时器
				}
			},1000/60);
		}

	}
}